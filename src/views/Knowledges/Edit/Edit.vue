<template>
  <div style="height: 100vh;display: flex;flex-direction: column;">
    <Nav :name="`编辑知识库: ${knowledge?.title || '加载中...'}`"></Nav>
    
    <div class="edit-container" v-if="knowledge">
      <div class="editor-header">
        <div class="meta-info">
          <div class="title-input">
            <input type="text" v-model="knowledge.title" placeholder="输入知识库标题">
          </div>
          <div class="description-input">
            <textarea v-model="knowledge.description" placeholder="输入知识库描述..." rows="2"></textarea>
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-save" @click="saveChanges">
            <i class="fas fa-save"></i> 保存更改
          </button>
          <button class="btn btn-back" @click="goBack">
            <i class="fas fa-arrow-left"></i> 返回列表
          </button>
        </div>
      </div>
      
      <div class="editor-content">
        <div class="sidebar">
          <div class="sidebar-header">
            <h3>文档列表</h3>
            <div class="actions">
              <button class="btn btn-sm" @click="addNewFile">
                <i class="fas fa-file-alt"></i> 新建文档
              </button>
            </div>
          </div>
          
          <div class="directory-tree">
            <div 
              v-for="item in knowledgeFileList" 
              :key="item._id"
              class="tree-item"
              :class="{ 'selected': selectedItem?.id === item._id }"
              
            >
              <div class="item-content" @click="selectItem(item)">
                <i class="fas fa-file"></i>
                <span>{{ item.title }}</span>
                <svg t="1750512919025" class="delete-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3607" width="16" height="16" @click=handleDelete(item._id)><path d="M380 455a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v240a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V455zM644 455a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v240a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V455z" fill="#323338" p-id="3608"></path><path d="M321 212V96c0-17.673 14.327-32 32-32h320c17.673 0 32 14.327 32 32v116h183a8 8 0 0 1 8 8v64a8 8 0 0 1-8 8h-55v635c0 17.673-14.327 32-32 32H225c-17.673 0-32-14.327-32-32V292h-58a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h186z m80-68v68h224v-68H401zM273 292v587h480V292H273z" fill="#323338" p-id="3609"></path></svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="main-content">
          <div v-if="selectedItem" class="editor-area">
            <div class="editor-header">
              <input type="text" v-model="selectedItem.name" placeholder="输入文档标题">
              <div class="actions">
                <button class="btn btn-sm btn-danger" @click="deleteItem">
                  <i class="fas fa-trash"></i> 删除
                </button>
              </div>
            </div>
            
            <div class="editor-body">
              <textarea v-model="selectedItem.content" placeholder="在此输入文档内容..."></textarea>
            </div>
          </div>
          
          <div v-else class="empty-state">
            <i class="fas fa-file-alt"></i>
            <p>请从左侧选择文档进行编辑</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading">
      <div class="spinner"></div>
      <p>加载知识库内容中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import Nav from '@/components/Nav.vue';
import {addFile,getFileList} from '@/api/file'
import { 
  updateKnowledge,
  getDocsByBaseId
} from '@/api/knowledge';
import { ElMessage } from 'element-plus';
// import{addFile,
//   deleteFile,
//   updateDocument
// }from '@/api/file'
const route = useRoute();
const router = useRouter();
const knowledgeStore = useKnowledgeStore();

const knowledge = ref(null);
const selectedItem = ref(null);
const ownerId = ref(sessionStorage.getItem('userId'));
const knowledgeFileList = ref([])
onMounted(async () => {
  const id = route.params.id;
  const userId = sessionStorage.getItem('userId'); 
  
  if (userId) {
    const detail = await knowledgeStore.getRepoDetail(id);
    const docsRes = await getDocsByBaseId(detail.id);
    const docs = docsRes.data.data || [];
    
    knowledge.value = {
      ...detail,
      directory: docs.map(doc => ({
        id: doc._id,
        name: doc.title || '未命名文档',
        content: doc.content || ''
      }))
    };
  }
  getList();
});

const handleDelete = (id)=>{

}
//查询知识库文件列表
const getList = ()=>{
  getFileList(route.params.id).then(res=>{
knowledgeFileList.value =res.data.data
  }).catch(err=>{
    
  })
}
// 选择项目
const selectItem = (item) => {
  // sessionStorage.setItem('lastUrl',window.location.href)
  console.log(route,'route')
  const url = `/edit/${route.params.id}`
  sessionStorage.setItem('lastUrl',url)
  router.push({name:'content',params:{insertedId:item._id}})
};

// 添加文件
const addNewFile =async () => {
 let res = await addFile({
    baseId:route.params.id,
     ownerId: sessionStorage.getItem('userId'),
  })
  if(res.data.code == 201){
getList()
  }
  
};

// 删除当前选中的项目
const deleteItem = async () => {
  if (selectedItem.value) {
    try {
      await deleteFile(selectedItem.value.id);

      knowledge.value.directory = knowledge.value.directory.filter(
        item => item.id !== selectedItem.value.id
      );
      
      selectedItem.value = null;
      ElMessage.success('文档已删除');
    } catch (error) {
      ElMessage.error('删除文档失败');
      console.error('删除文档失败:', error);
    }
  }
};


// 保存更改
const saveChanges = async () => {
  try {
    await updateKnowledge(route.params.id, {
      baseName: knowledge.value.title,
      baseDesc: knowledge.value.description,
    });
    
    ElMessage.success('知识库已成功更新！');
    router.push({ name: 'knowledges' });
  } catch (error) {
    ElMessage.error('更新知识库失败');
    console.error('更新知识库失败:', error);
  }
};

const goBack = () => {
  router.push({ name: 'knowledges' });
};

const showToast = (message) => {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
};
</script>

<style lang="scss" scoped>
.delete-icon{
  width: 16px;
  height: 16px;
  &:hover{
    border-radius: 3px;
    cursor: pointer;
    background-color:#d6d9dc;
  }
}
.edit-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f5f7f9;
}

.editor-header {
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  .meta-info {
    flex: 1;
    padding-right: 20px;
    
    .title-input {
      margin-bottom: 12px;
      
      input {
        width: 100%;
        border: none;
        outline: none;
        font-size: 20px;
        font-weight: 600;
        color: #1f2329;
        padding: 8px 0;
        
        &::placeholder {
          color: #c0c4cc;
        }
      }
    }
    
    .description-input {
      textarea {
        width: 100%;
        border: none;
        outline: none;
        font-size: 14px;
        color: #515a6e;
        resize: none;
        line-height: 1.5;
        padding: 6px 0;
        font-family: inherit;
        
        &::placeholder {
          color: #c0c4cc;
        }
      }
    }
  }
  
  .actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 180px;
  }
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
}

.btn-save {
  background: #2d8cf0;
  color: white;
  
  &:hover {
    background: #1a6fd9;
  }
}

.btn-back {
  background: #f0f2f5;
  color: #515a6e;
  
  &:hover {
    background: #e4e6e9;
  }
}

.btn-danger {
  background: #ed4014;
  color: white;
  
  &:hover {
    background: #e13c33;
  }
}

.editor-content {
  flex: 1;
  display: flex;
  padding: 24px;
  gap: 24px;
  overflow: hidden;
  height: calc(100vh - 180px);
}

.sidebar {
  width: 280px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #f0f2f5;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #1f2329;
  }
  
  .actions {
    display: flex;
    gap: 8px;
  }
}

.directory-tree {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.tree-item {
  margin-bottom: 4px;
  border-radius: 6px;
  transition: background 0.2s;
  
  &.selected {
    background: #e6f7ff;
  }
  
  .item-content {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 6px;
    
    &:hover {
      background: #f0f7ff;
    }
    
    i {
      margin-right: 8px;
      color: #2d8cf0;
      width: 20px;
      text-align: center;
    }
    
    span {
      flex: 1;
      font-size: 14px;
    }
  }
}

.main-content {
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.editor-area {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.editor-header {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  
  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 600;
    padding: 4px 0;
    
    &::placeholder {
      color: #c0c4cc;
    }
  }
}

.editor-body {
  flex: 1;
  padding: 16px;
  
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    line-height: 1.6;
    resize: none;
    font-family: inherit;
    
    &:focus {
      outline: none;
    }
  }
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #8F959E;
  
  i {
    font-size: 64px;
    margin-bottom: 16px;
    color: #e0e0e0;
  }
  
  p {
    font-size: 16px;
  }
}

.loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f0f2f5;
    border-top: 4px solid #2d8cf0;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  p {
    color: #515a6e;
    font-size: 16px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: #19be6b;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform 0.3s ease;
  
  &.show {
    transform: translateX(-50%) translateY(0);
  }
}
</style>