//请求api工具
import request from "@/utils/request";
// 参考形式
// export const 方法名 = ()=>{
// return request({
  //   url:'/getList',
//   method:'get',
// })
// }
export const ceshi = ()=>{
  return request({
url:'/user/testDBGet',
method:'get',
  })
}