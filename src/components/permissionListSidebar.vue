<template>
  <!-- 协作者列表按钮 -->
  <el-button 
    class="trigger-btn"
     style="margin:0!important;"
    @click="toggleSidebar"
    plain
  >
    <span class="btn-label">协作者列表</span>
    <el-icon :size="16">
      <component :is="isCollapsed ? 'ArrowLeft' : 'ArrowRight'" />
    </el-icon>
  </el-button>

  <!-- 协作者列表侧边栏 -->
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
          {{ showSearchResults ? '好友搜索结果' : '协作者列表' }}
        </h3>
        <el-button 
          v-if="showSearchResults"
          type="text" 
          size="small"
          @click="backToCollaborators"
          class="back-btn"
        >
          <el-icon><ArrowLeft /></el-icon> 返回
        </el-button>
      </div>

      <!-- 搜索好友部分 -->
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          placeholder="搜索好友..."
          clearable
          :prefix-icon="Search"
          @keyup.enter="searchFriends"
        />
        <el-button 
          type="primary" 
          size="small" 
          @click="searchFriends"
          style="margin-top: 8px"
        >
          搜索
        </el-button>
      </div>

      <el-scrollbar height="calc(100vh - 180px)">
        <!-- 好友搜索结果 -->
        <div v-if="showSearchResults">
          <el-empty v-if="filterSearchResults.length === 0" description="没有找到好友"/>
          
          <div 
            v-for="friend in filterSearchResults" 
            :key="friend.id" 
            class="list-item"
          >
            <el-avatar :size="36" :src="friend.avatar">
              {{ friend.name.charAt(0) }}
            </el-avatar>
            <div class="item-info">
              <span class="name">{{ friend.name }}</span>
              <div class="actions">
                <el-button 
                  type="primary" 
                  size="small" 
                  plain 
                  @click="addCollaborator(friend)"
                >
                  添加为协作者
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 协作者列表 -->
        <div v-else>
          <el-empty v-if="collaborators.length === 0" description="暂无协作者"/>
          
          <div 
            v-for="collaborator in collaborators" 
            :key="collaborator.id" 
            class="list-item"
          >
            <el-avatar :size="36" :src="collaborator.avatar">
              {{ collaborator.name.charAt(0) }}
            </el-avatar>
            <div class="item-info">
              <span class="name">{{ collaborator.name }}</span>
              <span class="permission-tag">
                <el-tag size="small" :type="getPermissionType(collaborator.permission)">
                  {{ getPermissionText(collaborator.permission) }}
                </el-tag>
              </span>
            </div>
            <el-dropdown 
              trigger="click" 
              :hide-on-click="false"
              @command="handleCommand(collaborator.id, $event)"
            >
              <el-button type="text" class="permission-btn">
                <el-icon><MoreFilled /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item 
                    :command="'1'" 
                    :class="{ 'selected': collaborator.permission === '1' }"
                  >
                    可管理
                    <el-icon v-if="collaborator.permission === '1'"><Check /></el-icon>
                  </el-dropdown-item>
                  <el-dropdown-item 
                    :command="'2'" 
                    :class="{ 'selected': collaborator.permission === '2' }"
                  >
                    可编辑
                    <el-icon v-if="collaborator.permission === '2'"><Check /></el-icon>
                  </el-dropdown-item>
                  <el-dropdown-item 
                    :command="'3'" 
                    :class="{ 'selected': collaborator.permission === '3' }"
                  >
                    可阅读
                    <el-icon v-if="collaborator.permission === '3'"><Check /></el-icon>
                  </el-dropdown-item>
                  <el-dropdown-item 
                    command="delete"
                    class="delete-item"
                  >
                    删除协作者
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  MoreFilled, 
  Check 
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { addDocPermission, deletePermission, getDocPermissionList, updateDocPermission } from '@/api/permission'
import { getFriendList } from '@/api/friend'
import { useRoute } from 'vue-router'
const route = useRoute();

const isCollapsed = ref(true)
const drawerVisible = ref(false)
const searchQuery = ref('')
const showSearchResults = ref(false)

// 会话获取用户的权限码(以下所有permission都是permissionCode)
// const permission = sessionStorage.getItem('permissionCode');
const userId = sessionStorage.getItem('userId');
// const permission = "0";

// 协作者列表数据
const collaborators = ref([
  { id: 1, name: '张三', avatar: '', permission: '1' },
  { id: 2, name: '李四', avatar: '', permission: '2' }
])

// 好友搜索结果数据
const searchResults = ref([])

const filterSearchResults = computed(() => {
  return searchResults.value.filter(f => f.name.includes(searchQuery.value))
})

// 模板
// [
//   { id: 3, name: '王五', avatar: '' },
//   { id: 4, name: '赵六', avatar: '' }
// ]

// 获取文档内的协作者列表
const fetchDocPermissionList = async () => {
    const docId = route.params.insertedId;
    const userId = sessionStorage.getItem('userId');
    
    const res = await getDocPermissionList(docId, userId);
    console.log(res, "这是res");

    
    if (res.status === 402) {
      ElMessage.error('您没有权限查看此文档的协作者列表');
      return false;
    }
    
    // 渲染数据
    collaborators.value = res.data.data.map(p => ({
      id: p.userId,
      name: p.nickName,
      avatar: '',
      permission: p.permissionCode
    }));
    return true;
};

// 处理权限变更
const handleCommand = (collaboratorId, command) => {
  if (command === 'delete') {
    // 删除键标红，走删除逻辑
    confirmDelete(collaboratorId)
  } else {
    // 其余传入新的权限码
    updatePermission(collaboratorId, command)
  }
}

// 修改协作者权限
const updatePermission = async (collaboratorId, newPermission) => {
  const docId = route.params.insertedId;
  const collaborator = collaborators.value.find(c => c.id === collaboratorId);
  if (collaborator) {
    // 调用修改协作者权限接口
    await updateDocPermission(collaboratorId, docId, newPermission);
    collaborator.permission = newPermission;
    ElMessage.success('权限更新成功');
  }
}

// 删除协作者
const confirmDelete = (collaboratorId) => {
  ElMessageBox.confirm(
    '确定要删除此协作者吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async() => {
    // 先调删除接口
    const docId = route.params.insertedId;
    await deletePermission(collaboratorId, docId);
    collaborators.value = collaborators.value.filter(c => c.id !== collaboratorId);
    ElMessage.success('删除成功');
  }).catch(() => {
    ElMessage.info('已取消删除');
  })
}

// 获取权限文本
const getPermissionText = (permission) => {
  const map = {
    "1": '可管理',
    "2": '可编辑',
    "3": '可阅读'
  }
  return map[permission] || '未设置'
}

// 获取权限标签类型
const getPermissionType = (permission) => {
  const map = {
    "1": 'success',
    "2": 'warning',
    "3": 'info'
  }
  return map[permission] || ''
}

// 搜索好友
const searchFriends = async () => {
  // if (!searchQuery.value.trim()) {
  //   ElMessage.warning('请输入搜索内容')
  //   return
  // }
  
  // 调用接口查询好友列表
  try {
    const result = await getFriendList(userId);
    searchResults.value = result.data.data.map(f => ({
      id: f._id,
      name: f.nickName,
      avatar: ''
    }));

    // 确定搜索后，切换为搜索样式页
    showSearchResults.value = true
  } catch (error) {
    console.error('搜索好友失败:', error)
    ElMessage.error('搜索失败')
  }
}

// 添加好友为协作者
const addCollaborator = (friend) => {
  if (collaborators.value.some(c => c.id === friend.id)) {
    ElMessage.warning('该用户已是协作者');
    return;
  }

  // 路径获取文档ID
  const docId = route.params.insertedId;
  // 调用添加协作者接口，1：管理  2：编辑  3：阅读
  // 默认给只读
  addDocPermission(friend.id, docId, "3");
  

  collaborators.value.push({
    ...friend,
    permission: '3' // 默认权限为可读
  })
  ElMessage.success(`已添加 ${friend.name} 为协作者`);
  backToCollaborators();
}

// 返回协作者列表
const backToCollaborators = () => {
  showSearchResults.value = false
  searchQuery.value = ''
}


// 打开侧边栏
const toggleSidebar = async () => {
  // 判断是否有权限查看协作者列表
  const res = await fetchDocPermissionList();
  
  if (res == false) {
    return;
  }
  isCollapsed.value = !isCollapsed.value
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
.trigger-btn {
  // margin-top:-6px;
  // margin-left:-1px;
  font-weight: bold;
  color:#1f2329;
  // position: fixed;
  width: 100px;
  height: 35px;
  padding: 0 14px;
  border-radius: 9px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // gap: 6px;
  cursor: pointer;
  // z-index: 1000;
  transition: all 0.3s;
  
  .btn-label {
    font-size: 14px;
    font-weight: 450;
  }

  &:hover {
    background-color: #f5f7fa;
  }
}

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
    align-items: center;
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
      
      .name {
        display: block;
        font-weight: 500;
        margin-bottom: 4px;
      }
      
      .permission-tag {
        font-size: 12px;
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

<style lang="scss">
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