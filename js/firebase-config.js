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
  console.log("🔥 Firebase 연결 완료!");
} catch (e) {
  console.warn("Firebase 초기화 오류:", e);
}

export { auth, db, isFirebaseEnabled };

// 로그인 상태 감지 리스너 등록
export function setupAuthListener(callback) {
  if (isFirebaseEnabled && auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          uid: user.uid,
          displayName: user.displayName || "구글선비",
          isAnonymous: user.isAnonymous
        });
      }
    });
  }
}

let isLoggingIn = false;

export async function loginWithGoogle() {
  if (isLoggingIn) return null;
  isLoggingIn = true;

  if (!isFirebaseEnabled || !auth) {
    isLoggingIn = false;
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
    isLoggingIn = false;
    return {
      uid: result.user.uid,
      displayName: result.user.displayName || "구글선비",
      isAnonymous: false
    };
  } catch (error) {
    isLoggingIn = false;
    console.error("구글 로그인 에러:", error);

    if (error.code === 'auth/cancelled-popup-request') {
      return null;
    }
    
    let errorMsg = error.message;
    if (error.code === 'auth/unauthorized-domain') {
      errorMsg = "Firebase 콘솔 [Authentication] -> [Settings] -> [Authorized domains]에 korean-spelling-sejong-game.vercel.app 추가가 필요합니다!";
    } else if (error.code === 'auth/operation-not-allowed') {
      errorMsg = "Firebase 콘솔 [Authentication] -> [Sign-in method]에서 Google 로그인을 활성화해 주세요!";
    } else if (error.code === 'auth/popup-closed-by-user') {
      errorMsg = "로그인 팝업 창이 닫혔습니다.";
    }
    throw new Error(errorMsg);
  }
}

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
    console.error("익명 로그인 실패:", error);
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error("Firebase 콘솔에서 '익명 로그인' 활성화가 필요합니다.");
    }
    throw error;
  }
}

// 점수 및 프로필 저장 (비동기 non-blocking 처리)
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

  // 로컬 저장은 비동기로 즉시 완료
  localStorage.setItem(`sejong_user_${userProfile.uid}`, JSON.stringify(sanitizedData));
  saveToLocalLeaderboard(sanitizedData);

  // Firestore 저장은 백그라운드에서 비동기로 수행 (화면 전환을 막지 않음)
  if (isFirebaseEnabled && db) {
    (async () => {
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
        console.warn("Firestore 백그라운드 저장 경고 (로컬스토리지에는 안전하게 저장됨):", err);
      }
    })();
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
      console.warn("Firestore 랭킹 조회 경고, 로컬 랭킹 사용:", err);
    }
  }

  const localList = JSON.parse(localStorage.getItem("sejong_local_leaderboard") || "[]");
  topTokens = [...localList].sort((a, b) => (b.tokensCount || 0) - (a.tokensCount || 0)).slice(0, 5);
  topClears = [...localList].sort((a, b) => (b.totalClears || 0) - (a.totalClears || 0)).slice(0, 5);

  return { topTokens, topClears };
}
