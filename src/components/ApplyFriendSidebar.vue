<template>
  <!-- 申请列表按钮 -->
  <div 
    class="trigger-btn apply-trigger"
    :style="{ top: '50%' }"
    @click="toggleSidebar"
  >
    <span class="btn-label">申请列表</span>
    <el-icon :size="16">
      <component :is="isCollapsed ? 'ArrowLeft' : 'ArrowRight'" />
    </el-icon>
  </div>

  <!-- 申请列表侧边栏 -->
  <el-drawer
    v-model="drawerVisible"
    direction="rtl"
    :size="300"
    :with-header="false"
    custom-class="sidebar-drawer"
  >
    <div class="drawer-content">
      <h3 class="sidebar-title">申请列表</h3>
      <el-input
        v-model="searchQuery"
        placeholder="搜索用户..."
        clearable
        :prefix-icon="Search"
      />
      <el-scrollbar height="calc(100vh - 120px)">
        <el-empty v-if="filteredApplies.length === 0" description="暂无申请"/>
        
        <div 
          v-for="apply in filteredApplies" 
          :key="apply.id" 
          class="list-item"
        >
          <el-avatar :size="36" :src="apply.avatar">
            {{ apply.name.charAt(0) }}
          </el-avatar>
          <div class="item-info">
            <span class="name">{{ apply.name }}</span>
            <div class="actions">
              <el-button type="success" size="small" plain @click="acceptApply(apply)">
                接受
              </el-button>
              <el-button type="danger" size="small" plain @click="rejectApply(apply)">
                拒绝
              </el-button>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { ArrowLeft, ArrowRight, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getAddFriendList } from '@/api/addFriend'

const isCollapsed = ref(true)
const drawerVisible = ref(false)
const searchQuery = ref('')

const applies = ref([
  { id: 1, name: '王五', avatar: '' },
  { id: 2, name: '赵六', avatar: '' }
])

const fetchApplies = async (userId) => {
  try {
    const res = await getAddFriendList(userId);
    applies.value = transformApplies(res.data.data);
  } catch (error) {
    console.error('获取好友申请列表失败:', error);
  }
};

const transformApplies = (data) => {
  return data.map(user => ({
      id: user._id,
      name: user.nickName,
      avatar: ''
  })
)
}

const filteredApplies = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return applies.value.filter(apply => 
    apply.name.toLowerCase().includes(query)
  )
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const acceptApply = (apply) => {
  ElMessage.success(`已接受 ${apply.name} 的好友申请`)
  applies.value = applies.value.filter(a => a.id !== apply.id)
}

const rejectApply = (apply) => {
  ElMessage.warning(`已拒绝 ${apply.name} 的好友申请`)
  applies.value = applies.value.filter(a => a.id !== apply.id)
}

// 同步状态
watch(isCollapsed, (val) => {
  drawerVisible.value = !val
})

watch(drawerVisible, (val) => {
  isCollapsed.value = !val
})

// 在组件挂载时从会话存储中获取 userId 并调用 fetchApplies
onMounted(() => {
  const userId = sessionStorage.getItem('userId');
  if (userId) {
    fetchApplies(userId);
  } else {
    console.error('未找到 userId');
  }
})
</script>

<style scoped lang="scss">
/* 触发按钮基础样式 */
.trigger-btn {
  position: fixed;
  right: 0;
  width: 80px;
  height: 32px;
  border-radius: 16px 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 12px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s;
  
  .btn-label {
    font-size: 12px;
    font-weight: 500;
  }

  &:hover {
    width: 90px;
  }
}

/* 申请列表按钮特殊样式 */
.apply-trigger {
  background: var(--el-color-success);
  color: white;
  
  &:hover {
    background: var(--el-color-success-light-3);
  }
}

/* 抽屉内容样式 */
.drawer-content {
  padding: 16px;
  
  .sidebar-title {
    margin: 0 0 16px 0;
    color: var(--el-text-color-primary);
  }

  .list-item {
    display: flex;
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 4px;
    background: var(--el-bg-color);
    transition: background 0.3s;
    
    &:hover {
      background: var(--el-color-primary-light-9);
    }
    
    .item-info {
      margin-left: 12px;
      flex: 1;
      display: flex;
      flex-direction: column;
      
      .name {
        font-weight: 500;
        margin-bottom: 8px;
      }
      
      .actions {
        display: flex;
        gap: 8px;
        
        .el-button {
          flex: 1;
        }
      }
    }
  }
}
</style>

<style>
.sidebar-drawer {
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1) !important;
  
  .el-drawer__body {
    padding: 0 !important;
  }
}
</style>
