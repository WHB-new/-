import request from "@/utils/request";
export function addKnowledge(){
  return request({
    url:'/knowledgeBase/addKnowledgeBase',
    method:'post',
    headers:{
      "Content-Type":"application/json",
    },
    data:{
      ownerId:1,
    }
  })
}