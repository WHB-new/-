import axios from 'axios';
import { ElMessage } from 'element-plus';
import {refreshToken} from '@/api/login'
const request = axios.create({
  baseURL: 'http://localhost:8000',
  timeout:10000,
})
// 设置白名单
let whiteSpace = ['/login/register','/login/login']
// 请求拦截器
request.interceptors.request.use(config => {
  // 不在白名单内需要请求头添加token
  if(!whiteSpace.includes(config.url)){
    const token = sessionStorage.getItem('Authorization')
    if(token){
      //请求头添加token
      config.headers.Authorization=token
    }
  }
  console.log(config.headers)
  return config
})
// 响应拦截器
request.interceptors.response.use(res => {
   const status = res.data.code || 200
   const message = res.data.msg || '未知错误'
  return res
},async err=>{
  // 错误处理
  const status = err.status|| 200
  //无感刷新，当token过期时，用refreshToken顶上
  if(status === 401){
    const refresh = sessionStorage.getItem('refreshToken')
     let res = await refreshToken(refresh)
     if(res.status == 200){
      sessionStorage.removeItem('Authorization')
      sessionStorage.setItem('Authorization',res.data.token)
       const originalRequest = err.config
    originalRequest.headers.Authorization = res.data.token
      //如果不是200证明refreshToken过期，则跳回登录
     }else if(res.status != 200){
      sessionStorage.removeItem('Authorization')
      sessionStorage.removeItem('refreshToken')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('defaultKnowledgeId')
      router.push('/login')
     }
   
    return request(originalRequest)
  }else{
    //  ElMessage.warning('接口请求失败')
  console.log(err,'err')
  return err
//  return Promise.reject(new Error(err))
  }
 
})
export default request