import request from "@/utils/request";
export function addFile(data){
  return request({
    url:'/document/addDoc',
    method:'post',
    data
  })
}
//文件列表
export function getFileList(baseId){
  return request({
   url:'/document/getDocByBaseId',
   method:'get',
   params:{
    baseId
   }
  })
}
//根据id查询文件
export function fileListDetail(id){
  return request({
    url:'/document/getDoc',
    params:{
      id
    },
    method:'get'
  })
}