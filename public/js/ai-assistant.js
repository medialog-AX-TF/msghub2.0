/**
 * AI 어시스턴트 기능 구현
 */
document.addEventListener('DOMContentLoaded', function() {
    // 요소 참조
    const toggleButton = document.getElementById('toggleAssistant');
    const sidebar = document.querySelector('.right-sidebar');
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const quickActionButtons = document.querySelectorAll('.btn-quick-action');
    
    // 사이드바 토글 기능
    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        // 아이콘 변경
        const icon = toggleButton.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('icon-minimize');
            icon.classList.add('icon-maximize');
        } else {
            icon.classList.remove('icon-maximize');
            icon.classList.add('icon-minimize');
        }
    });
    
    // 메시지 전송 기능
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // 사용자 메시지 추가
        addMessage(message, 'user');
        
        // 입력창 초기화
        userInput.value = '';
        
        // AI 응답 처리
        processUserMessage(message);
    }
    
    // 전송 버튼 클릭 이벤트
    sendButton.addEventListener('click', sendMessage);
    
    // 엔터키 입력 이벤트
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 빠른 액션 버튼 이벤트
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
    
    // 메시지 추가 함수
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '사용자' : 'AI';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatContainer.appendChild(messageDiv);
        
        // 스크롤을 최하단으로 이동
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // 사용자 메시지 처리 함수
    function processUserMessage(message) {
        // 로딩 표시
        const loadingMessage = '처리 중...';
        addMessage(loadingMessage, 'assistant');
        
        // 실제 API 호출 대신 setTimeout으로 지연 시뮬레이션
        setTimeout(() => {
            // 마지막 메시지(로딩 메시지) 제거
            chatContainer.removeChild(chatContainer.lastChild);
            
            // 메시지 내용에 따른 응답 생성
            let response = generateResponse(message);
            
            // AI 응답 추가
            addMessage(response, 'assistant');
        }, 1000);
    }
    
    // 응답 생성 함수 (실제로는 API 호출로 대체)
    function generateResponse(message) {
        message = message.toLowerCase();
        
        // 간단한 키워드 기반 응답
        if (message.includes('안녕') || message.includes('hello')) {
            return '안녕하세요! 메시지허브 AI 어시스턴트입니다. 무엇을 도와드릴까요?';
        } 
        else if (message.includes('문자') && message.includes('발송')) {
            return '문자 발송을 원하시나요? 먼저 템플릿을 선택하고 "휴대 메시지 발송" 버튼을 클릭하세요. 수신자 정보와 치환 태그 값을 입력한 후 발송하시면 됩니다.';
        }
        else if (message.includes('템플릿') && (message.includes('만들') || message.includes('생성'))) {
            return '템플릿 생성은 "템플릿 > RCS" 메뉴에서 가능합니다. "템플릿 등록" 버튼을 클릭하여 새 템플릿을 만들 수 있습니다.';
        }
        else if (message.includes('발송') && message.includes('상태')) {
            return '발송 상태는 "조회" 메뉴에서 확인할 수 있습니다. 발송 일자, 수신자 번호 등으로 검색하여 상태를 확인하세요.';
        }
        else if (message.includes('rcs')) {
            return 'RCS는 Rich Communication Services의 약자로, 기존 문자보다 풍부한 메시지 기능을 제공합니다. 이미지, 버튼, 지도 등을 포함할 수 있습니다.';
        }
        else if (message.includes('카카오')) {
            return '카카오톡 비즈메시지는 "발송 > 카카오톡" 메뉴에서 발송할 수 있습니다. 알림톡과 친구톡 두 가지 유형이 있습니다.';
        }
        else if (message.includes('야간') || message.includes('제한')) {
            return '야간 시간대(21:00~08:00)에는 정보성 메시지만 발송 가능합니다. 광고성 메시지는 해당 시간에 발송이 제한됩니다.';
        }
        else {
            return '죄송합니다. 질문을 이해하지 못했습니다. 문자 발송 방법, 템플릿 생성, 발송 상태 확인 등에 대해 물어보시면 도움을 드릴 수 있습니다.';
        }
    }
    
    // 빠른 액션 처리 함수
    function handleQuickAction(action) {
        let message = '';
        
        switch(action) {
            case 'send-message':
                message = '문자 발송 방법을 알려주세요.';
                break;
            case 'create-template':
                message = '템플릿을 어떻게 만들 수 있나요?';
                break;
            case 'check-status':
                message = '발송 상태는 어디서 확인할 수 있나요?';
                break;
            default:
                return;
        }
        
        // 사용자 입력창에 메시지 설정
        userInput.value = message;
        
        // 메시지 전송
        sendMessage();
    }
});

/**
 * 문자 발송 기능 구현
 */
document.addEventListener('DOMContentLoaded', function() {
    // 문자 발송 버튼 참조
    const sendSmsButton = document.querySelector('.action-buttons .btn-primary');
    
    if (sendSmsButton) {
        sendSmsButton.addEventListener('click', function() {
            // 선택된 템플릿이 있는지 확인
            const selectedTemplates = document.querySelectorAll('.data-table tbody input[type="checkbox"]:checked');
            
            if (selectedTemplates.length === 0) {
                // AI 어시스턴트를 통해 안내 메시지 표시
                const aiAssistant = document.querySelector('.ai-assistant-sidebar');
                
                if (aiAssistant && aiAssistant.classList.contains('collapsed')) {
                    // 사이드바가 접혀있으면 펼치기
                    document.getElementById('toggleAssistant').click();
                }
                
                // 메시지 추가
                const chatContainer = document.getElementById('chatContainer');
                const messageDiv = document.createElement('div');
                messageDiv.className = 'chat-message assistant';
                
                const avatar = document.createElement('div');
                avatar.className = 'message-avatar';
                avatar.textContent = 'AI';
                
                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.textContent = '발송할 템플릿을 선택해주세요. 체크박스를 클릭하여 하나 이상의 템플릿을 선택하세요.';
                
                messageDiv.appendChild(avatar);
                messageDiv.appendChild(messageContent);
                
                chatContainer.appendChild(messageDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                return;
            }
            
            // 실제로는 여기서 발송 모달 창을 띄우거나 발송 페이지로 이동
            // 예시를 위해 AI 어시스턴트를 통해 안내
            const aiAssistant = document.querySelector('.ai-assistant-sidebar');
            
            if (aiAssistant && aiAssistant.classList.contains('collapsed')) {
                // 사이드바가 접혀있으면 펼치기
                document.getElementById('toggleAssistant').click();
            }
            
            // 메시지 추가
            const chatContainer = document.getElementById('chatContainer');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message assistant';
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.textContent = 'AI';
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.textContent = `${selectedTemplates.length}개의 템플릿이 선택되었습니다. 수신자 정보와 치환 태그 값을 입력하는 화면으로 이동합니다. 필요한 정보를 입력한 후 발송 버튼을 클릭하세요.`;
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
            
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        });
    }
}); 