// 훈민정음 핵심 자음 토큰 시스템 (5개 자음: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ)

export const HANGUL_TOKENS = [
  { id: 0, char: 'ㄱ', name: '기역', desc: '훈민정음 어금니소리 토큰' },
  { id: 1, char: 'ㄴ', name: '니은', desc: '훈민정음 혀소리 토큰' },
  { id: 2, char: 'ㄷ', name: '디귿', desc: '훈민정음 단단한 혀소리 토큰' },
  { id: 3, char: 'ㄹ', name: '리을', desc: '훈민정음 반혀소리 토큰' },
  { id: 4, char: 'ㅁ', name: '미음', desc: '훈민정음 입술소리 토큰' }
];

export function isBossUnlocked(collectedTokens) {
  return collectedTokens && collectedTokens.length >= 5;
}
