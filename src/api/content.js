import request from "@/utils/request";
export function addContentHistory(docId){
  return request({
    url:`/docVersion/addDocVersion/${docId}`,
    method:'post',
  })
}

export function getContentHistory(docId){
  return request({
    url:'/docVersion/getDocVersions',
    method:'get',
    params:{
      docId
    }
  })
}

export function getHistoryList(docVersionId){
  return request({
    url:'/docVersion/getDocVersion',
    method:'get',
    params:{
      docVersionId
    }
  })
}

export function deleteHistory(docVersionId){
  return request({
    url:`/docVersion/deleteDocVersion/${docVersionId}`,
    method:'delete'
  })
}