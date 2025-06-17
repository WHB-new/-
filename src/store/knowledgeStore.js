import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useKnowledgeStore = defineStore('knowledge', () => {
  const knowledgeList = ref([
    {
      id: 1,
      title: '产品文档',
      description: '包含所有产品功能说明和使用指南',
      updated: '2024-06-15',
      color: 'linear-gradient(135deg, #2d8cf0, #1a6fd9)',
      icon: 'fa-file-alt',
      directory: [
        { id: 'doc1', name: '用户管理', content: '用户管理功能说明...' },
        { id: 'doc2', name: '权限系统', content: '权限系统详细文档...' },
        { id: 'doc3', name: '数据分析', content: '数据分析功能说明...' },
        { id: 'doc4', name: 'API集成', content: 'API集成指南...' },
        { id: 'doc5', name: '产品路线图', content: '未来产品规划...' }
      ]
    },
    {
      id: 2,
      title: '技术知识库',
      description: '开发技术文档和最佳实践',
      updated: '2024-06-10',
      color: 'linear-gradient(135deg, #19be6b, #0b9b54)',
      icon: 'fa-code',
      directory: [
        { id: 'doc6', name: 'Vue3指南', content: 'Vue3最佳实践...' },
        { id: 'doc7', name: '状态管理', content: 'Pinia使用指南...' },
        { id: 'doc8', name: 'Node.js', content: 'Node.js服务端开发...' },
        { id: 'doc9', name: '数据库设计', content: 'MongoDB设计模式...' }
      ]
    },
    {
      id: 3,
      title: '市场研究',
      description: '市场趋势分析和竞争对手资料',
      updated: '2024-05-28',
      color: 'linear-gradient(135deg, #ff9900, #e68a00)',
      icon: 'fa-chart-line',
      directory: [
        { id: 'doc10', name: '2024市场分析', content: '年度市场分析报告...' },
        { id: 'doc11', name: '竞争对手研究', content: '主要竞争对手分析...' },
        { id: 'doc12', name: '用户调研报告', content: '用户需求调研结果...' }
      ]
    }
  ]);

  // 删除知识库
  const deleteKnowledge = (id) => {
    const idNum = Number(id);
    knowledgeList.value = knowledgeList.value.filter(k => k.id !== idNum);
  };

  // 更新知识库
  const updateKnowledge = (updatedRepo) => {
    const index = knowledgeList.value.findIndex(r => r.id === updatedRepo.id);
    if (index !== -1) {
      knowledgeList.value[index] = {
        ...knowledgeList.value[index],
        ...updatedRepo,
        updated: new Date().toISOString().split('T')[0] // 更新日期
      };
    }
  };

  // 获取知识库详情
  const getKnowledgeById = (id) => {
    const idNum = Number(id);
    return knowledgeList.value.find(k => k.id === idNum);
  };

  return {
    knowledgeList,
    deleteKnowledge,
    updateKnowledge,
    getKnowledgeById
  };
});