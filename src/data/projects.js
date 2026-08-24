export const profile = {
  name: '박상우',
  role: 'AI · Web / App 개발',
  email: 'qaz9890@naver.com',
  phone: '010-5373-9174',
  birthDate: '1992.04.03',
  location: '대구 수성알파시티',
  github: 'https://github.com/qaz989098-dev',
  githubId: 'qaz989098-dev',
  photoSrc: '/portFo.io/assets/images/profile/photo.png',
  resume: {
    href: '/portFo.io/assets/resume/park-sangwoo-resume.pdf',
    title: '박상우 이력서',
    downloadName: '박상우_이력서.pdf',
  },
  education: '',
  period: '2026.06 ~ 2026.10',
  intro:
    '대구 수성알파시티를 거점으로 AI · Web / App 개발자를 목표로 하고 있습니다. 수성알파시티 실무형 AI·SW 인재육성 Lab에서 Web과 App을 익히며, 프론트엔드로 화면을 만들고 백엔드로 API와 인증을 붙이며 MariaDB로 데이터를 관리하고 있습니다.',
  trainings: [
    {
      id: 'suseong-alpha-lab',
      name: '수성알파시티 실무형 AI·SW 인재육성 Lab',
      org: '(사)한국커리어혁신진흥원',
      period: '2026.06 — 2026.10',
      status: '진행 중',
      statusType: 'ongoing',
      summary:
        '대구 수성구·수성알파시티, 경북대학교 AI융합캠퍼스에서 진행한 실무형 과정입니다. Python·웹·앱 실습과 멘토링을 듣고, 공공안전지도를 팀 프로젝트로 수행했습니다.',
      detail: {
        trainingInfo: [
          { label: '과정명', value: '실무형 AI·SW 인재 육성 Lab' },
          { label: '주관', value: '(사)한국커리어혁신진흥원' },
          { label: '협력', value: '대구광역시 수성구 · 수성알파시티' },
          { label: '장소', value: '경북대학교 AI융합캠퍼스' },
          { label: '기간', value: '2026.06.01 — 2026.10.30' },
          { label: '구성', value: 'Python 기초 · AI·웹 풀스택 · 팀 프로젝트 · 1:1 멘토링' },
          { label: '팀 프로젝트', value: '공공안전지도 (Web / App)' },
        ],
      },
    },
  ],
  skills: [
    { label: 'Frontend', items: ['Next.js', 'TypeScript', 'Zustand', 'Flutter', 'Kakao Map'] },
    { label: 'Backend', items: ['Node.js', 'Express', 'TypeScript', 'JWT'] },
    { label: 'Database', items: ['MariaDB', 'Prisma'] },
    { label: 'Tools', items: ['Git', 'GitHub'] },
  ],
  learningSkills: {
    context: 'AI 개발',
    items: ['Python', '데이터 파이프라인', 'LLM 애플리케이션'],
    note: '수성알파시티 Lab에서 익힌 웹·앱을 바탕으로, 격자 안전데이터를 학습·추론으로 옮기는 방향을 공부하고 있습니다.',
  },
};

export const projects = [
  {
    id: 'public-safety-map',
    aliases: ['safey-nav'],
    title: '공공안전지도',
    subtitle: '공공 안전데이터 기반 지역 안전정보 시각화 · 제보 · 알림',
    period: '2026.07.22 — 2026.09.01',
    type: 'team',
    badge: '팀 프로젝트 · 5인',
    summary:
      '공공 안전데이터를 격자 안전등급으로 시각화하고, 시민 제보와 근접 알림을 제공하는 Web/App 서비스입니다. Next.js와 Flutter가 Express API·MariaDB를 공유합니다.',
    stack: [
      'Next.js',
      'TypeScript',
      'Flutter',
      'Express',
      'Prisma',
      'MariaDB',
      'Kakao Map',
      'FCM',
    ],
    github: 'https://github.com/qaz989098-dev/public_safety_map_app',
    links: [
      {
        label: 'App GitHub',
        href: 'https://github.com/qaz989098-dev/public_safety_map_app',
      },
    ],
    existingService: {
      name: '생활안전지도',
      url: 'https://www.safemap.go.kr/main/smap_renewal.do',
      description:
        '행정안전부 생활안전지도는 CCTV·치안시설·편의점 등 공공 안전정보를 지도에서 조회하는 공식 서비스입니다. 인프라 열람에는 강하지만, 시민 제보·실시간 알림·체감 안전도는 한 화면에 모이지 않습니다.',
    },
    problems: [
      {
        title: '정보가 분산되어 있음',
        body: 'CCTV, 경찰·소방 시설, 편의점이 여러 포털과 레이어에 나뉘어 있어 한 지역의 안전을 한눈에 보기 어렵습니다.',
      },
      {
        title: '실시간 제보 / 알림 부족',
        body: '싱크홀·공사·사고 같은 돌발 상황이 지도에 바로 안 올라가고, 근처에 있는 사람에게 알리기도 어렵습니다.',
      },
      {
        title: '체감 안전도 확인이 어려움',
        body: '시설 개수만으로는 밤에 걸어본 사람의 느낌을 알기 어렵고, 주민 후기를 남길 창구가 없습니다.',
      },
    ],
    overview: {
      intro:
        '한국커리어혁신진흥원 주관 수성알파시티 실무형 AI·SW 인재육성 Lab 팀 프로젝트(5인)입니다. 흩어진 공공 안전데이터를 약 500m 격자로 모아 안전·보통·불안 등급을 색으로 표시하고, 앱 제보와 400m 근접 알림으로 돌발 상황을 보완합니다.',
      services: [
        '격자 기반 안전등급 지도 (안전 / 보통 / 불안)',
        '인프라·사고다발·도시정보를 한 지도에서 열람',
        '앱에서 제보·피드백 등록, 웹에서 열람·관리',
        '신규 제보 푸시(FCM)와 400m 근접 알림',
      ],
      core: [
        '안전등급 시각화',
        '사용자 제보',
        '안전 알림',
        '관리자 검수',
      ],
      platforms: {
        common: ['안전등급 격자', '인프라 표시', '사고다발구역', '일반·관리자 로그인'],
        app: ['제보·피드백 등록', 'FCM 신규 제보 알림', '400m 근접 알림', '마이페이지'],
        web: ['제보·피드백 열람 및 위치 이동', '관리자 표시/숨김·신규 등록', '사용자 ↔ 관리자 채팅'],
      },
    },
    data: {
      sources: [
        '행정안전부 생활안전지도 OpenAPI',
        '공공데이터포털 (CCTV·보안등 등)',
      ],
      examples: ['CCTV', '경찰시설', '소방시설', '편의점', '사고다발구역'],
      scale:
        '격자 한 칸은 약 500m(0.005°)입니다. 전국 주요 도시 격자와 인프라를 시드하고, 화면 viewport 기준으로 조회합니다.',
      pipeline: [
        '공공데이터',
        '전처리',
        '격자화',
        '인프라 점수',
        '제보/사고 반영',
        '안전등급',
      ],
      model: [
        { title: '데이터 전처리', body: '좌표·주소가 비거나 중복인 점을 걸러 격자 중심에 붙입니다.' },
        { title: '격자(Grid)', body: '위경도를 grid_row / grid_col 정수로 바꿔, 같은 칸이 두 번 생기지 않게 합니다.' },
        { title: '인프라 가중치', body: 'CCTV·경찰·소방·편의점 등 시설 종류별로 점수를 다르게 더합니다.' },
        { title: '안전도 산출', body: '격자 안 인프라 점수를 모아 기본 안전도를 만듭니다.' },
        { title: '사고 / 제보 감점', body: '사고다발구역과 최근 제보가 있으면 점수를 낮춥니다.' },
        { title: '최종 안전등급', body: '점수를 안전 / 보통 / 불안 세 단계로 나눠 지도 색으로 표시합니다.' },
      ],
    },
    architecture: {
      nodes: ['Web', 'App', 'Backend', 'DB'],
      extras: ['외부 API', 'FCM', 'Supabase'],
      stackNote:
        'Web은 Next.js(App Router)·TypeScript·Zustand, App은 Flutter, Backend는 Node.js·Express·TypeScript·Prisma입니다. DB는 MariaDB이며 JWT/세션으로 인증합니다.',
      frontend: [
        { title: 'Web', body: 'Next.js App Router와 TypeScript로 열람·관리 화면을 만듭니다. Zustand로 지도 상태와 로그인 상태를 두고, 카카오맵 위에 격자·제보·도시정보 오버레이를 올립니다.' },
        { title: 'App', body: 'Flutter로 제보·피드백 등록, 마이페이지, FCM·400m 근접 알림을 구현합니다. Provider와 Geolocator로 위치·화면 상태를 맞춥니다.' },
        { title: '공통 UX', body: 'Web은 열람·검수, App은 현장 입력에 맞춥니다. 같은 API를 쓰되 화면 역할은 나눕니다.' },
      ],
      backend: [
        { title: '인증', body: '일반 사용자와 관리자를 JWT / Session으로 구분합니다. 관리자 계정은 앱 로그인을 막고 웹 콘솔로 안내합니다.' },
        { title: 'API 구조', body: '/v1/auth, /grids, /reports, /feedbacks, /city-events, /devices, /admin, /meta' },
        { title: 'Scheduler', body: '생활안전지도 인프라 동기화, 제보 24시간 만료, 푸시 대상 디바이스 토큰 관리' },
      ],
      tables: [
        { name: 'user', fields: 'email, role(NORMAL/ADMIN)' },
        { name: 'grid', fields: 'row/col, safety_grade' },
        { name: 'infrastructures', fields: 'type, lat/lng, grid_id' },
        { name: 'report', fields: 'type, expire_at, is_active' },
        { name: 'feedback', fields: 'safety_feeling, comment' },
        { name: 'city_events', fields: '행사·인파·교통통제' },
        { name: 'device_tokens', fields: 'FCM, user_id nullable' },
        { name: 'tag', fields: 'feedback_tag' },
      ],
      dbNote:
        'MariaDB + Prisma로 스키마와 마이그레이션을 관리합니다. user를 중심으로 report·feedback·device_tokens를 연결하고, grid에 infrastructures를 붙입니다. 제보는 expire_at·is_active로 만료와 표시 여부를 다룹니다.',
    },
    features: {
      common: [
        { title: '지도', items: ['안전등급 표시', '인프라 표시', '사고다발구역'] },
        { title: '로그인', items: ['일반 사용자 로그인', '관리자 로그인'] },
      ],
      app: [
        { title: '제보 / 피드백', items: ['제보 등록', '피드백 등록'] },
        { title: '알림', items: ['신규 제보 알림 (FCM)', '400m 근접 알림'] },
        { title: '마이페이지', items: ['내 제보 / 피드백 확인·삭제·위치 확인', '알림 목록', '알림 설정'] },
      ],
      web: [
        { title: '내 제보 / 피드백', items: ['확인', '해당 위치로 이동'] },
        { title: '관리자 페이지', items: ['제보 / 피드백 표시·숨김', '도시정보 관리 표시·숨김', '신규 등록'] },
        { title: '채팅', items: ['사용자 ↔ 관리자'] },
      ],
    },
    troubleshooting: {
      web: [
        {
          title: '카카오맵 키와 격자 오버레이',
          body: 'SDK 키가 없으면 지도를 그리지 않고 상태를 나눕니다. idle 이후 viewport만 다시 불러 격자·제보·도시정보 오버레이가 쌓이지 않게 했습니다.',
        },
        {
          title: '전국 격자 생성 폭주',
          body: '지도를 너무 축소하면 칸 수가 급증합니다. 한 요청당 생성 상한(400칸)을 두어 빈 격자를 필요한 화면만 채웁니다.',
        },
      ],
      app: [
        {
          title: '카메라 NaN · 타일 깨짐',
          body: 'fit bounds 뒤 카메라가 깨지면 맵을 재마운트하고, 길찾기 종료 시 이전 줌·중심을 되돌립니다.',
        },
        {
          title: 'TMAP 한도와 주소 불일치',
          body: '보행 경로는 짧게 캐시하고, 롱프레스 좌표는 카카오 주소를 우선해 Nominatim 재검색 실패를 줄였습니다.',
        },
        {
          title: '하단 패널 오버플로우',
          body: '경로 시트와 격자 패널을 한 스택으로 붙여, 기종마다 생기던 틈과 잘림을 맞췄습니다.',
        },
      ],
    },
    reflection:
      '공공데이터만 있으면 시설 목록이 되고, 제보만 있으면 게시판이 됩니다. 둘을 격자에 모아 색과 알림으로 바꾼 뒤에야 “지금 이 일대가 괜찮은가”에 답할 수 있었습니다. Web은 열람·관리, App은 현장 등록·알림에 맞추고 같은 API를 나눴습니다. 안전등급은 아직 규칙 기반입니다. 이 격자·제보 데이터를 다음 단계의 모델 입력으로 쓰고 싶습니다.',
    role: [
      'Flutter 앱 — 지도 롱프레스 길찾기, 경로 미리보기, 400m 근접 알림, 제보·피드백·마이페이지',
      'Web/App 공통 — 안전 격자·제보·인프라 API 연동',
      'UX — 하단 패널 일체화, 길찾기 종료 시 카메라 복원, TMAP 호출 캐시',
    ],
    // 사진은 public/assets/images/public-safety-map/ 에 두고 src만 채우면 됩니다.
    coverSrc: null, // '/portFo.io/assets/images/public-safety-map/cover.png'
    gallery: [
      {
        slot: 'screenshot-1',
        caption: 'Web · 안전등급 격자 지도',
        src: null, // '/portFo.io/assets/images/public-safety-map/01-web-grid.png'
      },
      {
        slot: 'screenshot-2',
        caption: 'App · 제보 등록 · 근접 알림',
        src: null, // '/portFo.io/assets/images/public-safety-map/02-app-report.png'
      },
      {
        slot: 'screenshot-3',
        caption: '관리자 · 제보/도시정보 표시·숨김',
        src: null, // '/portFo.io/assets/images/public-safety-map/03-admin.png'
      },
      {
        slot: 'screenshot-4',
        caption: '내 제보 · 해당 위치 이동',
        src: null, // '/portFo.io/assets/images/public-safety-map/04-my-reports.png'
      },
    ],
  },
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id || p.aliases?.includes(id));
}
