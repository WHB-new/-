import request from "@/utils/request";
export function addFile(data){
  return request({
    url:'/document/addDoc',
    method:'post',
    data
  })
}