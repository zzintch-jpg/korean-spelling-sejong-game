// Firebase 설정 및 데이터 보안 모듈
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInAnonymously, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 환경변수 또는 글로벌 설정 객체에서 안전하게 파싱 (개인정보 & API 키 보호)
const getEnv = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof window !== 'undefined' && window.ENV && window.ENV[key]) {
    return window.ENV[key];
  }
  return "";
};

const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY") || "YOUR_FIREBASE_API_KEY",
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN") || "your-app.firebaseapp.com",
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID") || "your-app-id",
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET") || "your-app.appspot.com",
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID") || "1234567890",
  appId: getEnv("VITE_FIREBASE_APP_ID") || "1:1234567890:web:1234567890"
};

let app, auth, db;
let isFirebaseEnabled = false;

try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    isFirebaseEnabled = true;
    console.log("🔥 Firebase가 안전하게 초기화되었습니다.");
  } else {
    console.log("ℹ️ Firebase API 키가 아직 .env에 입력되지 않았습니다. 안전한 사용자별 로컬 격리 모드로 구동됩니다.");
  }
} catch (e) {
  console.warn("Firebase 초기화 경고:", e);
}

export { auth, db, isFirebaseEnabled };

// 구글 로그인 처리 (개인정보 최소화 수집)
export async function loginWithGoogle() {
  if (!isFirebaseEnabled || !auth) {
    const guestId = "guest_" + Math.random().toString(36).substring(2, 9);
    return {
      uid: guestId,
      displayName: "한글선비_" + guestId.substring(6),
      isAnonymous: true
    };
  }
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return {
      uid: result.user.uid,
      displayName: result.user.displayName || "구글선비",
      isAnonymous: false
    };
  } catch (error) {
    console.error("구글 로그인 처리 중 문제 발생:", error);
    throw error;
  }
}

// 익명 로그인 처리
export async function loginAnonymously() {
  if (!isFirebaseEnabled || !auth) {
    const guestId = "anon_" + Math.random().toString(36).substring(2, 9);
    return {
      uid: guestId,
      displayName: "한글학사_" + guestId.substring(5),
      isAnonymous: true
    };
  }
  try {
    const result = await signInAnonymously(auth);
    return {
      uid: result.user.uid,
      displayName: "익명선비",
      isAnonymous: true
    };
  } catch (error) {
    console.error("익명 로그인 처리 문제 발생:", error);
    throw error;
  }
}

// 사용자별 데이터 안전 분리 저장 (Firestore & LocalStorage 사용자별 키 분리)
export async function saveScoreToFirestore(userProfile) {
  if (!userProfile || !userProfile.uid) return;

  const sanitizedData = {
    uid: userProfile.uid,
    displayName: userProfile.displayName || "손님",
    tokensCount: userProfile.collectedTokens ? userProfile.collectedTokens.length : 0,
    collectedTokens: userProfile.collectedTokens || [],
    totalClears: userProfile.totalClears || 0,
    isMaster: !!userProfile.isMaster,
    updatedAt: new Date().toISOString()
  };

  // 1. 로컬스토리지 유저별 고유키 격리 저장 (타 사용자 데이터 오염 방지)
  localStorage.setItem(`sejong_user_${userProfile.uid}`, JSON.stringify(sanitizedData));
  saveToLocalLeaderboard(sanitizedData);

  // 2. Firebase Firestore 유저 전용 문서 & 리더보드 문서 분리 저장
  if (isFirebaseEnabled && db) {
    try {
      // 본인 전용 컬렉션저장
      const userRef = doc(db, "users", userProfile.uid);
      await setDoc(userRef, sanitizedData, { merge: true });

      // 리더보드용 최소 데이터(익명성 보장)만 공개 컬렉션에 분리 저장
      const publicLeaderboardRef = doc(db, "leaderboard", userProfile.uid);
      await setDoc(publicLeaderboardRef, {
        uid: sanitizedData.uid,
        displayName: sanitizedData.displayName,
        tokensCount: sanitizedData.tokensCount,
        totalClears: sanitizedData.totalClears,
        isMaster: sanitizedData.isMaster,
        updatedAt: sanitizedData.updatedAt
      }, { merge: true });

    } catch (err) {
      console.error("Firestore 데이터 안전 저장 중 오류:", err);
    }
  }
}

// 로컬 랭킹 격리 저장 함수
function saveToLocalLeaderboard(userData) {
  let leaderboard = JSON.parse(localStorage.getItem("sejong_local_leaderboard") || "[]");
  const existingIdx = leaderboard.findIndex(u => u.uid === userData.uid);
  if (existingIdx >= 0) {
    leaderboard[existingIdx] = userData;
  } else {
    leaderboard.push(userData);
  }
  localStorage.setItem("sejong_local_leaderboard", JSON.stringify(leaderboard));
}

// 명예의 전당 Top 5 불러오기 (개인정보 제외한 정제된 랭킹 데이터)
export async function getTop5Leaderboard() {
  let topTokens = [];
  let topClears = [];

  if (isFirebaseEnabled && db) {
    try {
      const qTokens = query(collection(db, "leaderboard"), orderBy("tokensCount", "desc"), limit(5));
      const snapTokens = await getDocs(qTokens);
      topTokens = snapTokens.docs.map(doc => doc.data());

      const qClears = query(collection(db, "leaderboard"), orderBy("totalClears", "desc"), limit(5));
      const snapClears = await getDocs(qClears);
      topClears = snapClears.docs.map(doc => doc.data());

      return { topTokens, topClears };
    } catch (err) {
      console.error("Firestore 랭킹 불러오기 실패, 로컬 격리 데이터 활용:", err);
    }
  }

  // 로컬 데이터 정렬
  const localList = JSON.parse(localStorage.getItem("sejong_local_leaderboard") || "[]");
  topTokens = [...localList].sort((a, b) => (b.tokensCount || 0) - (a.tokensCount || 0)).slice(0, 5);
  topClears = [...localList].sort((a, b) => (b.totalClears || 0) - (a.totalClears || 0)).slice(0, 5);

  return { topTokens, topClears };
}
