// Firebase Configuration 및 인증 / 리더보드 모듈 (도전자 호칭 적용)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForDevelopmentOnly123456",
  authDomain: "korean-spelling-game.firebaseapp.com",
  projectId: "korean-spelling-game",
  storageBucket: "korean-spelling-game.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase 초기화 경고 (로컬 폴백 사용):", e);
}

export { auth, db };

export async function loginWithGoogle() {
  if (!auth) {
    const mockUid = "guest_google_" + Math.random().toString(36).substr(2, 6);
    return { uid: mockUid, displayName: "구글도전자" };
  }
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.warn("구글 로그인 팝업 실패. 익명/로컬 로그인으로 전환합니다:", error);
    return await loginAnonymously();
  }
}

export async function loginAnonymously() {
  if (!auth) {
    const guestId = Math.random().toString(36).substr(2, 6);
    return { uid: `guest_${guestId}`, displayName: `한글도전자_${guestId}` };
  }
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.warn("Firebase 익명 로그인 비활성화 경고. 로컬 게스트 ID로 접속합니다:", error.message);
    const guestId = Math.random().toString(36).substr(2, 6);
    return { uid: `guest_${guestId}`, displayName: `한글도전자_${guestId}` };
  }
}

export async function saveScoreToFirestore(userProfile) {
  if (!userProfile || !userProfile.uid) return;
  
  try {
    localStorage.setItem(`sejong_user_${userProfile.uid}`, JSON.stringify(userProfile));
  } catch (e) {}

  if (!db) return;

  try {
    const userRef = doc(db, "users", userProfile.uid);
    await setDoc(userRef, {
      uid: userProfile.uid,
      displayName: userProfile.displayName || "익명 도전자",
      collectedTokens: userProfile.collectedTokens || [],
      tokensCount: (userProfile.collectedTokens || []).length,
      totalClears: userProfile.totalClears || 0,
      isMaster: userProfile.isMaster || false,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (e) {
    console.warn("Firestore 점수 저장 건너뜀 (로컬 스토리지에 안전하게 보관됨):", e);
  }
}

export async function getTop5Leaderboard() {
  let topTokens = [];
  let topClears = [];

  try {
    if (db) {
      const usersRef = collection(db, "users");
      
      const qTokens = query(usersRef, orderBy("tokensCount", "desc"), limit(5));
      const snapTokens = await getDocs(qTokens);
      snapTokens.forEach(d => topTokens.push(d.data()));

      const qClears = query(usersRef, orderBy("totalClears", "desc"), limit(5));
      const snapClears = await getDocs(qClears);
      snapClears.forEach(d => topClears.push(d.data()));
    }
  } catch (e) {
    console.warn("Firestore 명예의 전당 조회 건너뜀 (로컬 데이터로 대체):", e);
  }

  if (topTokens.length === 0) {
    const localUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("sejong_user_")) {
        try {
          localUsers.push(JSON.parse(localStorage.getItem(key)));
        } catch (e) {}
      }
    }

    if (localUsers.length > 0) {
      topTokens = [...localUsers].sort((a, b) => (b.collectedTokens?.length || 0) - (a.collectedTokens?.length || 0)).slice(0, 5);
      topClears = [...localUsers].sort((a, b) => (b.totalClears || 0) - (a.totalClears || 0)).slice(0, 5);
    }
  }

  return { topTokens, topClears };
}
