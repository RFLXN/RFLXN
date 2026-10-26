# rflxn desktop

Vite + React + TypeScript + Zustand로 만든 개인 포트폴리오 사이트입니다.

## 실행

```sh
nix develop
npm ci
npm run dev
```

기존 `.envrc`의 `use flake`를 사용하므로 direnv 사용 시 `direnv allow`로도 진입할 수 있습니다. Node.js 24를 포함하며 `flake.lock`과 `package-lock.json`으로 의존성을 고정합니다.

```sh
npm run build  # TypeScript 검사 및 프로덕션 빌드
npm test       # 창 수명주기, 포커스, 크기 및 경계 처리 검증
npm run preview
```

## 구성

- `tests/store/`: 부팅·창·콘텐츠 경로 상태 테스트
- `tests/shell/`: 창 조작 및 프레임 처리 테스트

- `src/apps/registry.ts`: 바탕화면에 표시할 앱 정의 목록
- `src/apps/types.ts`: 앱 계약 (`AppDefinition`, `AppProps`)
- `src/apps/intro/Intro.tsx`: 부팅 완료 후 자동으로 열리는 사이트 소개·사용법 안내 앱
- `src/apps/profile/Profile.tsx`: 자기소개, 대표 바로가기, 연락처
- `src/shell/Desktop.tsx`: 상단 바, 바탕화면, 창 프레임 및 포인터 조작
- `src/store/bootStore.ts`: 부팅 시퀀스 상태 및 액션
- `src/store/windowStore.ts`: Zustand 기반 창 상태 및 변경 액션
- `src/store/windowState.ts`: 창 수명주기 및 경계 계산 순수 함수
- `src/shell/windowGesture.ts`: 프레임 단위 이동·크기 조절 컨트롤러
- `src/styles.css`: 바탕화면과 창의 시각 스타일

## 앱 추가 / 수정 / 제거

1. `src/apps/<app-name>/`에 React 컴포넌트를 작성합니다. `AppProps`의 `icon`으로 등록된 아이콘을 사용하고 `close()`로 자신의 창을 닫을 수 있습니다.
2. `registry.ts`에 고유 `id`, `title`, `description`, 크기별 Papirus SVG 경로를 담은 `icon`, `component`, `initialSize`를 등록합니다.
3. 바탕화면 바로가기와 실행 중인 앱 위젯은 자동 생성됩니다. 앱을 제거하려면 해당 등록을 삭제합니다. 앱 내용만 수정할 때는 셸을 변경할 필요가 없습니다.

앱별 창은 하나씩 열립니다. 다시 실행하면 기존 창을 앞으로 가져오고 최소화되어 있으면 복원합니다. 등록 순서가 바탕화면 앱 순서입니다.

## 조작

- 바탕화면 앱 클릭 또는 키보드 Enter/Space: 실행
- 제목 표시줄 드래그: 이동
- 창의 네 변 또는 모서리 드래그: 크기 조절
- 제목 표시줄 더블 클릭 또는 최대화 버튼: 최대화 / 복원
- 최소화 후 상단 중앙의 앱 아이콘 클릭: 복원
- 창 클릭 / 내부 컨트롤에 키보드 포커스: 앞으로 가져오기

창은 화면 경계를 벗어나지 않으며 화면이 작아지면 표시 가능한 크기로 맞춰집니다. 날짜와 시간은 방문자 기기의 현지 시간을 사용합니다. 현재 단계에서는 창 배치가 새로고침 후 저장되지 않습니다.

배경은 `output/`에서 가져온 도시 야경 이미지(`public/wallpapers/city-bokeh-4k-16x9.png`)을 중앙 기준 cover로 표시하고, 상단 바 오른쪽에 RFLXN 텍스트를 배치합니다. 폰트는 Google Fonts에서 불러오며 연결이 없으면 시스템 글꼴을 사용합니다. `rflxn` 표시는 교체할 수 있습니다.

## 아이콘

앱 아이콘은 Papirus 원본 SVG를 `public/icons/papirus/`에 포함하여 사용합니다. `AppIcon`은 16/22/48/64px 자산을 선택합니다. 새 앱은 레지스트리의 `icon`에 각 크기별 경로를 지정하세요. 창 조작 및 안내용 UI 기호는 Lucide를 사용합니다. Papirus 출처·고정 커밋·GPL-3.0 라이선스는 같은 자산 폴더에 포함되어 있습니다.

## 색상 테마

검정과 중성 회색 중심의 Charcoal 팔레트를 사용합니다. `src/styles.css` 상단 CSS 변수에 창·바·텍스트·강조색을 모았습니다. Papirus 아이콘과 배경 사진의 원래 색상은 유지합니다.

## 창 전환 효과

`src/shell/useAnimatedWindows.ts`에서 Web Animations API로 창과 상단 앱 위젯의 열기·닫기·최소화·복원을 연결합니다. 닫기/최소화는 전환이 끝난 후 상태에 반영하며, 진행 중 다시 열면 이전 종료 작업을 취소합니다. 위젯 너비는 CSS로 전환하고, 빈 상태와 앱 하나의 크기는 동일하게 유지합니다. `prefers-reduced-motion: reduce` 환경에서는 효과를 생략합니다.

## 이동·크기 조절 성능

창 상태는 Zustand 스토어에 저장합니다. 드래그 중 포인터 좌표는 React 상태에 넣지 않고 `requestAnimationFrame`으로 프레임당 한 번 해당 창에만 반영합니다. 이동은 CSS `translate`를 사용하고, 크기 조절은 창 크기를 직접 갱신합니다. 종료 시 마지막 좌표를 스토어에 한 번 저장하며 포인터 취소·캡처 해제·브라우저 포커스 해제도 처리합니다. 바탕화면 ResizeObserver는 한 번 연결하고 실제 뷰포트 변경 때만 경계를 재계산합니다.

## 부팅 화면

첫 방문과 새로고침마다 Linux 콘솔 스타일 로그가 표시됩니다. `src/config/boot.json`에서 설정합니다.

- `enabled`: `false`이면 부팅 화면 없이 바로 진입
- `title`: ASCII 로고. 줄별 문자열 배열 또는 `\n`이 포함된 문자열을 사용합니다. 공백·줄바꿈을 그대로 보존합니다.
- `titleLabel`: 스크린 리더용 로고 이름
- `subtitle`: 로고 아래 보조 문구
- `logs`: 위에서 아래로 출력할 로그 목록
- `logs[].text`: 출력할 문자열 (빈 문자열은 빈 줄). 상태 접두사는 넣지 않습니다.
- `logs[].type`: `plain`, `ok`, `skip`, `warn`, `fail`. 생략하거나 알 수 없는 값이면 `plain`. `plain`은 텍스트만 표시하고, 나머지는 `[ .... ]`로 시작해 `durationMs` 뒤 `[  OK  ]`, `[ SKIP ]`, `[ WARN ]`, `[ FAIL ]`로 바뀝니다. 완료와 동시에 다음 줄이 나타납니다.
- `logs[].durationMs`: 해당 줄이 나타난 후 **다음 줄까지 기다리는 시간** (밀리초). 이전 줄은 누적되어 남습니다. 마지막 줄은 이 시간만큼 유지한 뒤 데스크톱으로 전환합니다.
- `transitionMs`: 마지막 로그 완료 후 데스크톱으로 전환하기 전 대기 시간 (부팅 화면은 끝까지 불투명)

예시: `{ "type": "ok", "text": "Started window manager.", "durationMs": 300 }`

기본 로그 대기 시간 합계는 2.84초, 전환은 0.32초입니다. Esc 또는 건너뛰기로 즉시 전환할 수 있습니다. 로그는 연출용이며 실제 커널/서비스 상태를 조회하지 않습니다. 상태는 Zustand로 관리하고 페이지 로드 사이에는 저장하지 않습니다. 동작 줄이기 설정에서는 커서 깜빡임과 전환 대기를 생략합니다.

## 창 투명도

페이지와 데스크톱의 바닥 레이어는 불투명하게 유지하고, 사이트 창의 배경색에만 알파를 적용합니다. `--window-surface`와 `--window-header`로 농도를 조정합니다. 창의 글자·컨트롤에는 투명도를 적용하지 않습니다. OS 컴포지터가 브라우저 전체에 적용하는 투명도는 웹사이트에서 제어할 수 없습니다.

## Intro 자동 실행

접속·새로고침할 때마다 부팅 완료 후 Intro 창을 한 번 자동으로 엽니다. `src/store/visitStore.ts`는 해당 페이지에서 실행했는지만 메모리에 저장하므로, 사용자가 닫은 뒤에는 다시 자동 실행하지 않습니다. 과거 localStorage의 `rflxn-visit` 값은 더 이상 읽지 않습니다. 바탕화면 바로가기로 언제든 직접 열 수 있습니다.

## 콘텐츠 앱

- **Intro**: 자동 실행되는 사용 안내와 프로필 바로가기
- **Profile**: 소개, 학력과 연락처
- **Skills**: 기술별 사용 목적과 관련 프로젝트·문제 해결 사례
- **Projects**: Bilbil, Discord D2 LFG Bot, Innosheet, BOOPINION, JisakuPC
- **Experiences**: UMC 교육, 팀 리딩과 오픈소스 기여
- **Preference**: NixOS 개발 환경과 홈서버

Projects는 소개 / 스택 / 주요 문제로 구성합니다. 스택과 문제의 기술 버튼은 Skills로 이동하고, Skills의 사용 사례는 해당 프로젝트의 문제로 돌아갑니다. 주요 문제는 문제 → 해결 방식 → 결과와 배운 점 순서로 설명하며 원본 코드나 기여 기록을 연결합니다.

- `src/content/portfolio.ts`: 프로젝트, 기술, 문제 해결 사례 및 타입이 지정된 앱 이동 경로
- `src/apps/content.css`: 공통 콘텐츠 스타일과 창 너비에 따른 반응형 배치
- `src/store/contentStore.ts`: 앱별 선택 상태와 상세 경로 이동
- `tests/store/contentState.test.ts`: 양방향 이동, 선택 상태 및 콘텐츠 참조 검증

`openApp({ appId: "projects", item: "bilbil", problem: "chat" })`으로 특정 문제를 열 수 있습니다. 기존 창이 있으면 복원하고 앞으로 가져옵니다. `openApp({ appId: "skills", item: "redis" })`는 관련 기술을 엽니다. 프로젝트를 바꾸면 소개 탭으로 돌아가고, 문제를 지정하면 주요 문제 탭이 선택됩니다.

프로젝트와 기술의 연결은 프로젝트 데이터에서 계산하므로 기술별 프로젝트 목록을 별도로 관리하지 않습니다. 프로필과 연락처는 `portfolio.ts`, 경험과 개발 환경 소개는 각 앱 컴포넌트에서 수정합니다.

## 전체 글자 크기

상단 바 우측의 **S / M / L** 위젯으로 앱, 바탕화면, 상단 바, 부팅 로그의 글자 크기를 함께 조절합니다. 기본값은 **M**이며 기존 크기를 기준으로 S 100%, M 125%, L 150%입니다. 글꼴 크기는 `rem` 단위와 루트 크기(16/20/24px)를 사용하고, 창 크기·위치와 포인터 좌표에는 영향을 주지 않습니다.

`src/store/preferencesStore.ts`에서 Zustand 상태와 localStorage 키 `rflxn-text-size`를 관리합니다. 새로고침 후에도 유지되며, 저장소 접근이 제한된 환경에서도 현재 페이지의 변경은 작동합니다. `src/shell/TextSizeWidget.tsx`가 위젯과 루트 설정을 연결합니다.
