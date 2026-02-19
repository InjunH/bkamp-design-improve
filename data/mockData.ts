
import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: '1',
    category: '개발',
    difficulty: '중급',
    title: 'Claude Code로 나만의 MCP 서버 만들기',
    description: 'Claude Code에서 PostgreSQL 데이터를 직접 관리할 수 있는 MCP 서버를 처음부터 구축하는 실전 가이드입니다.',
    author: { name: 'InjunH', avatar: 'https://picsum.photos/seed/1/40/40' },
    views: 1250,
    comments: 2,
    likes: 312,
    bookmarks: 86,
    gradientClass: 'gradient-orange',
    createdAt: '2024-03-20',
    steps: [
      { id: 1, title: '환경 설정 및 MCP SDK 설치', content: '먼저 Node.js 환경에서 MCP SDK를 설치합니다. `npm install @google/mcp-sdk` 명령어를 사용하세요.', image: 'https://picsum.photos/seed/step1/800/400' },
      { id: 2, title: 'PostgreSQL 커넥터 작성', content: 'DB와의 연결을 위해 환경 변수를 설정하고 커넥터 로직을 작성합니다. 보안을 위해 .env 파일을 잊지 마세요.', image: 'https://picsum.photos/seed/step2/800/400' },
      { id: 3, title: 'Claude Code에 서버 등록', content: '작성한 서버를 Claude Code 설정 파일에 등록하여 실제 대화창에서 연동되는지 확인합니다.' }
    ],
    commentsList: [
      {
        id: 'c1',
        author: { name: '테오분석', avatar: 'https://picsum.photos/seed/11/32/32' },
        text: '드디어 MCP 서버 구축 가이드가 올라왔네요! 정말 유용합니다. 특히 PostgreSQL 연동 부분이 깔끔해서 따라하기 좋았어요.',
        createdAt: '1시간 전',
        likes: 12
      },
      {
        id: 'c2',
        author: { name: 'DataWizard', avatar: 'https://picsum.photos/seed/12/32/32' },
        text: 'SDK 버전이 업데이트되면서 약간 바뀐 부분이 있던데, 그 부분도 나중에 업데이트해주시면 좋을 것 같습니다!',
        createdAt: '30분 전',
        likes: 5
      }
    ]
  },
  {
    id: '2',
    category: '실사용기',
    difficulty: '중급',
    title: 'Cursor로 Flutter 위젯 커스터마이징 속도를 2배 올린 방법',
    description: 'AI가 제안하는 위젯 구조를 활용해 반복적인 UI 작업을 줄인 실전 경험을 공유합니다.',
    author: { name: '제임스모바일', avatar: 'https://picsum.photos/seed/2/40/40' },
    views: 890,
    comments: 0,
    likes: 145,
    bookmarks: 42,
    gradientClass: 'gradient-blue',
    createdAt: '2024-03-19',
  }
];

export const SIDEBAR_ITEMS = {
  trending: [
    "Cursor 단축키 모음",
    "Claude 3.7 활용법",
    "데이터 정제 워크플로우",
    "Streamlit 대시보드 가이드"
  ],
  contributors: [
    { name: "InjunH", points: 1250, avatar: 'https://picsum.photos/seed/10/32/32' },
    { name: "테오분석", points: 980, avatar: 'https://picsum.photos/seed/11/32/32' },
    { name: "DataWizard", points: 850, avatar: 'https://picsum.photos/seed/12/32/32' }
  ]
};
