<template>
  <div class="sidebar-wrapper">
    <!-- Header -->
    <!-- <div class="sidebar-header">
      <h2 class="sidebar-title">Newera.ai</h2>
      <img src="@/assets/images/chatBlack.svg" alt="logo" class="logo">
    </div> -->

    <!-- Search Bar -->
    <div>
      <div class="search-container">
        <div class="search-wrapper">
          <input type="text" placeholder="بحث" class="search-input" />
          <div class="search-icon"></div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="nav-buttons">
        <router-link
          v-for="(link, idx) in navLinks"
          :key="idx"
          :to="link.to"
          class="nav-link"
          :class="{ 'history-link': link.to === '/history' }"
        >
          <div
            class="nav-button"
            :class="[link.icon, { active: activeNav === idx }]"
            @click="setActiveNav(idx)"
          >
            <div class="button-icon" :class="link.icon"></div>
            <span>{{ link.label }}</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- User Profile -->
    <div class="user-profile">
      <!-- <div class="profile-avatar">
        <div class="avatar-icon"></div>
      </div> -->
      <div class="profile-info">
        <span class="profile-name">You</span>
        <span class="profile-subtitle">Saudi Arabia</span>
      </div>
      <div class="profile-menu">
        <div class="menu-dots"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const navLinks = [
  { label: 'محادثة جديدة', icon: 'plus-icon', to: '/' },
  { label: 'محادثة جديدة', icon: 'beacon-icon', to: '/' },
  { label: 'محادثة جديدة', icon: 'beacon-icon', to: '/' },
  { label: 'محادثة جديدة', icon: 'beacon-icon', to: '/' },
  { label: 'سجل المحادثات', icon: 'history-icon', to: '/history' },
];

const activeNav = ref(0);

function setActiveNav(idx) {
  activeNav.value = idx;
}
</script>

<style lang="scss" scoped>
// SCSS Variables
$white10: rgba(255, 255, 255, 0.1);
$white15: rgba(255, 255, 255, 0.15);
$white25: rgba(255, 255, 255, 0.25);
$white50: rgba(255, 255, 255, 0.5);
$border-radius: 16px;
$blue-accent: #64b5f6;

.sidebar-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: calc(100vh - 40px);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.25);
  margin: 20px 10px;
  border-radius: 30px;
  padding: 30px;
}

.sidebar-header {
  margin-bottom: 32px;
  text-align: right;

  .sidebar-title {
    font-size: 20px;
    font-weight: 600;
    color: $blue-accent;
    margin: 0;
    text-align: right;
  }
}

.search-container {
  margin-bottom: 24px;

  .search-wrapper {
    position: relative;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: white;
      font-size: 14px;
      direction: rtl;
      text-align: right;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .search-icon {
      width: 16px;
      height: 16px;
      margin-left: 12px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='rgba(255,255,255,0.5)' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}

.nav-buttons {
  // flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #ffffff26;
  border: 1px solid hsla(0, 0%, 100%, 0.25);
  border-radius: 30px;
  padding: 10px;
  transition: transform 0.2s;

  .nav-link {
    text-decoration: none;
    color: inherit;

    &.history-link {
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      margin-top: 10px;
    }
  }

  .nav-button {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 16px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
    }

    &.new-chat-btn {
      
      
    }

    &.active {
      background: linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%);
      border: 2px solid #64b5f6;
      box-shadow: 0 4px 16px rgba(100, 181, 246, 0.15);
      color: #fff;
      .button-icon {
        filter: brightness(2);
      }
      span {
        color: #fff;
        font-weight: 700;
      }
    }

    .button-icon {
      width: 18px;
      height: 18px;
      margin-left: 12px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;

      &.plus-icon {
        background-image: url("@/assets/images/newChatBlack.svg");
      }

      &.history-icon {
        background-image: url("@/assets/images/chatHistoryBlack.svg");
      }

      &.beacon-icon {
        background-image: url("@/assets/images/beaconChat.svg");
      }
    }

    span {
      font-size: 14px;
      font-weight: 500;
      direction: rtl;
      text-align: right;
      flex: 1;
    }
  }
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: 20px;

  .profile-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .profile-name {
      font-size: 14px;
      font-weight: 600;
      color: white;
      margin-bottom: 2px;
    }

    .profile-subtitle {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .profile-menu {
    .menu-dots {
      width: 20px;
      height: 20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='rgba(255,255,255,0.5)' viewBox='0 0 24 24'%3E%3Cpath d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .sidebar-wrapper {
    padding: 16px;
  }

  .nav-button {
    &:hover {
      transform: none;
    }
  }
}
</style>
