<template>
  <div style="height: 100vh;display: flex;flex-direction: column;">
    <Nav name="主页"></Nav>
    <div class="center">
      <div class="add">
        <div class="img">
        <svg t="1749739212870" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8439" width="24" height="24"><path d="M631.436 983.674l-533.843 0c-29.658 0-53.831-25.392-53.831-56.269l0-613.468 265.497-278.16 391.918 0c33.183-3.724 57.483 21.733 53.831 52.68l0.342 317.43-0.417 0 0 48.143-73.941 0 0-344.449-355.754 0 0 222.229-207.333 0 0 577.918 513.531 0 0 73.946zM991.997 679.239l-169.691 0 0-169.688-134.545 0 0 169.622-169.884 0 0 134.545 169.683 0 0 169.884 134.611 0 0-169.688 169.828 0 0-134.677z" fill="#1296db" p-id="8440"></path></svg>
        </div>
     <div class="right" @click="handleAdd">
      <div class="title" >新建</div>
      <div class="intro">新建文档开始协作</div>
     </div>
      </div>
    </div>
    <div class="main">
      <div class="header">
        <div class="title">
          <div class="recent" :style="{'color':isActive==1?'skyblue':'',fontWeight:isActive==1?'500':'normal',fontSize:isActive==1?'16px':'14px'}">
            最近访问
          </div>
        </div>
      </div>
      <!-- 列表区域 -->
      <div class="list">
        <el-table :data="fileData" style="width: 100%" row-key="_id">
           <el-table-column type="selection" width="28px" :selectable="selectable" style="border-radius: 5px;"/>
            <el-table-column  label="所有文档" min-width="200px" prop="title">
              <template #default="scope">
                <div style="display: flex;align-items: center;justify-content: flex-start;">
                  <div style="margin-right:10px;height: 52px;width: 24px;display: flex;justify-content: center;align-items: center;"><svg t="1749795851737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4408" width="22" height="22"><path d="M654.826667 117.333333l209.173333 209.173334V928h-704v-810.666667h494.826667zM586.666667 181.312h-362.666667V864h576v-469.333333h-213.333333V181.333333zM704 672v64H320v-64h384z m0-170.666667v64H320v-64h384z m-203.264-170.666666v64H320v-64h180.736z m276.928 0L650.666667 203.669333V330.666667h126.997333z" fill="#1677FF" p-id="4409"></path></svg></div>
                <div class="right">
                  <div class="name">
                  {{scope.row.title}}
                  </div>
                  <div class="intro">
                   {{scope.row.baseName }}
                  </div>
                </div>
                </div>
              </template>
            </el-table-column>
            
            <el-table-column property="name" label="不限归属" width="356px" prop="recentlyOpen[0].recentlyOpenUserId">
            </el-table-column>
            
            <el-table-column property="time" label="最近打开" width="356px" prop="recentlyOpen[0].recentlyOpenTime">
            </el-table-column>
            <el-table-column  label="操作" width="76px" >
              <template #default>
                
                <el-dropdown placement="bottom-start">
      <template #default>
<div class="caozuo" style="display:flex;align-items:center;margin-left:3px;">
                  <svg t="1749795603824" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3324" width="16" height="16"><path d="M841.085552 395.21211c-62.669318 0-113.472378 49.541323-113.472378 110.642936 0 61.093427 50.80306 110.652146 113.472378 110.652146 62.685691 0 113.487727-49.559742 113.487727-110.652146C954.573279 444.75241 903.77022 395.21211 841.085552 395.21211zM500.653069 395.21211c-62.668295 0-113.487727 49.541323-113.487727 110.642936 0 61.093427 50.820456 110.652146 113.487727 110.652146 62.669318 0 113.472378-49.559742 113.472378-110.652146C614.125447 444.75241 563.322387 395.21211 500.653069 395.21211zM182.915471 395.21211c-62.686714 0-113.488751 49.541323-113.488751 110.642936 0 61.093427 50.802036 110.652146 113.488751 110.652146 62.669318 0 113.471354-49.559742 113.471354-110.652146C296.385802 444.75241 245.583766 395.21211 182.915471 395.21211z" p-id="3325"></path></svg>
                </div>
      </template>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
          <template #default>
 <div style="display:flex;align-items:center;" @click="handleDelete">
            <div style="display: flex;align-items: center;justify-content: flex-start;width: 16px;height: 16px;">
               <svg t="1750569983191" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7415" width="16" height="16"><path d="M380 455a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v240a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V455zM644 455a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v240a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V455z" fill="#323338" p-id="7416"></path><path d="M321 212V96c0-17.673 14.327-32 32-32h320c17.673 0 32 14.327 32 32v116h183a8 8 0 0 1 8 8v64a8 8 0 0 1-8 8h-55v635c0 17.673-14.327 32-32 32H225c-17.673 0-32-14.327-32-32V292h-58a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h186z m80-68v68h224v-68H401zM273 292v587h480V292H273z" fill="#323338" p-id="7417"></path></svg>
            </div>
            <div style="font-size: 14px;margin-left:6px;">
              删除
            </div>
           </div>
          </template>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from '@/components/Nav.vue';
import {ref,onMounted} from 'vue'
import { useRouter } from 'vue-router';
import {addFile,getFileList,getRecentFile} from '@/api/file'
const isActive = ref(1)
//假数据，后期更改
const router = useRouter()
const fileData =ref([
])
const handleAdd = ()=>{
 const baseId=sessionStorage.getItem('defaultKnowledgeId')
    addFile({
      baseId,
       ownerId: sessionStorage.getItem('userId'),
    }).then(res=>{
       getFileList(baseId)
      router.push({name:'content',params:{insertedId:res.data.insertedId}})
    }).catch(err=>{
      console.log(err)
    })
}
const handleDelete = ()=>{

}
onMounted(()=>{
  const userId=sessionStorage.getItem('userId')
 getRecentFile(userId).then(res=>{
  res.data.data.forEach(item=>{
    item.recentlyOpen[0].recentlyOpenTime = changeTime(item.recentlyOpen[0].recentlyOpenTime)
  })
  console.log(res.data.data)
  fileData.value = res.data.data
 }).catch(err=>{
  console.log(err)
 })
 
})
//时间转换函数
const changeTime = (time)=>{
  const inputDate = new Date(time)
    const now = new Date();
  
  // 校验日期是否合法
  if (isNaN(inputDate.getTime())) {
    return "无效时间";
  }

  // 获取年月日时分，忽略秒和毫秒
  const inputYear = inputDate.getFullYear();
  const inputMonth = inputDate.getMonth() + 1; // 月份从0开始
  const inputDay = inputDate.getDate();
  const inputHours = inputDate.getHours().toString().padStart(2, '0');
  const inputMinutes = inputDate.getMinutes().toString().padStart(2, '0');

  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();

  // 判断是否为今天
  if (
    inputYear === todayYear &&
    inputMonth === todayMonth &&
    inputDay === todayDay
  ) {
    return `今天 ${inputHours}:${inputMinutes}`;
  }

  // 判断是否为昨天（考虑跨年/跨月）
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    inputYear === yesterday.getFullYear() &&
    inputMonth === yesterday.getMonth() + 1 &&
    inputDay === yesterday.getDate()
  ) {
    return `昨天 ${inputHours}:${inputMinutes}`;
  }

  // 更早的时间：返回 M月D日 HH:MM
  return `${inputMonth}月${inputDay}日 ${inputHours}:${inputMinutes}`;
}
</script>

<style lang="scss" scoped>
.center{
height: 64px;
margin:8px 0;
padding: 0 24px 0 24px;
margin-bottom:12px;
.add{
  border:1px solid #c5c0c0;
  height: 64px;
  max-width: 233px;
  border-radius: 8px;
  padding:0 8px 0 16px;
  display: flex;
  align-items: center;
  &:hover{
    cursor: pointer;
    background-color: #edeeee;
  }
  .img{
    margin-right:12px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right{
    .title{
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      color:#1f2329;
    }
    .intro{
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      color:#646A73
    }
  }
}
}
.main{
flex:1;
  padding-right:24px;
  .header{
    margin-left:12px;
     max-width: 268px;
   padding:10px 12px;
height: 48px;
.title{
  height: 48px;
  display: flex;
  align-items: center;
  .recent{
    width: 72px;
    height: 28px;
    font-size: 16px;
    padding:2px 4px;
    text-align: center;
    color:#646A73;
   
    &:hover{
      cursor: pointer;
        background-color: #f5f5f5;
        border-radius: 5px;
    }
  }
}

  }
  .list{
    .right{
      .name{
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 3px;
        color:#1f2329
      }
      .intro{
        font-size: 12px;
        color:#646A73;
      }
    }
  }
}
.caozuo{
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
  &:hover{
    cursor: pointer;
    background-color: #d6d9dc;
    border-radius: 5px;
  }
}
</style>
<style>
.el-table__body tr:hover td {
  cursor: pointer;
}

</style>