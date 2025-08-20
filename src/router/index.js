import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../pages/LoginPage.vue'
import ChatPage from '../pages/ChatPage.vue'
import HistoryPage from '../pages/HistoryPage.vue'

const routes = [
  { path: '/', redirect: '/chat' },
  { path: '/login', name: 'login', component: LoginPage, meta: { hideSidebar: true } },
  { path: '/chat', name: 'chat', component: ChatPage },
  { path: '/history', name: 'history', component: HistoryPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


