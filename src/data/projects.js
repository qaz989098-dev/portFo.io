export const profile = {
  name: '박상우',
  role: '웹·앱을 만드는 풀스택 개발자',
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
  epilogue: [
    '한때 생사의 갈림길에서 삶이 멈추는 시련을 겪으며, 멈춰 있던 순간을 다시 움직이게 만드는 \'작은 신호와 데이터\'의 소중함을 누구보다 깊이 깨달았습니다.',
    '현장의 미세한 이상 징후를 포기하지 않고 끝까지 추적하듯, 데이터 하나하나에 진심을 다하겠습니다.',
    '어떤 시련도 이겨낸 불굴의 의지로, 산업 현장과 서비스에 실제 가치를 더하는 끈기 있는 AI 엔지니어로 성장하겠습니다.',
  ],
  intro: [
    '웹·앱과 API를 한 제품으로 붙이는 풀스택을 익히고 있습니다. 대구 수성알파시티 실무형 AI·SW 인재육성 Lab에서 3조 SAFETY와 함께, 2026.07.22부터 09.01까지 약 6주 동안 공공안전지도를 만들었습니다.',
    '팀에서는 Flutter와 Next.js로 화면을 만들고, Express·Prisma·MariaDB로 API와 데이터를 다뤘습니다. 입사 후 풀스택 업무에 바로 기여하고 싶습니다.',
    'AI는 앞으로 깊이를 쌓고 싶은 방향입니다. 지금은 맡은 제품을 끝까지 책임지는 개발자로 일하겠습니다.',
  ],
  trainings: [
    {
      id: 'suseong-alpha-lab',
      name: '수성알파시티 실무형 AI·SW 인재육성 Lab',
      org: '(사)한국커리어혁신진흥원',
      period: '2026.06 — 2026.10',
      status: '진행 중',
      statusType: 'ongoing',
      summary:
        '대구 수성구·수성알파시티의 경북대학교 AI융합캠퍼스에서 진행 중인 실무형 과정입니다. Python·웹·앱 실습과 멘토링을 받으며, 3조 SAFETY에서 공공안전지도(Web / App)를 만들고 있습니다.',
      detail: {
        trainingInfo: [
          { label: '과정명', value: '실무형 AI·SW 인재육성 Lab' },
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
    { label: 'App', items: ['Flutter', 'FCM', 'SQLite'] },
    { label: 'Web', items: ['Next.js', 'React', 'TypeScript', 'Zustand'] },
    { label: 'Backend', items: ['Node.js', 'Express', 'Prisma', 'JWT', 'Session', 'node-cron'] },
    { label: 'Realtime', items: ['Supabase', 'PostgreSQL', 'Vercel'] },
    { label: 'Database', items: ['MariaDB'] },
    { label: 'Data · AI', items: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'OpenCV'] },
    { label: 'Tools', items: ['GitHub', 'Firebase'] },
  ],
  skillsNote: '공공안전지도 팀에서 사용한 스택입니다. 제가 깊게 붙인 일은 프로젝트 상세에 적어 두었습니다.',
  learningSkills: {
    context: '고도화',
    items: ['LLM 애플리케이션', '학습·추론 파이프라인'],
    note: '아직 실무에 쓰는 기술이 아닙니다. 수업과 개인 학습으로 익히는 중입니다.',
  },
};

export const projects = [
  {
    id: 'public-safety-map',
    aliases: ['safey-nav'],
    title: '공공안전지도',
    subtitle: '흩어져 있던 치안 인프라를 격자로 통합하고, 돌발 상황을 실시간으로 알려 주는 시민 참여형 안전 지도',
    period: '2026.07.22 — 2026.09.01',
    type: 'team',
    badge: '3조 SAFETY · 4인',
    enTitle: 'PUBLIC SAFETY MAP',
    teamLabel: 'TEAM 3 · SAFETY',
    members: ['윤영빈', '남협', '최정봉', '박상우'],
    summary:
      '흩어져 있던 치안 인프라 정보를 격자 단위로 통합하고, 돌발 상황을 실시간으로 알려 주는 시민 참여형 안전 지도입니다. 3조 SAFETY 팀 프로젝트이며, Next.js와 Flutter가 Express API와 MariaDB를 함께 사용합니다.',
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
      {
        label: 'Web GitHub',
        href: 'https://github.com/qaz989098-dev/public_safety_map_web',
      },
      {
        label: 'Backend GitHub',
        href: 'https://github.com/qaz989098-dev/public_safety_map_backend',
      },
    ],
    myWork: [
      {
        title: '안전 경로 안내',
        body: '앱에서 지도를 길게 눌러 목적지를 정하고, CCTV 경유·최단·제보 최소화 경로를 나눴습니다. 최단 대비 소요 시간이 1.3배를 넘는 후보는 빼도록 했습니다.',
      },
      {
        title: '제보와 근접 알림',
        body: '제보·피드백·마이페이지를 붙이고, 사고다발구역이나 다른 사용자 제보에 400m 안으로 들어가면 FCM으로 알리게 했습니다.',
      },
      {
        title: '웹·앱 공통 API',
        body: 'Express·Prisma·MariaDB API를 앱과 웹이 같이 쓰도록 연동했습니다. 화면은 플랫폼마다 나누되, 데이터는 한 백엔드를 보게 했습니다.',
      },
    ],
    roleNote: '3조 SAFETY가 웹·앱·데이터를 함께 만들었습니다. 아래는 팀 기능 전체입니다.',
    existingService: {
      name: '생활안전지도',
      url: 'https://www.safemap.go.kr/main/smap_renewal.do',
      description:
        '행정안전부 생활안전지도는 CCTV·치안시설·편의점 등 공공 안전 정보를 지도에서 조회하는 공식 서비스입니다. 인프라를 찾아보는 데는 강하지만, 시민 제보·실시간 알림·체감 안전도는 한 화면에 모이지 않습니다.',
    },
    problems: [
      {
        no: '01',
        title: '정보 분산',
        lead: '치안 정보가 여러 곳에 흩어져 있다',
        body: 'CCTV, 보안등, 파출소 등 치안 인프라 정보가 여러 출처와 페이지에 분산되어 있어 한 번에 확인이 어렵습니다.',
      },
      {
        no: '02',
        title: '직관성 부족',
        lead: '해당 구역이 안전한지 한눈에 파악하기 어렵다',
        body: '개별 인프라 위치는 보이지만, 지역의 종합 안전도가 한눈에 시각화되지 않습니다.',
      },
      {
        no: '03',
        title: '실시간성',
        lead: '돌발 상황이 즉시 반영되지 않는다',
        body: '싱크홀, 공사, 사고 등 돌발 상황이 기존 지도 서비스에 실시간으로 반영되지 않습니다.',
      },
      {
        no: '04',
        title: '지표 괴리',
        lead: '정량 수치와 실제 체감 안전도가 다를 수 있다',
        body: '인프라 개수 같은 정량 지표만으로는 실제 거주자가 느끼는 안전도를 담기 어렵습니다. 같은 CCTV 개수라도 시간대·골목 구조에 따라 체감은 달라집니다.',
      },
      {
        no: '05',
        title: '사용자 채널 없음',
        lead: '체감 안전도를 확인할 창구가 없다',
        body: '실제 그 지역에 사는 사람이 느끼는 안전·불안 신호를 다른 사람에게 전달할 공식 창구가 없습니다.',
      },
    ],
    whyBuilt: [
      {
        problem: '정보가 흩어져 있음',
        problemBody: 'CCTV·보안등·소방시설·파출소·편의점 등 치안 정보가 여러 페이지에 분산',
        solution: '공공데이터를 격자 단위로 통합',
        solutionBody: '시설을 0.01° 격자로 집계하고, 안전·보통·불안 색으로 한눈에 보이게 했습니다.',
      },
      {
        problem: '실시간성이 없음',
        problemBody: '사고·공사·싱크홀 등 돌발 상황이 지도에 늦게 반영',
        solution: '사고다발구역과 사용자 제보',
        solutionBody: 'KOROAD 위험구간 접근 감지와 제보를 결합해, 반경 400m 안의 사용자에게 FCM으로 알립니다.',
      },
      {
        problem: '체감 안전도 확인 불가',
        problemBody: '실제 거주자의 안전 감각을 담을 채널이 없음',
        solution: '격자별 체감안전도 평가',
        solutionBody: '불안·보통·안전 3단계와 태그·한 줄 평을 남겨 정량 데이터와 정성 피드백을 함께 반영합니다.',
      },
    ],
    featureMatrix: [
      { name: '안전등급 지도', desc: '격자별 안전·보통·불안 색 시각화', web: true, app: true },
      { name: '인프라 마커', desc: 'CCTV · 보안등 · 파출소 · 소방시설 · 편의점', web: true, app: true },
      { name: '사고다발구역', desc: 'KOROAD 4종 위험구간 표시', web: true, app: true },
      { name: '제보', desc: '사고 · 공사 · 싱크홀 등 실시간 제보 작성', web: false, app: true },
      { name: '체감안전도 피드백', desc: '격자별 태그 · 한 줄 평 작성', web: false, app: true },
      { name: '계정 · 마이페이지', desc: '인증 · 내 활동 관리', web: true, app: true },
      { name: '관리자 콘솔', desc: '제보 · 피드백 · 도시정보 · 데이터 관리', web: true, app: false },
      { name: '알림 · 길안내 · 오프라인', desc: '근접 알림 · TMAP 경로 · SQLite 로컬', web: false, app: true },
    ],
    appCore: [
      { code: 'TAG', title: '격자별 피드백 태그', body: '격자를 선택해 태그와 한 줄 평을 남기면 그 지역의 체감 안전도가 지도에 반영됩니다.' },
      { code: 'REPORT', title: '돌발 상황 제보', body: '현재 위치와 유형별 아이콘, 사진을 첨부해 제보하면 반경 400m 사용자에게 전달됩니다.' },
      { code: 'NAVIGATION', title: '3가지 안전 경로', body: 'CCTV 경유 / 최단거리 / 제보 최소화. 최단 대비 소요 시간이 1.3배를 넘지 않는 경로만 후보로 둡니다.' },
      { code: 'ALERT', title: '근접 알림 400m', body: '사고다발구역이나 다른 사용자의 제보에 400m 이내로 접근하면 알립니다.' },
    ],
    overview: {
      intro:
        '(사)한국커리어혁신진흥원 주관 수성알파시티 실무형 AI·SW 인재육성 Lab의 팀 프로젝트입니다. 3조 SAFETY 4인이 흩어진 공공 안전 데이터를 0.01° 격자로 모아 안전·보통·불안 등급을 색으로 표시하고, 앱 제보와 400m 근접 알림으로 돌발 상황을 보완합니다.',
      services: [
        '격자 기반 안전등급 지도 (안전 · 보통 · 불안)',
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
        'CCTV 약 37만, 경찰시설 약 3천, 소방시설 약 2천, 편의점 약 5.4만, KOROAD 사고다발 4종을 사용합니다. 격자는 0.01°이며, 매일 자정(Asia/Seoul) 배치로 safety_strength를 다시 계산합니다. 운영에는 규칙 기반 공식만 들어가 있고, RandomForest 등 ML은 참고용입니다.',
      counts: [
        { label: 'CCTV', value: '≈ 370,000' },
        { label: '경찰시설', value: '≈ 3,000' },
        { label: '소방시설', value: '≈ 2,000' },
        { label: '편의점', value: '≈ 54,000' },
        { label: 'KOROAD', value: '4종' },
      ],
      weights: 'CCTV 11% · 경찰서 38% · 소방서 35% · 편의점 16%',
      formula: '안전강도 = 인프라 점수 − 제보 감점 − 이력 감점 → 상대 3분위(불안 · 보통 · 안전)',
      pipeline: [
        '데이터 수집',
        '격자별 집계',
        '인프라 점수화',
        '가중합 · 백분위',
        '감점 반영',
        '등급 산출',
      ],
      model: [
        { title: '데이터 전처리', body: '좌표·주소가 비거나 중복인 점을 걸러 격자 중심에 붙입니다.' },
        { title: '격자(Grid)', body: '위경도를 grid_row / grid_col 정수로 바꿔, 같은 칸이 두 번 생기지 않게 합니다.' },
        { title: '인프라 가중치', body: 'CCTV·경찰·소방·편의점 등 시설 종류별로 점수를 다르게 더합니다.' },
        { title: '안전도 산출', body: '격자 안 인프라 점수를 모아 기본 안전도를 만듭니다.' },
        { title: '사고 / 제보 감점', body: '사고다발구역과 최근 제보가 있으면 점수를 낮춥니다.' },
        { title: '최종 안전등급', body: '점수를 안전 · 보통 · 불안 세 단계로 나눠 지도 색으로 표시합니다.' },
      ],
    },
    architecture: {
      nodes: ['Web', 'App', 'Backend', 'DB'],
      extras: ['Kakao Maps', 'KOROAD', 'FCM', 'TMAP'],
      diagramSrc: '/portFo.io/assets/images/public-safety-map/architecture.svg',
      diagramCaption: '공공안전지도 시스템 아키텍처 — 클라이언트 · 메인 백엔드 · 데이터 저장 · 외부 API · 채팅 전용',
      diagrams: [
        {
          src: '/portFo.io/assets/images/public-safety-map/architecture-runtime.svg',
          caption: '런타임 REST 구조 — 사용자 · Client(Web/App) · Express API · 배치·마스킹 · Kakao·TMAP·KOROAD·FCM·MariaDB',
        },
        {
          src: '/portFo.io/assets/images/public-safety-map/architecture.svg',
          caption: '공공안전지도 시스템 아키텍처 — 클라이언트 · 메인 백엔드 · 데이터 저장 · 외부 API · 채팅 전용',
        },
      ],
      stackNote:
        'Web은 Next.js·React·TypeScript·Zustand이고, 관리자는 Session으로 들어옵니다. App은 Flutter·Dart이며 일반 사용자는 JWT입니다. 격자·인프라는 SQLite에 받아 두고, 카카오맵·TMAP은 클라이언트가 직접 호출합니다. 메인 REST는 Node.js·Express·Prisma이고, 매일 자정 node-cron으로 안전등급을 다시 계산합니다. 제보 사진은 Python·OpenCV YuNet으로 모자이크합니다. 1:1 채팅은 메인 백엔드와 분리해 Supabase Realtime으로 두었습니다.',
      integrations: [
        { code: 'MAP', title: 'Kakao Maps API', body: 'Web SDK · App Local REST로 클라이언트가 직접 호출합니다. 지도 렌더링, 격자 Polygon, 주소 검색.' },
        { code: 'DATA', title: 'KOROAD 공공데이터', body: '보행자·자전거·이륜차·어린이보호구역 사고다발 4종. 줌 임계값으로 호출을 줄입니다.' },
        { code: 'PUSH', title: 'Firebase Cloud Messaging', body: 'Firebase Admin SDK로 신규 제보를 브로드캐스트합니다. App은 400m 필터로 수신합니다.' },
        { code: 'ROUTE', title: 'TMAP 보행자 경로', body: 'SK Open API. App이 직접 호출합니다. 경로 탐색 · 회피 경로.' },
      ],
      restBackend: ['Node.js', 'TypeScript', 'Express.js', 'Prisma', 'JWT + Session', 'bcrypt', 'node-cron'],
      aiBackend: ['Python', 'OpenCV', 'YuNet (ONNX)', 'pandas', 'NumPy', 'scikit-learn'],
      frontend: [
        { title: 'Web', body: 'Next.js·React·TypeScript·Zustand로 열람·관리 화면을 만듭니다. 관리자는 Session 인증이고, 카카오맵 SDK 위에 격자와 채팅 FAB를 올립니다.' },
        { title: 'App', body: 'Flutter·Dart로 제보·피드백·길찾기·마이페이지를 만듭니다. JWT 인증, GPS, 카카오 Local REST, TMAP 보행 경로, FCM 400m 알림을 붙였습니다.' },
        { title: '로컬 캐시', body: '격자·인프라 데이터를 SQLite(sqflite)에 받아 두어, 지도를 다시 그릴 때 요청을 덜 보냅니다.' },
      ],
      chat: {
        title: '채팅 전용 시스템',
        body: '1:1 상담·공지·관제는 메인 REST와 분리했습니다. Supabase Realtime(PostgreSQL)을 쓰고 Next.js는 Vercel에 올렸습니다. 무료 플랜이 잠들지 않게 cron-job.org가 5분마다 Keep-Alive(SELECT 1)를 보냅니다.',
        items: ['Supabase Realtime', 'PostgreSQL', 'Vercel', 'cron-job.org'],
      },
      backend: [
        { title: '인증', body: '일반 사용자와 관리자를 JWT와 Session으로 구분합니다. 관리자 계정은 앱 로그인을 막고 웹 콘솔로 안내합니다.' },
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
        '도메인 DB는 MariaDB이고 Prisma로 11개 테이블을 관리합니다. user를 중심으로 report·feedback·device_tokens를 연결하고, grid에 infrastructures를 붙입니다. 제보는 expire_at·is_active로 만료와 표시를 다룹니다. 채팅 데이터는 이 DB가 아니라 Supabase PostgreSQL에 있습니다. App은 격자·인프라를 SQLite에 캐시합니다.',
    },
    features: {
      common: [
        { title: '지도', items: ['안전등급 표시', '인프라 표시', '사고다발구역'] },
        { title: '로그인', items: ['일반 사용자 로그인', '관리자 로그인'] },
      ],
      app: [
        { title: '제보 / 피드백', items: ['제보 등록', '피드백 등록', '유형별 마커', 'CCTV 클러스터링'] },
        { title: '길안내', items: ['롱프레스 목적지', 'CCTV 경유 / 최단 / 제보 최소화', '안내 시작·종료 UX'] },
        { title: '알림 · 마이페이지', items: ['400m 근접 알림', '내 제보 / 피드백 확인·삭제', '알림 ON/OFF'] },
      ],
      web: [
        { title: '내 제보 / 피드백', items: ['확인', '해당 위치로 이동'] },
        { title: '관리자 페이지', items: ['제보 / 피드백 표시·숨김', '도시정보 등록·표시·숨김', '데이터 soft delete'] },
        { title: '실시간 채팅', items: ['지도 FAB 1:1 상담', '관리자 관제 패널', '전역 공지', 'NEW 배지'] },
      ],
    },
    troubleshooting: [
      {
        no: '01',
        tag: 'UI',
        title: '경로 UI 미노출',
        problem: '길찾기를 시작해도 하단 안내카드가 나타나지 않아, 경로가 계산됐는지 알 수 없었습니다.',
        cause: '하단 패널을 “내 제보” 리스트가 차지해 안내카드 영역이 가려졌습니다.',
        fix: '하단 패널을 길찾기 전용으로 바꾸고, 내 제보는 마이페이지로 옮겼습니다.',
      },
      {
        no: '02',
        tag: 'API',
        title: '사고다발구역 API 호출 폭주',
        problem: '지도를 살짝만 움직여도 KOROAD API가 매번 호출되어 사용량과 렌더링 부하가 늘었습니다.',
        cause: '뷰포트 변경마다 조건 없이 재호출하는 구조였습니다.',
        fix: '2초 무동작 + 구(區) 변경 시에만 호출하고, 일정 줌 이상에서는 호출·표시를 중단했습니다.',
      },
      {
        no: '03',
        tag: 'Fault Isolation',
        title: 'KOROAD 4종 중 하나 실패 시 전체 미표시',
        problem: '보행자·자전거·이륜차·어린이보호구역 중 하나만 실패해도 나머지까지 표시되지 않았습니다.',
        cause: 'Promise.all로 4개 요청이 한 성공/실패 단위로 묶여 있었습니다.',
        fix: 'Promise.allSettled로 분리해, 실패한 유형만 빼고 나머지는 표시했습니다.',
      },
      {
        no: '04',
        tag: 'Rendering',
        title: '줌 아웃 시 격자 대량 생성',
        problem: '지도를 전국 단위까지 축소하면 격자가 폭증해 브라우저가 느려졌습니다.',
        cause: '최소 줌 제한 없이 뷰포트 안 격자를 모두 그렸습니다.',
        fix: 'MAX_ZOOM_OUT = 9와 렌더 상한을 두고, 그 이상 축소 시 격자 표시를 중단했습니다.',
      },
    ],
    reflection:
      'AI 수업과 프로젝트를 통해 AI의 가능성을 느꼈습니다. 처음 접하는 분야였지만 따라가려 노력하다 보니 흥미가 생겼고, 잘하고 싶다는 마음이 들었습니다. 전공자인 동료들과 강사님의 도움으로 기초를 다질 수 있었습니다. 첫 프로젝트를 좋은 동료들과 함께 즐겁게 할 수 있어 영광이었습니다.',
    quotes: [
      { name: '윤영빈', body: 'AI를 활용해 진행 속도가 빨라진 만큼, 구상을 구체화하는 능력이 더 중요해졌다고 느꼈습니다.' },
      { name: '남협', body: '비전공자의 한계를 딛고 실시간 채팅을 구현하며 실무 아키텍처와 자립적인 학습 루틴을 익혔습니다.' },
      { name: '최정봉', body: '생산 속도가 빨라진 만큼, 유지보수와 확장성을 위한 설계의 중요성을 더 실감했습니다.' },
      { name: '박상우', body: '처음 접하는 분야였지만 따라가며 흥미를 느꼈고, 첫 프로젝트를 좋은 동료들과 함께할 수 있어 영광이었습니다.', mine: true },
    ],
    role: [
      'App — 롱프레스 길찾기, CCTV 경유·최단·제보 최소화 경로, 제보·피드백·마이페이지, 400m 근접 알림, CCTV 클러스터링',
      'Web — 격자·인프라·사고다발 지도, 관리자 콘솔, 도시정보, 사용자↔관리자 실시간 채팅·전역 공지',
      'Backend — JWT/Session 인증, 격자·제보·피드백 API, FCM 브로드캐스트, 매일 자정 안전등급 배치',
      'Data — 공공데이터 전처리, 시설군 가중치, 참고용 ML(RandomForest), 제보 사진 모자이크(YuNet)',
    ],
    coverSrc: '/portFo.io/assets/images/public-safety-map/cover.png',
    coverCaption: 'Web · 안전등급 격자 지도',
    gallery: [
      {
        slot: 'screenshot-1',
        caption: 'Web · 안전등급 격자 지도',
        src: '/portFo.io/assets/images/public-safety-map/cover.png',
      },
      {
        slot: 'screenshot-2',
        caption: 'App · 롱프레스 목적지 지정',
        src: '/portFo.io/assets/images/public-safety-map/01-map.png',
      },
      {
        slot: 'screenshot-3',
        caption: 'App · 경로 선택 · CCTV 경유',
        src: '/portFo.io/assets/images/public-safety-map/02-app.png',
      },
      {
        slot: 'screenshot-4',
        caption: 'App · 안내 시작 · 경로 미리보기',
        src: '/portFo.io/assets/images/public-safety-map/03-admin.png',
      },
    ],
  },
  {
    id: 'portfolio-site',
    title: '포트폴리오 사이트',
    subtitle: '이력서와 프로젝트를 한곳에 모아 직접 배포한 개인 사이트',
    period: '2026.08 — 현재',
    type: 'solo',
    badge: '개인',
    enTitle: 'PORTFOLIO SITE',
    teamLabel: 'SOLO',
    members: ['박상우'],
    summary:
      '공공안전지도와 이력서를 한 사이트에서 보여 주기 위해 React로 만들었습니다. GitHub Pages에 올려 두었고, 이 페이지가 시연입니다.',
    stack: ['React', 'Vite', 'React Router', 'GitHub Pages', 'GitHub Actions'],
    github: 'https://github.com/qaz989098-dev/portFo.io',
    links: [
      {
        label: '사이트 보기',
        href: 'https://qaz989098-dev.github.io/portFo.io/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/qaz989098-dev/portFo.io',
      },
    ],
    myWork: [
      {
        title: '구성과 배포',
        body: '소개, 교육, 기술, 프로젝트, 에필로그를 나누고 GitHub Actions로 Pages에 올렸습니다.',
      },
      {
        title: '프로젝트 상세',
        body: '공공안전지도는 팀 기능과 내가 붙인 일을 구분해 적었습니다. 아키텍처는 SVG로 두어 확대해도 선이 살게 했습니다.',
      },
      {
        title: '라이트박스',
        body: '휠로 확대하고 드래그로 옮기며, 제자리 클릭은 확대를 풀도록 맞췄습니다.',
      },
    ],
    overview: {
      intro:
        '채용 담당이 팀 프로젝트만 보지 않고, 제가 혼자 만들고 배포한 화면도 볼 수 있게 이 사이트를 만들었습니다. 지금 보고 계신 페이지가 결과물입니다.',
    },
    roleNote: '혼자 기획하고 만들고 배포했습니다.',
    role: [
      'React · Vite로 화면 구성',
      '프로젝트 상세와 이력서 PDF 연결',
      'GitHub Pages · GitHub Actions 배포',
    ],
    troubleshooting: [
      {
        no: '01',
        tag: 'Zoom',
        title: '확대 후 드래그하면 백지',
        problem: '아키텍처 그림을 확대한 뒤 조금만 내려도 화면이 하얘졌습니다.',
        cause: 'CSS scale로 레이어를 키운 뒤 움직이면, 브라우저가 그 큰 조각을 그리다가 비웠습니다.',
        fix: '확대는 너비로, 이동은 위치로 바꿔 그림이 화면 안에 남게 했습니다.',
      },
      {
        no: '02',
        tag: 'Pointer',
        title: '클릭과 드래그가 섞임',
        problem: '그림을 잡으려다 확대가 풀리거나, 창이 닫히는 것처럼 보였습니다.',
        cause: '같은 누르기 동작에 이동과 클릭을 구별하지 않았습니다.',
        fix: '조금 움직이면 드래그로 보고, 제자리 클릭일 때만 확대를 풀었습니다. 닫기는 ×와 Esc만 됩니다.',
      },
    ],
    reflection:
      '만든 일을 말로만 적지 않고, 제가 배포한 화면에서 바로 보여 주는 편이 맞다고 생각했습니다. 방문자가 막히는 지점을 고치며 배포를 반복했습니다.',
  },
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id || p.aliases?.includes(id));
}
