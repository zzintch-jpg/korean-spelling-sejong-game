// 초등 3~4학년 맞춤법 문제 은행 데이터베이스

export const GAME1_WORDS = [
  { correct: "어이없다", wrong: "어의없다", explanation: "'어처구니가 없다'라는 뜻은 '어이없다'가 바른 표기입니다." },
  { correct: "되다", wrong: "돼다", explanation: "'되' 뒤에 어미가 붙을 때는 '되다'로 적습니다. ('하'를 넣어 자연스러우면 '되')" },
  { correct: "안 돼", wrong: "안 되", explanation: "'돼'는 '되어'의 줄임말이므로 문장 끝에서는 '안 돼'가 맞습니다." },
  { correct: "며칠", wrong: "몇 일", explanation: "날짜를 물을 때는 항상 '며칠'로 적습니다." },
  { correct: "맞히다", wrong: "맞추다", explanation: "정답을 골라 맞게 하는 것은 '맞히다'입니다." },
  { correct: "낫다", wrong: "낳다", explanation: "병이 고쳐지거나 더 우수한 것은 '낫다'입니다." },
  { correct: "부치다", wrong: "붙이다", explanation: "편지나 힘이 모자랄 때는 '부치다'를 씁니다." },
  { correct: "굳이", wrong: "구지", explanation: "구개음화 현상으로 소리는 [구지]로 나지만 표기는 '굳이'입니다." },
  { correct: "같이", wrong: "가치", explanation: "소리는 [가치]로 나지만 기본형 '같다'에 '이'가 붙어 '같이'입니다." },
  { correct: "설레다", wrong: "설레이다", explanation: "마움이 일렁이는 것은 '설레다'가 기본형입니다." },
  { correct: "오랜만에", wrong: "오랭만에", explanation: "'오랜 동안'의 뜻이 담긴 '오랜만에'가 맞습니다." },
  { correct: "어떡해", wrong: "어떻해", explanation: "'어떻게 해'의 줄임말은 '어떡해'입니다." },
  { correct: "역할", wrong: "열할", explanation: "자신이 맡은 직분은 '역할(役割)'입니다." },
  { correct: "깨끗이", wrong: "깨끗히", explanation: "'ㅅ' 받침 뒤에는 부사 파생 접미사 '이'가 붙어 '깨끗이'가 됩니다." },
  { correct: "솔직히", wrong: "솔직이", explanation: "'하'가 붙는 어간 뒤에는 '히'가 붙어 '솔직히'가 맞습니다." },
  { correct: "틀리다", wrong: "다르다", explanation: "올바르지 않은 것은 '틀리다', 서로 같지 않은 것은 '다르다'입니다." },
  { correct: "나중에", wrong: "나중애", explanation: "시간이 지난 뒤를 나타내는 조사는 '에'입니다." },
  { correct: "가벼이", wrong: "가벼히", explanation: "소리대로 '가벼이'로 표기합니다." }
];

export const GAME2_QUESTIONS = [
  {
    sentence: "신발 끈을 단단히 ( ___ ).",
    options: ["매다", "메다"],
    answer: "매다",
    explanation: "끈이나 밧줄을 묶는 것은 '매다'이고, 가방을 어깨에 거는 것은 '메다'입니다."
  },
  {
    sentence: "동생이 감기가 싹 ( ___ ).",
    options: ["낫았다", "낳았다"],
    answer: "낫았다",
    explanation: "병이 고쳐진 것은 '낫다(낫았다)', 아기를 밖으로 배출하는 것은 '낳다'입니다."
  },
  {
    sentence: "시험 정답을 모두 ( ___ ).",
    options: ["맞혔다", "맞췄다"],
    answer: "맞혔다",
    explanation: "문제의 답을 제대로 고른 것은 '맞히다(맞혔다)'입니다."
  },
  {
    sentence: "수업 시간에 딴짓을 하면 ( ___ ).",
    options: ["안 된다", "않 된다"],
    answer: "안 된다",
    explanation: "'부정'을 뜻하는 부사는 '안(아니)'입니다. ('않'은 '않다'처럼 뒤에 어미가 옴)"
  },
  {
    sentence: "너 오늘따라 얼굴이 좋아 ( ___ ).",
    options: ["보인다", "뵈인다"],
    answer: "보인다",
    explanation: "'보다'의 피동형은 '보이다'이므로 '보인다'가 바른 표기입니다."
  },
  {
    sentence: "오늘이 몇 월 ( ___ )이니?",
    options: ["며칠", "몇 일"],
    answer: "며칠",
    explanation: "'몇 일'이라는 표기는 존재하지 않으며 항상 '며칠'로 씁니다."
  },
  {
    sentence: "편지를 우체통에 ( ___ ).",
    options: ["부쳤다", "붙였다"],
    answer: "부쳤다",
    explanation: "편지를 보내는 것은 '부치다', 풀로 접착하는 것은 '붙이다'입니다."
  },
  {
    sentence: "소풍을 가기로 한 날 비가 오면 ( ___ )?",
    options: ["어떡해", "어떻게"],
    answer: "어떡해",
    explanation: "'어떻게 해'의 줄임말인 '어떡해'가 문장 끝에 쓰입니다."
  },
  {
    sentence: "친구와 방과 후에 ( ___ ) 공부를 했다.",
    options: ["같이", "가치"],
    answer: "같이",
    explanation: "함께한다는 뜻의 부사는 '같이'입니다."
  },
  {
    sentence: "선생님 말씀에 귀를 ( ___ ) 들었다.",
    options: ["기울여", "기울여서"],
    answer: "기울여",
    explanation: "기울이다의 활용형으로 자연스러운 문맥을 형성합니다."
  }
];

export const GAME3_QUESTIONS = [
  {
    wrongSentence: "내일 친구들과 약속을 해도 돼나요?",
    wrongWord: "돼나요",
    correctWord: "되나요",
    explanation: "'하나요'를 넣어보아 자연스러우므로 '되나요'가 올바른 표기입니다."
  },
  {
    wrongSentence: "선생님을 오랭만에 만나서 반갑습니다.",
    wrongWord: "오랭만에",
    correctWord: "오랜만에",
    explanation: "'오래 동안'의 뜻이 담긴 '오랜만에'가 맞습니다."
  },
  {
    wrongSentence: "쓰레기는 깨끗히 치워야 합니다.",
    wrongWord: "깨끗히",
    correctWord: "깨끗이",
    explanation: "'ㅅ' 받침 뒤에는 부사 파생 접미사 '이'가 붙어 '깨끗이'가 됩니다."
  },
  {
    wrongSentence: "그 문제는 굳지 설명하지 않아도 알아.",
    wrongWord: "굳지",
    correctWord: "굳이",
    explanation: "소리는 [구지]로 나지만 원형을 살려 '굳이'로 표기합니다."
  },
  {
    wrongSentence: "가방을 어깨에 매고 학교에 갑니다.",
    wrongWord: "매고",
    correctWord: "메고",
    explanation: "가방을 어깨에 걸치는 것은 '메고'입니다."
  },
  {
    wrongSentence: "수박을 칼로 쪼개어 나눴다.",
    wrongWord: "쪼개어",
    correctWord: "쪼개어", // valid, let's make an actual error:
    wrongWord: "부딛쳤다",
    correctWord: "부딪쳤다",
    wrongSentence: "자전거가 나무에 부딛쳤다.",
    explanation: "강하게 부딪히는 행동은 '부딪쳤다'가 바른 표기입니다."
  },
  {
    wrongSentence: "동생이 거짓말을 해서 정말 어의가 없었다.",
    wrongWord: "어의가",
    correctWord: "어이가",
    explanation: "황당함을 뜻하는 단어는 '어이없다'의 '어이'입니다."
  },
  {
    wrongSentence: "시험지를 다 풀고 정답을 맞췄다.",
    wrongWord: "맞췄다",
    correctWord: "맞혔다",
    explanation: "정답을 맞히는 것은 '맞혔다'입니다."
  }
];

export const BOSS_QUESTIONS = [
  {
    question: "1. 다음 중 바른 맞춤법 문장은 무엇인가요?",
    options: ["일이 생각대로 잘 안된다.", "일이 생각대로 잘 않된다."],
    answer: 0,
    explanation: "부정 부사 '안'이 용언 앞에서 정답입니다."
  },
  {
    question: "2. '며칠'과 '몇 일' 중 바른 표기는?",
    options: ["몇 일 동안 여행을 떠났다.", "며칠 동안 여행을 떠났다."],
    answer: 1,
    explanation: "날짜와 기간을 물을 때는 언제나 '며칠'이 바릅니다."
  },
  {
    question: "3. '선생님을 ( ___ ) 뵈러 갑니다.'의 알맞은 말은?",
    options: ["오랜만에", "오랭만에"],
    answer: 0,
    explanation: "'오랜만에'가 올바른 표기입니다."
  },
  {
    question: "4. '병이 싹 ( ___ ).' 에 들어갈 올바른 단어는?",
    options: ["낳았다", "낫았다"],
    answer: 1,
    explanation: "병이나 상처가 회복되는 것은 '낫다(낫았다)'입니다."
  },
  {
    question: "5. '어깨에 가방을 ( ___ ).' 에 들어갈 낱말은?",
    options: ["메다", "매다"],
    answer: 0,
    explanation: "어깨에 걸쳐 지는 것은 '메다'입니다."
  },
  {
    question: "6. '시험 답을 정확히 ( ___ ).' 에 알맞은 단어는?",
    options: ["맞혔다", "맞췄다"],
    answer: 0,
    explanation: "적중하거나 정답을 맞히는 것은 '맞혔다'입니다."
  },
  {
    question: "7. '정말 ( ___ ) 없는 상황이다.' 의 바른 표기는?",
    options: ["어의", "어이"],
    answer: 1,
    explanation: "'어이없다'가 정답입니다. ('어의'는 조선시대 임금의 의사)"
  },
  {
    question: "8. '우표를 편지에 ( ___ ).' 에 알맞은 표현은?",
    options: ["붙이다", "부치다"],
    answer: 0,
    explanation: "물건을 접착하는 것은 '붙이다'입니다."
  },
  {
    question: "9. '그렇다면 이제 어떻게 ( ___ )?' 에 알맞은 말은?",
    options: ["어떡해", "어떻게"],
    answer: 0,
    explanation: "문장 끝에서 서술어로 쓰일 때는 '어떡해'입니다."
  },
  {
    question: "10. '방을 ( ___ ) 청소하자.' 에 들어갈 부사는?",
    options: ["깨끗히", "깨끗이"],
    answer: 1,
    explanation: "'ㅅ' 받침 뒤에는 '이'가 붙어 '깨끗이'가 됩니다."
  }
];
