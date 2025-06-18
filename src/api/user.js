import request from "@/utils/request";
export function addNewUser(data){
  return request({
    url:'/user/addUser',
    method:'post',
    data
  })
}