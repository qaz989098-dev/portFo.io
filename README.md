# pf

박상우 개발자 포트폴리오 (React + Vite)  
SAFEY(공공안전지도) Flutter 보행 네비게이션 UX 작업 정리

## 로컬 실행

```bash
npm install
npm run dev
```

## GitHub Pages 배포

1. GitHub에 **`portFo.io`** 저장소를 생성하고 `main`에 push
2. **Settings → Pages → Build and deployment**
   - Source: **GitHub Actions**
3. `main` push 후 workflow가 `dist`를 배포
4. 접속 URL: `https://qaz989098-dev.github.io/portFo.io/`

## 이미지 추가

1. `public/assets/images/public-safety-map/` 에 스크린샷 저장  
   예: `cover.png`, `01-web-grid.png`, `02-app-report.png`, …
2. `src/data/projects.js` 에서 `coverSrc`와 `gallery` 항목의 `src` 주석을 해제하고 경로를 맞춥니다.

```js
coverSrc: '/portFo.io/assets/images/public-safety-map/cover.png',
src: '/portFo.io/assets/images/public-safety-map/01-web-grid.png',
```

프로필 사진은 `public/assets/images/profile/photo.png` 에 두면 됩니다.

## 이력서 PDF

1. 파일을 `public/assets/resume/park-sangwoo-resume.pdf` 로 저장합니다.
2. 소개 영역의 PDF 버튼을 누르면 다운로드됩니다.

파일 이름을 바꾸면 `src/data/projects.js` 의 `resume.href` 도 같이 맞춥니다.

## 콘텐츠 수정

- 프로필·프로젝트: `src/data/projects.js`
- 스타일: `src/index.css`

## 참고

- 템플릿 구조: [Yoon975/yoon-pf](https://github.com/Yoon975/yoon-pf)
- API 키·시크릿은 저장소에 올리지 마세요.
