<template>
  <!-- 协作者列表按钮 -->
  <div 
    class="trigger-btn"
    :style="{ top: '30%' }"
    @click="toggleSidebar"
  >
    <span class="btn-label">协作者列表</span>
    <el-icon :size="16">
      <component :is="isCollapsed ? 'ArrowLeft' : 'ArrowRight'" />
    </el-icon>
  </div>

  <!-- 协作者列表侧边栏 -->
  <el-drawer
    v-model="drawerVisible"
    direction="rtl"
    :size="300"
    :with-header="false"
    custom-class="sidebar-drawer"
  >
    <div class="drawer-content">
      <h3 class="sidebar-title">协作者列表</h3>
      <el-input
        v-model="searchQuery"
        placeholder="搜索协作者..."
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
            :hide-on-click="false"
            @command="handleCommand(friend.id, $event)">
            <el-button type="text" class="permission-btn">
              <el-icon><MoreFilled /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item 
                  :command="'manage'" 
                  :class="{ 'selected': friend.permission === 'manage' }">
                  可管理
                  <el-icon v-if="friend.permission === 'manage'"><Check /></el-icon>
                </el-dropdown-item>
                <el-dropdown-item 
                  :command="'edit'" 
                  :class="{ 'selected': friend.permission === 'edit' }">
                  可编辑
                  <el-icon v-if="friend.permission === 'edit'"><Check /></el-icon>
                </el-dropdown-item>
                <el-dropdown-item 
                  :command="'read'" 
                  :class="{ 'selected': friend.permission === 'read' }">
                  可阅读
                  <el-icon v-if="friend.permission === 'read'"><Check /></el-icon>
                </el-dropdown-item>
                <el-dropdown-item 
                  command="delete"
                  class="delete-item">
                  删除协作者
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
import { ArrowLeft, ArrowRight, Search, MoreFilled, Check } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const isCollapsed = ref(true)
const drawerVisible = ref(false)
const searchQuery = ref('')

const friends = ref([
  { id: 1, name: '张三', avatar: '', permission: '' },
  { id: 2, name: '李四', avatar: '', permission: '' }
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
    confirmDelete(friendId)
  } else {
    handlePermissionChange(friendId, command)
  }
}

const handlePermissionChange = (friendId, permission) => {
  const friend = friends.value.find(f => f.id === friendId)
  if (friend) {
    friend.permission = permission
  }
}

const confirmDelete = (friendId) => {
  ElMessageBox.confirm(
    '确定要删除此协作者吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    friends.value = friends.value.filter(f => f.id !== friendId)
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除',
    })
  })
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
  background: #c0df65;
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
    background: #c1ce61;
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

.selected {
  color: var(--el-color-primary);
  font-weight: 500;
}
</style>

<style>
.sidebar-drawer {
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1) !important;
  
  .el-drawer__body {
    padding: 0 !important;
  }
}

.el-dropdown-menu__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-item {
  color: var(--el-color-danger);
  &:hover {
    color: var(--el-color-danger);
    background-color: var(--el-color-danger-light-9);
  }
}
</style>