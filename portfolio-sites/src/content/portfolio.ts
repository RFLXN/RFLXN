export type ProjectId =
  "bilbil" | "bot" | "innosheet" | "boopinion" | "jisakupc";
export type ProjectTab = "main" | "stack" | "problems";
export type ExperienceId = "teaching" | "leadership" | "opensource";
export type SkillId =
  | "node"
  | "typescript"
  | "express"
  | "nestjs"
  | "sql"
  | "redis"
  | "socketio"
  | "typeorm"
  | "react"
  | "nextjs"
  | "zustand"
  | "java"
  | "docker"
  | "aws"
  | "actions"
  | "linux";
export type AppTarget =
  | { appId: "intro" | "profile" }
  | { appId: "projects"; item?: ProjectId; tab?: ProjectTab; problem?: string }
  | { appId: "skills"; item?: SkillId }
  | { appId: "experiences"; item?: ExperienceId }
  | { appId: "preference" };
export const profile = {
  name: "최준혁",
  handle: "RFLXN",
  email: "jobs@rflxn.work",
  github: "https://github.com/RFLXN",
  role: "주니어 풀스택 개발자 · 백엔드 중심",
};
export interface Problem {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  skills: SkillId[];
  flow: string[];
  source: string;
  sourceLabel: string;
}
export interface Project {
  id: ProjectId;
  name: string;
  category: string;
  caption: string;
  summary: string;
  role: string;
  context: string;
  features: string[];
  repo: string;
  stack: { skill: SkillId; usage: string }[];
  tools: string[];
  problems: Problem[];
}
export const projects: Project[] = [
  {
    id: "bilbil",
    name: "빌빌",
    category: "BACKEND",
    caption: "물건을 빌리고, 대화를 연결하다",
    summary:
      "물건이 필요한 사람과 빌려줄 수 있는 사람을 연결하는 중고 물품 대여 플랫폼입니다.",
    role: "Express 기반 백엔드에서 인증, 실시간 채팅, 이미지 업로드와 배포 구성을 담당했습니다.",
    context:
      "대여 서비스에는 게시글뿐 아니라 당사자 간 대화, 사용자 확인, 이미지 저장이 필요합니다. API부터 실시간 통신과 배포까지 이어지는 흐름을 구현했습니다.",
    features: [
      "물품 게시글과 대여·리뷰",
      "실시간 채팅과 이미지 메시지",
      "회원가입·로그인과 사용자 프로필",
    ],
    repo: "https://github.com/billbill-umc/bilbil_backend",
    stack: [
      { skill: "node", usage: "API 서버와 실시간 통신 서버 실행" },
      { skill: "express", usage: "인증·게시글·대여 REST API" },
      { skill: "sql", usage: "MySQL·Knex 기반 조회와 관계형 데이터 처리" },
      { skill: "redis", usage: "채팅 Pub/Sub와 마지막 메시지 캐시" },
      { skill: "socketio", usage: "채팅방별 클라이언트 연결과 메시지 이벤트" },
      { skill: "docker", usage: "배포 이미지 패키징" },
      { skill: "aws", usage: "EC2·RDS·ElastiCache·S3·ECR 구성" },
      { skill: "actions", usage: "이미지 빌드·푸시와 서버 배포 자동화" },
    ],
    tools: ["JavaScript", "Passport.js", "JWT", "Zod", "Knex", "S3"],
    problems: [
      {
        id: "chat",
        title: "대여 당사자에게 실시간으로 메시지 전달하기",
        summary: "Socket.IO 연결과 Redis Pub/Sub를 연결했습니다.",
        problem:
          "채팅방에 참여한 사용자에게 메시지를 전달하고, 대화 이력도 저장해야 했습니다. 다른 사용자가 채팅방에 접근하지 못하도록 연결 단계의 확인도 필요했습니다.",
        solution:
          "JWT와 채팅방 참여자를 확인한 뒤 Socket.IO 연결을 허용했습니다. 채팅방별 Redis 채널로 메시지를 발행·구독하고, 메시지는 MySQL에 저장했습니다.",
        result:
          "텍스트·이미지·대여 관련 메시지를 같은 채팅 흐름에서 처리했습니다. Pub/Sub 전달과 DB 저장은 별도 작업이므로, 전달 보장과 실패 복구는 더 발전시킬 지점입니다.",
        skills: ["node", "redis", "socketio", "sql"],
        flow: [
          "사용자 연결·인증",
          "채팅방 Redis 채널",
          "상대방에게 전달",
          "대화 이력 저장",
        ],
        source:
          "https://github.com/billbill-umc/bilbil_backend/blob/main/src/ws.js",
        sourceLabel: "채팅 구현 코드",
      },
      {
        id: "duplicates",
        title: "사진이 여러 장이면 게시글도 중복되는 문제",
        summary: "조인 전에 게시글별 대표 이미지 하나를 선택했습니다.",
        problem:
          "게시글과 여러 이미지를 직접 조인하면서 게시글 하나가 목록에서 여러 행으로 나타났습니다.",
        solution:
          "삭제되지 않은 이미지 중 게시글별 최소 ID를 서브쿼리로 선택하고, 해당 이미지 한 건을 게시글과 조인하도록 변경했습니다.",
        result:
          "이미지 조인으로 인한 게시글 중복을 수정했으며 PR #90이 병합됐습니다.",
        skills: ["sql"],
        flow: [
          "게시글 + 이미지 여러 장",
          "게시글별 이미지 1개 선택",
          "대표 이미지 조인",
        ],
        source: "https://github.com/billbill-umc/bilbil_backend/pull/90",
        sourceLabel: "병합된 PR #90",
      },
      {
        id: "deployment",
        title: "코드 변경을 서버 배포까지 연결하기",
        summary: "GitHub Actions와 ECR·EC2로 배포 단계를 자동화했습니다.",
        problem:
          "배포할 버전의 코드를 이미지로 만들고 서버에 반영하는 과정을 일관되게 관리해야 했습니다.",
        solution:
          "publish 브랜치에 변경이 반영되면 GitHub Actions가 Docker 이미지를 빌드해 ECR에 올리고 EC2의 컨테이너를 갱신하도록 구성했습니다.",
        result:
          "브랜치 반영부터 이미지 배포까지 연결했습니다. 무중단 배포나 대규모 운영 성과를 주장하는 사례는 아닙니다.",
        skills: ["docker", "aws", "actions"],
        flow: ["publish 브랜치", "이미지 빌드", "ECR", "EC2 배포"],
        source:
          "https://github.com/billbill-umc/bilbil_backend/blob/main/.github/workflows/publish.yml",
        sourceLabel: "배포 워크플로",
      },
    ],
  },
  {
    id: "bot",
    name: "Discord 모집 봇",
    category: "PERSONAL TOOL",
    caption: "함께 플레이하기 위한 작은 자동화",
    summary:
      "Discord 안에서 모집글을 만들고 참가자를 관리하는 게임 커뮤니티용 도구입니다.",
    role: "Node.js·TypeScript로 모집 명령, 참가 관리, 메시지와 스레드 갱신을 구현했습니다.",
    context:
      "게임을 함께할 사람을 모으는 과정에는 반복되는 일이 많습니다. 일반·장기·정기 모집을 구분하고, 참가 상태를 Discord 화면과 연결했습니다.",
    features: [
      "일반·장기·정기 모집 생성과 편집",
      "참가자와 모집 스레드 관리",
      "활동 목록과 언어별 이름 설정",
    ],
    repo: "https://github.com/RFLXN/Discord-D2-LFG-Bot",
    stack: [
      { skill: "node", usage: "Discord 이벤트와 명령 처리" },
      { skill: "typescript", usage: "모집 유형과 이벤트 데이터 정의" },
      { skill: "typeorm", usage: "모집·참가자·메시지 데이터 저장" },
      { skill: "sql", usage: "SQLite 기반 영속 데이터 관리" },
    ],
    tools: ["Discord.js", "SQLite", "JSON Schema"],
    problems: [
      {
        id: "lifecycle",
        title: "모집 상태와 Discord 화면을 함께 갱신하기",
        summary: "모집 이벤트에 메시지·스레드 처리를 연결했습니다.",
        problem:
          "모집글이 수정되거나 삭제될 때, 목록 메시지와 개별 스레드에도 변경이 반영되어야 했습니다.",
        solution:
          "모집 생성·편집·삭제 이벤트에 핸들러를 연결하고 참가자, 메시지, 스레드 관리 책임을 나눴습니다. 이벤트에 따라 관련 Discord 리소스와 목록을 갱신했습니다.",
        result:
          "모집 종류별 명령과 화면 갱신을 연결했습니다. 외부 Discord API와 DB 변경 사이의 부분 실패 처리는 추가로 개선할 수 있는 영역입니다.",
        skills: ["node", "typescript", "typeorm"],
        flow: [
          "모집 명령",
          "모집 데이터 변경",
          "이벤트 핸들러",
          "메시지·스레드 갱신",
        ],
        source:
          "https://github.com/RFLXN/Discord-D2-LFG-Bot/blob/master/src/lfg/event-handler.ts",
        sourceLabel: "모집 이벤트 핸들러",
      },
      {
        id: "activities",
        title: "활동 목록을 코드 수정 없이 구성하기",
        summary: "활동과 번역 이름을 JSON 데이터로 분리했습니다.",
        problem:
          "모집할 활동과 언어별 표시 이름이 달라질 때마다 명령 구현까지 바꾸지 않도록 구성할 필요가 있었습니다.",
        solution:
          "활동 목록과 언어별 이름을 JSON에 두고 스키마를 정의했습니다. 이 데이터를 모집 명령에서 사용하도록 구성했습니다.",
        result:
          "활동 데이터와 명령 로직을 분리했습니다. 공개 버전의 활동 목록은 최대 25개라는 제약이 있습니다.",
        skills: ["typescript"],
        flow: ["활동 JSON", "스키마", "모집 명령 선택지"],
        source:
          "https://github.com/RFLXN/Discord-D2-LFG-Bot#activity-map-json-format",
        sourceLabel: "활동 설정 문서",
      },
    ],
  },
  {
    id: "innosheet",
    name: "이노시트",
    category: "FRONTEND",
    caption: "사용자가 직접 구성하는 CRM",
    summary:
      "고객 데이터에 필요한 속성을 직접 추가하고 관리하는 동적 테이블 기반 CRM입니다.",
    role: "Next.js·TypeScript 프론트엔드에서 테이블 UI, 인증 흐름, 상태 관리, API 연동과 배포를 담당했습니다.",
    context:
      "한국외대 캡스톤 프로젝트입니다. 고정된 열만 있는 테이블과 달리 사용자가 속성과 필터를 구성하는 화면을 구현하고 백엔드와 데이터 계약을 조율했습니다.",
    features: [
      "동적 속성을 갖는 고객 데이터 테이블",
      "조직·시트·필터 관리",
      "인증과 서버 API 연동",
    ],
    repo: "https://github.com/InnoSage/front-end",
    stack: [
      { skill: "typescript", usage: "시트·속성·딜 데이터 타입 정의" },
      { skill: "react", usage: "AG Grid·Mantine 기반 화면 구성" },
      { skill: "nextjs", usage: "페이지 구성과 서버 API 연동" },
      { skill: "zustand", usage: "시트와 필터 상태 관리" },
      { skill: "docker", usage: "Next.js 프로덕션 이미지 구성" },
      { skill: "aws", usage: "ECS·ECR 기반 배포 구성" },
    ],
    tools: ["AG Grid", "Mantine", "Cloudflare"],
    problems: [
      {
        id: "dynamic-sheet",
        title: "사용자마다 다른 속성을 테이블에 표현하기",
        summary: "시트의 속성·딜·필터를 상태로 관리했습니다.",
        problem:
          "사용자가 속성을 추가하거나 필터를 바꾸면 테이블이 같은 데이터 구조를 기준으로 갱신되어야 했습니다.",
        solution:
          "AG Grid로 테이블 UI를 구성하고, 시트의 속성·회사·딜·필터를 Zustand 스토어에 정리했습니다. API 연동과 데이터 변환을 분리해 화면에 연결했습니다.",
        result:
          "동적 테이블 UI와 API 연동을 구현했습니다. 당시 상태 관리와 일정 배분의 어려움은 회고에 남겼습니다.",
        skills: ["react", "nextjs", "typescript", "zustand"],
        flow: ["서버 데이터", "시트 상태", "속성·필터 반영", "테이블 UI"],
        source: "https://github.com/InnoSage/front-end/pull/22",
        sourceLabel: "병합된 API·상태 관리 PR",
      },
      {
        id: "api-contract",
        title: "새 속성을 만들었는데 식별할 ID가 없는 문제",
        summary: "화면에 필요한 응답 필드를 백엔드에 요청했습니다.",
        problem:
          "속성 생성 API가 attributeId를 반환하지 않아 화면에서 새 속성을 정확하게 식별하기 어려웠습니다.",
        solution:
          "생성 응답에 attributeId를 포함하도록 요청하는 이슈를 작성했습니다. 화면의 데이터 식별 요구를 API 계약으로 구체화했습니다.",
        result:
          "확인되는 기여는 API 변경 요청과 협업입니다. 백엔드 수정 구현을 담당했다는 의미는 아닙니다.",
        skills: ["typescript", "nextjs"],
        flow: ["속성 생성", "응답 ID 누락 확인", "API 변경 요청"],
        source: "https://github.com/InnoSage/CRM-BE/issues/58",
        sourceLabel: "작성한 이슈 #58",
      },
    ],
  },
  {
    id: "boopinion",
    name: "BOOPINION",
    category: "BACKEND",
    caption: "의견을 모으는 투표 플랫폼",
    summary:
      "투표를 만들고 선택지에 응답하며 의견을 나누는 웹 서비스의 백엔드 프로젝트입니다.",
    role: "NestJS 기반 투표 생성·조회 및 관련 API, DTO, 페이징과 공통 기능 구현에 기여했습니다.",
    context:
      "PnP 웹 프로젝트 팀에서 진행했습니다. 투표 본문과 선택지, 해시태그 등 서로 연결된 데이터를 API로 제공했습니다.",
    features: [
      "투표 생성·조회·수정·삭제 API",
      "선택지·해시태그와 관련 데이터 처리",
      "목록 페이징과 응답 DTO",
    ],
    repo: "https://github.com/BOOPINION/Vote-BE",
    stack: [
      { skill: "node", usage: "백엔드 애플리케이션 실행" },
      { skill: "typescript", usage: "요청·응답 DTO와 Result 타입" },
      { skill: "nestjs", usage: "Controller·Service·Module 구성" },
      { skill: "typeorm", usage: "투표와 관계 데이터 조회·저장" },
      { skill: "sql", usage: "MySQL 데이터 모델과 관계 처리" },
      { skill: "docker", usage: "프로덕션 컨테이너 설정" },
    ],
    tools: ["Swagger", "class-transformer"],
    problems: [
      {
        id: "relations",
        title: "투표·선택지·해시태그를 하나의 API로 다루기",
        summary: "관계 데이터를 저장하고 응답 DTO로 조합했습니다.",
        problem:
          "투표 한 건을 생성하거나 조회하려면 본문 외에도 선택지, 작성자와 해시태그를 함께 처리해야 했습니다.",
        solution:
          "NestJS 서비스에서 TypeORM으로 관련 엔티티를 조회·저장하고 DTO로 응답을 구성했습니다. 기존 해시태그와 새 해시태그를 구분해 연결했습니다.",
        result:
          "투표 생성과 관련 API 기여가 병합됐습니다. 여러 저장 작업을 명시적 트랜잭션으로 묶는 부분은 당시 구현의 개선 과제입니다.",
        skills: ["nestjs", "typeorm", "sql", "typescript"],
        flow: ["요청 DTO", "투표·선택지 저장", "해시태그 연결", "응답 DTO"],
        source: "https://github.com/BOOPINION/Vote-BE/pull/23",
        sourceLabel: "병합된 투표 생성 PR",
      },
      {
        id: "pagination",
        title: "투표 목록을 필요한 만큼 조회하기",
        summary: "페이지와 크기를 받아 조회 범위를 계산했습니다.",
        problem:
          "목록을 한 번에 모두 전달하지 않고 요청한 페이지에 해당하는 데이터만 반환해야 했습니다.",
        solution:
          "page와 size를 기준으로 skip·take를 계산하고, 작성자·해시태그 관계를 포함해 목록 응답으로 변환했습니다.",
        result:
          "페이지 크기를 지정할 수 있는 목록 API를 구현했습니다. 큰 오프셋에서의 성능은 별도 검증이 필요한 영역입니다.",
        skills: ["nestjs", "typeorm", "sql"],
        flow: [
          "page · size",
          "조회 범위 계산",
          "관계 데이터 조회",
          "목록 응답",
        ],
        source: "https://github.com/BOOPINION/Vote-BE/pull/39",
        sourceLabel: "페이지 크기 추가 PR",
      },
    ],
  },
  {
    id: "jisakupc",
    name: "JisakuPC",
    category: "JAVA WEB",
    caption: "직접 고르고 공유하는 나만의 PC",
    summary:
      "PC 부품을 검색하고 견적을 구성하며 자신의 PC 구성을 공유하는 웹 애플리케이션입니다.",
    role: "일본 유학 중 졸업작품 팀장을 맡아 설계와 개발을 총괄했습니다.",
    context:
      "Tokyo Technical College 정보처리과에서 배운 Java·DB·객체지향 개념을 웹 서비스로 연결했습니다. 일본인 팀원들과 협업하며 프로젝트를 이끌었습니다.",
    features: [
      "부품·사양 검색과 PC 견적 저장",
      "Rakuten 상품·가격 정보 연동",
      "사용자 구성 게시글과 관리 기능",
    ],
    repo: "https://github.com/RFLXN/JisakuPC",
    stack: [
      { skill: "java", usage: "Servlet/JSP·Command·DAO 기반 웹 애플리케이션" },
      { skill: "sql", usage: "MySQL·JDBC 기반 부품·견적·사용자 데이터 관리" },
    ],
    tools: ["Servlet/JSP", "JDBC", "Rakuten API", "Bootstrap", "jQuery"],
    problems: [
      {
        id: "external-api",
        title: "외부 상품 정보를 서비스 데이터로 연결하기",
        summary: "Rakuten 응답을 Java 객체로 변환했습니다.",
        problem:
          "부품 검색과 가격 표시에 사용할 외부 상품 데이터를 애플리케이션의 처리 구조에 맞춰야 했습니다.",
        solution:
          "API 요청, JSON 파싱, Java Bean 변환을 분리했습니다. Command에서 변환된 상품 정보를 사용할 수 있도록 래퍼를 구성했습니다.",
        result: "상품 검색·가격 정보 연동을 구현했고 관련 PR이 병합됐습니다.",
        skills: ["java"],
        flow: ["Rakuten 요청", "JSON 파싱", "Java Bean", "Command·화면"],
        source: "https://github.com/RFLXN/JisakuPC/pull/1",
        sourceLabel: "Rakuten API 병합 PR",
      },
      {
        id: "structure",
        title: "여러 웹 기능의 처리 책임을 나누기",
        summary: "Controller·Command·DAO로 역할을 나눴습니다.",
        problem:
          "로그인, 부품 검색, 견적 저장과 게시글 등 여러 요청을 같은 애플리케이션에서 관리해야 했습니다.",
        solution:
          "Servlet과 Controller가 요청을 받고 Command가 기능을 처리하도록 구성했습니다. DB 접근은 DAO로 분리하고 부품 사양은 MySQL JSON 데이터로 표현했습니다.",
        result:
          "객체지향 학습을 실제 웹 서비스 구조로 옮겼습니다. 팀 리딩 경험은 Experiences에서 함께 소개합니다.",
        skills: ["java", "sql"],
        flow: ["Servlet", "Controller · Command", "DAO", "MySQL"],
        source: "https://github.com/RFLXN/JisakuPC/tree/master/src",
        sourceLabel: "애플리케이션 구조",
      },
    ],
  },
];
export interface Skill {
  id: SkillId;
  name: string;
  group: string;
  description: string;
}
export const skills: Skill[] = [
  {
    id: "node",
    name: "Node.js",
    group: "Backend",
    description: "웹 API와 이벤트 기반 도구를 구현하는 주된 실행 환경입니다.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    group: "Backend",
    description:
      "데이터 구조와 함수의 계약을 타입으로 표현하고, 프론트엔드와 백엔드에서 사용합니다.",
  },
  {
    id: "express",
    name: "Express",
    group: "Backend",
    description:
      "라우터와 미들웨어를 구성하고 인증·서비스 로직을 API로 제공합니다.",
  },
  {
    id: "nestjs",
    name: "NestJS",
    group: "Backend",
    description: "모듈·컨트롤러·서비스와 DTO로 백엔드의 책임을 나눕니다.",
  },
  {
    id: "java",
    name: "Java",
    group: "Backend",
    description:
      "객체지향과 DB 학습을 바탕으로 Servlet/JSP 웹 애플리케이션을 구현했습니다.",
  },
  {
    id: "sql",
    name: "SQL / 관계형 DB",
    group: "Data & Realtime",
    description:
      "MySQL·SQLite에서 관계 데이터를 다루고 조회, 조인, 페이징을 구현했습니다.",
  },
  {
    id: "redis",
    name: "Redis",
    group: "Data & Realtime",
    description:
      "실시간 메시지 전달을 위한 Pub/Sub와 캐시 용도로 사용했습니다.",
  },
  {
    id: "socketio",
    name: "Socket.io",
    group: "Data & Realtime",
    description:
      "사용자 연결을 확인하고 채팅방별 메시지 이벤트를 처리했습니다.",
  },
  {
    id: "typeorm",
    name: "TypeORM",
    group: "Data & Realtime",
    description:
      "엔티티와 관계를 정의해 서비스 데이터를 조회하고 저장했습니다.",
  },
  {
    id: "react",
    name: "React",
    group: "Frontend",
    description: "상태에 따라 바뀌는 데이터 중심의 인터페이스를 구성합니다.",
  },
  {
    id: "nextjs",
    name: "Next.js",
    group: "Frontend",
    description: "페이지 구성, 인증 흐름과 서버 API 연동에 사용했습니다.",
  },
  {
    id: "zustand",
    name: "Zustand",
    group: "Frontend",
    description:
      "시트와 속성, 필터처럼 여러 화면에서 공유하는 상태를 관리했습니다.",
  },
  {
    id: "docker",
    name: "Docker",
    group: "Deployment",
    description:
      "애플리케이션을 컨테이너 이미지로 패키징하고 실행 환경을 구성합니다.",
  },
  {
    id: "aws",
    name: "AWS",
    group: "Deployment",
    description:
      "프로젝트에 맞춰 컴퓨팅·DB·캐시·스토리지와 이미지 저장소를 구성했습니다.",
  },
  {
    id: "actions",
    name: "GitHub Actions",
    group: "Deployment",
    description: "코드 반영부터 이미지 빌드와 서버 배포까지 자동화했습니다.",
  },
  {
    id: "linux",
    name: "Linux / NixOS",
    group: "Deployment",
    description:
      "일상적인 데스크톱과 홈서버를 Linux로 운영하고, 설정을 코드로 관리합니다.",
  },
];
export const findSkill = (id: SkillId) => skills.find((s) => s.id === id)!;
export const skillProjects = (id: SkillId) =>
  projects.filter((p) => p.stack.some((s) => s.skill === id));
