/**
 * 메시지허브 웹사이트 기본 기능
 */
document.addEventListener('DOMContentLoaded', function() {
    // 테이블 체크박스 전체 선택/해제 기능
    const tableHeaderCheckbox = document.querySelector('.data-table thead input[type="checkbox"]');
    const tableRowCheckboxes = document.querySelectorAll('.data-table tbody input[type="checkbox"]');
    
    if (tableHeaderCheckbox && tableRowCheckboxes.length > 0) {
        // 헤더 체크박스 이벤트
        tableHeaderCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            tableRowCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });
        
        // 개별 체크박스 이벤트
        tableRowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // 모든 체크박스가 선택되었는지 확인
                const allChecked = Array.from(tableRowCheckboxes).every(cb => cb.checked);
                tableHeaderCheckbox.checked = allChecked;
                
                // 일부만 선택되었는지 확인 (indeterminate 상태)
                const someChecked = Array.from(tableRowCheckboxes).some(cb => cb.checked);
                tableHeaderCheckbox.indeterminate = someChecked && !allChecked;
            });
        });
    }
    
    // 날짜 버튼 기능
    const dateButtons = document.querySelectorAll('.date-buttons .btn-date');
    const dateInputs = document.querySelectorAll('.date-range input[type="date"]');
    
    if (dateButtons.length > 0 && dateInputs.length === 2) {
        dateButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 모든 버튼에서 active 클래스 제거
                dateButtons.forEach(btn => btn.classList.remove('active'));
                
                // 클릭한 버튼에 active 클래스 추가
                this.classList.add('active');
                
                // 오늘 날짜
                const today = new Date();
                const endDate = formatDate(today);
                
                // 시작 날짜 계산
                let startDate;
                
                if (this.textContent === '전체') {
                    // 전체: 입력 필드 비우기
                    dateInputs[0].value = '';
                    dateInputs[1].value = '';
                    return;
                } else if (this.textContent === '15일') {
                    // 15일 전
                    const date = new Date(today);
                    date.setDate(today.getDate() - 15);
                    startDate = formatDate(date);
                } else if (this.textContent === '1개월') {
                    // 1개월 전
                    const date = new Date(today);
                    date.setMonth(today.getMonth() - 1);
                    startDate = formatDate(date);
                }
                
                // 날짜 입력 필드 업데이트
                dateInputs[0].value = startDate;
                dateInputs[1].value = endDate;
            });
        });
    }
    
    // 날짜 포맷 함수 (YYYY-MM-DD)
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // 테이블 행 클릭 이벤트 (상세 정보 보기)
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // 체크박스 클릭은 무시
            if (e.target.type === 'checkbox' || e.target.closest('input[type="checkbox"]')) {
                return;
            }
            
            // 선택한 행의 템플릿 ID 가져오기
            const templateId = this.cells[2].textContent;
            
            // 실제로는 여기서 템플릿 상세 정보 페이지로 이동하거나 모달 창 표시
            console.log(`템플릿 ID ${templateId}의 상세 정보 보기`);
            
            // 예시를 위해 AI 어시스턴트를 통해 안내
            const aiAssistant = document.querySelector('.ai-assistant-sidebar');
            const chatContainer = document.getElementById('chatContainer');
            
            if (aiAssistant && chatContainer) {
                if (aiAssistant.classList.contains('collapsed')) {
                    // 사이드바가 접혀있으면 펼치기
                    document.getElementById('toggleAssistant').click();
                }
                
                // 템플릿 정보 메시지 추가
                const templateName = this.cells[3].textContent;
                const templateChannel = this.cells[4].textContent;
                const messageType = this.cells[5].textContent;
                
                const messageDiv = document.createElement('div');
                messageDiv.className = 'chat-message assistant';
                
                const avatar = document.createElement('div');
                avatar.className = 'message-avatar';
                avatar.textContent = 'AI';
                
                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.textContent = `"${templateName}" 템플릿을 선택하셨습니다. 이 템플릿은 ${templateChannel} 채널의 ${messageType} 메시지입니다. 이 템플릿으로 메시지를 발송하시려면 체크박스를 선택한 후 "휴대 메시지 발송" 버튼을 클릭하세요.`;
                
                messageDiv.appendChild(avatar);
                messageDiv.appendChild(messageContent);
                
                chatContainer.appendChild(messageDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        });
    });
}); 