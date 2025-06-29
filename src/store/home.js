import { defineStore } from "pinia";
import {getFileList} from "@/api/file"
export const useHomeStore = defineStore('homeStore',{
state:()=>({
//控制侧边栏的展开与收入
isCollapse:false,
fileList:[],
isShowHistory:true,
historyList:[],
quillData:null,
historyIndex:0,

}),
actions:{
getFileList(){
   const id = sessionStorage.getItem('defaultKnowledgeId')
   getFileList(id).then(res => {
    console.log(res)
    if (res.data.code === 200) {
      this.fileList = res.data.data
      
      //替换为纯文本，方便查询
      this.fileList.forEach(item=>{
        item.content = JSON.parse(item.content).ops[0].insert.replace(/\n/g, "")
      })
    }
  }).catch(err => {
    console.log(err)
  
  })
}
}
})