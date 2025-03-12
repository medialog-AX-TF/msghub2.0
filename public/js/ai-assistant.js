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

// AI 어시스턴트 관련 자바스크립트

// AI 어시스턴트 클래스
class AIAssistant {
    constructor() {
        this.container = document.querySelector('.ai-assistant');
        this.chat = document.querySelector('.ai-chat');
        this.form = document.querySelector('.ai-input-form');
        this.input = document.querySelector('.ai-input-textarea');
        this.sendButton = document.querySelector('.ai-send-btn');
        this.toggleButton = document.querySelector('.ai-toggle');
        this.closeButton = document.querySelector('.ai-controls button:nth-child(2)');
        this.minimizeButton = document.querySelector('.ai-controls button:nth-child(1)');
        this.quickActionButtons = document.querySelectorAll('.quick-action-btn');
        this.modelInfo = document.querySelector('.ai-model-info');
        this.modelSettings = document.querySelector('.ai-model-settings');
        
        this.currentModel = 'Claude 3 Opus';
        this.isProcessing = false;
        
        this.init();
    }
    
    init() {
        // 이벤트 리스너 등록
        this.registerEventListeners();
        
        // 초기 웰컴 메시지
        setTimeout(() => {
            this.addMessage('안녕하세요! 메시지허브 AI 어시스턴트입니다. 무엇을 도와드릴까요?', 'ai');
        }, 500);
    }
    
    registerEventListeners() {
        // 토글 버튼
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggleAssistant());
        }
        
        // 닫기 버튼
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.closeAssistant());
        }
        
        // 최소화 버튼
        if (this.minimizeButton) {
            this.minimizeButton.addEventListener('click', () => this.minimizeAssistant());
        }
        
        // 메시지 전송 폼
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // 입력창 자동 높이 조절
        if (this.input) {
            this.input.addEventListener('input', () => this.adjustInputHeight());
            
            // Enter 키로 전송 (Shift+Enter는 줄바꿈)
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.form.dispatchEvent(new Event('submit'));
                }
            });
        }
        
        // 빠른 액션 버튼
        if (this.quickActionButtons.length) {
            this.quickActionButtons.forEach(button => {
                button.addEventListener('click', (e) => this.handleQuickAction(e));
            });
        }
        
        // 모델 설정 버튼
        if (this.modelSettings) {
            this.modelSettings.addEventListener('click', () => this.showModelSettings());
        }
    }
    
    // AI 어시스턴트 토글
    toggleAssistant() {
        if (this.container) {
            this.container.classList.toggle('active');
        }
    }
    
    // AI 어시스턴트 닫기
    closeAssistant() {
        if (this.container) {
            this.container.classList.remove('active');
        }
    }
    
    // AI 어시스턴트 최소화
    minimizeAssistant() {
        if (this.container) {
            this.container.classList.toggle('minimized');
            
            // 아이콘 변경
            const icon = this.minimizeButton.querySelector('i');
            if (icon) {
                if (this.container.classList.contains('minimized')) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                } else {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
        }
    }
    
    // 메시지 전송 처리
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.isProcessing) return;
        
        const message = this.input.value.trim();
        if (message) {
            // 사용자 메시지 추가
            this.addMessage(message, 'user');
            
            // 입력창 초기화
            this.input.value = '';
            this.adjustInputHeight();
            
            // 처리 중 상태로 변경
            this.isProcessing = true;
            this.sendButton.disabled = true;
            
            // AI 응답 처리 (실제로는 서버 API 호출)
            this.processUserMessage(message);
        }
    }
    
    // 사용자 메시지 처리 및 AI 응답 생성
    processUserMessage(message) {
        // 로딩 표시
        this.showTypingIndicator();
        
        // 실제 구현에서는 서버 API 호출
        setTimeout(() => {
            // 로딩 표시 제거
            this.hideTypingIndicator();
            
            // 메시지 내용에 따른 응답 생성 (데모용)
            let response = '';
            
            if (message.includes('템플릿') && message.includes('찾아')) {
                response = '템플릿 검색 결과입니다:<br><br>' +
                           '1. <b>7월 프로모션 안내</b> (TP00123) - 카카오톡 알림톡<br>' +
                           '2. <b>여름 이벤트 안내</b> (TP00119) - RCS<br><br>' +
                           '어떤 템플릿으로 발송하시겠어요?';
            } else if (message.includes('발송') || message.includes('보내')) {
                response = '메시지 발송을 도와드리겠습니다. 어떤 템플릿으로 발송하시겠어요?<br><br>' +
                           '최근 사용한 템플릿:<br>' +
                           '- 7월 프로모션 안내<br>' +
                           '- 배송 완료 안내<br>' +
                           '- 결제 완료 안내';
            } else if (message.includes('통계') || message.includes('결과')) {
                response = '최근 발송 결과입니다:<br><br>' +
                           '- 총 발송: 1,245건<br>' +
                           '- 성공: 1,230건 (98.8%)<br>' +
                           '- 실패: 15건 (1.2%)<br><br>' +
                           '자세한 통계를 확인하시겠어요?';
            } else if (message.includes('도움말') || message.includes('사용법')) {
                response = '메시지허브 사용 가이드입니다:<br><br>' +
                           '1. <b>템플릿 검색</b>: "7월 프로모션 템플릿 찾아줘"<br>' +
                           '2. <b>메시지 발송</b>: "고객들에게 이벤트 안내 발송해줘"<br>' +
                           '3. <b>발송 결과 확인</b>: "오늘 발송 결과 보여줘"<br>' +
                           '4. <b>템플릿 생성</b>: "새 알림톡 템플릿 만들어줘"';
            } else {
                response = '죄송합니다. 요청하신 내용을 정확히 이해하지 못했습니다. 다음과 같은 작업을 도와드릴 수 있습니다:<br><br>' +
                           '- 템플릿 검색 및 발송<br>' +
                           '- 발송 결과 조회<br>' +
                           '- 새 템플릿 생성<br>' +
                           '- 메시지 예약 발송';
            }
            
            // AI 응답 추가
            this.addMessage(response, 'ai');
            
            // 처리 완료 상태로 변경
            this.isProcessing = false;
            this.sendButton.disabled = false;
        }, 1500);
    }
    
    // 메시지 추가
    addMessage(text, sender) {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const messageHTML = `
            <div class="chat-message ${sender === 'user' ? 'user' : ''}">
                <div class="chat-avatar ${sender}">
                    <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
                </div>
                <div>
                    <div class="chat-bubble">${text}</div>
                    <div class="chat-time">${timeString}</div>
                </div>
            </div>
        `;
        
        this.chat.insertAdjacentHTML('beforeend', messageHTML);
        
        // 스크롤을 최하단으로 이동
        this.scrollToBottom();
    }
    
    // 입력창 높이 자동 조절
    adjustInputHeight() {
        if (this.input) {
            this.input.style.height = 'auto';
            this.input.style.height = (this.input.scrollHeight) + 'px';
            
            // 최대 높이 제한
            if (this.input.scrollHeight > 150) {
                this.input.style.height = '150px';
                this.input.style.overflowY = 'auto';
            } else {
                this.input.style.overflowY = 'hidden';
            }
        }
    }
    
    // 빠른 액션 버튼 처리
    handleQuickAction(e) {
        const action = e.target.textContent.trim();
        
        if (this.input) {
            this.input.value = action;
            this.input.focus();
            this.adjustInputHeight();
        }
    }
    
    // 타이핑 표시기 추가
    showTypingIndicator() {
        const typingHTML = `
            <div class="chat-message typing-indicator">
                <div class="chat-avatar ai">
                    <i class="fas fa-robot"></i>
                </div>
                <div>
                    <div class="chat-bubble">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
            </div>
        `;
        
        this.chat.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }
    
    // 타이핑 표시기 제거
    hideTypingIndicator() {
        const typingIndicator = this.chat.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // 스크롤을 최하단으로 이동
    scrollToBottom() {
        if (this.chat) {
            this.chat.scrollTop = this.chat.scrollHeight;
        }
    }
    
    // 모델 설정 표시
    showModelSettings() {
        // 실제 구현에서는 모달 또는 드롭다운 메뉴 표시
        alert('AI 모델 설정은 .env 파일에서 변경할 수 있습니다.');
    }
}

// DOM이 로드된 후 AI 어시스턴트 초기화
document.addEventListener('DOMContentLoaded', function() {
    // AI 어시스턴트 CSS 추가
    addTypingIndicatorStyles();
    
    // AI 어시스턴트 인스턴스 생성
    window.aiAssistant = new AIAssistant();
});

// 타이핑 표시기 스타일 추가
function addTypingIndicatorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator .chat-bubble {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            padding: 12px 15px;
        }
        
        .typing-indicator .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #999;
            margin: 0 2px;
            animation: typing-animation 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator .dot:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-indicator .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-indicator .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing-animation {
            0%, 80%, 100% { 
                transform: scale(0.8);
                opacity: 0.6;
            }
            40% { 
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .ai-assistant.minimized .ai-chat,
        .ai-assistant.minimized .ai-quick-actions,
        .ai-assistant.minimized .ai-input,
        .ai-assistant.minimized .ai-model-info {
            display: none;
        }
    `;
    document.head.appendChild(style);
} 