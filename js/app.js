// ==========================================================================
// 훈민정음 맞춤법 수호대 - 100% 단일 자립형 풍부한 리얼타임 효과음 엔진 (v3.1.0)
// 모바일/데스크톱 100% 오디오 자동 언락 및 버튼/정답/오답/팡파르 효과음 연동
// ==========================================================================

(function() {
  'use strict';

  // 1. 자음 토큰 데이터
  const HANGUL_TOKENS = [
    { id: 0, char: 'ㄱ', name: '기역', desc: '훈민정음 어금니소리 토큰' },
    { id: 1, char: 'ㄴ', name: '니은', desc: '훈민정음 혀소리 토큰' },
    { id: 2, char: 'ㄷ', name: '디귿', desc: '훈민정음 단단한 혀소리 토큰' },
    { id: 3, char: 'ㄹ', name: '리을', desc: '훈민정음 반혀소리 토큰' },
    { id: 4, char: 'ㅁ', name: '미음', desc: '훈민정음 입술소리 토큰' }
  ];

  function isBossUnlocked(collectedTokens) {
    return collectedTokens && collectedTokens.length >= 5;
  }

  // 2. 대용량 맞춤법 데이터베이스
  const GAME1_WORDS = [
    { correct: "어이없다", wrong: "어의없다" },
    { correct: "며칠", wrong: "몇 일" },
    { correct: "굳이", wrong: "구지" },
    { correct: "설레다", wrong: "설레이다" },
    { correct: "설렘", wrong: "설레임" },
    { correct: "오랜만에", wrong: "오랭만에" },
    { correct: "어떡해", wrong: "어떻해" },
    { correct: "역할", wrong: "열할" },
    { correct: "깨끗이", wrong: "깨끗히" },
    { correct: "솔직히", wrong: "솔직이" },
    { correct: "금세", wrong: "금새" },
    { correct: "곰곰이", wrong: "곰곰히" },
    { correct: "일찍이", wrong: "일찍히" },
    { correct: "웬일", wrong: "왠일" },
    { correct: "왠지", wrong: "웬지" },
    { correct: "바람", wrong: "바램" },
    { correct: "할게", wrong: "할께" },
    { correct: "줄게", wrong: "줄께" },
    { correct: "갈게", wrong: "갈께" },
    { correct: "할는지", wrong: "할런지" },
    { correct: "다행히", wrong: "다행이" },
    { correct: "더욱이", wrong: "더욱히" },
    { correct: "오뚝이", wrong: "오뚜기" },
    { correct: "떡볶이", wrong: "떡복이" },
    { correct: "찌개", wrong: "찌게" },
    { correct: "육개장", wrong: "육계장" },
    { correct: "희한하다", wrong: "희안하다" },
    { correct: "나지막이", wrong: "나지막히" },
    { correct: "지그시", wrong: "지긋이" },
    { correct: "서슴지", wrong: "서슴치" },
    { correct: "생각건대", wrong: "생각컨대" },
    { correct: "흐리멍덩하다", wrong: "흐리멍텅하다" },
    { correct: "만반의", wrong: "만발의" },
    { correct: "자물쇠", wrong: "자물쇄" },
    { correct: "요컨대", wrong: "요건대" },
    { correct: "넓적하다", wrong: "넙적하다" },
    { correct: "깍두기", wrong: "깍뚜기" },
    { correct: "어이쿠", wrong: "어의쿠" },
    { correct: "주꾸미", wrong: "쭈꾸미" },
    { correct: "아귀찜", wrong: "아구찜" },
    { correct: "설거지", wrong: "설겆이" },
    { correct: "묏자리", wrong: "믯자리" },
    { correct: "안절부절못하다", wrong: "안절부절하다" },
    { correct: "되찾다", wrong: "돼찾다" },
    { correct: "짓궂다", wrong: "짓굳다" },
    { correct: "삼가다", wrong: "삼가하다" },
    { correct: "건건이", wrong: "건건히" },
    { correct: "단단히", wrong: "단단이" },
    { correct: "알맞은", wrong: "알맞는" },
    { correct: "걸맞은", wrong: "걸맞는" },
    { correct: "핼쑥하다", wrong: "해쑥하다" },
    { correct: "흐릿하다", wrong: "흐리타다" },
    { correct: "넓적다리", wrong: "넙적다리" },
    { correct: "연거푸", wrong: "연거프" },
    { correct: "일찌감치", wrong: "일찌감치" },
    { correct: "간단히", wrong: "간단이" },
    { correct: "꼼꼼히", wrong: "꼼꼼이" },
    { correct: "틈틈이", wrong: "틈틈히" },
    { correct: "영원히", wrong: "영원이" },
    { correct: "조용히", wrong: "조용이" }
  ];

  const GAME2_QUESTIONS = [
    { sentence: "신발 끈을 단단히 ( ___ ).", options: ["매다", "메다"], answer: "매다", explanation: "끈을 묶는 것은 '매다'입니다." },
    { sentence: "가방을 어깨에 ( ___ ) 학교에 갔다.", options: ["메고", "매고"], answer: "메고", explanation: "어깨에 지는 것은 '메다'입니다." },
    { sentence: "감기가 싹 ( ___ ) 다행이다.", options: ["나았다", "낳았다"], answer: "나았다", explanation: "병이 치유된 것은 '낫다'의 활용형 '나았다'입니다." },
    { sentence: "동물원에서 아기 사자를 ( ___ ).", options: ["낳았다", "나았다"], answer: "낳았다", explanation: "출산하는 것은 '낳다'입니다." },
    { sentence: "선생님께서 정답을 ( ___ ) 아이들이 기뻐했다.", options: ["맞히시자", "맞추시자"], answer: "맞히시자", explanation: "정답을 맞게 하는 것은 '맞히다'입니다." },
    { sentence: "친구와 마주 보고 답안지를 ( ___ ).", options: ["맞추었다", "맞히었다"], answer: "맞추었다", explanation: "서로 대조해보는 것은 '맞추다'입니다." },
    { sentence: "수업 시간에 딴짓을 하면 ( ___ ).", options: ["안 된다", "않 된다"], answer: "안 된다", explanation: "부정 부사 '안'이 맞습니다." },
    { sentence: "나는 거짓말을 하지 ( ___ ).", options: ["않는다", "안는다"], answer: "않는다", explanation: "보조용언 '않다'가 맞습니다." },
    { sentence: "오늘이 몇 월 ( ___ )이니?", options: ["며칠", "몇 일"], answer: "며칠", explanation: "날짜 표기는 항상 '며칠'입니다." },
    { sentence: "우표를 편지봉투에 ( ___ ).", options: ["붙였다", "부쳤다"], answer: "붙였다", explanation: "접착하는 것은 '붙이다'입니다." },
    { sentence: "우체국에 가서 편지를 ( ___ ).", options: ["부쳤다", "붙였다"], answer: "부쳤다", explanation: "발송하는 것은 '부치다'입니다." },
    { sentence: "소풍날 비가 오면 ( ___ )?", options: ["어떡해", "어떻게"], answer: "어떡해", explanation: "문장 끝 서술어는 '어떡해'입니다." },
    { sentence: "이 문제를 ( ___ ) 풀어야 할까?", options: ["어떻게", "어떡해"], answer: "어떻게", explanation: "방식을 묻는 부사는 '어떻게'입니다." },
    { sentence: "친구와 방과 후에 ( ___ ) 공부를 했다.", options: ["같이", "가치"], answer: "같이", explanation: "함께한다는 부사는 '같이'입니다." },
    { sentence: "숙제를 ( ___ ) 마쳤다.", options: ["금세", "금새"], answer: "금세", explanation: "'금시에'의 줄임말은 '금세'입니다." },
    { sentence: "선생님께서 한글을 ( ___ ) 주셨다.", options: ["가르쳐", "가리켜"], answer: "가르쳐", explanation: "지식을 전달하는 것은 '가르치다'입니다." },
    { sentence: "손가락으로 동쪽을 ( ___ ) 있었다.", options: ["가리키고", "가르치고"], answer: "가리키고", explanation: "방향을 지목하는 것은 '가리키다'입니다." },
    { sentence: "오늘따라 ( ___ ) 기분이 상쾌하다.", options: ["왠지", "웬지"], answer: "왠지", explanation: "'왜 그런지 모르게'는 '왠지'입니다." },
    { sentence: "네가 이 시간에 ( ___ ) 일이니?", options: ["웬", "왠"], answer: "웬", explanation: "'어찌 된'을 뜻하는 수식어는 '웬'입니다." },
    { sentence: "내일도 반드시 약속을 ( ___ ).", options: ["지킬게", "지킬께"], answer: "지킬게", explanation: "어미 '-ㄹ게'는 예사소리로 표기합니다." }
  ];

  const GAME3_QUESTIONS = [
    { wrongSentence: "내일 친구들과 약속을 해도 돼나요?", wrongWord: "돼나요", correctWord: "되나요", explanation: "'되나요'가 올바른 표기입니다." },
    { wrongSentence: "선생님을 오랭만에 만나서 반갑습니다.", wrongWord: "오랭만에", correctWord: "오랜만에", explanation: "'오랜만에'가 맞습니다." },
    { wrongSentence: "쓰레기는 깨끗히 치워야 합니다.", wrongWord: "깨끗히", correctWord: "깨끗이", explanation: "'깨끗이'가 바른 부사 표기입니다." },
    { wrongSentence: "그 문제는 굳지 설명하지 않아도 알아.", wrongWord: "굳지", correctWord: "굳이", explanation: "'굳이'로 원형 표기를 살립니다." },
    { wrongSentence: "가방을 어깨에 매고 학교에 갑니다.", wrongWord: "매고", correctWord: "메고", explanation: "어깨에 걸치는 것은 '메고'입니다." },
    { wrongSentence: "동생이 거짓말을 해서 정말 어의가 없었다.", wrongWord: "어의가", correctWord: "어이가", explanation: "'어이가' 없을 때 쓰는 말입니다." },
    { wrongSentence: "시험지를 다 풀고 정답을 맞췄다.", wrongWord: "맞췄다", correctWord: "맞혔다", explanation: "정답은 '맞혔다'입니다." },
    { wrongSentence: "오늘이 몇 월 몇일인지 기억나니?", wrongWord: "몇일인지", correctWord: "며칠인지", explanation: "항상 '며칠'로 적습니다." },
    { wrongSentence: "소풍날 비가 오면 어떻해?", wrongWord: "어떻해", correctWord: "어떡해", explanation: "서술어로 쓸 땐 '어떡해'입니다." },
    { wrongSentence: "청소를 다 마치니 금새 날이 어두워졌다.", wrongWord: "금새", correctWord: "금세", explanation: "'금세'가 바른 표기입니다." },
    { wrongSentence: "너 오늘따라 웬지 기분이 좋아 보인다.", wrongWord: "웬지", correctWord: "왠지", explanation: "'왜 그런지'는 '왠지'입니다." },
    { wrongSentence: "너 이 시간에 왠 일이니?", wrongWord: "왠", correctWord: "웬", explanation: "'어찌 된'의 뜻은 '웬'입니다." },
    { wrongSentence: "동생의 감기가 싹 낳았다.", wrongWord: "낳았다", correctWord: "나았다", explanation: "병 회복은 '나았다'가 맞습니다." },
    { wrongSentence: "강아지가 새끼를 낫았다.", wrongWord: "낫았다", correctWord: "낳았다", explanation: "출산은 '낳았다'가 맞습니다." }
  ];

  const BOSS_QUESTIONS = [
    { question: "1. 다음 중 바른 맞춤법 문장은 무엇인가요?", options: ["일이 생각대로 잘 안된다.", "일이 생각대로 잘 않된다."], answer: 0, explanation: "부정 부사 '안'이 맞습니다." },
    { question: "2. '며칠'과 '몇 일' 중 바른 표기는?", options: ["몇 일 동안 여행을 떠났다.", "며칠 동안 여행을 떠났다."], answer: 1, explanation: "날짜와 기간은 항상 '며칠'입니다." },
    { question: "3. '선생님을 ( ___ ) 뵈러 갑니다.'의 알맞은 말은?", options: ["오랜만에", "오랭만에"], answer: 0, explanation: "'오랜만에'가 올바른 표기입니다." },
    { question: "4. '병이 싹 ( ___ ).' 에 들어갈 올바른 단어는?", options: ["낳았다", "나았다"], answer: 1, explanation: "병 회복은 '낫다'의 활용형 '나았다'입니다." },
    { question: "5. '어깨에 가방을 ( ___ ).' 에 들어갈 낱말은?", options: ["메다", "매다"], answer: 0, explanation: "어깨에 지는 것은 '메다'입니다." },
    { question: "6. '시험 답을 정확히 ( ___ ).' 에 알맞은 단어는?", options: ["맞혔다", "맞췄다"], answer: 0, explanation: "정답을 적중시키는 것은 '맞혔다'입니다." },
    { question: "7. '정말 ( ___ ) 없는 상황이다.' 의 바른 표기는?", options: ["어의", "어이"], answer: 1, explanation: "'어이없다'가 정답입니다." },
    { question: "8. '우표를 편지에 ( ___ ).' 에 알맞은 표현은?", options: ["붙이다", "부치다"], answer: 0, explanation: "물건을 접착하는 것은 '붙이다'입니다." },
    { question: "9. '그렇다면 이제 어떻게 ( ___ )?' 에 알맞은 말은?", options: ["어떡해", "어떻게"], answer: 0, explanation: "문장 끝 서술어는 '어떡해'입니다." },
    { question: "10. '훈민정음 28글자를 창제하신 임금님은?", options: ["세종대왕님", "이순신장군님"], answer: 0, explanation: "훈민정음은 세종대왕님께서 1443년 창제하셨습니다." }
  ];

  function getRandomSubarray(arr, size) {
    const shuffled = arr.slice();
    let i = arr.length;
    let temp, index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }

  // 3. 🔊 고품질 Web Audio 효과음 합성 엔진 (버튼 클릭 / 정답 / 오답 / 팡파르)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function unlockAudio() {
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch (e) {}
  }
  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);

  function playSound(type) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'click') {
        // 경쾌한 통통 버튼 클릭음 (Pop Sound)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'correct') {
        // 맑고 상쾌한 딩동 정답 효과음 (C5 -> G5)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc1.start(now);
        osc1.stop(now + 0.15);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(783.99, now + 0.1); // G5
        gain2.gain.setValueAtTime(0.35, now + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.3);
      } else if (type === 'wrong') {
        // 삐빅 오답음 (F3 -> Db3)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(130, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'fanfare') {
        // 승리 팡파르 (C5 -> E5 -> G5 -> C6 -> E6)
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, now + idx * 0.1);
          g.gain.setValueAtTime(0.3, now + idx * 0.1);
          g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.35);
          o.start(now + idx * 0.1);
          o.stop(now + idx * 0.1 + 0.35);
        });
      }
    } catch (e) {}
  }

  // 4. 유저 상태 관리
  let currentUser = {
    uid: '',
    displayName: '',
    collectedTokens: [],
    totalClears: 0,
    isMaster: false
  };

  let activeTimer = null;
  let currentScreen = 'loginScreen';

  function sanitizeProfile() {
    if (!currentUser.uid) currentUser.uid = 'guest_' + Math.random().toString(36).substr(2, 6);
    if (!currentUser.displayName) currentUser.displayName = '한글도전자';
    if (!Array.isArray(currentUser.collectedTokens)) currentUser.collectedTokens = [];
    if (typeof currentUser.totalClears !== 'number') currentUser.totalClears = 0;
    if (typeof currentUser.isMaster !== 'boolean') currentUser.isMaster = false;
  }

  function saveLocalProfile() {
    try {
      localStorage.setItem(`sejong_user_${currentUser.uid}`, JSON.stringify(currentUser));
    } catch (e) {}
  }

  function loadUserIsolatedProfile(uid) {
    try {
      const saved = localStorage.getItem(`sejong_user_${uid}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        currentUser = Object.assign({}, currentUser, parsed);
      }
    } catch (e) {}
    sanitizeProfile();
  }

  function handleUserLoggedIn(user) {
    playSound('click');
    try {
      const nickInput = document.getElementById('nicknameInput');
      const inputNick = nickInput ? nickInput.value.trim() : '';
      currentUser.uid = user.uid;
      currentUser.displayName = inputNick || user.displayName || '한글도전자';

      loadUserIsolatedProfile(user.uid);
      if (inputNick) {
        currentUser.displayName = inputNick;
      }
      sanitizeProfile();
      saveLocalProfile();

      const userBar = document.getElementById('userBar');
      if (userBar) userBar.style.display = 'flex';
      showScreen('lobbyScreen');
    } catch (err) {
      sanitizeProfile();
      showScreen('lobbyScreen');
    }
  }

  // 5. 전역 안전 로그인 핸들러 노출
  window.startGuestLogin = function() {
    playSound('click');
    const nickInput = document.getElementById('nicknameInput');
    const nick = nickInput ? nickInput.value.trim() : '한글도전자';
    const guestId = Math.random().toString(36).substr(2, 6);
    const user = { uid: `guest_${guestId}`, displayName: nick || '한글도전자' };
    handleUserLoggedIn(user);
  };

  window.startGoogleLogin = function() {
    playSound('click');
    const nickInput = document.getElementById('nicknameInput');
    const nick = nickInput ? nickInput.value.trim() : '한글도전자';
    const guestId = Math.random().toString(36).substr(2, 6);
    const user = { uid: `google_${guestId}`, displayName: nick || '구글도전자' };
    handleUserLoggedIn(user);
  };

  function updateUI() {
    sanitizeProfile();

    const nameEl = document.getElementById('userDisplayName');
    if (nameEl) nameEl.textContent = currentUser.displayName || '도전자';

    const countEl = document.getElementById('tokenCount');
    if (countEl) countEl.textContent = currentUser.collectedTokens.length;

    const panelCountEl = document.getElementById('tokenPanelCount');
    if (panelCountEl) panelCountEl.textContent = currentUser.collectedTokens.length;

    const tokenGrid = document.getElementById('tokenGrid');
    if (tokenGrid) {
      tokenGrid.innerHTML = '';
      HANGUL_TOKENS.forEach(t => {
        const div = document.createElement('div');
        const isCollected = currentUser.collectedTokens.indexOf(t.id) !== -1;
        div.className = `token-item ${isCollected ? 'collected' : ''}`;
        div.textContent = t.char;
        div.title = `${t.name}: ${t.desc} (${isCollected ? '수집됨' : '미수집'})`;
        tokenGrid.appendChild(div);
      });
    }

    const bossBtn = document.getElementById('btnBossBattle');
    const bossLockText = document.getElementById('bossLockText');
    if (bossBtn && bossLockText) {
      if (isBossUnlocked(currentUser.collectedTokens)) {
        bossBtn.classList.remove('locked');
        bossLockText.textContent = "🔥 5개 자음 토큰(ㄱ,ㄴ,ㄷ,ㄹ,ㅁ) 수집 완료! 세종대왕 보스전 도전 가능!";
      } else {
        bossBtn.classList.add('locked');
        bossLockText.textContent = `5개 한글 토큰(ㄱ,ㄴ,ㄷ,ㄹ,ㅁ)을 모아 세종대왕과의 10문제 최종 결투에 도전하세요! (${currentUser.collectedTokens.length}/5)`;
      }
    }
  }

  function showScreen(screenId) {
    clearInterval(activeTimer);
    const screens = document.querySelectorAll('.screen');
    for (let i = 0; i < screens.length; i++) {
      screens[i].classList.remove('active');
    }
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      currentScreen = screenId;
    }
    updateUI();
  }

  // 6. 미니게임 1
  let g1Score = 0;
  let g1Wrong = 0;
  let g1TimeLeft = 30;
  let g1SpawnInterval = null;
  let g1ActiveWordsPool = [];

  function startGame1() {
    playSound('click');
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
    g1SpawnInterval = setInterval(spawnFloatingWord, 650);
  }

  function spawnFloatingWord() {
    if (currentScreen !== 'game1Screen') {
      clearInterval(g1SpawnInterval);
      return;
    }
    const stage = document.getElementById('g1Stage');
    const wordObj = g1ActiveWordsPool[Math.floor(Math.random() * g1ActiveWordsPool.length)];
    
    const isCorrectType = Math.random() < 0.80;
    const textToShow = isCorrectType ? wordObj.correct : wordObj.wrong;

    const el = document.createElement('div');
    el.className = 'floating-word';
    el.textContent = textToShow;

    stage.appendChild(el);
    const elWidth = el.offsetWidth || 280;
    const elHeight = el.offsetHeight || 90;

    const maxLeft = Math.max(15, stage.clientWidth - elWidth - 25);
    const maxTop = Math.max(15, stage.clientHeight - elHeight - 25);

    const posX = Math.floor(Math.random() * maxLeft) + 12;
    const posY = Math.floor(Math.random() * maxTop) + 12;

    el.style.left = `${posX}px`;
    el.style.top = `${posY}px`;

    el.addEventListener('click', () => {
      if (isCorrectType) {
        playSound('correct');
        g1Score++;
        document.getElementById('g1Score').textContent = g1Score;
        el.style.background = '#C8E6C9';
        el.style.borderColor = '#2E7D32';

        if (g1Score >= 10) {
          endGame1(true);
        }
      } else {
        playSound('wrong');
        g1Wrong++;
        document.getElementById('g1Wrong').textContent = g1Wrong;
        el.style.background = '#FFCDD2';
        el.style.borderColor = '#C62828';
      }
      setTimeout(() => { if (el.parentNode) el.remove(); }, 120);
    });

    setTimeout(() => { if (el.parentNode) el.remove(); }, 2800);
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

  // 7. 미니게임 2
  let g2Score = 0;
  let g2Wrong = 0;
  let g2TimeLeft = 30;
  let g2CurrentIdx = 0;
  let g2QuestionsPool = [];

  function startGame2() {
    playSound('click');
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

  // 8. 미니게임 3
  let g3Score = 0;
  let g3Wrong = 0;
  let g3TimeLeft = 30;
  let g3CurrentIdx = 0;
  let g3QuestionsPool = [];

  function cleanHangul(str) {
    return str ? str.replace(/[^가-힣]/g, '') : '';
  }

  function startGame3() {
    playSound('click');
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

    const words = q.wrongSentence.split(' ');
    words.forEach(w => {
      const span = document.createElement('span');
      span.className = 'word-span';
      span.textContent = w;

      span.addEventListener('click', () => {
        const clickedHangul = cleanHangul(w);
        const targetHangul = cleanHangul(q.wrongWord);

        if (clickedHangul && targetHangul && (clickedHangul === targetHangul || clickedHangul.indexOf(targetHangul) !== -1 || targetHangul.indexOf(clickedHangul) !== -1)) {
          playSound('correct');
          g3Score++;
          document.getElementById('g3Score').textContent = g3Score;

          const rawWrong = cleanHangul(q.wrongWord);
          const rawCorrect = cleanHangul(q.correctWord);
          span.textContent = w.replace(rawWrong, rawCorrect);
          span.style.color = '#2E7D32';
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
          span.style.color = '#C62828';
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
    for (let i = 0; i < 5; i++) {
      if (currentUser.collectedTokens.indexOf(i) === -1) {
        currentUser.collectedTokens.push(i);
        newEarnedToken = HANGUL_TOKENS[i];
        break;
      }
    }

    saveLocalProfile();
    playSound('fanfare');

    let modalBody = msg + "<br><br>";
    if (newEarnedToken) {
      modalBody += `✨ 축하합니다! 훈민정음 자음 토큰 <strong>[${newEarnedToken.char}] (${newEarnedToken.name})</strong>를 새로 획득하셨습니다!`;
    } else {
      modalBody += `🎉 이미 5개 한글 토큰(ㄱ,ㄴ,ㄷ,ㄹ,ㅁ)을 모두 수집하셨습니다! 세종대왕 보스전에 도전하세요!`;
    }

    showModal("미니게임 클리어!", modalBody);
    showScreen('lobbyScreen');
  }

  // 9. 보스전
  let bossQIdx = 0;
  let bossScore = 0;
  let bossQTimer = null;
  let bossQTimeLeft = 10;
  let bossQuestionsPool = [];

  function startBossBattle() {
    playSound('click');
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
      saveLocalProfile();
      playSound('fanfare');
      showModal("👑 보스전 최종 승리!", 
        `경축합니다! 10문제 모두 만점으로 세종대왕님과의 대결에서 승리하셨습니다!<br><br>
         명예로운 <strong>[훈민정음 마스터]</strong> 칭호를 획득하였으며, 명예의 전당에 영원히 기록됩니다!`);
    } else {
      playSound('wrong');
      showModal("세종대왕: 아쉽구나!", 
        `10문제 중 <strong>${bossScore}문제</strong>를 맞혔습니다.<br>
         보스전 성공을 위해서는 10문제 만점이 필요합니다. 다시 올바른 맞춤법을 연마한 후 재도전해 보아라!`);
    }
    showScreen('lobbyScreen');
  }

  // 10. 명예의 전당
  function renderHallOfFame(type) {
    playSound('click');
    showScreen('hallScreen');
    const tbody = document.getElementById('leaderboardBody');
    if (tbody) tbody.innerHTML = '';

    const labelEl = document.getElementById('thMetricLabel');
    if (labelEl) labelEl.textContent = (type === 'tokens') ? '토큰 수' : '클리어 횟수';

    const localUsers = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.indexOf("sejong_user_") === 0) {
          try {
            const item = JSON.parse(localStorage.getItem(key));
            if (item && item.uid) localUsers.push(item);
          } catch (e) {}
        }
      }
    } catch (e) {}

    const targetList = (type === 'tokens') 
      ? localUsers.sort((a, b) => ((b.collectedTokens ? b.collectedTokens.length : 0) - (a.collectedTokens ? a.collectedTokens.length : 0))).slice(0, 5)
      : localUsers.sort((a, b) => ((b.totalClears || 0) - (a.totalClears || 0))).slice(0, 5);

    if (tbody) {
      if (targetList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">도전자님께서 첫 게임을 완료하고 명예의 전당 1위에 도전해보세요!</td></tr>';
        return;
      }

      targetList.forEach((user, idx) => {
        const tr = document.createElement('tr');
        const metricVal = (type === 'tokens') ? `${user.collectedTokens ? user.collectedTokens.length : 0}개` : `${user.totalClears || 0}회`;
        const masterBadgeHtml = user.isMaster ? `<span class="master-badge">👑 훈민정음 마스터</span>` : '';

        tr.innerHTML = `
          <td><strong>${idx + 1}위</strong></td>
          <td>${user.displayName || '익명 도전자'} ${masterBadgeHtml}</td>
          <td>${metricVal}</td>
          <td>${idx === 0 ? '🥇 으뜸' : (idx === 1 ? '🥈 버금' : '🥉 으뜸이')}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  function showModal(title, msg) {
    const tEl = document.getElementById('modalTitle');
    if (tEl) tEl.textContent = title;
    const mEl = document.getElementById('modalMessage');
    if (mEl) mEl.innerHTML = msg;
    const modal = document.getElementById('modalOverlay');
    if (modal) modal.style.display = 'flex';
  }

  // 11. 이벤트 연결
  function initUIEventListeners() {
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
      btnLogout.onclick = function() {
        playSound('click');
        currentUser = {
          uid: '',
          displayName: '',
          collectedTokens: [],
          totalClears: 0,
          isMaster: false
        };
        const userBar = document.getElementById('userBar');
        if (userBar) userBar.style.display = 'none';
        showScreen('loginScreen');
      };
    }

    const btnAnon = document.getElementById('btnAnonLogin');
    if (btnAnon) {
      btnAnon.onclick = window.startGuestLogin;
    }

    const btnGoogle = document.getElementById('btnGoogleLogin');
    if (btnGoogle) {
      btnGoogle.onclick = window.startGoogleLogin;
    }

    const backBtns = document.querySelectorAll('.btn-back-lobby');
    for (let i = 0; i < backBtns.length; i++) {
      backBtns[i].onclick = function() {
        playSound('click');
        showScreen('lobbyScreen');
      };
    }

    const b1 = document.getElementById('btnGame1');
    if (b1) b1.onclick = function() { startGame1(); };

    const b2 = document.getElementById('btnGame2');
    if (b2) b2.onclick = function() { startGame2(); };

    const b3 = document.getElementById('btnGame3');
    if (b3) b3.onclick = function() { startGame3(); };

    const bossB = document.getElementById('btnBossBattle');
    if (bossB) {
      bossB.onclick = function() {
        playSound('click');
        if (!isBossUnlocked(currentUser.collectedTokens)) {
          showModal("보스전 잠김 👑", "5개 한글 자음 토큰(`ㄱ,ㄴ,ㄷ,ㄹ,ㅁ`)을 모두 모아야 세종대왕에게 도전할 수 있습니다!");
          return;
        }
        startBossBattle();
      };
    }

    const hallB = document.getElementById('btnHallOfFame');
    if (hallB) hallB.onclick = function() { renderHallOfFame('tokens'); };

    const tabT = document.getElementById('tabTokens');
    if (tabT) {
      tabT.onclick = function(e) {
        playSound('click');
        const tabs = document.querySelectorAll('.tab-btn');
        for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
        e.target.classList.add('active');
        renderHallOfFame('tokens');
      };
    }

    const tabC = document.getElementById('tabClears');
    if (tabC) {
      tabC.onclick = function(e) {
        playSound('click');
        const tabs = document.querySelectorAll('.tab-btn');
        for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
        e.target.classList.add('active');
        renderHallOfFame('clears');
      };
    }

    const modalC = document.getElementById('modalBtnClose');
    if (modalC) {
      modalC.onclick = function() {
        playSound('click');
        const modal = document.getElementById('modalOverlay');
        if (modal) modal.style.display = 'none';
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUIEventListeners);
  } else {
    initUIEventListeners();
  }
})();
