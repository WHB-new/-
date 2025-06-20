import axios from 'axios';
import { ElMessage } from 'element-plus';
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
   const status = res.status || 200
   const message = res.data.msg || '未知错误'
   if(status === 401){
    //没权限，后期可跳转到注册登录页面
    ElMessage.warning('没有权限，请先登录')
    return Promise.reject(new Error(message))
   }
  return res
},err=>{
  // 错误处理
  ElMessage.warning('接口请求失败')
  return Promise.reject(new Error(err))
})
export default request