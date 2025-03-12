# 메시지허브 AI 어시스턴트

메시지허브 웹사이트에 AI 어시스턴트 기능을 추가한 프로젝트입니다. 사용자가 문자 발송 및 템플릿 관리를 더 쉽게 할 수 있도록 도와주는 우측 사이드바 형태의 AI 어시스턴트를 구현했습니다.

## 시스템 아키텍처

메시지허브 AI 어시스턴트는 다음과 같은 구조로 작동합니다:

```
웹사이트 <-> AI 어시스턴트 <-> LLM <-> 웹사이트 자동화
```

### 작동 흐름

1. **사용자 입력**: 사용자가 웹사이트의 AI 어시스턴트 사이드바에 자연어로 요청 입력
2. **AI 어시스턴트 처리**:
   - System Prompt: 어시스턴트의 역할과 기능 정의
   - Tools 정의: 웹사이트 자동화를 위한 도구 목록 및 스키마 제공
   - User Prompt: 사용자 요청을 LLM에 전달
3. **LLM 의도 분석**:
   - 사용자 의도 파악
   - 적절한 도구(tool) 선정
   - 필요한 파라미터 추출
4. **도구 실행**:
   - 선택된 도구에 파라미터 전달
   - 웹사이트의 특정 기능 실행 (메뉴 이동, 텍스트 입력 등)
5. **결과 반환**: 실행 결과를 사용자에게 표시

### LLM 모델 선택

메시지허브 AI 어시스턴트는 다양한 LLM 모델을 지원하며, 사용자 또는 관리자가 필요에 따라 선택할 수 있습니다:

- **Claude 모델**:
  - Claude 3 Opus: 가장 강력한 추론 및 복잡한 작업 처리 능력
  - Claude 3 Sonnet: 성능과 속도의 균형이 잘 맞는 중간 모델
  - Claude 3 Haiku: 빠른 응답 속도와 비용 효율성이 높은 경량 모델

- **OpenAI 모델**:
  - GPT-4o: 최신 멀티모달 기능과 고급 추론 능력
  - GPT-4: 복잡한 작업 및 고급 추론에 적합
  - GPT-3.5 Turbo: 빠른 응답과 비용 효율성이 높은 모델

- **기타 지원 모델**:
  - Gemini (Google): 멀티모달 기능 및 코드 생성에 강점
  - Llama 3 (Meta): 오픈소스 기반 모델로 자체 호스팅 가능
  - Mistral: 경량 모델로 자체 호스팅 환경에 적합

모델 선택은 관리자 설정에서 변경할 수 있으며, 각 모델의 특성에 따라 응답 품질, 속도, 비용이 달라질 수 있습니다.

### System Prompt 구성

System Prompt는 AI 어시스턴트의 역할과 기능을 정의하며 다음 요소를 포함합니다:

- 어시스턴트의 역할 및 목적 정의
- 메시지허브 웹사이트의 구조 및 기능 설명
- 도구 사용 지침 및 제약사항
- 응답 형식 및 스타일 가이드라인

### Tools 정의

웹사이트 자동화를 위한 도구 목록은 다음과 같습니다:

- `navigate_to`: 특정 메뉴 또는 URL로 이동
- `click_element`: 버튼, 링크, 체크박스 등 요소 클릭
- `input_text`: 텍스트 필드에 내용 입력
- `select_option`: 드롭다운 메뉴에서 옵션 선택
- `upload_file`: 파일 업로드 기능 실행
- `download_file`: 파일 다운로드 기능 실행
- `extract_data`: 웹 페이지에서 데이터 추출
- `fill_form`: 여러 필드가 있는 양식 자동 작성
- `submit_form`: 작성된 양식 제출
- `confirm_dialog`: 확인/취소 대화상자 응답

각 도구는 JSON 스키마 형식으로 정의되며, 필수 및 선택적 매개변수를 포함합니다.

## 주요 기능

1. **AI 어시스턴트 사이드바**
   - 우측에 위치한 접을 수 있는 사이드바
   - 사용자와 AI 간의 대화형 인터페이스
   - 문자 발송 및 템플릿 관리에 관한 도움말 제공

2. **자연어 기반 웹사이트 자동화**
   - 사용자 의도 파악 및 적절한 도구 선택
   - 웹사이트 내 메뉴 이동, 버튼 클릭, 텍스트 입력 등 자동화
   - 복잡한 작업 순서 자동 실행

3. **문자 발송 도우미**
   - 템플릿 선택 및 발송 과정 안내
   - 발송 오류 시 해결 방법 제안
   - 발송 결과 분석 및 보고서 생성

4. **LLM 모델 선택 및 관리**
   - 다양한 LLM 모델 지원 (Claude, GPT, Gemini 등)
   - 작업 특성에 따른 최적 모델 자동 선택
   - 모델 성능 모니터링 및 비용 최적화

## 프로젝트 구조

```
msghub/
├── index.html              # 메인 HTML 파일
├── public/
│   ├── css/
│   │   ├── styles.css      # 기본 스타일
│   │   └── ai-assistant.css # AI 어시스턴트 스타일
│   └── js/
│       ├── main.js         # 기본 JavaScript 기능
│       ├── ai-assistant.js # AI 어시스턴트 기능
│       └── tools/          # 웹사이트 자동화 도구
│           ├── navigation.js  # 메뉴 이동 도구
│           ├── interaction.js # 요소 상호작용 도구
│           └── data.js        # 데이터 처리 도구
├── server/
│   ├── llm/                # LLM 연동 모듈
│   │   ├── prompt.js       # 프롬프트 관리
│   │   ├── tools.js        # 도구 정의 및 스키마
│   │   └── models/         # LLM 모델 연동
│   │       ├── claude.js   # Claude 모델 연동
│   │       ├── openai.js   # OpenAI 모델 연동
│   │       └── others.js   # 기타 모델 연동
│   └── api/                # 백엔드 API
└── src/
    ├── components/         # 컴포넌트
    └── services/           # 서비스
```

## 설치 및 실행 방법

1. 저장소 클론
   ```
   git clone https://github.com/medialog-AX-TF/msghub2.0.git
   cd msghub2.0
   ```

2. 의존성 설치
   ```
   npm install
   ```

3. 환경 변수 설정
   ```
   cp .env.example .env
   # .env 파일에 LLM API 키 등 필요한 정보 입력
   # CLAUDE_API_KEY=your_claude_api_key
   # OPENAI_API_KEY=your_openai_api_key
   # GEMINI_API_KEY=your_gemini_api_key
   # DEFAULT_LLM_MODEL=claude-3-sonnet-20240229
   ```

4. 서버 실행
   ```
   npm run server
   ```

5. 클라이언트 실행
   ```
   npm run client
   ```

6. 브라우저에서 접속
   ```
   http://localhost:3000
   ```

## AI 어시스턴트 사용 방법

1. 우측 사이드바의 AI 어시스턴트에 자연어로 요청 입력
   - 예: "광고성 RCS 템플릿 찾아서 발송해줘"
   - 예: "어제 발송한 메시지 결과 분석해줘"

2. AI 어시스턴트가 의도를 파악하고 적절한 작업 실행
   - 메뉴 자동 이동
   - 필요한 정보 요청
   - 양식 자동 작성

3. 작업 진행 상황 및 결과 확인
   - 실행 중인 작업 표시
   - 완료된 작업 결과 보고
   - 추가 작업 제안

4. LLM 모델 선택 (관리자 설정)
   - 설정 메뉴에서 기본 LLM 모델 선택
   - 작업별 최적 모델 자동 선택 설정
   - API 키 및 모델 파라미터 설정

## 향후 개발 계획

1. 고급 LLM 모델 연동 확장
   - 추가 모델 지원 (Cohere, Mistral AI 등)
   - 모델 체인 및 앙상블 기법 적용
   - 자체 파인튜닝 모델 지원

2. 사용자 맞춤형 추천 기능 추가
3. 발송 이력 분석 및 최적 발송 시간 추천
4. 다국어 지원
5. 음성 인식을 통한 프롬프트 입력 지원

## 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (ES6+), React
- **백엔드**: Node.js, Express
- **LLM 연동**: 
  - Anthropic Claude API
  - OpenAI API
  - Google Gemini API
  - 기타 LLM API (Cohere, Mistral 등)
- **데이터베이스**: MongoDB
- **배포**: Docker, AWS

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 