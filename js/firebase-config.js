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

// 실제 발급받으신 Firebase 연동 키 적용
const firebaseConfig = {
  apiKey: "AIzaSyAyxeADFo1G1B9ygrFwlIy6xJ6cVYC4g74",
  authDomain: "korean-spelling-game.firebaseapp.com",
  projectId: "korean-spelling-game",
  storageBucket: "korean-spelling-game.firebasestorage.app",
  messagingSenderId: "872580272306",
  appId: "1:872580272306:web:214d9d45e2c37cbc59f9ab",
  measurementId: "G-5MDSD794P0"
};

let app, auth, db;
let isFirebaseEnabled = false;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  isFirebaseEnabled = true;
  console.log("🔥 Firebase가 완벽하게 연결되었습니다!");
} catch (e) {
  console.warn("Firebase 초기화 오류:", e);
}

export { auth, db, isFirebaseEnabled };

// 구글 로그인 처리 및 에러 진단
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
    console.error("구글 로그인 실패 원인 상세:", error);
    let errorMsg = error.message;
    if (error.code === 'auth/unauthorized-domain') {
      errorMsg = "Firebase 콘솔의 [Authentication] -> [설정] -> [승인된 도메인]에 현재 도메인(korean-spelling-sejong-game.vercel.app)을 추가해 주세요!";
    } else if (error.code === 'auth/operation-not-allowed') {
      errorMsg = "Firebase 콘솔의 [Authentication] -> [로그인 방법]에서 'Google' 로그인을 활성화(사용 설정)해 주세요!";
    } else if (error.code === 'auth/popup-closed-by-user') {
      errorMsg = "로그인 팝업 창이 닫혔습니다. 다시 시도해 주세요.";
    }
    throw new Error(errorMsg);
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
    console.error("익명 로그인 실패 원인:", error);
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error("Firebase 콘솔에서 '익명 로그인' 활성화가 필요합니다.");
    }
    throw error;
  }
}

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

  localStorage.setItem(`sejong_user_${userProfile.uid}`, JSON.stringify(sanitizedData));
  saveToLocalLeaderboard(sanitizedData);

  if (isFirebaseEnabled && db) {
    try {
      const userRef = doc(db, "users", userProfile.uid);
      await setDoc(userRef, sanitizedData, { merge: true });

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
      console.error("Firestore 저장 오류:", err);
    }
  }
}

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
      console.error("Firestore 랭킹 로딩 실패:", err);
    }
  }

  const localList = JSON.parse(localStorage.getItem("sejong_local_leaderboard") || "[]");
  topTokens = [...localList].sort((a, b) => (b.tokensCount || 0) - (a.tokensCount || 0)).slice(0, 5);
  topClears = [...localList].sort((a, b) => (b.totalClears || 0) - (a.totalClears || 0)).slice(0, 5);

  return { topTokens, topClears };
}
