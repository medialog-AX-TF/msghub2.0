# 메시지허브 (Message Hub)

메시지허브는 다양한 메시징 채널(SMS, LMS, MMS, RCS, 카카오톡 등)을 통합하여 관리하고 발송할 수 있는 웹 기반 메시징 플랫폼입니다. AI 어시스턴트를 통해 사용자 경험을 향상시키고 업무 효율성을 높이는 기능을 제공합니다.

## 주요 기능

- **통합 메시지 발송**: 다양한 채널(SMS, LMS, MMS, RCS, 카카오톡)을 통해 메시지 발송
- **템플릿 관리**: 자주 사용하는 메시지 템플릿 생성 및 관리
- **발송 결과 조회**: 메시지 발송 결과 및 통계 확인
- **AI 어시스턴트**: 자연어 명령을 통한 메시지 발송 및 템플릿 관리 자동화

## 시스템 아키텍처

메시지허브는 다음과 같은 구조로 설계되었습니다:

```
웹사이트 <-> AI 어시스턴트 <-> LLM <-> 웹사이트 자동화
```

### 작동 흐름

1. **사용자 입력**: 사용자가 AI 어시스턴트 사이드바를 통해 자연어로 요청을 입력합니다.
2. **AI 어시스턴트 처리**: 시스템 프롬프트, 도구 정의, 사용자 프롬프트를 포함한 컨텍스트를 LLM에 전달합니다.
3. **LLM 의도 분석**: LLM이 사용자의 의도를 분석하고 적절한 도구와 파라미터를 선택합니다.
4. **도구 실행**: 선택된 도구가 웹사이트의 특정 기능을 실행합니다.
5. **결과 반환**: 실행 결과가 사용자에게 반환됩니다.

## LLM 모델 선택

메시지허브는 다양한 LLM 모델을 지원하며, 기본적으로 Claude 3.7 Sonnet을 사용합니다:

### 지원 모델

1. **Claude 모델**
   - Claude 3.7 Sonnet: 기본 모델, 최적의 성능과 속도 균형 제공
   - Claude 3 Opus: 가장 강력한 성능, 복잡한 작업에 적합
   - Claude 3 Sonnet: 균형 잡힌 성능과 속도
   - Claude 3 Haiku: 빠른 응답 속도, 간단한 작업에 적합

2. **OpenAI 모델**
   - GPT-4o: 최신 멀티모달 모델, 이미지 처리 가능
   - GPT-4: 강력한 추론 능력
   - GPT-3.5 Turbo: 빠른 응답 속도, 비용 효율적

3. **기타 모델**
   - Gemini: Google의 LLM 모델
   - Llama 3: Meta의 오픈소스 모델
   - Mistral: 경량화된 고성능 모델

### 모델 설정

모델 선택은 .env 환경 설정 파일에서 변경할 수 있으며, 작업 특성에 따라 적절한 모델을 선택하는 것이 중요합니다.

```
# .env 파일 설정 예시
CLAUDE_API_KEY=your_claude_api_key
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key

# 기본 LLM 모델 설정
DEFAULT_LLM_MODEL=claude-3-7-sonnet
# 또는 DEFAULT_LLM_MODEL=gpt-4o, DEFAULT_LLM_MODEL=gemini-pro 등

# 모델 파라미터 설정
MODEL_TEMPERATURE=0.7
MODEL_MAX_TOKENS=8192
```

모델 변경 시 서버 재시작 또는 환경 변수 리로드가 필요합니다.

## 기술 스택

- **프론트엔드**: HTML, CSS, JavaScript
- **백엔드**: Node.js, Express
- **데이터베이스**: MongoDB
- **AI 통합**: Claude API, OpenAI API

## 설치 및 실행

1. 저장소 클론
   ```bash
   git clone https://github.com/yourusername/msghub.git
   cd msghub
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 환경 변수 설정
   ```bash
   cp .env.example .env
   # .env 파일을 편집하여 API 키 및 설정 추가
   ```

4. 서버 실행
   ```bash
   npm start
   ```

5. 브라우저에서 접속
   ```
   http://localhost:3000
   ```

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요. 