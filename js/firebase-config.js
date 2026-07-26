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
  console.log("🔥 Firebase 연결 완벽 완료!");
} catch (e) {
  console.warn("Firebase 초기화 오류:", e);
}

export { auth, db, isFirebaseEnabled };

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
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    return {
      uid: result.user.uid,
      displayName: result.user.displayName || "구글선비",
      isAnonymous: false
    };
  } catch (error) {
    console.error("구글 로그인 팝업 실패 상세:", error);
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      return null;
    }
    if (error.code === 'auth/popup-blocked') {
      alert("브라우저의 팝업 차단 기능이 활성화되어 있습니다. 팝업 차단을 해제해 주세요!");
    } else if (error.code === 'auth/unauthorized-domain') {
      alert("Firebase 콘솔 [Authentication] -> [Settings] -> [Authorized domains]에 현재 주소를 추가해 주세요!");
    } else {
      alert("구글 로그인 처리 중 오류: " + error.message);
    }
    return null;
  }
}

// 게스트(익명) 로그인: Firebase 실패 시에도 100% 로컬 게스트로 즉시 진입 보장
export async function loginAnonymously() {
  if (isFirebaseEnabled && auth) {
    try {
      const result = await signInAnonymously(auth);
      return {
        uid: result.user.uid,
        displayName: "익명선비",
        isAnonymous: true
      };
    } catch (error) {
      console.warn("Firebase 익명 미활성화로 인해 로컬 게스트 모드로 자동 진입합니다:", error);
    }
  }

  // 100% 무조건 성공하는 로컬 게스트 객체 반환
  const guestId = "guest_" + Math.random().toString(36).substring(2, 9);
  return {
    uid: guestId,
    displayName: "한글선비",
    isAnonymous: true
  };
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
        console.warn("Firestore 저장 경고 (로컬에 안전 저장됨):", err);
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
      console.warn("Firestore 랭킹 조회 경고:", err);
    }
  }

  const localList = JSON.parse(localStorage.getItem("sejong_local_leaderboard") || "[]");
  topTokens = [...localList].sort((a, b) => (b.tokensCount || 0) - (a.tokensCount || 0)).slice(0, 5);
  topClears = [...localList].sort((a, b) => (b.totalClears || 0) - (a.totalClears || 0)).slice(0, 5);

  return { topTokens, topClears };
}
