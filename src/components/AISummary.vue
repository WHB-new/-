<template>
  <!-- AI摘要显示区域 -->
  <transition name="summary-fade" mode="out-in">
    <div class="summary-section" v-if="summaryVisible && documentSummary" key="summary">
      <div class="summary-header">
        <svg t="1750924024571" class="icon" viewBox="0 0 1029 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4316" width="16" height="16">
          <path d="M761.216 997.76c-144.64 0-262.4-117.76-262.4-262.4s117.76-262.4 262.4-262.4 262.4 117.76 262.4 262.4-117.76 262.4-262.4 262.4z m0-448c-102.4 0-185.6 83.2-185.6 185.6s83.2 185.6 185.6 185.6 185.6-83.2 185.6-185.6-83.328-185.6-185.6-185.6z" p-id="4317"></path>
          <path d="M858.496 815.872l-116.48-58.24V588.16h51.2v137.728l88.192 44.16zM174.08 269.312h422.4v51.2h-422.4zM174.08 448.512h281.6v51.2h-281.6zM174.08 627.712h192v51.2h-192z" p-id="4318"></path>
          <path d="M442.88 922.112H0v-883.2h775.68v364.8h-76.8V115.712H76.8v729.6h366.08z" p-id="4319"></path>
        </svg>
        <span>AI摘要</span>
        <el-button size="small" type="primary" @click="handleManualRegenerate" :loading="generatingSummary">
          重新生成
        </el-button>
      </div>
      <div class="summary-content">
        {{ documentSummary }}
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import { ElMessage } from 'element-plus'
import { generateSummary, getSummary, deleteSummary } from '@/api/summary'

// 调试开关
const DEBUG = true

// 组件实例计数
let instanceCount = 0
const currentInstanceId = ++instanceCount

if (DEBUG) {
  console.log(`【前端AI摘要】组件实例 ${currentInstanceId} 创建`)
}

// 定义props
const props = defineProps({
  quill: {
    type: Object,
    default: null
  }
})

// 定义emits
const emit = defineEmits(['summary-updated'])

const route = useRoute()

// 多文档隔离状态 - 每个组件实例独立
const docStates = ref(new Map())

// 当前文档的状态（从docStates中获取）
const documentSummary = ref('')
const summaryVisible = ref(false)
const summaryState = ref(1) // 1:无摘要 2:有摘要
const generatingSummary = ref(false)

// 获取文档内容纯文本（适配后端，专门处理Quill Delta格式）
function getEditorText() {
  if (!props.quill) {
    console.log(`【前端AI摘要】[实例${currentInstanceId}] quill对象未初始化`)
    return ''
  }
  try {
    const delta = props.quill.getContents();
    if (delta && Array.isArray(delta.ops)) {
      return delta.ops.map(op => typeof op.insert === 'string' ? op.insert : '').join('').trim();
    }
    return props.quill.getText().trim();
  } catch (error) {
    console.log(`【前端AI摘要】[实例${currentInstanceId}] 获取编辑器内容失败:`, error)
    return ''
  }
}

// 计算hash
function simpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return hash.toString()
}

// 获取或创建文档状态
function getState(docId) {
  if (!docStates.value.has(docId)) {
    docStates.value.set(docId, {
      summary: '',
      visible: false,
      state: 1,
      hash: '',
      timer: null
    })
  }
  return docStates.value.get(docId)
}

// 清理指定文档的定时器
function clearTimer(docId) {
  const state = getState(docId)
  if (state.timer) {
    clearInterval(state.timer)
    state.timer = null
  }
}

// 清理所有定时器
function clearAllTimers() {
  docStates.value.forEach((state, docId) => clearTimer(docId))
}

// 同步当前文档状态到UI
function syncStateToUI(docId) {
  const state = getState(docId)
  if (route.params.insertedId === docId) {
    documentSummary.value = state.summary
    summaryVisible.value = state.visible
    summaryState.value = state.state
  }
}

// 状态1：无摘要，5秒检测
function startNoSummaryCheck(docId) {
  console.log(`【前端AI摘要】[实例${currentInstanceId}] 启动文档 ${docId} 的无摘要5秒检测`)
  clearTimer(docId)
  const state = getState(docId)
  state.state = 1
  state.visible = false
  state.summary = ''
  syncStateToUI(docId)
  
  state.timer = setInterval(async () => {
    if (route.params.insertedId !== docId) {
      console.log(`【前端AI摘要】[实例${currentInstanceId}] 文档 ${docId} 已不是当前文档，跳过检测`)
      return
    }
    const text = getEditorText()
    console.log(`【前端AI摘要】[实例${currentInstanceId}] 5秒检测 - 文档 ${docId} 内容长度: ${text.length}`)
    if (text.length >= 50) {
      console.log(`【前端AI摘要】[实例${currentInstanceId}] 5秒检测 - 内容≥50字，开始生成摘要`)
      await generateAndSaveSummary(docId)
    }
  }, 5000)
}

// 状态2：有摘要，30秒检测
function startHasSummaryCheck(docId) {
  console.log(`【前端AI摘要】[实例${currentInstanceId}] 启动文档 ${docId} 的有摘要30秒检测`)
  clearTimer(docId)
  const state = getState(docId)
  state.state = 2
  state.visible = true
  syncStateToUI(docId)
  
  state.timer = setInterval(async () => {
    if (route.params.insertedId !== docId) {
      console.log(`【前端AI摘要】[实例${currentInstanceId}] 文档 ${docId} 已不是当前文档，跳过检测`)
      return
    }
    const text = getEditorText()
    const hash = simpleHash(text)
    console.log(`【前端AI摘要】[实例${currentInstanceId}] 30秒检测 - 文档 ${docId} 内容长度: ${text.length}, 当前hash: ${hash}, 保存hash: ${state.hash}`)
    
    if (text.length < 50) {
      console.log(`【前端AI摘要】[实例${currentInstanceId}] 30秒检测 - 内容<50字，删除摘要`)
      try {
        await deleteSummary(docId)
        console.log(`【前端AI摘要】[实例${currentInstanceId}] 数据库摘要删除成功`)
      } catch (error) {
        console.log(`【前端AI摘要】[实例${currentInstanceId}] 数据库摘要删除失败:`, error)
      }
      // 强制回到状态1
      state.summary = ''
      state.visible = false
      state.state = 1
      state.hash = ''
      syncStateToUI(docId)
      startNoSummaryCheck(docId)
      return
    }
    
    if (hash !== state.hash) {
      console.log(`【前端AI摘要】[实例${currentInstanceId}] 30秒检测 - 内容hash变化，重新生成摘要`)
      await generateAndSaveSummary(docId)
      state.hash = hash
    }
  }, 30000)
}

// 初始化摘要状态
async function initSummary(docId) {
  console.log(`[AI摘要] >>> 进入initSummary, docId=`, docId, 'props.quill=', props.quill)
  clearTimer(docId)
  const text = getEditorText()
  const hash = simpleHash(text)
  console.log(`[AI摘要] 当前文档内容长度: ${text.length}, hash: ${hash}`)
  
  // 内容<50字，直接进入状态1
  if (text.length < 50) {
    console.log(`【前端AI摘要】[实例${currentInstanceId}] 内容<50字，直接进入无摘要状态`)
    const state = getState(docId)
    state.summary = ''
    state.visible = false
    state.state = 1
    state.hash = ''
    syncStateToUI(docId)
    startNoSummaryCheck(docId)
    return
  }
  
  try {
    console.log(`【前端AI摘要】[实例${currentInstanceId}] 尝试从数据库拉取摘要...`)
    const res = await getSummary(docId)
    console.log(`【前端AI摘要】[实例${currentInstanceId}] getSummary返回:`, res.data)
    
    if (res.data.code === 200 && res.data.data) {
      const dbHash = res.data.data.contentHash
      console.log(`【前端AI摘要】[实例${currentInstanceId}] 数据库hash: ${dbHash}, 当前hash: ${hash}`)
      if (dbHash === hash) {
        console.log(`【前端AI摘要】[实例${currentInstanceId}] 数据库hash一致，直接用数据库摘要，不发起AI生成`)
        const state = getState(docId)
        state.summary = res.data.data.summary
        state.visible = true
        state.state = 2
        state.hash = dbHash
        syncStateToUI(docId)
        startHasSummaryCheck(docId)
        return
      } else {
        console.log(`【前端AI摘要】[实例${currentInstanceId}] 数据库hash不一致，准备发起AI生成`)
      }
    } else {
      console.log(`【前端AI摘要】[实例${currentInstanceId}] 数据库无摘要，准备发起AI生成`, {
        code: res.data.code,
        hasData: !!res.data.data
      })
    }
  } catch (error) {
    console.log(`【前端AI摘要】[实例${currentInstanceId}] getSummary调用失败:`, error)
  }
  
  // 无摘要或hash不一致，生成新摘要
  console.log(`【前端AI摘要】[实例${currentInstanceId}] 发起AI摘要生成请求...`)
  await generateAndSaveSummary(docId)
}

// 生成并保存摘要
async function generateAndSaveSummary(docId, manual = false) {
  console.log(`[AI摘要] >>> 进入generateAndSaveSummary, docId=`, docId, 'manual=', manual, 'props.quill=', props.quill)
  const text = getEditorText()
  const hash = simpleHash(text)
  console.log(`[AI摘要] generateAndSaveSummary触发，内容长度: ${text.length}, hash: ${hash}, manual: ${manual}`)
  
  if (text.length < 50) {
    if (manual) ElMessage.warning('内容不足50字，无法生成摘要')
    // 强制回到状态1
    const state = getState(docId)
    state.summary = ''
    state.visible = false
    state.state = 1
    state.hash = ''
    syncStateToUI(docId)
    startNoSummaryCheck(docId)
    console.log(`【前端AI摘要】[实例${currentInstanceId}] generateAndSaveSummary终止，内容不足50字`)
    return
  }
  
  generatingSummary.value = true
  try {
    console.log(`【前端AI摘要】[实例${currentInstanceId}] 发送AI摘要生成请求，参数:`, {
      docId,
      userId: sessionStorage.getItem('userId'),
      content: text,
      contentHash: hash
    })
    const res = await generateSummary({
      docId,
      userId: sessionStorage.getItem('userId'),
      content: text,
      contentHash: hash
    })
    console.log(`【前端AI摘要】[实例${currentInstanceId}] AI摘要生成响应:`, res.data)
    
    if (res.data.code === 200 && res.data.data) {
      const state = getState(docId)
      state.summary = res.data.data
      state.visible = true
      state.state = 2
      state.hash = hash
      syncStateToUI(docId)
      startHasSummaryCheck(docId)
      emit('summary-updated', res.data.data)
      if (manual) ElMessage.success('摘要已重新生成并保存')
      console.log(`【前端AI摘要】[实例${currentInstanceId}] 摘要生成成功，已进入状态2`)
    } else {
      if (manual) ElMessage.warning(res.data.message || '摘要生成失败')
      // 生成失败，强制回到状态1
      const state = getState(docId)
      state.summary = ''
      state.visible = false
      state.state = 1
      state.hash = ''
      syncStateToUI(docId)
      startNoSummaryCheck(docId)
      console.log(`【前端AI摘要】[实例${currentInstanceId}] 摘要生成失败，回到状态1，响应:`, res.data)
    }
  } catch (e) {
    console.log(`【前端AI摘要】[实例${currentInstanceId}] 生成摘要异常:`, e)
    if (manual) ElMessage.error('摘要生成失败')
    // 生成失败，强制回到状态1
    const state = getState(docId)
    state.summary = ''
    state.visible = false
    state.state = 1
    state.hash = ''
    syncStateToUI(docId)
    startNoSummaryCheck(docId)
    console.log(`【前端AI摘要】[实例${currentInstanceId}] 生成摘要异常，回到状态1`)
  } finally {
    generatingSummary.value = false
  }
}

// 手动生成
async function handleManualRegenerate() {
  if (summaryState.value !== 2) {
    ElMessage.warning('当前状态无法重新生成摘要')
    return
  }
  await generateAndSaveSummary(route.params.insertedId, true)
}

// 监听quill对象变化
watch(() => props.quill, (newQuill, oldQuill) => {
  console.log(`[AI摘要] quill对象变化: oldQuill=`, oldQuill, 'newQuill=', newQuill, 'insertedId=', route.params.insertedId)
  if (newQuill && route.params.insertedId) {
    console.log(`[AI摘要] quill初始化完成，insertedId=`, route.params.insertedId, '准备调用initSummary')
    setTimeout(() => {
      console.log(`[AI摘要] setTimeout后调用initSummary, insertedId=`, route.params.insertedId)
      initSummary(route.params.insertedId)
    }, 100)
  } else {
    console.log(`[AI摘要] quill变化但未满足初始化条件，newQuill=`, newQuill, 'insertedId=', route.params.insertedId)
  }
}, { immediate: true })

// 切换文档
watch(() => route.params.insertedId, async (newId, oldId) => {
  console.log(`[AI摘要] 路由变化: oldId=`, oldId, 'newId=', newId, 'props.quill=', props.quill)
  if (oldId) {
    console.log(`[AI摘要] 清理旧文档 ${oldId} 的定时器`)
    clearTimer(oldId)
  }
  documentSummary.value = ''
  summaryVisible.value = false
  summaryState.value = 1
  if (!newId) {
    console.log(`[AI摘要] 新文档ID为空，清空摘要状态`)
    return
  }
  if (!props.quill) {
    console.log(`[AI摘要] quill未初始化，等待quill变化事件`)
    return
  }
  setTimeout(() => {
    console.log(`[AI摘要] setTimeout后调用initSummary, newId=`, newId)
    initSummary(newId)
  }, 100)
})

// 页面离开
onBeforeRouteLeave(async (to, from, next) => {
  const docId = route.params.insertedId
  if (docId) {
    const text = getEditorText()
    if (text.length < 50) {
      try { 
        await deleteSummary(docId) 
        console.log(`【前端AI摘要】[实例${currentInstanceId}] 页面离开时删除摘要成功`)
      } catch (error) {
        console.log(`【前端AI摘要】[实例${currentInstanceId}] 页面离开时删除摘要失败:`, error)
      }
      const state = getState(docId)
      state.summary = ''
      state.visible = false
      state.state = 1
      state.hash = ''
    }
    clearTimer(docId)
  }
  next()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  console.log(`【前端AI摘要】[实例${currentInstanceId}] 组件卸载，清理所有定时器`)
  clearAllTimers()
})

// 暴露方法给父组件
defineExpose({ generateAndSaveSummary, documentSummary })
</script>

<style scoped>
.summary-section {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
}

.summary-header .icon {
  color: #336df4;
}

.summary-content {
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

/* AI摘要动画效果 */
.summary-fade-enter-active,
.summary-fade-leave-active {
  transition: all 0.4s ease;
}

.summary-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.summary-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.summary-fade-enter-to,
.summary-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style> 