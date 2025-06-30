import request from "@/utils/request";
// 获取文档权限列表
export function getDocPermissionList(docId, userId) {
  return request({
    url: '/permission/getDocPermissions',
    method: 'get',
    params: {
      userId,
      docId
    }
  })
}

// 授予好友文档权限
export function addDocPermission(friendId, docId, newPermissionCode) {  
  console.log("传出的newPermissionCode是：");
  console.log(newPermissionCode);
  return request({
    url: '/permission/addFriendDocPermission',
    method: 'post',
    params: {
        friendId,
        docId,
        newPermissionCode
    }
  })
}

// 修改文档内用户权限
export function updateDocPermission(friendId, docId, newPermissionCode) {
  return request({
    url: '/permission/updateFriendDocPermission',
    method: 'put',
    params: {
      friendId, 
      docId,
      newPermissionCode
    }
  })
}

// 删除文档内用户权限
export function deletePermission(friendId, docId) {
  return request({
    url: '/permission/deleteFriendDocPermission',
    method: 'delete',
    params: {
      friendId,
      docId,
    }
  })
}