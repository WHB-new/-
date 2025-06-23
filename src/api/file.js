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
    baseId:'685936a2a0caaf9d70b99d64'
   }
  })
}
// 根据id查询文件
export function fileListDetail(id,userId){
  return request({
    url:'/document/getDoc',
    params:{
      docId:id,
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
//编辑文档数据
export function editFile(id,title){
  return request({
    url:'/document/updateDoc',
    method:'get',
    params:{
      id,
      title
    }
  })
}