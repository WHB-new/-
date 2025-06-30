import request from "@/utils/request";

// 生成文档摘要
export function generateSummary(data) {
  return request({
    url: '/summary/generate',
    method: 'post',
    data // data应包含contentHash
  })
}

// 获取文档摘要
export function getSummary(docId) {
  return request({
    url: '/summary/getSummary',
    method: 'get',
    params: { docId }
  })
}

// 删除文档摘要
export function deleteSummary(docId) {
  return request({
    url: `/summary/deleteSummary/${docId}`,
    method: 'delete'
  })
}