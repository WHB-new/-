<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">登录</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input
            v-model="loginForm.account"
            type="text"
            placeholder="邮箱/手机号"
            class="clean-input"
          />
        </div>
        
        <div class="input-group">
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            class="clean-input"
          />
        </div>
        
        <div class="auth-options">
          <label class="remember-me">
            <input 
              type="checkbox" 
              v-model="rememberMe"
              class="checkbox"
            />
            <span>记住密码</span>
          </label>
          
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>
        
        <button 
          type="submit" 
          class="login-btn"
          :disabled="loading"
          @click="handleLogin"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
        
        <div class="register-hint">
          还没有账号？
          <button 
            type="button" 
            class="register-btn"
            @click="goToRegister"
          >
            立即注册
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {login} from '@/api/login'
const router = useRouter()

// 响应式数据
const loginForm = ref({
  account: '',
  password: ''
})

const loading = ref(false)
const rememberMe = ref(false)
//登录
const handleLogin =async () => {
 try{
   loading.value = true
   let res = await login({
    username: loginForm.value.account,
    password: loginForm.value.password
   })
   if(res.data.code == 201){
    if(sessionStorage.getItem('Authorization')){
      sessionStorage.removeItem('Authorization')
    }
    if(sessionStorage.getItem('defaultKnowledgeId')){
      sessionStorage.removeItem('defaultKnowledgeId')
    }
    if(sessionStorage.getItem('username')){
    sessionStorage.removeItem('username')
    }
       sessionStorage.setItem('Authorization', res.data.token)
   sessionStorage.setItem('defaultKnowledgeId', res.data.defaultKnowledgeBaseId)
   sessionStorage.setItem('username', loginForm.value.account)
   router.push('/file')
    ElMessage.success('登陆成功')
   }
 }catch(err){
  ElMessage.error('登录失败')
 }finally{
    loading.value = false
 }
}

const goToRegister = () => {
  router.push('/register')
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

.auth-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.forgot-password {
  color: #666;
  text-decoration: none;
}

.forgot-password:hover {
  color: #409eff;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #66b1ff;
}

.login-btn:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

.register-hint {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.register-btn {
  background: none;
  border: none;
  color: #409eff;
  cursor: pointer;
  padding: 0 5px;
  font-size: 14px;
}

.register-btn:hover {
  text-decoration: underline;
}
</style>