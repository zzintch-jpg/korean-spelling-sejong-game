// ==========================================================================
// 훈민정음 맞춤법 수호대 - 로컬 스토리지 & 게스트 세션 모듈 (외부 CDN 종속성 100% 제거)
// ==========================================================================

export async function loginWithGoogle() {
  const mockUid = "user_google_" + Math.random().toString(36).substr(2, 6);
  return { uid: mockUid, displayName: "구글도전자" };
}

export async function loginAnonymously() {
  const guestId = Math.random().toString(36).substr(2, 6);
  return { uid: `guest_${guestId}`, displayName: `한글도전자_${guestId}` };
}

export async function saveScoreToFirestore(userProfile) {
  if (!userProfile || !userProfile.uid) return;
  try {
    localStorage.setItem(`sejong_user_${userProfile.uid}`, JSON.stringify(userProfile));
  } catch (e) {
    console.warn("로컬 스토리지 저장 경고:", e);
  }
}

export async function getTop5Leaderboard() {
  const localUsers = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("sejong_user_")) {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          if (item && item.uid) {
            localUsers.push(item);
          }
        } catch (e) {}
      }
    }
  } catch (e) {}

  const topTokens = [...localUsers].sort((a, b) => ((b.collectedTokens ? b.collectedTokens.length : 0) - (a.collectedTokens ? a.collectedTokens.length : 0))).slice(0, 5);
  const topClears = [...localUsers].sort((a, b) => ((b.totalClears || 0) - (a.totalClears || 0))).slice(0, 5);

  return { topTokens, topClears };
}

export const auth = null;
export const db = null;
