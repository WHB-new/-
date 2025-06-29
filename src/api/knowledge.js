import request from "@/utils/request";
export function addKnowledge(data){
  return request({
    url:'/knowledgeBase/addKnowledgeBase',
    method:'post',
    headers:{
      "Content-Type":"application/json",
    },
    data
  })
}
export const getKnowledgeList = (userId) => {
  return request({
    url: '/knowledgeBase/getKnowledgeBases', 
    method: 'get',
    params: { userId } 
  })
}

export const deleteKnowledge = (id) => {
  return request({
    url: `/knowledgeBase/deleteBase/${id}`,
    method: 'delete'
  })
}

export function updateKnowledge(id, data) {
  return request({
    url: `/knowledgeBase/updateBase/${id}`, 
    method: 'put',
    data,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function getKnowledgeDetail(id,userId) {
  return request({
    url: '/knowledgeBase/getKnowledgeBase',
    method: 'get',
    params: { id ,
      userId
    } 
  });
}

export function getDocsByBaseId(baseId) {
  return request({
    url: '/document/getDocByBaseId',
    method: 'get',
    params: { baseId }
  });
}