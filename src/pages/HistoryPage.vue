<template>
  <div class="chat-interface">
    <div class="chat-header">
      <h1 class="chat-title">سجل المحادثات</h1>
      <p class="chat-description">هنا يمكنك استعراض سجل محادثاتك السابقة مع المساعد الذكي.</p>
    </div>
    <div class="chat-content no-header">
      <div class="messages-container history-list">
        <div v-for="chat in chatHistory" :key="chat.id" class="history-item">
          <div class="history-title">{{ chat.title }}</div>
          <div class="history-meta">
            <span class="history-date">{{ chat.date }}</span>
            <span class="history-time">{{ chat.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const chatHistory = ref([
  { id: 1, title: 'استشارة حول تطوير الأعمال', date: '2024-05-01', time: '10:30' },
  { id: 2, title: 'مناقشة حول إدارة المخاطر', date: '2024-05-02', time: '14:15' },
  { id: 3, title: 'استفسار عن الامتثال القانوني', date: '2024-05-03', time: '09:00' },
  { id: 4, title: 'تحليل تقرير الأداء السنوي', date: '2024-05-04', time: '16:45' },
  { id: 5, title: 'طلب نصائح حول القيادة', date: '2024-05-05', time: '11:20' },
  { id: 6, title: 'مراجعة خطة التسويق', date: '2024-05-06', time: '13:05' },
  { id: 7, title: 'محادثة عامة عن الذكاء الاصطناعي', date: '2024-05-07', time: '17:30' },
])
</script>

<style scoped lang="scss">

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
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(127,156,245,0.05) transparent;

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
}

.chat-header {
  text-align: center;
  padding: 60px 20px 40px;
  z-index: 2;
  .chat-title {
    font-size: 36px;
    font-weight: 600;
    margin: 0 0 15px 0;
    color: white;
    direction: rtl;
  }
  .chat-description {
    font-size: 16px;
    opacity: 0.8;
    margin: 0;
    font-weight: 300;
    direction: rtl;
  }
}

.chat-content.no-header {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.messages-container.history-list {
  flex: 1;
  min-height: 200px;
  padding: 0;
  direction: rtl;
  .history-item {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    padding: 18px 24px;
    margin-bottom: 18px;
    display: flex;
    transition: background 0.2s;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    &:hover {
      background: rgba(127,156,245,0.10);
    }
    .history-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #fff;
      direction: rtl;
      text-align: right;
    }
    .history-meta {
      display: flex;
      gap: 16px;
      font-size: 14px;
      color: #bfc9e0;
      direction: rtl;
      text-align: right;
    }
  }
}
</style>