<template>
  <div class="login-viewport">
    <div class="login-interface">
      <div class="login-header">
        <h1 class="login-title">تسجيل الدخول</h1>
        <p class="login-description">يرجى إدخال بيانات الدخول الخاصة بك للمتابعة.</p>
      </div>
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">البريد الإلكتروني</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="example@email.com"
          />
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">كلمة المرور</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
          />
          <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
        </div>

        <button class="login-btn" type="submit">دخول</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errors = ref({ email: '', password: '' })

const router = useRouter()

function handleLogin() {
  errors.value = { email: '', password: '' }
  let valid = true

  // Email validation
  if (!email.value) {
    errors.value.email = 'البريد الإلكتروني مطلوب'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'يرجى إدخال بريد إلكتروني صالح'
    valid = false
  }

  // Password validation
  if (!password.value) {
    errors.value.password = 'كلمة المرور مطلوبة'
    valid = false
  } else if (password.value.length < 6) {
    errors.value.password = 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'
    valid = false
  }

  // If everything is valid → redirect
  if (valid) {
    router.push('/chat')
  }
}
</script>

<style scoped lang="scss">
.login-viewport {
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: none;
}
.login-interface {
  display: flex;
  flex-direction: column;
  color: white;
  position: relative;
  border-radius: 30px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.25);
  max-width: 420px;
  min-width: 320px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.12);
  margin: 0;
}
.login-header {
  text-align: center;
  padding: 40px 20px 30px;
  .login-title {
    font-size: 32px;
    font-weight: 600;
    margin: 0 0 15px 0;
    color: white;
    direction: rtl;
  }
  .login-description {
    font-size: 16px;
    opacity: 0.8;
    margin: 0;
    font-weight: 300;
    direction: rtl;
  }
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  direction: rtl;
  label {
    margin-bottom: 8px;
    font-size: 15px;
    color: #bfc9e0;
    font-weight: 500;
    text-align: right;
    direction: rtl;
    display: block;
    width: 100%;
  }
  input {
    padding: 12px 16px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.08);
    color: #fff;
    font-size: 16px;
    outline: none;
    transition: border 0.2s, background 0.2s;
    width: 100%;
    text-align: right;
    &::placeholder {
      color: rgba(255,255,255,0.5);
      font-size: 15px;
      direction: rtl;
      text-align: right;
    }
    &:focus {
      border: 1.5px solid #64b5f6;
      background: rgba(127,156,245,0.10);
    }
  }
}
.login-btn {
  background: linear-gradient(45deg, #64b5f6, #42a5f5);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 14px 0;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(100, 181, 246, 0.10);
  &:hover {
    background: linear-gradient(45deg, #42a5f5, #64b5f6);
    transform: translateY(-2px) scale(1.03);
  }
}
.error-msg {
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 6px;
  text-align: right;
  display: block;
}

</style>


