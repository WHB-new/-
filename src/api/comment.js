import request from "@/utils/request";

// 获取评论列表
export function getCommentList(docId) {
  return request({
    url: '/comment/getCommentsByDocId',
    params: {
      docId
    }
  })
}

// 新增评论
export function addComment(docId, userId, content) {
  return request({
    url: '/comment/addComment',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      docId,
      userId,
      content
    }
  })
}

// 修改评论
export function updateComment(commentId, content) {
  return request({
    url: '/comment/updateComment',
    params: {
      commentId,
      content
    }
  })
}

// 删除评论
export function deleteCommentById(commentId) {
  return request({
    url: '/comment/deleteComment',
    method: 'delete',
    params: {
      commentId
    }
  })
}

// 根据文档id删除名下所有评论（暂时不需要）
export function deleteCommentsByDocId(docId) {
  return request({
    url: '/comment/deleteCommentsByDocId',
    method: 'delete',
    params: {
      docId
    }
  })
}

// 保存评论映射
export function saveCommentMap(docId, map) {
  return request({
    url: '/comment/saveMapping',
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        docId,
        map
    }
  })
}

// 获取评论映射，初始化加载
export function getCommentMap(docId) {
  return request({
    url: '/comment/getMappingByDocId',
    method: 'get',
    params: {
      docId
    }
  })
}