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
export function fileListDetail(){
  return request({
    url:'/document/getDoc'
  })
}

export function deleteFile(id) {
  return request({
    url: `/document/delete/${id}`,
    method: 'delete'
  })
}

export function updateDocument(id, data) {
  return request({
    url: `/document/put/${id}`,
    method: 'put',
    data,
    headers: {
      "Content-Type": "application/json"
    }
  });
}