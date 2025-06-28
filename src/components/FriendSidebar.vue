<template>
  <!-- 好友列表按钮 -->
  <div 
    class="trigger-btn"
    :style="{ top: '40%' }"
    @click="toggleSidebar"
  >
    <span class="btn-label">好友列表</span>
    <el-icon :size="16">
      <component :is="isCollapsed ? 'ArrowLeft' : 'ArrowRight'" />
    </el-icon>
  </div>

  <!-- 好友列表侧边栏 -->
  <el-drawer
    v-model="drawerVisible"
    direction="rtl"
    :size="300"
    :with-header="false"
    custom-class="sidebar-drawer"
  >
    <div class="drawer-content">
      <h3 class="sidebar-title">好友列表</h3>
      <el-input
        v-model="searchQuery"
        placeholder="搜索好友..."
        clearable
        :prefix-icon="Search"
      />
      <el-scrollbar height="calc(100vh - 120px)">
        <div v-for="friend in filteredFriends" :key="friend.id" class="list-item">
          <el-avatar :size="36" :src="friend.avatar">{{ friend.name.charAt(0) }}</el-avatar>
          <div class="item-info">
            <span class="name">{{ friend.name }}</span>
          </div>
          <el-dropdown 
            trigger="click" 
            @command="handleCommand(friend.id, $event)">
            <el-button type="text" class="permission-btn">
              <el-icon><MoreFilled /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="delete" style="color: var(--el-color-danger);">
                  删除好友
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ArrowLeft, ArrowRight, Search, MoreFilled } from '@element-plus/icons-vue'

const isCollapsed = ref(true)
const drawerVisible = ref(false)
const searchQuery = ref('')

const friends = ref([
  { id: 1, name: '张三', avatar: '' },
  { id: 2, name: '李四', avatar: '' }
])

const filteredFriends = computed(() => {
  return friends.value.filter(f => 
    f.name.includes(searchQuery.value)
  )
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleCommand = (friendId, command) => {
  if (command === 'delete') {
    // 确认删除对话框
    ElMessageBox.confirm('确定要删除该好友吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      friends.value = friends.value.filter(f => f.id !== friendId)
      ElMessage.success('删除成功')
    }).catch(() => {
      // 取消删除
    })
  }
}

// 同步 isCollapsed 和 drawerVisible
watch(isCollapsed, (val) => {
  drawerVisible.value = !val
})

watch(drawerVisible, (val) => {
  isCollapsed.value = !val
})
</script>

<style scoped lang="scss">
.trigger-btn {
  position: fixed;
  right: 0;
  width: 80px;
  height: 32px;
  background: var(--el-color-primary);
  color: white;
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
    background: var(--el-color-primary-light-3);
  }
}

.drawer-content {
  padding: 16px;
  
  .sidebar-title {
    margin: 0 0 16px 0;
    color: var(--el-text-color-primary);
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 4px;
    background: var(--el-bg-color);
    
    .item-info {
      margin-left: 12px;
      flex: 1;
      
      .name {
        display: block;
        font-weight: 500;
      }
    }
    
    .permission-btn {
      margin-left: auto;
      padding: 0;
      color: var(--el-text-color-secondary);
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