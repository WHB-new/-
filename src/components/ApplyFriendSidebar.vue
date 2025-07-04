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
      <div class="header-section">
        <h3 class="sidebar-title">
          {{ showStrangersOrApplies ? '陌生人搜索' : '好友申请' }}
        </h3>
        <el-button 
          v-if="showStrangersOrApplies"
          type="text" 
          size="small"
          @click="backToApplies"
          class="back-btn"
        >
          <el-icon><ArrowLeft /></el-icon> 返回
        </el-button>
      </div>
      
      <!-- 搜索框 -->
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          placeholder="搜索陌生人..."
          clearable
          :prefix-icon="Search"
          @keyup.enter="fetchStrangers"
        />
        <el-button 
          type="primary" 
          size="small" 
          @click="fetchStrangers"
          style="margin-top: 8px"
        >
          搜索
        </el-button>
      </div>

      <el-scrollbar height="calc(100vh - 180px)">
        <!-- 陌生人搜索结果 -->
        <div v-if="showStrangersOrApplies">
          <el-empty v-if="strangers.length === 0" description="没有找到用户"/>
          
          <div 
            v-for="stranger in strangers" 
            :key="stranger.id" 
            class="list-item"
          >
            <el-avatar :size="36" :src="stranger.avatar">
              {{ stranger.name.charAt(0) }}
            </el-avatar>
            <div class="item-info">
              <span class="name">{{ stranger.name }}</span>
              <div class="actions">
                <el-button type="primary" size="small" plain @click="addFriendApply(stranger)">
                  添加好友
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 好友申请列表 -->
        <div v-else>
          <el-empty v-if="applies.length === 0" description="暂无好友申请"/>
          
          <div 
            v-for="apply in applies" 
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
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { ArrowLeft, ArrowRight, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { addFriend, agreeAddFriend, getAddFriendList, refuseAddFriend, searchStranger } from '@/api/friend'

const isCollapsed = ref(true)
const drawerVisible = ref(false)
const searchQuery = ref('')
const userId = sessionStorage.getItem('userId')
// 默认开申请好友列表
const showStrangersOrApplies = ref(false)

// 申请列表数据
const applies = ref([])
// 陌生人列表数据
const strangers = ref([])

// 获取好友申请列表
const fetchApplies = async () => {
  try {
    const res = await getAddFriendList(userId)
    applies.value = res.data.data.map(user => ({
      id: user._id,
      name: user.nickName,
      avatar: ''
    }))
  } catch (error) {
    console.error('获取好友申请列表失败:', error)
    ElMessage.error('获取申请列表失败')
  }
}

// 搜索陌生人
const fetchStrangers = async () => {
  if (!searchQuery.value.trim()) {
    ElMessage.warning('请输入搜索内容')
    return
  }
  
  try {
    const res = await searchStranger(searchQuery.value, userId)
    if (!res.data.data) {
      // 需要加上，消除上一次搜索的内容
      strangers.value = []
      ElMessage.info('没有找到符合条件的用户')
    } else {
      strangers.value = [{
        id: res.data.data._id,
        name: res.data.data.nickName,
        avatar: ''
      }]
    }
    showStrangersOrApplies.value = true
  } catch (error) {
    console.error('搜索陌生人失败:', error)
  }
}

// 返回申请列表
const backToApplies = () => {
  showStrangersOrApplies.value = false
  searchQuery.value = ''
}

// 接受申请
const acceptApply = (apply) => {
  // 先调用同意接口
  agreeAddFriend(userId, apply.id);
  ElMessage.success(`已接受 ${apply.name} 的好友申请`)
  applies.value = applies.value.filter(a => a.id !== apply.id)
  
}

// 拒绝申请
const rejectApply = (apply) => {
  // 调用拒绝接口
  refuseAddFriend(userId, apply.id);
  ElMessage.warning(`已拒绝 ${apply.name} 的好友申请`)
  applies.value = applies.value.filter(a => a.id !== apply.id)
}

// 陌生人搜索列表内，发起添加好友申请
const addFriendApply = (stranger) => {
  // 调用发起申请好友请求接口
  addFriend(userId, stranger.id);
  ElMessage.success(`好友申请已发送给 ${stranger.name}`);
  // 需要添加完直接回申请列表？
  // backToApplies();
}

// 侧边栏控制
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  fetchApplies();
}

// 同步状态
watch(isCollapsed, (val) => {
  drawerVisible.value = !val
})

watch(drawerVisible, (val) => {
  isCollapsed.value = !val
})
</script>

<style scoped lang="scss">
// 按钮
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

.apply-trigger {
  background: var(--el-color-success);
  color: white;
  
  &:hover {
    background: var(--el-color-success-light-3);
  }
}

// 弹出内容
.drawer-content {
  padding: 16px;
  
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    .sidebar-title {
      margin: 0;
      color: var(--el-text-color-primary);
    }
    
    .back-btn {
      padding: 0;
      color: var(--el-color-primary);
      
      &:hover {
        color: var(--el-color-primary-light-3);
      }
    }
  }

  .search-section {
    margin-bottom: 16px;
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