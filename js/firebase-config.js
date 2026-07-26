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

// 구글 계정 선택 창 강제 호출 (prompt: 'select_account')
export async function loginWithGoogle() {
  if (!isFirebaseEnabled || !auth) {
    alert("Firebase 인증 연결을 확인하는 중입니다.");
    return null;
  }

  const provider = new GoogleAuthProvider();
  // 구글 계정 선택 팝업창을 매번 강제로 표시
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("구글 로그인 성공 유저:", result.user);
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
      alert("브라우저의 팝업 차단 기능이 활성화되어 있습니다. 주소창 오른쪽 팝업 차단을 해제해 주세요!");
    } else if (error.code === 'auth/unauthorized-domain') {
      alert("Firebase 콘솔 [Authentication] -> [Settings] -> [Authorized domains]에 현재 주소를 추가해 주세요!");
    } else {
      alert("구글 로그인 처리 중 오류: " + error.message);
    }
    return null;
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
      alert("Firebase 콘솔에서 '익명 로그인' 수단 활성화가 필요합니다.");
    }
    return null;
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
