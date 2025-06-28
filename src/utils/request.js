import axios from 'axios';
import { ElMessage } from 'element-plus';
import { refreshToken } from '@/api/login'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
})

// 设置白名单
let whiteSpace = [
  '/login/register', 
  '/login/login', 
  '/login/refreshToken',
  '/summary/generate',
  '/summary/getSummary',
  '/summary/checkAndUpdateSummary'
]

// 请求拦截器
request.interceptors.request.use(config => {
  // 不在白名单内需要请求头添加token
  if (!whiteSpace.includes(config.url)) {
    const token = sessionStorage.getItem('Authorization')
    if (token) {
      // 请求头添加token
      config.headers.Authorization = token
    }
  }
  console.log('请求配置:', config.url, config.headers)
  return config
}, error => {
  console.error('请求错误:', error)
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(res => {
  console.log('响应成功:', res.config.url, res.data)
  return res
}, async err => {
  console.error('响应错误:', err.response?.status, err.response?.data)
  
  // 错误处理
  const status = err.response?.status || 500
  
  // 无感刷新，当token过期时，用refreshToken顶上
  if (status === 401) {
    const refresh = sessionStorage.getItem('refreshToken')
    if (refresh) {
      try {
        let res = await refreshToken(refresh)
        if (res.status === 200) {
          sessionStorage.removeItem('Authorization')
          sessionStorage.setItem('Authorization', res.data.token)
          
          // 重试原请求
          const originalRequest = err.config
          originalRequest.headers.Authorization = res.data.token
          return request(originalRequest)
        } else {
          // refreshToken过期，跳回登录
          sessionStorage.removeItem('Authorization')
          sessionStorage.removeItem('refreshToken')
          sessionStorage.removeItem('userId')
          sessionStorage.removeItem('userName')
          sessionStorage.removeItem('defaultKnowledgeId')
          router.push('/login')
        }
      } catch (refreshError) {
        console.error('刷新token失败:', refreshError)
        // 刷新失败，跳回登录
        sessionStorage.removeItem('Authorization')
        sessionStorage.removeItem('refreshToken')
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('defaultKnowledgeId')
        router.push('/login')
      }
    } else {
      // 没有refreshToken，跳回登录
      sessionStorage.removeItem('Authorization')
      sessionStorage.removeItem('refreshToken')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('defaultKnowledgeId')
      router.push('/login')
    }
  } else {
    ElMessage.error(`接口请求失败: ${err.response?.data?.message || err.message}`)
  }
  
  return Promise.reject(err)
})

export default request