# 사용 가능한 도구 목록

## 1. 코드베이스 검색 (codebase_search)

코드베이스에서 검색 쿼리와 가장 관련성이 높은 코드 스니펫을 찾는 의미론적 검색 도구입니다.

**매개변수:**
- `query` (필수): 관련 코드를 찾기 위한 검색 쿼리
- `explanation`: 이 도구를 사용하는 이유와 목표에 기여하는 방법에 대한 한 문장 설명
- `target_directories`: 검색할 디렉토리의 글로브 패턴

## 2. 파일 읽기 (read_file)

파일의 내용을 읽습니다. 이 도구 호출의 출력은 start_line_one_indexed부터 end_line_one_indexed_inclusive까지의 1-인덱스 파일 내용과 함께 start_line_one_indexed 및 end_line_one_indexed_inclusive 외부 라인의 요약을 제공합니다.

**매개변수:**
- `target_file` (필수): 읽을 파일의 경로
- `should_read_entire_file` (필수): 전체 파일을 읽을지 여부
- `start_line_one_indexed` (필수): 읽기 시작할 1-인덱스 라인 번호
- `end_line_one_indexed_inclusive` (필수): 읽기를 끝낼 1-인덱스 라인 번호
- `explanation`: 이 도구를 사용하는 이유와 목표에 기여하는 방법에 대한 한 문장 설명

## 3. 터미널 명령 실행 (run_terminal_cmd)

사용자를 대신하여 실행할 명령을 제안합니다.

**매개변수:**
- `command` (필수): 실행할 터미널 명령
- `is_background` (필수): 명령을 백그라운드에서 실행할지 여부
- `require_user_approval` (필수): 실행 전에 사용자가 명령을 승인해야 하는지 여부
- `explanation`: 이 명령을 실행해야 하는 이유와 목표에 기여하는 방법에 대한 한 문장 설명

## 4. 디렉토리 목록 (list_dir)

디렉토리의 내용을 나열합니다. 의미론적 검색이나 파일 읽기와 같은 더 대상화된 도구를 사용하기 전에 사용할 수 있는 빠른 도구입니다.

**매개변수:**
- `relative_workspace_path` (필수): 워크스페이스 루트를 기준으로 내용을 나열할 경로
- `explanation`: 이 도구를 사용하는 이유와 목표에 기여하는 방법에 대한 한 문장 설명

## 5. 그렙 검색 (grep_search)

파일이나 디렉토리 내에서 정확한 패턴 일치를 찾는 빠른 텍스트 기반 정규식 검색입니다.

**매개변수:**
- `query` (필수): 검색할 정규식 패턴
- `explanation`: 이 도구를 사용하는 이유와 목표에 기여하는 방법에 대한 한 문장 설명
- `case_sensitive`: 검색이 대소문자를 구분해야 하는지 여부
- `exclude_pattern`: 제외할 파일의 글로브 패턴
- `include_pattern`: 포함할 파일의 글로브 패턴

## 6. 파일 편집 (edit_file)

기존 파일에 대한 편집을 제안하는 도구입니다.

**매개변수:**
- `target_file` (필수): 수정할 대상 파일
- `instructions` (필수): 스케치된 편집에 대한 설명
- `code_edit` (필수): 편집하려는 코드의 정확한 라인 지정

## 7. 파일 검색 (file_search)

파일 경로에 대한 퍼지 매칭을 기반으로 한 빠른 파일 검색입니다.

**매개변수:**
- `query` (필수): 검색할 퍼지 파일 이름
- `explanation` (필수): 이 도구를 사용하는 이유와 목표에 기여하는 방법에 대한 한 문장 설명

## 8. 파일 삭제 (delete_file)

지정된 경로에서 파일을 삭제합니다.

**매개변수:**
- `target_file` (필수): 삭제할 파일의 경로
- `explanation`: 이 도구를 사용하는 이유와 목표에 기여하는 방법에 대한 한 문장 설명

## 9. 재적용 (reapply)

지정된 파일에 마지막 편집을 적용하기 위해 더 스마트한 모델을 호출합니다.

**매개변수:**
- `target_file` (필수): 마지막 편집을 재적용할 파일의 상대 경로

## 10. 웹 검색 (web_search)

모든 주제에 대한 실시간 정보를 웹에서 검색합니다.

**매개변수:**
- `search_term` (필수): 웹에서 검색할 검색어
- `explanation`: 이 도구를 사용하는 이유와 목표에 기여하는 방법에 대한 한 문장 설명

## 11. 차이점 이력 (diff_history)

워크스페이스의 파일에 최근 변경된 이력을 검색합니다.

**매개변수:**
- `explanation`: 이 도구를 사용하는 이유와 목표에 기여하는 방법에 대한 한 문장 설명

## 12. 순차적 사고 (mcp__sequentialthinking)

생각을 통한 동적이고 반성적인 문제 해결을 위한 상세한 도구입니다.

**매개변수:**
- `thought` (필수): 현재 사고 단계
- `nextThoughtNeeded` (필수): 다른 사고 단계가 필요한지 여부
- `thoughtNumber` (필수): 현재 사고 번호
- `totalThoughts` (필수): 필요한 총 사고 수 추정
- `branchId`: 브랜치 식별자
- `isRevision`: 이전 사고를 수정하는지 여부
- `revisesThought`: 재고려 중인 사고
- `branchFromThought`: 분기점 사고 번호
- `needsMoreThoughts`: 더 많은 사고가 필요한지 여부

## 모델 정보

- **모델**: claude-3-7-sonnet-20250219
- **topP**: 1
- **최대 토큰**: 8192/4096
- **온도**: 0.7 