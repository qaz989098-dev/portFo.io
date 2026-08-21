# pf

박상우 개발자 포트폴리오 (React + Vite)  
SAFEY(공공안전지도) Flutter 보행 네비게이션 UX 작업 정리

## 로컬 실행

```bash
npm install
npm run dev
```

## GitHub Pages 배포

1. GitHub에 **`pf`** 저장소를 생성하고 push  
   (레포 이름이 다르면 `vite.config.js`의 `base`를 `/레포이름/` 으로 맞추세요)
2. **Settings → Pages → Build and deployment**
   - Source: **GitHub Actions**
3. `main` push 후 workflow가 `dist`를 배포
4. 접속 URL 예: `https://<username>.github.io/pf/`

## 이미지 추가

1. `public/assets/images/safey-nav/` 에 스크린샷 저장  
   예: `01-longpress.png`, `02-route-cards.png`, …
2. `src/data/projects.js` 의 `gallery` 항목에서 `src` 주석을 해제하고 경로를 맞춥니다.

```js
src: '/pf/assets/images/safey-nav/01-longpress.png',
```

프로필 사진은 `public/assets/images/profile/photo.png` 에 두면 됩니다.

## 콘텐츠 수정

- 프로필·프로젝트: `src/data/projects.js`
- 스타일: `src/index.css`

## 참고

- 템플릿 구조: [Yoon975/yoon-pf](https://github.com/Yoon975/yoon-pf)
- API 키·시크릿은 저장소에 올리지 마세요.
