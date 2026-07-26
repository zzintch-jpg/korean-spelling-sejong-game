// ==========================================================================
// 훈민정음 맞춤법 수호대 - 메인 어플리케이션 엔진 (실시간 정답 & 오답 개수 표시)
// ==========================================================================

import { GAME1_WORDS, GAME2_QUESTIONS, GAME3_QUESTIONS, BOSS_QUESTIONS, getRandomSubarray } from './questions.js';
import { HANGUL_TOKENS, isBossUnlocked } from './tokens.js';
import { loginWithGoogle, loginAnonymously, saveScoreToFirestore, getTop5Leaderboard, auth } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'correct') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'wrong') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.25);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.start(now);
    osc.stop(now + 0.25);
  } else if (type === 'fanfare') {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.connect(g);
      g.connect(audioCtx.destination);
      o.frequency.setValueAtTime(freq, now + idx * 0.12);
      g.gain.setValueAtTime(0.3, now + idx * 0.12);
      g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.25);
      o.start(now + idx * 0.12);
      o.stop(now + idx * 0.12 + 0.25);
    });
  }
}

let currentUser = {
  uid: '',
  displayName: '',
  collectedTokens: [],
  totalClears: 0,
  isMaster: false
};

let activeTimer = null;
let currentScreen = 'loginScreen';

document.addEventListener('DOMContentLoaded', () => {
  initUIEventListeners();
});

function loadUserIsolatedProfile(uid) {
  const saved = localStorage.getItem(`sejong_user_${uid}`);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      currentUser = { ...currentUser, ...parsed };
    } catch (e) {
      console.warn("격리 프로필 파싱 오류:", e);
    }
  }
}

function handleUserLoggedIn(user) {
  const inputNick = document.getElementById('nicknameInput').value.trim();
  currentUser.uid = user.uid;
  currentUser.displayName = inputNick || user.displayName || '한글선비';

  loadUserIsolatedProfile(user.uid);
  if (inputNick) {
    currentUser.displayName = inputNick;
  }

  saveScoreToFirestore(currentUser);
  document.getElementById('userBar').style.display = 'flex';
  showScreen('lobbyScreen');
}

function updateUI() {
  document.getElementById('userDisplayName').textContent = currentUser.displayName || '손님';
  document.getElementById('tokenCount').textContent = currentUser.collectedTokens.length;
  document.getElementById('tokenPanelCount').textContent = currentUser.collectedTokens.length;

  const tokenGrid = document.getElementById('tokenGrid');
  tokenGrid.innerHTML = '';

  HANGUL_TOKENS.forEach(t => {
    const div = document.createElement('div');
    const isCollected = currentUser.collectedTokens.includes(t.id);
    div.className = `token-item ${isCollected ? 'collected' : ''}`;
    div.textContent = t.char;
    div.title = `${t.name}: ${t.desc} (${isCollected ? '수집됨' : '미수집'})`;
    tokenGrid.appendChild(div);
  });

  const bossBtn = document.getElementById('btnBossBattle');
  const bossLockText = document.getElementById('bossLockText');
  if (isBossUnlocked(currentUser.collectedTokens)) {
    bossBtn.classList.remove('locked');
    bossLockText.textContent = "🔥 14개 자음 토큰 수집 완료! 세종대왕 보스전 도전 가능!";
  } else {
    bossBtn.classList.add('locked');
    bossLockText.textContent = `14개 한글 토큰을 모아 세종대왕과의 10문제 최종 결투에 도전하세요! (${currentUser.collectedTokens.length}/14)`;
  }
}

function showScreen(screenId) {
  clearInterval(activeTimer);
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    currentScreen = screenId;
  }
  updateUI();
}

function initUIEventListeners() {
  document.getElementById('btnLogout').addEventListener('click', async () => {
    if (auth) {
      try { await signOut(auth); } catch (e) {}
    }
    currentUser = {
      uid: '',
      displayName: '',
      collectedTokens: [],
      totalClears: 0,
      isMaster: false
    };
    document.getElementById('userBar').style.display = 'none';
    showScreen('loginScreen');
  });

  document.getElementById('btnAnonLogin').addEventListener('click', async () => {
    try {
      const nick = document.getElementById('nicknameInput').value.trim() || '한글선비';
      const user = await loginAnonymously();
      if (user) {
        user.displayName = nick;
        handleUserLoggedIn(user);
      }
    } catch (e) {
      alert("로그인 안내: " + e.message);
    }
  });

  const btnGoogle = document.getElementById('btnGoogleLogin');
  btnGoogle.addEventListener('click', async () => {
    try {
      const user = await loginWithGoogle();
      if (user) {
        handleUserLoggedIn(user);
      }
    } catch (e) {
      console.error("구글 로그인 실패:", e);
    }
  });

  document.querySelectorAll('.btn-back-lobby').forEach(btn => {
    btn.addEventListener('click', () => showScreen('lobbyScreen'));
  });

  document.getElementById('btnGame1').addEventListener('click', () => startGame1());
  document.getElementById('btnGame2').addEventListener('click', () => startGame2());
  document.getElementById('btnGame3').addEventListener('click', () => startGame3());

  document.getElementById('btnBossBattle').addEventListener('click', () => {
    if (!isBossUnlocked(currentUser.collectedTokens)) {
      showModal("보스전 잠김 👑", "14개 한글 자음 토큰(`가`~`하`)을 모두 모아야 세종대왕에게 도전할 수 있습니다!");
      return;
    }
    startBossBattle();
  });

  document.getElementById('btnHallOfFame').addEventListener('click', () => renderHallOfFame('tokens'));

  document.getElementById('tabTokens').addEventListener('click', (e) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderHallOfFame('tokens');
  });
  document.getElementById('tabClears').addEventListener('click', (e) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderHallOfFame('clears');
  });

  document.getElementById('modalBtnClose').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'none';
  });
}

// ==========================================================================
// 🎯 미니게임 1: 맞춤법 터치 (실시간 정답/오답 집계)
// ==========================================================================
let g1Score = 0;
let g1Wrong = 0;
let g1TimeLeft = 30;
let g1SpawnInterval = null;
let g1ActiveWordsPool = [];

function startGame1() {
  g1Score = 0;
  g1Wrong = 0;
  g1TimeLeft = 30;
  g1ActiveWordsPool = getRandomSubarray(GAME1_WORDS, GAME1_WORDS.length);
  showScreen('game1Screen');
  document.getElementById('g1Score').textContent = g1Score;
  document.getElementById('g1Wrong').textContent = g1Wrong;
  document.getElementById('g1Timer').textContent = g1TimeLeft;

  const stage = document.getElementById('g1Stage');
  stage.innerHTML = '';

  activeTimer = setInterval(() => {
    g1TimeLeft--;
    document.getElementById('g1Timer').textContent = g1TimeLeft;
    if (g1TimeLeft <= 0) {
      endGame1(false);
    }
  }, 1000);

  spawnFloatingWord();
  g1SpawnInterval = setInterval(spawnFloatingWord, 1000);
}

function spawnFloatingWord() {
  if (currentScreen !== 'game1Screen') {
    clearInterval(g1SpawnInterval);
    return;
  }
  const stage = document.getElementById('g1Stage');
  const wordObj = g1ActiveWordsPool[Math.floor(Math.random() * g1ActiveWordsPool.length)];
  const isCorrectType = Math.random() > 0.35;
  const textToShow = isCorrectType ? wordObj.correct : wordObj.wrong;

  const el = document.createElement('div');
  el.className = 'floating-word';
  el.textContent = textToShow;

  const posX = Math.random() * (stage.clientWidth - 160);
  const posY = Math.random() * (stage.clientHeight - 70);
  el.style.left = `${posX}px`;
  el.style.top = `${posY}px`;

  el.addEventListener('click', () => {
    if (isCorrectType) {
      playSound('correct');
      g1Score++;
      document.getElementById('g1Score').textContent = g1Score;
      el.style.background = '#A9DFBF';

      if (g1Score >= 10) {
        endGame1(true);
      }
    } else {
      playSound('wrong');
      g1Wrong++;
      document.getElementById('g1Wrong').textContent = g1Wrong;
      el.style.background = '#FADBD8';
    }
    setTimeout(() => el.remove(), 120);
  });

  stage.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, 2200);
}

function endGame1(isSuccess) {
  clearInterval(activeTimer);
  clearInterval(g1SpawnInterval);
  if (isSuccess) {
    awardTokenAndClears(`🎯 미니게임 1(맞춤법 터치) 성공!<br>⭕ 정답: ${g1Score}개 | ❌ 오답: ${g1Wrong}개`);
  } else {
    showModal("아쉽습니다!", `30초 안에 정답 10개를 맞혀야 한글 토큰을 얻을 수 있습니다.<br>(⭕ 정답: ${g1Score}개 | ❌ 오답: ${g1Wrong}개)<br><br>다시 도전해 보세요!`);
    showScreen('lobbyScreen');
  }
}

// ==========================================================================
// ✍️ 미니게임 2: 문장 빈칸 채우기 (실시간 정답/오답 집계)
// ==========================================================================
let g2Score = 0;
let g2Wrong = 0;
let g2TimeLeft = 30;
let g2CurrentIdx = 0;
let g2QuestionsPool = [];

function startGame2() {
  g2Score = 0;
  g2Wrong = 0;
  g2TimeLeft = 30;
  g2CurrentIdx = 0;
  g2QuestionsPool = getRandomSubarray(GAME2_QUESTIONS, GAME2_QUESTIONS.length);
  showScreen('game2Screen');
  document.getElementById('g2Score').textContent = g2Score;
  document.getElementById('g2Wrong').textContent = g2Wrong;
  document.getElementById('g2Timer').textContent = g2TimeLeft;

  activeTimer = setInterval(() => {
    g2TimeLeft--;
    document.getElementById('g2Timer').textContent = g2TimeLeft;
    if (g2TimeLeft <= 0) {
      endGame2(false);
    }
  }, 1000);

  loadGame2Question();
}

function loadGame2Question() {
  const q = g2QuestionsPool[g2CurrentIdx % g2QuestionsPool.length];
  document.getElementById('g2Sentence').textContent = q.sentence;

  const optsContainer = document.getElementById('g2Options');
  optsContainer.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      if (opt === q.answer) {
        playSound('correct');
        g2Score++;
        document.getElementById('g2Score').textContent = g2Score;
        if (g2Score >= 10) {
          endGame2(true);
          return;
        }
      } else {
        playSound('wrong');
        g2Wrong++;
        document.getElementById('g2Wrong').textContent = g2Wrong;
      }
      g2CurrentIdx++;
      loadGame2Question();
    });
    optsContainer.appendChild(btn);
  });
}

function endGame2(isSuccess) {
  clearInterval(activeTimer);
  if (isSuccess) {
    awardTokenAndClears(`✍️ 미니게임 2(빈칸 채우기) 성공!<br>⭕ 정답: ${g2Score}개 | ❌ 오답: ${g2Wrong}개`);
  } else {
    showModal("아쉽습니다!", `30초 안에 정답 10개를 맞혀야 한글 토큰을 얻을 수 있습니다.<br>(⭕ 정답: ${g2Score}개 | ❌ 오답: ${g2Wrong}개)<br><br>다시 도전해 보세요!`);
    showScreen('lobbyScreen');
  }
}

// ==========================================================================
// 🔍 미니게임 3: 맞춤법 탐정 (실시간 정답/오답 집계)
// ==========================================================================
let g3Score = 0;
let g3Wrong = 0;
let g3TimeLeft = 30;
let g3CurrentIdx = 0;
let g3QuestionsPool = [];

function startGame3() {
  g3Score = 0;
  g3Wrong = 0;
  g3TimeLeft = 30;
  g3CurrentIdx = 0;
  g3QuestionsPool = getRandomSubarray(GAME3_QUESTIONS, GAME3_QUESTIONS.length);
  showScreen('game3Screen');
  document.getElementById('g3Score').textContent = g3Score;
  document.getElementById('g3Wrong').textContent = g3Wrong;
  document.getElementById('g3Timer').textContent = g3TimeLeft;

  activeTimer = setInterval(() => {
    g3TimeLeft--;
    document.getElementById('g3Timer').textContent = g3TimeLeft;
    if (g3TimeLeft <= 0) {
      endGame3(false);
    }
  }, 1000);

  loadGame3Question();
}

function loadGame3Question() {
  const q = g3QuestionsPool[g3CurrentIdx % g3QuestionsPool.length];
  const sentenceContainer = document.getElementById('g3Sentence');
  sentenceContainer.innerHTML = '';
  document.getElementById('g3CorrectionArea').style.display = 'none';

  const words = q.wrongSentence.split(' ');
  words.forEach(w => {
    const span = document.createElement('span');
    span.className = 'word-span';
    span.textContent = w;
    span.addEventListener('click', () => {
      if (w.includes(q.wrongWord)) {
        playSound('correct');
        g3Score++;
        document.getElementById('g3Score').textContent = g3Score;
        span.textContent = w.replace(q.wrongWord, q.correctWord);
        span.style.color = 'green';
        span.style.fontWeight = 'bold';

        if (g3Score >= 10) {
          setTimeout(() => endGame3(true), 350);
          return;
        }
        setTimeout(() => {
          g3CurrentIdx++;
          loadGame3Question();
        }, 550);
      } else {
        playSound('wrong');
        g3Wrong++;
        document.getElementById('g3Wrong').textContent = g3Wrong;
        span.style.color = 'red';
        setTimeout(() => span.style.color = '', 350);
      }
    });
    sentenceContainer.appendChild(span);
  });
}

function endGame3(isSuccess) {
  clearInterval(activeTimer);
  if (isSuccess) {
    awardTokenAndClears(`🔍 미니게임 3(맞춤법 탐정) 성공!<br>⭕ 정답: ${g3Score}개 | ❌ 오답: ${g3Wrong}개`);
  } else {
    showModal("아쉽습니다!", `30초 안에 정답 10개를 맞혀야 한글 토큰을 얻을 수 있습니다.<br>(⭕ 정답: ${g3Score}개 | ❌ 오답: ${g3Wrong}개)<br><br>다시 도전해 보세요!`);
    showScreen('lobbyScreen');
  }
}

function awardTokenAndClears(msg) {
  currentUser.totalClears = (currentUser.totalClears || 0) + 1;

  let newEarnedToken = null;
  for (let i = 0; i < 14; i++) {
    if (!currentUser.collectedTokens.includes(i)) {
      currentUser.collectedTokens.push(i);
      newEarnedToken = HANGUL_TOKENS[i];
      break;
    }
  }

  saveScoreToFirestore(currentUser);
  playSound('fanfare');

  let modalBody = msg + "<br><br>";
  if (newEarnedToken) {
    modalBody += `✨ 축하합니다! 훈민정음 자음 토큰 <strong>[${newEarnedToken.char}] (${newEarnedToken.name})</strong>를 새로 획득하셨습니다!`;
  } else {
    modalBody += `🎉 이미 14개 한글 토큰을 모두 수집하셨습니다! 세종대왕 보스전에 도전하세요!`;
  }

  showModal("미니게임 클리어!", modalBody);
  showScreen('lobbyScreen');
}

// ==========================================================================
// 👑 세종대왕 보스전
// ==========================================================================
let bossQIdx = 0;
let bossScore = 0;
let bossQTimer = null;
let bossQTimeLeft = 10;
let bossQuestionsPool = [];

function startBossBattle() {
  bossQIdx = 0;
  bossScore = 0;
  bossQuestionsPool = getRandomSubarray(BOSS_QUESTIONS, 10);
  showScreen('bossScreen');
  loadBossQuestion();
}

function loadBossQuestion() {
  clearInterval(bossQTimer);
  if (bossQIdx >= bossQuestionsPool.length) {
    endBossBattle();
    return;
  }

  const q = bossQuestionsPool[bossQIdx];
  document.getElementById('bossQIndex').textContent = bossQIdx + 1;
  document.getElementById('bossScore').textContent = bossScore;
  document.getElementById('bossQuestionText').textContent = q.question;

  const optsBox = document.getElementById('bossOptionsBox');
  optsBox.innerHTML = '';

  q.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'boss-opt-btn';
    btn.textContent = `${idx + 1}. ${optText}`;
    btn.addEventListener('click', () => handleBossAnswer(idx === q.answer));
    optsBox.appendChild(btn);
  });

  bossQTimeLeft = 10;
  document.getElementById('bossTimer').textContent = bossQTimeLeft;

  bossQTimer = setInterval(() => {
    bossQTimeLeft--;
    document.getElementById('bossTimer').textContent = bossQTimeLeft;
    if (bossQTimeLeft <= 0) {
      playSound('wrong');
      handleBossAnswer(false);
    }
  }, 1000);
}

function handleBossAnswer(isCorrect) {
  clearInterval(bossQTimer);
  if (isCorrect) {
    playSound('correct');
    bossScore++;
  } else {
    playSound('wrong');
  }
  bossQIdx++;
  loadBossQuestion();
}

function endBossBattle() {
  const isPerfect = (bossScore === 10);
  if (isPerfect) {
    currentUser.isMaster = true;
    saveScoreToFirestore(currentUser);
    playSound('fanfare');
    showModal("👑 보스전 최종 승리!", 
      `경축합니다! 10문제 모두 만점으로 세종대왕님과의 대결에서 승리하셨습니다!<br><br>
       명예로운 <strong>[훈민정음 마스터]</strong> 칭호를 획득하였으며, 명예의 전당에 영원히 기록됩니다!`);
  } else {
    showModal("세종대왕: 아쉽구나!", 
      `10문제 중 <strong>${bossScore}문제</strong>를 맞혔습니다.<br>
       보스전 성공을 위해서는 10문제 만점이 필요합니다. 다시 올바른 맞춤법을 연마한 후 재도전해 보아라!`);
  }
  showScreen('lobbyScreen');
}

// ==========================================================================
// 🏛️ 명예의 전당
// ==========================================================================
async function renderHallOfFame(type) {
  showScreen('hallScreen');
  const tbody = document.getElementById('leaderboardBody');
  tbody.innerHTML = '<tr><td colspan="4">명예의 전당 기록을 조회 중입니다...</td></tr>';

  document.getElementById('thMetricLabel').textContent = (type === 'tokens') ? '토큰 수' : '클리어 횟수';

  const { topTokens, topClears } = await getTop5Leaderboard();
  const targetList = (type === 'tokens') ? topTokens : topClears;

  tbody.innerHTML = '';
  if (!targetList || targetList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">아직 등록된 명예의 전당 기록이 없습니다. 차례로 도전해 보세요!</td></tr>';
    return;
  }

  targetList.forEach((user, idx) => {
    const tr = document.createElement('tr');
    const metricVal = (type === 'tokens') ? `${user.tokensCount || (user.collectedTokens ? user.collectedTokens.length : 0)}개` : `${user.totalClears || 0}회`;
    const masterBadgeHtml = user.isMaster ? `<span class="master-badge">👑 훈민정음 마스터</span>` : '';

    tr.innerHTML = `
      <td><strong>${idx + 1}위</strong></td>
      <td>${user.displayName || '익명 선비'} ${masterBadgeHtml}</td>
      <td>${metricVal}</td>
      <td>${idx === 0 ? '🥇 으뜸' : (idx === 1 ? '🥈 버금' : '🥉 으뜸이')}</td>
    `;
    tbody.appendChild(tr);
  });
}

function showModal(title, msg) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').innerHTML = msg;
  document.getElementById('modalOverlay').style.display = 'flex';
}
