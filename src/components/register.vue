<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">注册账号</h2>
      
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <input
            v-model="registerForm.account"
            type="text"
            placeholder="手机号/邮箱"
            class="clean-input"
            @input="validateAccount"
          />
          <div class="input-hint" v-if="accountError">
            {{ accountError }}
          </div>
        </div>
        
        <div class="input-group">
          <input
            v-model="registerForm.password"
            type="password"
            placeholder="设置密码（至少6位）"
            class="clean-input"
          />
        </div>
        
        <div class="input-group">
          <input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="确认密码"
            class="clean-input"
          />
        </div>
        
        <button 
          type="submit" 
          class="register-btn"
          :disabled="loading || !formValid"
        >
          {{ loading ? '注册中...' : '立即注册' }}
        </button>
        
        <div class="login-hint">
          已有账号？
          <button 
            type="button" 
            class="text-btn"
            @click="goToLogin"
          >
            去登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 注册表单数据
const registerForm = ref({
  account: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const accountError = ref('')

// 表单验证状态
const formValid = computed(() => {
  return (
    registerForm.value.account && 
    registerForm.value.password && 
    registerForm.value.password === registerForm.value.confirmPassword &&
    !accountError.value
  )
})

// 验证账号格式（手机号或邮箱）
const validateAccount = () => {
  const account = registerForm.value.account
  if (!account) {
    accountError.value = ''
    return
  }
  
  const isPhone = /^1[3-9]\d{9}$/.test(account)
  const isEmail = /^\w+@\w+\.\w+$/.test(account)
  
  if (!isPhone && !isEmail) {
    accountError.value = '请输入有效的手机号或邮箱'
  } else {
    accountError.value = ''
  }
}

// 提交注册
const handleRegister = () => {
  if (!formValid.value) return
  
  loading.value = true
  console.log('注册数据:', registerForm.value)
  
  setTimeout(() => {
    loading.value = false
    router.push('/test-login')
  }, 800)
}

// 跳转登录
const goToLogin = () => {
  router.push('/test-login')
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f6f7;
}

.auth-card {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.auth-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.input-group {
  margin-bottom: 20px;
}

.clean-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.clean-input:focus {
  border-color: #409eff;
}

.input-hint {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background: #70adeb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: background 0.3s;
}

.register-btn:hover:not(:disabled) {
  background: #409eff;
}

.register-btn:disabled {
  background: #c0c4cc;
  cursor: not-allowed;
}

.login-hint {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.text-btn {
  background: none;
  border: none;
  color: #409eff;
  cursor: pointer;
  padding: 0 5px;
  font-size: 14px;
}

.text-btn:hover {
  text-decoration: underline;
}
</style>