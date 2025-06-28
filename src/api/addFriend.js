import request from "@/utils/request";
//获取申请添加好友列表
export function getAddFriendList(userId) {
  return request({
    url: '/user/getApplyFriends',
    method: 'get',
    params: {
      userId
    }
  });
}

// 搜索陌生人
export function searchStranger(username, userId) {
  return request({
    url: '/user/getStrangerByName',
    method: 'get',
    params: {
        username,
        userId
    }
  });
}

// 申请添加好友
export function addFriend(userId, friendId ) {
  return request({
    url: '/user/addFriend',
    method: 'post',
    params: {
      userId,
      friendId
    }
  });
}

// 同意添加好友
export function agreeAddFriend(userId, friendId) {
  return request({
    url: '/user/handleApplyFriend',
    method: 'put',
    params: {
      userId,
      friendId
    }
  });
}

// 拒绝添加好友
export function refuseAddFriend(userId, friendId) {
  return request({
    url: '/user/refuseApplyFriend',
    method: 'put',
    params: {
      userId,
      friendId
    }
  });
}   

// 获取好友列表
export function getFriendList(userId) {
  return request({
    url: '/user/getFriends',
    method: 'get',
    params: {
      userId
    }
  });
}

// 删除好友
export function deleteFriend(userId, friendId) {    
  return request({
    url: '/user/deleteFriend',
    method: 'delete',
    params: {
        userId,
        friendId
    }
});
}
