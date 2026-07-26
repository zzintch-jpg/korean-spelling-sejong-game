// 훈민정음 14개 자음 한글 토큰 정의 및 수집 관리

export const HANGUL_TOKENS = [
  { id: 0, char: "가", name: "기역(ㄱ) 토큰", color: "#D4AF37", desc: "첫 번째 한글 자음 'ㄱ'의 기운이 담긴 토큰" },
  { id: 1, char: "나", name: "니은(ㄴ) 토큰", color: "#C0392B", desc: "두 번째 한글 자음 'ㄴ'의 기운이 담긴 토큰" },
  { id: 2, char: "다", name: "디귿(ㄷ) 토큰", color: "#27AE60", desc: "세 번째 한글 자음 'ㄷ'의 기운이 담긴 토큰" },
  { id: 3, char: "라", name: "리을(ㄹ) 토큰", color: "#2980B9", desc: "네 번째 한글 자음 'ㄹ'의 기운이 담긴 토큰" },
  { id: 4, char: "마", name: "미음(ㅁ) 토큰", color: "#8E44AD", desc: "다섯 번째 한글 자음 'ㅁ'의 기운이 담긴 토큰" },
  { id: 5, char: "바", name: "비읍(ㅂ) 토큰", color: "#D35400", desc: "여섯 번째 한글 자음 'ㅂ'의 기운이 담긴 토큰" },
  { id: 6, char: "사", name: "시옷(ㅅ) 토큰", color: "#16A085", desc: "일곱 번째 한글 자음 'ㅅ'의 기운이 담긴 토큰" },
  { id: 7, char: "아", name: "이응(ㅇ) 토큰", color: "#F39C12", desc: "여덟 번째 한글 자음 'ㅇ'의 기운이 담긴 토큰" },
  { id: 8, char: "자", name: "지읒(ㅈ) 토큰", color: "#C0392B", desc: "아홉 번째 한글 자음 'ㅈ'의 기운이 담긴 토큰" },
  { id: 9, char: "차", name: "치읓(ㅊ) 토큰", color: "#16A085", desc: "열 번째 한글 자음 'ㅊ'의 기운이 담긴 토큰" },
  { id: 10, char: "카", name: "키읔(ㅋ) 토큰", color: "#2980B9", desc: "열한 번째 한글 자음 'ㅋ'의 기운이 담긴 토큰" },
  { id: 11, char: "타", name: "티읕(ㅌ) 토큰", color: "#8E44AD", desc: "열두 번째 한글 자음 'ㅌ'의 기운이 담긴 토큰" },
  { id: 12, char: "파", name: "피읖(ㅍ) 토큰", color: "#D35400", desc: "열세 번째 한글 자음 'ㅍ'의 기운이 담긴 토큰" },
  { id: 13, char: "하", name: "히읗(ㅎ) 토큰", color: "#D4AF37", desc: "마지막 한글 자음 'ㅎ'의 완전한 기운이 담긴 토큰" }
];

export function getCollectedTokensCount(collectedIds = []) {
  return collectedIds.length;
}

export function isBossUnlocked(collectedIds = []) {
  return collectedIds.length >= 14;
}
