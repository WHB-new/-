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