import request from "@/utils/request";
export function addContentHistory(docId,content){
  return request({
    url:`/docVersion/addDocVersion`,
    method:'post',
    params:{
      docId,
      content
    }
  })
}

export function getContentHistory(docId){
  return request({
    url:`/docVersion/getDocVersions/${docId}`,
    method:'get',
  })
}

export function getHistoryList(docVersionId){
  return request({
    url:`/docVersion/getDocVersion/${docVersionId}`,
    method:'get',
  })
}

export function deleteHistory(docVersionId){
  return request({
    url:`/docVersion/deleteDocVersion/${docVersionId}`,
    method:'delete'
  })
}