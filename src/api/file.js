import request from "@/utils/request";
export function addFile(){
  return request({
    url:'/documents/insert',
    method:'post'
  })
}