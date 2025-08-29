<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const showSidebar = computed(() => route.meta.hideSidebar !== true)
</script>

<template>
  <div class="layout" :class="{ 'no-sidebar': !showSidebar }">
    <main class="content">
      <router-view />
    </main>
    <Sidebar v-if="showSidebar" />
  </div>
</template>

<style scoped>
  .layout {
    display: grid;
    grid-template-columns: 1fr 420px;
    min-height: 100vh;
    background: #0D0D0D;
    background-image: url('@/assets/images/abstract-grainy-texture-background.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 150% 150%;
    background-attachment: fixed;
  }
  
  .layout.no-sidebar {
    grid-template-columns: 1fr;
  }
  
  .content {
    padding: 0;
    overflow: hidden;
  }

</style>
