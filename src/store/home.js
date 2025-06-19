import { defineStore } from "pinia";

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    // 控制侧边栏的展开与收入
    isCollapse: false,
    
    // 文档数据
    documents: [
      {
        id: 1,
        name: '知识问答1',
        fileName: '知识问答1',
        userName: '王皓彬',
        time: '今天14:17',
        lastAccessed: Date.now() - 1000 * 60 * 60 * 2, // 2小时前
      },
      {
        id: 2,
        name: '知识问答2',
        fileName: '知识问答2',
        userName: '张三',
        time: '今天20:37',
        lastAccessed: Date.now() - 1000 * 60 * 30, // 30分钟前
      },
      {
        id: 3,
        name: '知识问答3',
        fileName: '知识问答3',
        userName: '李四',
        time: '昨天16:22',
        lastAccessed: Date.now() - 1000 * 60 * 60 * 24, // 1天前
      },
      {
        id: 4,
        name: '知识问答4',
        fileName: '知识问答4',
        userName: '王五',
        time: '昨天09:15',
        lastAccessed: Date.now() - 1000 * 60 * 60 * 36, // 36小时前
      }
    ]
  }),
  
  getters: {
    // 获取按最近访问时间排序的文档
    recentDocuments: (state) => {
      return [...state.documents].sort((a, b) => b.lastAccessed - a.lastAccessed)
    }
  },
  
  actions: {
    // 更新文档的最近访问时间
    updateLastAccessed(docId) {
      const doc = this.documents.find(d => d.id === docId)
      if (doc) {
        doc.lastAccessed = Date.now()
        // 更新时间显示
        const now = new Date()
        const hours = now.getHours().toString().padStart(2, '0')
        const minutes = now.getMinutes().toString().padStart(2, '0')
        doc.time = `今天${hours}:${minutes}`
      }
    },

    // 删除文档
    deleteDocument(docId) {
      const index = this.documents.findIndex(d => d.id === docId)
      if (index > -1) {
        this.documents.splice(index, 1)
      }
    },

    // 添加新文档
    addDocument(docData) {
      const newId = this.documents.length > 0 ? Math.max(...this.documents.map(d => d.id)) + 1 : 1
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      
      const newDoc = {
        id: newId,
        name: docData.name || `新文档${newId}`,
        fileName: docData.fileName || `新文档${newId}`,
        userName: docData.userName || '当前用户',
        time: `今天${hours}:${minutes}`,
        lastAccessed: Date.now(),
        ...docData
      }
      
      this.documents.unshift(newDoc)
      return newDoc
    }
  }
})