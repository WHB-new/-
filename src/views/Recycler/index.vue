<template>
  <div style="height: 100vh;display: flex;flex-direction: column;">
    <Nav name="回收站"></Nav>
    <div class="center">
      <div class="tips">
        <div class="left">
          <svg t="1750569983191" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7415" width="24" height="24">
            <path d="M380 455a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v240a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V455zM644 455a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v240a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V455z" fill="#646A73" p-id="7416"></path>
            <path d="M321 212V96c0-17.673 14.327-32 32-32h320c17.673 0 32 14.327 32 32v116h183a8 8 0 0 1 8 8v64a8 8 0 0 1-8 8h-55v635c0 17.673-14.327 32-32-32H225c-17.673 0-32-14.327-32-32V292h-58a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h186z m80-68v68h224v-68H401zM273 292v587h480V292H273z" fill="#646A73" p-id="7417"></path>
          </svg>
        </div>
        <div class="right">
          <div class="title">回收站</div>
          <div class="intro">已删除的文件将保留30天</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="header">
        <div class="title">
          <div class="tabs" style="display: flex; gap: 16px;">
            <div 
              class="tab" 
              :class="{ active: currentTab === 'knowledges' }"
              @click="currentTab = 'knowledges'"
            >
              知识库
            </div>
            <div 
              class="tab" 
              :class="{ active: currentTab === 'documents' }"
              @click="currentTab = 'documents'"
            >
              文档
            </div>
          </div>
        </div>
        <div class="actions">
          <el-button size="small" type="primary" @click="restoreSelected">
            <svg t="1750570043742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7435" width="16" height="16">
              <path d="M848 480H544V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v336c0 17.7 14.3 32 32 32h352c17.7 0 32-14.3 32-32s-14.3-32-32-32z" fill="#ffffff" p-id="7436"></path>
              <path d="M512 864c-176.4 0-320-143.6-320-320S335.6 224 512 224s320 143.6 320 320-143.6 320-320 320zm0-576c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256z" fill="#ffffff" p-id="7437"></path>
            </svg>
            恢复选中
          </el-button>
          <el-button size="small" type="danger" @click="deleteSelected">
            <svg t="1750569983191" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7415" width="16" height="16">
              <path d="M380 455a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v240a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V455zM644 455a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v240a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V455z" fill="#ffffff" p-id="7416"></path>
              <path d="M321 212V96c0-17.673 14.327-32 32-32h320c17.673 0 32 14.327 32 32v116h183a8 8 0 0 1 8 8v64a8 8 0 0 1-8 8h-55v635c0 17.673-14.327 32-32-32H225c-17.673 0-32-14.327-32-32V292h-58a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h186z m80-68v68h224v-68H401zM273 292v587h480V292H273z" fill="#ffffff" p-id="7417"></path>
            </svg>
            彻底删除
          </el-button>
        </div>
      </div>
      <!-- 列表区域 -->
      <div class="list">
        <el-table :data="recycleData" style="width: 100%" row-key="_id" @row-click="handleClick" ref="tableRef">
          <el-table-column type="selection" width="28px" :selectable="selectable" style="border-radius: 5px;"/>
          <el-table-column label="已删除文件" min-width="200px" prop="title">
            <template #default="scope">
              <div style="display: flex;align-items: center;justify-content: flex-start;">
                <div style="margin-right:10px;height: 52px;width: 24px;display: flex;justify-content: center;align-items: center;">
                  <svg 
                    t="1749795851737" 
                    class="icon" 
                    viewBox="0 0 1024 1024" 
                    version="1.1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    p-id="4408" 
                    width="22" 
                    height="22"
                  >
                    <path d="M654.826667 117.333333l209.173333 209.173334V928h-704v-810.666667h494.826667zM586.666667 181.312h-362.666667V864h576v-469.333333h-213.333333V181.333333zM704 672v64H320v-64h384z m0-170.666667v64H320v-64h384z m-203.264-170.666666v64H320v-64h180.736z m276.928 0L650.666667 203.669333V330.666667h126.997333z" fill="#909399" p-id="4409"></path>
                  </svg>
                </div>
                <div class="right">
                  <div class="name" :style="{textDecoration: 'line-through', color: '#909399'}">
                    {{scope.row.title}}
                  </div>
                  <div class="intro">
                    {{scope.row.baseName }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column property="name" label="删除人" width="356px" prop="deletedBy.name">
          </el-table-column>
          
          <el-table-column property="time" label="删除时间" width="356px" prop="deletedAt">
            <template #default="scope">
              {{changeTime(scope.row.deletedAt)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="scope">
              <div class="action-buttons">
                <el-button size="mini" type="text" @click="restoreFile(scope.row)">
                  <svg t="1750570043742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7435" width="14" height="14">
                    <path d="M848 480H544V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v336c0 17.7 14.3 32 32 32h352c17.7 0 32-14.3 32-32s-14.3-32-32-32z" fill="#1677FF" p-id="7436"></path>
                    <path d="M512 864c-176.4 0-320-143.6-320-320S335.6 224 512 224s320 143.6 320 320-143.6 320-320 320zm0-576c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256z" fill="#1677FF" p-id="7437"></path>
                  </svg>
                  恢复
                </el-button>
                <el-button size="mini" type="text" @click="deleteFile(scope.row)">
                  <svg t="1750569983191" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7415" width="14" height="14">
                    <path d="M380 455a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v240a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V455zM644 455a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v240a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V455z" fill="#F56C6C" p-id="7416"></path>
                    <path d="M321 212V96c0-17.673 14.327-32 32-32h320c17.673 0 32 14.327 32 32v116h183a8 8 0 0 1 8 8v64a8 8 0 0 1-8 8h-55v635c0 17.673-14.327-32-32-32H225c-17.673 0-32-14.327-32-32V292h-58a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h186z m80-68v68h224v-68H401zM273 292v587h480V292H273z" fill="#F56C6C" p-id="7417"></path>
                  </svg>
                  删除
                </el-button>
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
import { ref, onMounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
//import { getRecycleFiles, restoreFile, deleteFile } from '@/api/recycle';
import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();
const tableRef = ref(null);
const recycleData = ref([]);
const selectedFiles = ref([]);
const currentTab = ref('knowledges'); // 默认显示知识库

// 模拟数据，实际使用时从API获取
onMounted(() => {
  fetchRecycleFiles();
});

// 监听标签页变化，重新加载数据
watch(currentTab, () => {
  fetchRecycleFiles();
});

// 获取回收站文件列表
const fetchRecycleFiles = async () => {
  try {
    // 根据当前标签页获取对应类型的回收站文件
    const res = await getRecycleFiles({ type: currentTab.value });
    res.data.data.forEach(item => {
      item.deletedAt = changeTime(item.deletedAt);
    });
    recycleData.value = res.data.data;
  } catch (err) {
    ElMessage.error('获取回收站文件失败');
    console.error(err);
  }
};

// 时间转换函数
const changeTime = (time) => {
  const inputDate = new Date(time);
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
};

// 恢复单个文件
const handleRestoreFile = async (file) => {
  ElMessageBox.confirm(
    `确定要恢复${currentTab.value === 'knowledges' ? '知识库' : '文档'} "${file.title}" 吗？`,
    '恢复文件',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await restoreFile(file._id);
      ElMessage.success(`${currentTab.value === 'knowledges' ? '知识库' : '文档'}恢复成功`);
      fetchRecycleFiles();
    } catch (err) {
      ElMessage.error(`${currentTab.value === 'knowledges' ? '知识库' : '文档'}恢复失败`);
      console.error(err);
    }
  }).catch(() => {
    // 取消操作
  });
};

// 彻底删除单个文件
const handleDeleteFile = async (file) => {
  ElMessageBox.confirm(
    `确定要彻底删除${currentTab.value === 'knowledges' ? '知识库' : '文档'} "${file.title}" 吗？此操作不可恢复！`,
    '彻底删除文件',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'danger',
    }
  ).then(async () => {
    try {
      await deleteFile(file._id);
      ElMessage.success(`${currentTab.value === 'knowledges' ? '知识库' : '文档'}已彻底删除`);
      fetchRecycleFiles();
    } catch (err) {
      ElMessage.error(`${currentTab.value === 'knowledges' ? '知识库' : '文档'}删除失败`);
      console.error(err);
    }
  }).catch(() => {
    // 取消操作
  });
};

// 恢复选中的文件
const restoreSelected = async () => {
  const selection = tableRef.value.selection;
  if (selection.length === 0) {
    ElMessage.warning('请先选择要恢复的文件');
    return;
  }

  ElMessageBox.confirm(
    `确定要恢复选中的 ${selection.length} 个${currentTab.value === 'knowledges' ? '知识库' : '文档'}吗？`,
    '恢复文件',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      // 批量恢复文件
      const promises = selection.map(file => handleRestoreFile(file));
      await Promise.all(promises);
      fetchRecycleFiles();
    } catch (err) {
      ElMessage.error(`${currentTab.value === 'knowledges' ? '知识库' : '文档'}恢复失败`);
      console.error(err);
    }
  }).catch(() => {
    // 取消操作
  });
};

// 彻底删除选中的文件
const deleteSelected = async () => {
  const selection = tableRef.value.selection;
  if (selection.length === 0) {
    ElMessage.warning('请先选择要删除的文件');
    return;
  }

  ElMessageBox.confirm(
    `确定要彻底删除选中的 ${selection.length} 个${currentTab.value === 'knowledges' ? '知识库' : '文档'}吗？此操作不可恢复！`,
    '彻底删除文件',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'danger',
    }
  ).then(async () => {
    try {
      // 批量删除文件
      const promises = selection.map(file => handleDeleteFile(file));
      await Promise.all(promises);
      fetchRecycleFiles();
    } catch (err) {
      ElMessage.error(`${currentTab.value === 'knowledges' ? '知识库' : '文档'}删除失败`);
      console.error(err);
    }
  }).catch(() => {
    // 取消操作
  });
};

// 点击文件查看详情
const handleClick = async (row) => {
  // 回收站文件通常不能直接打开，这里可以实现预览功能
  ElMessage.info(`${currentTab.value === 'knowledges' ? '知识库' : '文档'}已被删除，无法直接打开`);
};

// 选择项变化时更新选中文件列表
const handleSelectionChange = (val) => {
  selectedFiles.value = val;
};

// 可选行控制
const selectable = (row, index) => {
  // 可以根据需要设置某些行不可选
  return true;
};
</script>

<style lang="scss" scoped>
.center{
  height: 64px;
  margin:8px 0;
  padding: 0 24px 0 24px;
  margin-bottom:12px;
  .tips{
    border:1px solid #c5c0c0;
    height: 64px;
    max-width: 280px;
    border-radius: 8px;
    padding:0 8px 0 16px;
    display: flex;
    align-items: center;
    .left{
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      max-width: 268px;
      padding:10px 12px;
      height: 48px;
      .tabs{
        .tab{
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
          
          &:hover{
            background-color: #f5f5f5;
          }
          
          &.active{
            background-color: #e6f4ff;
            color: #1677FF;
            font-weight: 500;
          }
        }
      }
    }
    .actions{
      display: flex;
      gap: 8px;
      padding: 10px;
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
    .action-buttons{
      display: flex;
      justify-content: flex-start;
      gap: 4px;
    }
  }
}
</style>
<style>
.el-table__body tr:hover td {
  cursor: pointer;
}
</style>  