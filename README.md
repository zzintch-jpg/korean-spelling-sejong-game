# 📜 훈민정음 맞춤법 수호대 (초등 맞춤법 미니게임 & 세종대왕 보스전)

초등학생(3~4학년)들이 많이 헷갈려 하는 맞춤법을 연습하는 1분 미니게임 3종과 훈민정음 14개 자음 토큰(`가`~`하`) 수집, 그리고 세종대왕 보스전(10문제 만점 도전)을 통해 **훈민정음 마스터**에 등극하는 웹 기반 교수·학습 게임 프로젝트입니다.

---

## ✨ 주요 기능
1. **1분 미니게임 3종**:
   - **맞춤법 터치 (순발력형)**: 화면에 떠다니는 단어 중 올바른 맞춤법 단어 빠르게 클릭하기 (1분)
   - **문장 빈칸 채우기 (선택형)**: 문장 맥락에 맞는 올바른 단어 선택하기 (1분)
   - **맞춤법 탐정 (오류 고치기형)**: 문장 속 오탈자를 찾아 바르게 수정하기 (1분)
2. **훈민정음 14개 자음 토큰 수집 시스템**:
   - 미니게임 1회 클리어 시 토큰 1개 획득
   - `가, 나, 다, 라, 마, 바, 사, 아, 자, 차, 카, 타, 파, 하` 14개 자음 토큰을 모두 수집하면 세종대왕 보스전 해금
3. **세종대왕 보스전**:
   - 10문제 타임어택 (문제당 10초 제한시간)
   - **10/10 만점** 성공 시 **[훈민정음 마스터]** 칭호 및 배지 부여
4. **훈민정음 명예의 전당 (리더보드)**:
   - **토큰 최다 보유자 Top 5**
   - **미니게임 최다 클리어자 Top 5**
   - Firebase Realtime/Firestore DB 및 LocalStorage 지원
5. **로그인 & 데이터 연동**:
   - Google 로그인 및 익명(Guest) 로그인 지원

---

## 🚀 빠른 시작 (로컬 실행)

### 1. 웹 서빙 실행
별도의 빌드 과정 없이 정적 웹 서버나 Live Server로 실행할 수 있습니다.
```bash
npx serve .
```
브라우저에서 `http://localhost:3000` (또는 표시된 포트)로 접속하세요.

---

## 🔥 Firebase 연동 설정 (옵션)

`js/firebase-config.js` 파일에서 본인의 Firebase 프로젝트 SDK 설정값으로 교체하세요:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:1234567890"
};
```
*Firebase 설정이 완료되지 않아도 **로컬 스토리지(LocalStorage)** 기반으로 100% 정상 작동합니다.*

---

## 🌐 Vercel 배포 방법

1. 본 프로젝트 폴더를 GitHub 리포지토리에 푸시합니다.
```bash
git init
git add .
git commit -m "Initial commit: Hunminjeongeum Spelling Game"
git remote add origin https://github.com/사용자이름/맞춤법-세종대왕-게임.git
git push -u origin main
```
2. [Vercel Dashboard](https://vercel.com)에 로그인 후 `Add New Project` -> 해당 GitHub 리포지토리를 선택하고 **Deploy** 버튼을 누르면 즉시 배포 완료됩니다!

---

## 📄 라이선스
MIT License
