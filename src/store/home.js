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
      console.log(res.data.data)
    }
  }).catch(err => {
    console.log(err)
  
  })
}
}
})