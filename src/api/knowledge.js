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
export const getKnowledgeList = () => {
  return request({
    url: '/knowledgeBase/getKnowledgeBase', 
    method: 'get'
  })
}

export const deleteKnowledge = (id) => {
  return request({
    url: `/deleteBase/${id}`, 
    method: 'delete'
  })
}

export const updateKnowledge = (id, data) => {
  return request({
    url: `/updateBase/${id}`, 
    method: 'put',
    data
  })
}

export const getKnowledgeDetail = (id) => {
  return request({
    url: `/getKnowledgeBase?id=${id}`, 
    method: 'get'
  })
}