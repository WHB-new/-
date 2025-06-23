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
    baseId:'685805bb5b0b53d239496fca'
   }
  })
}
//根据id查询文件
export function fileListDetail(docId,userId){
  return request({
    url:'/document/getDoc',
    params:{
      docId,
      userId
    },
    method:'get'
  })
}
//查询最近访问文件
export function getRecentFile(userId){
 return request({
  url:'/document/getRecentlyDoc',
  method:'get',
  params:{
    userId
  }
 })
}
//保存文档内容
export function saveFile(params,data){
  return request({
    url:`/document/updateDoc/${params}`,
    method:'put',
    data
  })
}