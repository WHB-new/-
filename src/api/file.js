import request from "@/utils/request";
export function addFile(data) {
  return request({
    url: '/document/addDoc',
    method: 'post',
    data
  })
}
//文件列表
export function getFileList(baseId) {
  return request({
    url: '/document/getDocByBaseId',
    method: 'get',
    params: {
      baseId
    }
  })
}
//根据id查询文件
export function fileListDetail(docId, userId) {
  return request({
    url: '/document/getDoc',
    params: {
      docId,
      userId
    },
    method: 'get'
  })
}
//查询最近访问文件
export function getRecentFile(userId) {
  return request({
    url: '/document/getRecentlyDoc',
    method: 'get',
    params: {
      userId
    }
  })
}
//保存文档内容
export function saveFile(params, data) {
  return request({
    url: `/document/updateDoc/${params}`,
    method: 'put',
    data
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

// 改成，直接传同一个知识库，调试使用
// 已复原，出于心理问题，还是不要改了
export function getSharedDocs(userId) {
  return request({
    url: '/document/getSharedDocs',
    method: 'get',
    params: {
      userId
    }
  })
}