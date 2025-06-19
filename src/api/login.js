import request from "@/utils/request";
export function register(data){
  return request({
    url:'/login/register',
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    data
  })
}
export function login(data){
  return request({
    url:'/login/login',
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    data
  })
}