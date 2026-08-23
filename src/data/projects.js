export const profile = {
  name: '박상우',
  role: '', // 예: '앱 · 프론트엔드 개발'
  email: '', // 본인 이메일
  photoSrc: '/portFo.io/assets/images/profile/photo.png',
  resume: null,
  education: '', // 예: 'OO대학교 OO학과'
  intro: '', // 자기소개 — 직접 작성
  trainings: [],
  skills: [], // 기술 스택 — 직접 작성
  // skills 예시:
  // { label: 'Mobile', items: ['Flutter', 'Dart'] },
  learningSkills: null,
};

export const projects = [
  {
    id: 'safey-nav',
    title: 'SAFEY — 공공안전지도',
    subtitle: '담당: 보행 네비게이션 UX · 롱프레스 · 경로 미리보기',
    period: '2026.08',
    type: 'team',
    badge: '팀 프로젝트',
    summary:
      'Flutter 공공안전지도 앱의 보행 길찾기 UX를 개선한 작업입니다. 지도 롱프레스로 출발·도착·주소를 지정하고, 경로 카드를 접어 미리본 뒤 안내를 시작하는 흐름과 관련 버그 수정을 담당했습니다.',
    stack: [], // 기술 스택 — 직접 작성
    github: 'https://github.com/qaz989098-dev/public_safety_map_app',
    role: [
      '지도 롱프레스 액션 메뉴(출발 / 도착 / 주소) — 카카오맵 스타일로 지점 지정 UX 개선',
      '역지오코딩 주소를 검색창·핀 좌표와 연동해 재검색 실패·경로 검색 불가 이슈 완화',
      '출발·도착 마커 표시 및 경로 선택 시트 접기 — 선택 카드만 남기고 지도에서 경로 미리보기',
      '경로 fit bounds 후 길찾기 종료 시 이전 카메라(중심·줌) 복원',
      '안내 시작 시 격자 OFF(수동 재ON 가능), 안내 종료 시 경로 선택 패널 재노출 없이 상태 정리',
      '안내 중 새 목적지 지정 시 기존 안내 해제 후 재탐색 가능하도록 수정',
      '하단 경로/안내 패널과 격자 정보 패널 결합으로 틈·일부 기종 오버플로우 UI 이슈 수정',
      '주소 복사 시 클립보드와 함께 검색창·도착 핀에 즉시 반영',
    ],
    features: [
      '지도 롱프레스 → 출발 / 도착 / 주소(복사 + 검색창 반영)',
      '보행 경로 카드 선택 및 경로 미리보기',
      '턴바이턴 안내 시작 · 종료',
      '안내 시작 시 안전 격자 자동 OFF',
      '안내 중 목적지 변경 · 재탐색',
    ],
    metrics: null,
    gallery: [
      {
        slot: 'screenshot-1',
        caption: '롱프레스 메뉴 · 출발 / 도착 / 주소',
        // src: '/portFo.io/assets/images/safey-nav/01-longpress.png',
      },
      {
        slot: 'screenshot-2',
        caption: '경로 선택 카드 목록',
        // src: '/portFo.io/assets/images/safey-nav/02-route-cards.png',
      },
      {
        slot: 'screenshot-3',
        caption: '선택 경로 미리보기(시트 접힘)',
        // src: '/portFo.io/assets/images/safey-nav/03-preview.png',
      },
      {
        slot: 'screenshot-4',
        caption: '안내 중 UI · 격자 OFF',
        // src: '/portFo.io/assets/images/safey-nav/04-guidance.png',
      },
    ],
  },
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}
