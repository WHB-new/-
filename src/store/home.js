import { defineStore } from "pinia";
export const useHomeStore = defineStore('homeStore',{
state:()=>({
//控制侧边栏的展开与收入
isCollapse:false,
}),
actions:{

}
})