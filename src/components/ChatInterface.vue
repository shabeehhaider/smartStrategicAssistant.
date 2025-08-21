<template>
  <div class="chat-interface">
    <!-- Animated video background - only show when no messages -->
    <!-- <div v-if="messages.length === 0" class="video-background">
      <video 
        autoplay 
        muted 
        loop 
        playsinline
        class="background-video"
      >
        <source src="/src/assets/video/animated-lines.mp4" type="video/mp4">
      </video>
    </div> -->
    
    <div v-if="messages.length === 0" class="chat-header">
      <h1 class="chat-title">المساعد الاستراتيجي الذكي</h1>
      <!-- <h2 class="chat-subtitle">GRC Assistant</h2> -->
      <p class="chat-description">حلول استراتيجية ذكية لنمو مؤسستك..</p>
    </div>
    
    <div class="chat-content" :class="{ 'no-header': messages.length > 1 }">
      <div class="messages-container" ref="messagesContainer">
        <!-- Messages will be displayed here -->
        <div v-for="message in messages" :key="message.id" class="message" :class="message.type">
          <div class="message-content">
            <template v-if="message.type === 'assistant'">
              <template v-if="message.isLoading">
                <span class="typing-indicator" aria-label="loading">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </span>
              </template>
              <template v-else>
                {{ message.displayedContent !== undefined ? message.displayedContent : message.content }}
              </template>
            </template>
            <template v-else>
              {{ message.content }}
            </template>
          </div>
        </div>
      </div>
    </div>
    
    <div class="input-container">
      <div class="input-wrapper">
        <input 
          v-model="currentMessage" 
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="تفضل واسأل أي سؤال..."
          class="chat-input"
        />
        <button @click="sendMessage" class="send-button">
          <div class="send-icon"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const currentMessage = ref('')
const messages = ref([]) // Start with empty array - no initial message

const messagesContainer = ref(null)

function scrollToBottom() {
  nextTick(() => {
    setTimeout(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        console.log('Scrolled to bottom:', messagesContainer.value.scrollTop);
      } else {
        console.log('messagesContainer ref not found');
      }
    }, 50);
  });
}

watch(messages, () => {
  scrollToBottom();
}, { flush: 'post' })

onMounted(() => {
  scrollToBottom();
})

function sendMessage() {
  if (currentMessage.value.trim()) {
    // Add user message
    messages.value.push({
      id: Date.now(),
      type: 'user',
      content: currentMessage.value
    })

    // Clear input immediately
    currentMessage.value = ''

    // Add loading assistant message (three dots)
    const loadingId = Date.now() + 1
    messages.value.push({
      id: loadingId,
      type: 'assistant',
      content: '',
      displayedContent: '',
      isLoading: true
    })

    // Simulate fetching assistant response, then type word-by-word
    setTimeout(() => {
      const fullText = 'أفهم سؤالك. دعني أساعدك في ذلك...'

      // Find the loading message and start typing
      const idx = messages.value.findIndex(m => m.id === loadingId)
      if (idx !== -1) {
        const msg = messages.value[idx]
        msg.isLoading = false
        msg.displayedContent = ''

        const words = fullText.split(' ')
        let i = 0
        const interval = setInterval(() => {
          if (i < words.length) {
            // Add next word with a space if not the first
            msg.displayedContent += (i === 0 ? '' : ' ') + words[i]
            i++
            scrollToBottom()
          } else {
            clearInterval(interval)
            // typing finished — set full content (optional) and keep displayedContent
            msg.content = fullText
            msg.displayedContent = fullText
          }
        }, 120)
      }
    }, 800)
  }
}
</script>

<style lang="scss" scoped>
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$dark-bg: #2a2d3a;
$darker-bg: #1e1f2b;
$white15: rgba(255, 255, 255, 0.15);
$white25: rgba(255, 255, 255, 0.25);
$white50: rgba(255, 255, 255, 0.5);
$border-radius: 12px;

.chat-interface {
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  color: white;
  position: relative;
  margin: 20px 0 20px 10px;
  border-radius: 30px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.25);
  direction: rtl;
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  border-radius: 30px;
  pointer-events: none;
  
  .background-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    filter: blur(1px);
  }
}

.chat-header {
  text-align: center;
  padding: 60px 20px 40px;
  z-index: 2;
  flex-shrink: 0;
  position: relative;
  
  .chat-title {
    font-size: 36px;
    font-weight: 600;
    margin: 0 0 15px 0;
    color: white;
    direction: rtl;
  }
  
  .chat-subtitle {
    font-size: 32px;
    font-weight: 600;
    margin: 0 0 20px 0;
    background: linear-gradient(45deg, #64b5f6, #42a5f5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .chat-description {
    font-size: 16px;
    opacity: 0.8;
    margin: 0;
    font-weight: 300;
    direction: rtl;
  }
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  // Remove padding to allow scrollbar to reach the edge
  padding: 0;
}

.chat-content.no-header {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  // Remove padding to allow scrollbar to reach the edge  
  padding: 0;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  direction: rtl;
  padding: 20px 20px 20px 0;
  margin-left: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(127,156,245,0.05) transparent;
  direction: rtl;

  &::-webkit-scrollbar {
    width: 10px;
    background: transparent;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, rgba(127,156,245,0.7) 0%, rgba(95,108,175,0.7) 100%);
    border-radius: 8px;
    border: 2px solid transparent;
    box-shadow: 0 2px 8px rgba(127, 156, 245, 0.15);
    transition: background 0.3s;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgba(165,180,252,0.9) 0%, rgba(127,156,245,0.9) 100%);
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 8px;
  }

  .message {
    margin-bottom: 20px;
    display: flex;
    // Add left padding to compensate for container padding removal
    padding-left: 20px;
    
    &.user {
      justify-content: flex-end;
      .message-content {
        background: $white25;
        backdrop-filter: blur(20px);
        border: 1px solid $white25;
      }
    }
    &.assistant {
      justify-content: flex-start;
      .message-content {
        background: $white15;
        backdrop-filter: blur(20px);
        border: 1px solid $white15;
      }
    }
  }
  .message-content {
    max-width: 70%;
    padding: 15px 20px;
    border-radius: $border-radius;
    font-size: 14px;
    line-height: 1.5;
    display: inline-flex;
    align-items: center;
    white-space: pre-wrap;
  }

  // Typing indicator (three dots)
  .typing-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255,255,255,0.7);
      animation: typing-bounce 1.2s infinite ease-in-out;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
  }

  @keyframes typing-bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40% { transform: translateY(-4px); opacity: 1; }
  }
}

.input-container {
  flex-shrink: 0;
  // Ensure input doesn't interfere with scroll area
  z-index: 10;
  position: relative;
  // Keep original styling but ensure proper layering
  padding: 20px 0 0 0;
  margin: 0 -30px -30px -30px;
  padding: 20px 30px 30px 30px;
  
  .input-wrapper {
    display: flex;
    background: $white15;
    backdrop-filter: blur(30px);
    border: 1px solid $white25;
    border-radius: 25px;
    padding: 8px;
    align-items: center;
    text-align: right;
    direction: rtl;
    max-width: 800px;
    margin: 0 auto;
    
    .chat-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: white;
      font-size: 16px;
      padding: 12px 20px;
      text-align: right;
      
      &::placeholder {
        color: $white50;
        direction: rtl;
      }
    }
    
    .send-button {
      background: linear-gradient(45deg, #64b5f6, #42a5f5);
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
      
      &:hover {
        transform: scale(1.05);
      }
      
      .send-icon {
        width: 16px;
        height: 16px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .chat-header {
    padding: 40px 20px 30px;
    
    .chat-title {
      font-size: 36px;
    }
    
    .chat-subtitle {
      font-size: 24px;
    }
  }
  
  .messages-container .message-content {
    max-width: 85%;
  }
}</style>