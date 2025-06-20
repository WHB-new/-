import { defineStore } from 'pinia';
import { ref } from 'vue';
import { 
  getKnowledgeList, 
  deleteKnowledge, 
  updateKnowledge,
  getKnowledgeDetail
} from '@/api/knowledge';

export const useKnowledgeStore = defineStore('knowledge', () => {
  const knowledgeList = ref([]);
  
  const transformKnowledgeData = (data) => {
  return data.map(kb => ({
    id: kb._id,
    title: kb.baseName || '未命名知识库',  
    description: kb.baseDesc || '无描述', 
    directory: kb.docs || [],
    updated: kb.updateTime ? formatDate(kb.updateTime) : '未知时间',
    color: getRandomColor()
  }));
};
  
  const formatDate = (dateString) => {
    if (!dateString) return '未知时间';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  };
  
  const getRandomColor = () => {
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#1abc9c', '#9b59b6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const fetchKnowledgeList = async (userId) => {
    try {
      const res = await getKnowledgeList(userId);
      knowledgeList.value = transformKnowledgeData(res.data.data);
    } catch (error) {
      console.error('获取知识库列表失败:', error);
    }
  };
  
  const deleteRepo = async (id) => {
    try {
      await deleteKnowledge(id);
      knowledgeList.value = knowledgeList.value.filter(k => k.id !== id);
      return true;
    } catch (error) {
      console.error('删除知识库失败:', error);
      return false;
    }
  };

  const updateRepo = async (id, ownerId, updatedData) => {
    try {
     let res =  await updateKnowledge(id,{
        ownerId,
        baseName: updatedData.title,
        baseDesc: updatedData.description,
        docs: updatedData.directory.map(doc => ({
        id: doc.id,
        name: doc.name,
        content: doc.content
        }))
      });
       if(res.data.code ==200){
      console.log('失败了')
      ElMessage.success('知识库已成功更新！');
    }
      const index = knowledgeList.value.findIndex(r => r.id === id);
      if (index !== -1) {
        knowledgeList.value[index] = {
          ...knowledgeList.value[index],
          title: updatedData.title,
          description: updatedData.description,
          directory: updatedData.directory,
          updated: formatDate(new Date())
        };
      }
    } catch (error) {
      console.error('更新知识库失败:', error);
      throw error;
    }
  };

  const getRepoDetail = async (id) => {
  try {
    const res = await getKnowledgeDetail(id);
    const kb = res.data.data;
    return {
      id: kb._id,
      title: kb.baseName || '未命名知识库', 
      description: kb.baseDesc || '无描述',
      directory: kb.docs || [] 
    };
  } catch (error) {
    console.error('获取知识库详情失败:', error);
    throw error;
  }
};

  return {
    knowledgeList,
    fetchKnowledgeList,
    deleteRepo,
    updateRepo,
    getRepoDetail
  };
});