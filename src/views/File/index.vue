<template>
  <div style="height: 100vh;display: flex;flex-direction: column;">
    <Nav name="主页"></Nav>
    <div class="center">
      <div class="add">
        <div class="img">
        <svg t="1749739212870" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8439" width="24" height="24"><path d="M631.436 983.674l-533.843 0c-29.658 0-53.831-25.392-53.831-56.269l0-613.468 265.497-278.16 391.918 0c33.183-3.724 57.483 21.733 53.831 52.68l0.342 317.43-0.417 0 0 48.143-73.941 0 0-344.449-355.754 0 0 222.229-207.333 0 0 577.918 513.531 0 0 73.946zM991.997 679.239l-169.691 0 0-169.688-134.545 0 0 169.622-169.884 0 0 134.545 169.683 0 0 169.884 134.611 0 0-169.688 169.828 0 0-134.677z" fill="#1296db" p-id="8440"></path></svg>
        </div>
     <div class="right">
      <div class="title" @click="handleAdd">新建</div>
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
        <el-table @row-click="handleRowClick" :data="homeStore.recentDocuments" style="width: 100%" row-key="id">
           <el-table-column type="selection" width="28px" :selectable="selectable" style="border-radius: 5px;"/>
            <el-table-column  label="所有文档" min-width="200px">
              <template #default="{ row }">
                <div style="display: flex;align-items: center;justify-content: flex-start;">
                  <div style="margin-right:10px;height: 52px;width: 24px;display: flex;justify-content: center;align-items: center;"><svg t="1749795851737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4408" width="22" height="22"><path d="M654.826667 117.333333l209.173333 209.173334V928h-704v-810.666667h494.826667zM586.666667 181.312h-362.666667V864h576v-469.333333h-213.333333V181.333333zM704 672v64H320v-64h384z m0-170.666667v64H320v-64h384z m-203.264-170.666666v64H320v-64h180.736z m276.928 0L650.666667 203.669333V330.666667h126.997333z" fill="#1677FF" p-id="4409"></path></svg></div>
                <div class="right">
                  <div class="name">
                   {{ row.name }}
                  </div>
                  <div class="intro">
                   文件介绍
                  </div>
                </div>
                </div>
              </template>
            </el-table-column>
            
            <el-table-column property="userName" label="不限归属" width="356px">
            </el-table-column>
            
            <el-table-column property="time" label="最近打开" width="356px">
            </el-table-column>
            <el-table-column  label="操作" width="76px" >
              <template #default="{ row }">
                <div class="caozuo" style="display:flex;align-items:center;margin-left:3px;" @click.stop>
                  <el-dropdown @command="handleCommand" trigger="click" placement="bottom-end">
                    <span class="dropdown-trigger" @click.stop>
                      <svg t="1749795603824" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3324" width="16" height="16"><path d="M841.085552 395.21211c-62.669318 0-113.472378 49.541323-113.472378 110.642936 0 61.093427 50.80306 110.652146 113.472378 110.652146 62.685691 0 113.487727-49.559742 113.487727-110.652146C954.573279 444.75241 903.77022 395.21211 841.085552 395.21211zM500.653069 395.21211c-62.668295 0-113.487727 49.541323-113.487727 110.642936 0 61.093427 50.820456 110.652146 113.487727 110.652146 62.669318 0 113.472378-49.559742 113.472378-110.652146C614.125447 444.75241 563.322387 395.21211 500.653069 395.21211zM182.915471 395.21211c-62.686714 0-113.488751 49-541323-113.488751 110.642936 0 61.093427 50.802036 110.652146 113.488751 110.652146 62.669318 0 113.471354-49.559742 113.471354-110.652146C296.385802 444.75241 245.583766 395.21211 182.915471 395.21211z" p-id="3325"></path></svg>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :command="`delete-${row.id}`" class="delete-item">
                          <svg style="margin-right: 8px;" t="1749803234567" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9123" width="14" height="14"><path d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h224a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256z m64 0v640h576V256H224z m192-128v64h192v-64H416z m-48 224a32 32 0 0 1 64 0v320a32 32 0 0 1-64 0V352z m192 0a32 32 0 0 1 64 0v320a32 32 0 0 1-64 0V352z" fill="#ff4d4f" p-id="9124"></path></svg>
                          删除
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from '@/components/Nav.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useHomeStore } from '@/store/home';
//修改：明确导入需要的组件
import { ElMessage, ElMessageBox, ElDropdown, ElDropdownMenu, ElDropdownItem, ElTable, ElTableColumn } from 'element-plus';

const isActive = ref(1)
const router = useRouter()
const homeStore = useHomeStore()

// 表格行点击事件
const handleRowClick = (row) => {
  // 更新最近访问时间
  homeStore.updateLastAccessed(row.id)
  console.log('点击文档:', row.name)
  // 跳转到文档详情页
  router.push({name:'content', query:{id: row.id}})
}

// 新建文档
const handleAdd = () => {
  console.log('新建文档')
  const newDoc = homeStore.addDocument({
    name: `新文档${Date.now()}`,
    userName: '当前用户'
  })
  router.push({name:'content', query:{id: newDoc.id}})
}

//修改：下拉菜单命令处理，添加调试信息
const handleCommand = async (command) => {
  console.log('下拉菜单命令:', command) // 添加调试
  if (command.startsWith('delete-')) {
    const docId = parseInt(command.split('-')[1])
    const doc = homeStore.documents.find(d => d.id === docId)
    
    if (doc) {
      try {
        await ElMessageBox.confirm(
          `确定要删除文档"${doc.name}"吗？`,
          '删除确认',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            confirmButtonClass: 'el-button--danger'
          }
        )
        
        homeStore.deleteDocument(docId)
        ElMessage.success('删除成功')
      } catch {
        // 用户取消删除
        ElMessage.info('已取消删除')
      }
    }
  }
}

// 表格选择功能
const selectable = (row, index) => {
  return true
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
    width: 64px;
    height: 22px;
    line-height: 22px;
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
}
.caozuo{
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
  .dropdown-trigger {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
      background-color: #d6d9dc;
    }
  }
}
</style>

<style>
.el-table__body tr:hover td {
  cursor: pointer;
}

.delete-item {
  color: #ff4d4f !important;
}

.delete-item:hover {
  background-color: #fff2f0 !important;
}

/* 添加：确保下拉菜单有足够的层级 */
.el-dropdown-menu {
  z-index: 9999 !important;
}
</style>