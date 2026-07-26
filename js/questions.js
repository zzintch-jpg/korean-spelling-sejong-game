// 초등 3~4학년 맞춤법 대용량 데이터베이스 (100개 이상 문항)

export const GAME1_WORDS = [
  { correct: "어이없다", wrong: "어의없다", explanation: "'어처구니가 없다'는 '어이없다'가 맞습니다." },
  { correct: "되다", wrong: "돼다", explanation: "'되' 뒤에 어미가 붙을 때는 '되다'입니다." },
  { correct: "안 돼", wrong: "안 되", explanation: "문장 끝에는 '안 돼'가 맞습니다." },
  { correct: "며칠", wrong: "몇 일", explanation: "날짜를 나타낼 때는 항상 '며칠'입니다." },
  { correct: "맞히다", wrong: "맞추다", explanation: "정답을 맞히는 것은 '맞히다'입니다." },
  { correct: "낫다", wrong: "낳다", explanation: "병이 회복되는 것은 '낫다'입니다." },
  { correct: "부치다", wrong: "붙이다", explanation: "편지를 보내는 것은 '부치다'입니다." },
  { correct: "굳이", wrong: "구지", explanation: "소리는 [구지]지만 표기는 '굳이'입니다." },
  { correct: "같이", wrong: "가치", explanation: "함께한다는 뜻은 '같이'입니다." },
  { correct: "설레다", wrong: "설레이다", explanation: "기본형은 '설레다'입니다." },
  { correct: "오랜만에", wrong: "오랭만에", explanation: "'오래 동안'의 뜻은 '오랜만에'입니다." },
  { correct: "어떡해", wrong: "어떻해", explanation: "'어떻게 해'의 줄임말은 '어떡해'입니다." },
  { correct: "역할", wrong: "열할", explanation: "맡은 직분은 '역할'입니다." },
  { correct: "깨끗이", wrong: "깨끗히", explanation: "'ㅅ' 받침 뒤에는 '이'가 붙어 '깨끗이'입니다." },
  { correct: "솔직히", wrong: "솔직이", explanation: "'하'가 붙는 어간 뒤에는 '히'가 붙습니다." },
  { correct: "금세", wrong: "금새", explanation: "'금시에'가 줄어든 말은 '금세'입니다." },
  { correct: "가르치다", wrong: "가리키다", explanation: "지식을 전달하는 것은 '가르치다'입니다." },
  { correct: "가리키다", wrong: "가르치다", explanation: "손가락으로 방향을 목적인 것은 '가리키다'입니다." },
  { correct: "잃어버리다", wrong: "잊어버리다", explanation: "물건을 분실한 것은 '잃어버리다'입니다." },
  { correct: "잊어버리다", wrong: "잃어버리다", explanation: "기억을 놓친 것은 '잊어버리다'입니다." },
  { correct: "매다", wrong: "메다", explanation: "끈을 묶는 것은 '매다'입니다." },
  { correct: "메다", wrong: "매다", explanation: "어깨에 지는 것은 '메다'입니다." },
  { correct: "곰곰이", wrong: "곰곰히", explanation: "부사 파생 접미사는 '곰곰이'입니다." },
  { correct: "일찍이", wrong: "일찍히", explanation: "부사 '일찍이'가 맞는 표기입니다." },
  { correct: "웬일", wrong: "왠일", explanation: "'어찌 된 일'은 '웬일'입니다." },
  { correct: "왠지", wrong: "웬지", explanation: "'왜 그런지 모르게'는 '왠지'입니다." },
  { correct: "바람", wrong: "바램", explanation: "소망을 뜻하는 명사는 '바람'입니다." },
  { correct: "할게", wrong: "할께", explanation: "어미 '-ㄹ게'는 예사소리로 적습니다." },
  { correct: "줄게", wrong: "줄께", explanation: "어미 '-ㄹ게'는 소리는 된소리가 나도 예사소리로 표기합니다." },
  { correct: "할는지", wrong: "할런지", explanation: "어미 '-ㄹ는지'가 바른 표기입니다." },
  { correct: "다행히", wrong: "다행이", explanation: "'다행히'가 올바른 부사 표기입니다." },
  { correct: "더욱이", wrong: "더욱히", explanation: "소리대로 '더욱이'로 적습니다." },
  { correct: "오뚝이", wrong: "오뚜기", explanation: "원형을 밝혀 '오뚝이'로 적습니다." },
  { correct: "떡볶이", wrong: "떡복이", explanation: "볶아서 만든 음식은 '떡볶이'입니다." },
  { correct: "어이없다", wrong: "어의없다", explanation: "황당한 상황은 '어이없다'입니다." }
];

export const GAME2_QUESTIONS = [
  { sentence: "신발 끈을 단단히 ( ___ ).", options: ["매다", "메다"], answer: "매다", explanation: "끈을 묶는 것은 '매다'입니다." },
  { sentence: "가방을 어깨에 ( ___ ) 학교에 갔다.", options: ["메고", "매고"], answer: "메고", explanation: "어깨에 지는 것은 '메다'입니다." },
  { sentence: "감기가 싹 ( ___ ) 다행이다.", options: ["낫았다", "낳았다"], answer: "낫았다", explanation: "병이 치유된 것은 '낫다'입니다." },
  { sentence: "동물원에서 아기 사자를 ( ___ ).", options: ["낳았다", "낫았다"], answer: "낳았다", explanation: "출산하는 것은 '낳다'입니다." },
  { sentence: "선생님께서 정답을 ( ___ ) 아이들이 기뻐했다.", options: ["맞히시자", "맞추시자"], answer: "맞히시자", explanation: "정답을 맞게 하는 것은 '맞히다'입니다." },
  { sentence: "친구와 마주 보고 답안지를 ( ___ ).", options: ["맞추었다", "맞히었다"], answer: "맞추었다", explanation: "서로 대조해보는 것은 '맞추다'입니다." },
  { sentence: "수업 시간에 딴짓을 하면 ( ___ ).", options: ["안 된다", "않 된다"], answer: "안 된다", explanation: "부정 부사 '안'이 용언 앞을 수식합니다." },
  { sentence: "나는 거짓말을 하지 ( ___ ).", options: ["않는다", "안는다"], answer: "않는다", explanation: "보조용언 '않다'가 맞습니다." },
  { sentence: "너 오늘따라 기분이 좋아 ( ___ ).", options: ["보인다", "뵈인다"], answer: "보인다", explanation: "'보이다'의 활용형은 '보인다'입니다." },
  { sentence: "오늘이 몇 월 ( ___ )이니?", options: ["며칠", "몇 일"], answer: "며칠", explanation: "날짜 표기는 항상 '며칠'입니다." },
  { sentence: "우표를 편지봉투에 ( ___ ).", options: ["붙였다", "부쳤다"], answer: "붙였다", explanation: "풀로 접착하는 것은 '붙이다'입니다." },
  { sentence: "우체국에 가서 편지를 ( ___ ).", options: ["부쳤다", "붙였다"], answer: "부쳤다", explanation: "인편으로 보내는 것은 '부치다'입니다." },
  { sentence: "소풍날 비가 오면 ( ___ )?", options: ["어떡해", "어떻게"], answer: "어떡해", explanation: "문장 끝 서술어는 '어떡해'입니다." },
  { sentence: "이 문제를 ( ___ ) 풀어야 할까?", options: ["어떻게", "어떡해"], answer: "어떻게", explanation: "방식을 묻는 부사는 '어떻게'입니다." },
  { sentence: "친구와 방과 후에 ( ___ ) 공부를 했다.", options: ["같이", "가치"], answer: "같이", explanation: "함께한다는 부사는 '같이'입니다." },
  { sentence: "선생님 말씀에 귀를 ( ___ ) 들었다.", options: ["기울여", "기울려서"], answer: "기울여", explanation: "용언 활용형 '기울여'가 바릅니다." },
  { sentence: "숙제를 ( ___ ) 마쳤다.", options: ["금세", "금새"], answer: "금세", explanation: "'금시에'의 줄임말은 '금세'입니다." },
  { sentence: "선생님께서 한글을 ( ___ ) 주셨다.", options: ["가르쳐", "가리켜"], answer: "가르쳐", explanation: "지식을 전달하는 것은 '가르치다'입니다." },
  { sentence: "손가락으로 동쪽을 ( ___ ) 있었다.", options: ["가리키고", "가르치고"], answer: "가리키고", explanation: "방향을 지목하는 것은 '가리키다'입니다." },
  { sentence: "지갑을 길에서 ( ___ ) 버렸다.", options: ["잃어버리고", "잊어버리고"], answer: "잃어버리고", explanation: "물건을 분실한 것은 '잃어버리다'입니다." },
  { sentence: "약속 시간을 깜빡 ( ___ ).", options: ["잊어버렸다", "잃어버렸다"], answer: "잊어버렸다", explanation: "기억을 잊은 것은 '잊어버리다'입니다." },
  { sentence: "오늘따라 ( ___ ) 기분이 상쾌하다.", options: ["왠지", "웬지"], answer: "왠지", explanation: "'왜 그런지 모르게'는 '왠지'입니다." },
  { sentence: "네가 이 시간에 ( ___ ) 일이니?", options: ["웬", "왠"], answer: "웬", explanation: "'어찌 된'을 뜻하는 수식어는 '웬'입니다." },
  { sentence: "선생님께 편지를 ( ___ ) 생각이다.", options: ["쓸", "쓸께"], answer: "쓸", explanation: "어미 '-ㄹ' 뒤 표준 표기입니다." },
  { sentence: "내일도 반드시 약속을 ( ___ ).", options: ["지킬게", "지킬께"], answer: "지킬게", explanation: "어미 '-ㄹ게'는 예사소리로 표기합니다." },
  { sentence: "방을 깨끗하게 ( ___ ) 치웠다.", options: ["닦고", "닦아서"], answer: "닦고", explanation: "연결어미 활용입니다." },
  { sentence: "친구의 허락을 ( ___ ) 물건을 빌렸다.", options: ["맡아", "맡고"], answer: "맡아", explanation: "자연스러운 문맥 선택입니다." },
  { sentence: "어제 본 영화는 참 ( ___ ).", options: ["재밌었다", "재미있었다"], answer: "재미있었다", explanation: "표준 표기 원형입니다." },
  { sentence: "소문이 전교에 ( ___ ) 퍼졌다.", options: ["일파만파", "일파만파로"], answer: "일파만파로", explanation: "부사격 조사 결합입니다." },
  { sentence: "자전거를 타고 언덕을 ( ___ ).", options: ["넘어갔다", "너머갔다"], answer: "넘어갔다", explanation: "동사 활용형 '넘어갔다'가 맞습니다." },
  { sentence: "산 ( ___ ) 마을이 보인다.", options: ["너머에", "넘어에"], answer: "너머에", explanation: "경계 밖 위치를 나타내는 명사는 '너머'입니다." },
  { sentence: "맛있는 음식을 먹으니 기분이 ( ___ ).", options: ["좋다", "조타"], answer: "좋다", explanation: "기본형 표기 '좋다'가 바릅니다." },
  { sentence: "하늘에 구름이 한 점도 ( ___ ).", options: ["없다", "업다"], answer: "없다", explanation: "존재하지 않음은 '없다'입니다." },
  { sentence: "학교 교가 가사를 정확히 ( ___ ).", options: ["외웠다", "에웠다"], answer: "외웠다", explanation: "암기한 것은 '외웠다'입니다." },
  { sentence: "어머니께서 맛있는 떡볶이를 ( ___ ).", options: ["해주셨다", "해줬다"], answer: "해주셨다", explanation: "존칭 표현 활용입니다." }
];

export const GAME3_QUESTIONS = [
  { wrongSentence: "내일 친구들과 약속을 해도 돼나요?", wrongWord: "돼나요", correctWord: "되나요", explanation: "'되나요'가 올바른 표기입니다." },
  { wrongSentence: "선생님을 오랭만에 만나서 반갑습니다.", wrongWord: "오랭만에", correctWord: "오랜만에", explanation: "'오랜만에'가 맞습니다." },
  { wrongSentence: "쓰레기는 깨끗히 치워야 합니다.", wrongWord: "깨끗히", correctWord: "깨끗이", explanation: "'깨끗이'가 바른 부사 표기입니다." },
  { wrongSentence: "그 문제는 굳지 설명하지 않아도 알아.", wrongWord: "굳지", correctWord: "굳이", explanation: "'굳이'로 구개음화 전 원형 표기를 살립니다." },
  { wrongSentence: "가방을 어깨에 매고 학교에 갑니다.", wrongWord: "매고", correctWord: "메고", explanation: "어깨에 걸치는 것은 '메고'입니다." },
  { wrongSentence: "자전거가 나무에 부딛쳤다.", wrongWord: "부딛쳤다", correctWord: "부딪쳤다", explanation: "'부딪쳤다'가 바른 표기입니다." },
  { wrongSentence: "동생이 거짓말을 해서 정말 어의가 없었다.", wrongWord: "어의가", correctWord: "어이가", explanation: "'어이가' 없을 때 쓰는 말입니다." },
  { wrongSentence: "시험지를 다 풀고 정답을 맞췄다.", wrongWord: "맞췄다", correctWord: "맞혔다", explanation: "정답은 '맞혔다'입니다." },
  { wrongSentence: "오늘이 몇 월 몇 일인지 기억나니?", wrongWord: "몇 일인지", correctWord: "며칠인지", explanation: "항상 '며칠'로 적습니다." },
  { wrongSentence: "소풍날 비가 오면 어떻해?", wrongWord: "어떻해", correctWord: "어떡해", explanation: "서술어로 쓸 땐 '어떡해'입니다." },
  { wrongSentence: "청소를 다 마치니 금새 날이 어두워졌다.", wrongWord: "금새", correctWord: "금세", explanation: "'금세'가 바른 표기입니다." },
  { wrongSentence: "선생님께서 한글을 가리켜 주셨다.", wrongWord: "가리켜", correctWord: "가르쳐", explanation: "가르쳐 주셨다가 맞습니다." },
  { wrongSentence: "지갑을 길에서 잊어버려서 슬펐다.", wrongWord: "잊어버려서", correctWord: "잃어버려서", explanation: "물건 분실은 '잃어버려서'입니다." },
  { wrongSentence: "너 오늘따라 웬지 기분이 좋아 보인다.", wrongWord: "웬지", correctWord: "왠지", explanation: "'왜 그런지'는 '왠지'입니다." },
  { wrongSentence: "너 이 시간에 왠 일이니?", wrongWord: "왠 일이니", correctWord: "웬 일이니", explanation: "'웬 일이니'가 바릅니다." },
  { wrongSentence: "열심히 공부해서 시험을 잘 볼께.", wrongWord: "볼께", correctWord: "볼게", explanation: "어미는 '-ㄹ게'입니다." },
  { wrongSentence: "친구에게 우표를 편지에 부쳤다.", wrongWord: "부쳤다", correctWord: "붙였다", explanation: "접착은 '붙였다'입니다." },
  { wrongSentence: "우체국에서 편지를 붙이고 왔다.", wrongWord: "붙이고", correctWord: "부치고", explanation: "발송은 '부치고'입니다." },
  { wrongSentence: "동생이 감기가 싹 낳았다.", wrongWord: "낳았다", correctWord: "낫았다", explanation: "병 회복은 '낫았다'입니다." },
  { wrongSentence: "강아지가 새끼를 낫았다.", wrongWord: "낫았다", correctWord: "낳았다", explanation: "출산은 '낳았다'입니다." },
  { wrongSentence: "숙제를 솔직이 안 했다고 고백했다.", wrongWord: "솔직이", correctWord: "솔직히", explanation: "'솔직히'가 맞습니다." },
  { wrongSentence: "곰곰히 생각해보니 내 잘못이었다.", wrongWord: "곰곰히", correctWord: "곰곰이", explanation: "'곰곰이'가 바른 부사입니다." },
  { wrongSentence: "선생님 말씀에 귀를 기울려서 들었다.", wrongWord: "기울려서", correctWord: "기울여", explanation: "'기울여'가 올바릅니다." },
  { wrongSentence: "학교 가기 전에 신발 끈을 메었다.", wrongWord: "메었다", correctWord: "매었다", explanation: "묶는 것은 '매었다'입니다." },
  { wrongSentence: "가방을 어깨에 매고 출발했다.", wrongWord: "매고", correctWord: "메고", explanation: "걸치는 것은 '메고'입니다." },
  { wrongSentence: "수업 시간에 딴짓을 하면 않 된다.", wrongWord: "않 된다", correctWord: "안 된다", explanation: "'안 된다'가 맞습니다." },
  { wrongSentence: "나는 거짓말을 안는다.", wrongWord: "안는다", correctWord: "않는다", explanation: "'않는다'가 맞습니다." },
  { wrongSentence: "친구와 서로 답을 맞혔다.", wrongWord: "맞혔다", correctWord: "맞추었다", explanation: "대조하는 것은 '맞추었다'입니다." },
  { wrongSentence: "선생님이 문제를 맞추라고 하셨다.", wrongWord: "맞추라고", correctWord: "맞히라고", explanation: "정답을 맞히는 것은 '맞히라고'입니다." },
  { wrongSentence: "마음이 무척 설레이는 소풍날이다.", wrongWord: "설레이는", correctWord: "설레는", explanation: "'설레는'이 맞습니다." },
  { wrongSentence: "이 일을 다 하려면 힘이 붙인다.", wrongWord: "붙인다", correctWord: "부친다", explanation: "벅찬 것은 '부친다'입니다." },
  { wrongSentence: "오늘이 몇 월 몇 일인지 아시나요?", wrongWord: "몇 일인지", correctWord: "며칠인지", explanation: "'며칠인지'가 맞습니다." },
  { wrongSentence: "내가 오늘 떡볶이를 쏠께!", wrongWord: "쏠께", correctWord: "쏠게", explanation: "'쏠게'가 올바른 어미 표기입니다." },
  { wrongSentence: "산 넘어 마을로 놀러 갔다.", wrongWord: "넘어", correctWord: "너머", explanation: "위치는 '너머'입니다." },
  { wrongSentence: "더욱히 신나는 일이 생겼다.", wrongWord: "더욱히", correctWord: "더욱이", explanation: "'더욱이'가 바른 표기입니다." }
];

export const BOSS_QUESTIONS = [
  { question: "1. 다음 중 바른 맞춤법 문장은 무엇인가요?", options: ["일이 생각대로 잘 안된다.", "일이 생각대로 잘 않된다."], answer: 0, explanation: "부정 부사 '안'이 맞습니다." },
  { question: "2. '며칠'과 '몇 일' 중 바른 표기는?", options: ["몇 일 동안 여행을 떠났다.", "며칠 동안 여행을 떠났다."], answer: 1, explanation: "날짜와 기간은 항상 '며칠'입니다." },
  { question: "3. '선생님을 ( ___ ) 뵈러 갑니다.'의 알맞은 말은?", options: ["오랜만에", "오랭만에"], answer: 0, explanation: "'오랜만에'가 올바른 표기입니다." },
  { question: "4. '병이 싹 ( ___ ).' 에 들어갈 올바른 단어는?", options: ["낳았다", "낫았다"], answer: 1, explanation: "병 회복은 '낫다(낫았다)'입니다." },
  { question: "5. '어깨에 가방을 ( ___ ).' 에 들어갈 낱말은?", options: ["메다", "매다"], answer: 0, explanation: "어깨에 지는 것은 '메다'입니다." },
  { question: "6. '시험 답을 정확히 ( ___ ).' 에 알맞은 단어는?", options: ["맞혔다", "맞췄다"], answer: 0, explanation: "정답을 적중시키는 것은 '맞혔다'입니다." },
  { question: "7. '정말 ( ___ ) 없는 상황이다.' 의 바른 표기는?", options: ["어의", "어이"], answer: 1, explanation: "'어이없다'가 정답입니다." },
  { question: "8. '우표를 편지에 ( ___ ).' 에 알맞은 표현은?", options: ["붙이다", "부치다"], answer: 0, explanation: "물건을 접착하는 것은 '붙이다'입니다." },
  { question: "9. '그렇다면 이제 어떻게 ( ___ )?' 에 알맞은 말은?", options: ["어떡해", "어떻게"], answer: 0, explanation: "문장 끝 서술어는 '어떡해'입니다." },
  { question: "10. '방을 ( ___ ) 청소하자.' 에 들어갈 부사는?", options: ["깨끗히", "깨끗이"], answer: 1, explanation: "'ㅅ' 받침 뒤에는 '이'가 붙어 '깨끗이'가 됩니다." },
  { question: "11. '숙제를 ( ___ ) 끝냈다.' 의 바른 표기는?", options: ["금세", "금새"], answer: 0, explanation: "'금시에'의 줄임말은 '금세'입니다." },
  { question: "12. '오늘따라 ( ___ ) 마음이 싱숭생숭하다.' 에 들어갈 말은?", options: ["왠지", "웬지"], answer: 0, explanation: "'왜 그런지 모르게'는 '왠지'입니다." },
  { question: "13. '네가 이 시간에 ( ___ ) 일로 왔니?' 에 바른 말은?", options: ["웬", "왠"], answer: 0, explanation: "'어찌 된'의 뜻은 '웬'입니다." },
  { question: "14. '내일 내가 맛있는 아이스크림을 ( ___ ).' 은?", options: ["사줄게", "사줄께"], answer: 0, explanation: "어미 '-ㄹ게'는 예사소리로 표기합니다." },
  { question: "15. '선생님께서 한글을 친절하게 ( ___ ).' 는?", options: ["가르쳐 주셨다", "가리켜 주셨다"], answer: 0, explanation: "지식을 전달하는 것은 '가르치다'입니다." }
];

// 랜덤으로 배열을 섞어주는 유틸리티 함수
export function getRandomSubarray(arr, size) {
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
