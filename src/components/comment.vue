<template>
  <!-- 评论按钮 -->
  <div class="comment-trigger"  @mousedown="CommentClick">
    <el-tooltip effect="dark" content="评论" placement="bottom">
      <el-icon :size="20"><ChatDotRound /></el-icon>
    </el-tooltip>
  </div>

  <!-- 评论侧边栏 -->
  <el-drawer
    v-model="drawerVisible"
    direction="rtl"
    :size="400"
    :with-header="false"
    :modal="false"
    custom-class="comment-drawer"
    @close="clearDrafts"
  >
    <div class="comment-container">
      <div class="comment-header">
        <h3>评论（{{ comments.length }}）</h3>
        <el-button type="warn" @click="toggleDrawer">
          <el-icon :size="25"><Close /></el-icon>
        </el-button>
      </div>

      <el-scrollbar class="comment-scrollbar">
        <div class="comment-list">
          <div 
            v-for="(comment, index) in comments" 
            :key="comment.id" 
            class="comment-item"
            :class="{ 'is-draft': comment.isDraft }"
          >
            <div class="comment-user">
              <el-avatar :size="36" :src="comment.avatar">{{ comment.user.charAt(0) }}</el-avatar>
              <div class="user-info">
                <span class="username">{{ comment.user }}</span>
                <span class="time">{{ formatTime(comment.time) }}</span>
              </div>
              <el-button 
                type="text" 
                class="delete-btn"
                @click="deleteComment(comment.id)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
            
            <div class="comment-content">
              <template v-if="comment.isDraft">
                <el-input
                  v-model="comment.content"
                  type="textarea"
                  :rows="3"
                  placeholder="输入评论内容..."
                  resize="none"
                  ref="commentInput"
                />
                <div class="comment-actions">
                  <el-button size="small" @click="cancelComment(index)">取消</el-button>
                  <el-button 
                    type="primary" 
                    size="small" 
                    @click="submitComment(index)"
                    :disabled="!comment.content.trim()"
                  >
                    提交
                  </el-button>
                </div>
              </template>
              <template v-else>
                {{ comment.content }}
              </template>
            </div>
          </div>
        </div>
      </el-scrollbar>

      <div class="add-comment">
        <el-button 
          type="primary" 
          size="small" 
          @click="createComment"
          :disabled="hasDraft"
        >
          新增评论
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { 
  ChatDotRound, 
  Close, 
  Delete 
} from '@element-plus/icons-vue'
import { saveCommentMap } from '@/api/comment';

const drawerVisible = ref(false)
const comments = ref([])
// 核心，key：评论ID，value：索引范围
const map = new Map();
// 记录草稿评论的文本范围，主要用于草稿评论的删除
let draftRange;

// 第一次提交评论的时候，获取选取起始索引和长度，存入map
function setMap(range, commentId) {
  const l = range.index;
  const r = l + range.length - 1;
  map.set(commentId, { l, r });
};

// 监听文档内容，一旦内容有更新，循环map内的元素，开始更新所选文本索引范围
// 示例：
// delta.ops = [{ retain: 5 }, { delete: 1 }]
props.quill.on('text-change', (delta, oldDelta, source) => {
    // 加入评论监听逻辑
    // 循环不变量：l <= r，不符合的关联评论直接删除
    // quill删除，会包括当前索引，如果是插入，则在当前索引前插入
    // 获取变化位置的索引
    let retainVal, insertVal, deleteVal, insertStr;
    delta.ops.forEach(op => {
      // 仅当当前值为undefined时，才允许赋值
      if (retainVal === undefined) {
        retainVal = op.retain;
      }
      if (insertVal === undefined && op.insert !== undefined) {
        insertVal = op.insert.length;
      }
      if (deleteVal === undefined) {
        deleteVal = op.delete;
      }      
    })
    console.log('监听ddd', retainVal, insertVal, deleteVal);
      
    const index = retainVal;
    // 先判断是删除还是插入
    if (deleteVal) {
      // 循环map内的元素，开始更新所选文本样式范围
      map.forEach(({l, r}, commentId) => {
        if (index < l) {
          // 在前面删除且不波及范围
          if (index + deleteVal - 1 < l) {
            l -= deleteVal;
            r -= deleteVal;
          } else if (index + deleteVal - 1 >= l) {
            // 在前面删除，波及样式范围
            // 优化：无需判断波及的长度是否覆盖样式范围，嵌套太深，双指针l < r的时候就删除该评论
            // const len = index + op.delete - l;
            l = index;
            r -= deleteVal;
          }
        } else if (index >= l && index <= r) {
          // 在样式范围内部删除，
          r -= deleteVal;
        }
        // 最后判断，是否有已经l > r的情况，直接删除评论
        if (l > r) {
          deleteComment(commentId);
        }
        // 更新map
        map.set(commentId, { l, r });
        console.log('监听map', commentId, l, r);
      })
    } else if (insertVal) {
      map.forEach(({l, r}, commentId) => {
        if (index <= l) {
          l += insertVal;
          r += insertVal;
        } else if (index > l && index <= r + 1) {
          // 插入的边界问题，如果索引为r + 1，仍然算为在样式范围内
          r += insertVal;
        }
        // 判断删除
        if (l > r) {
          deleteComment(commentId);
        }
        // 更新map
        map.set(commentId, { l, r });
        console.log('监听map', commentId, l, r);
      })
    }
  }
)

const props = defineProps({
  quill: {
    type: Object,
    required: true
  }
})

// 打开/关闭侧边栏
const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value
}

// 判断是否有草稿评论，控制新增评论按钮
const hasDraft = () => {
  for (let i = 0; i < comments.value.length; i++) {
    if (comments.value[i].isDraft) return true;
  }
  return false;
}

// 生成随机颜色
const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsla(${hue}, 80%, 80%, 0.7)`
}

const highlightSelection = (range) => {
  if (!range || range.length === 0) return null;
  
  const color = generateRandomColor();
  
  // 高亮选中文本
  props.quill.formatText(
    range.index,
    range.length,
    {
      'background-color': color,
    },
    'user'
  );
    
  return color;
}

// 点击触发高亮，生成评论关联，打开侧边栏
const CommentClick = () => {
  // 高亮文本
  draftRange = props.quill.getSelection();
  const color = highlightSelection(draftRange);
  console.log('颜色', color);

  toggleDrawer();
  if (drawerVisible.value) {
    // 传入颜色使评论也关联颜色？好像不需要啊，我没有渲染评论颜色
    createComment(color);
  }
}

// 创建新评论
// TODO记得传入评论id
const createComment = (color) => {
  const newComment = {
    id: `comment-${Date.now()}`,
    user: '当前用户',
    avatar: '',
    time: Date.now(),
    content: '',
    color: color || '#FFF8B8',
    isDraft: true
  }
  
  comments.value.push(newComment)

  // 聚焦防止评论框流出屏幕，直接输入
  nextTick(() => {
    const input = document.querySelector('.comment-item.is-draft textarea')
    input.focus()
  });
}

// 提交评论
// TODO 调接口
const submitComment = (index) => {
  const comment = comments.value[index];
  comment.content = comment.content.trim();
  comment.isDraft = false;

  // 调用提交接口
  // 调用获取评论接口，获取评论id
  const commentId = 0;

  setMap(draftRange, commentId);
  // 并且清除一开始作为草稿的draftRange，否则错误删除
  draftRange = null;
}

// 取消评论
const cancelComment = (index) => {
  comments.value.splice(index, 1);
  // 同样要删除对应的样式
  props.quill.formatText(draftRange.index, draftRange.length, 'background-color', false);
}

// 过滤掉草稿评论
const clearDrafts = () => {
  comments.value = comments.value.filter(comment => !comment.isDraft);
  // 同样要删除对应的样式，实际只会存在一条，所以直接拿存储好的draftRange删除即可
  if (draftRange != null) {
    props.quill.formatText(draftRange.index, draftRange.length, 'background-color', false);
  }
}

// 删除评论
// TODO 调接口
const deleteComment = (commentId) => {
  comments.value.filter(comment => comment.id != commentId);
  // 删除对应的样式
  map.forEach((id, {l, r}) => {
    if (id == commentId) {
      // 根据范围获取文本区域，删除高亮quill的样式
      quill.formatText(l, r - l + 1, 'background-color', false);
    }
  })
}

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}
</script>

<style scoped lang="scss">
.comment-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f5f7fa;
  }
}

.comment-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--el-border-color-light);
  
  h3 {
    margin: 0;
    font-size: 16px;
    color: var(--el-text-color-primary);
  }
}

.comment-scrollbar {
  flex: 1;
  margin: 16px 0;
  
  :deep(.el-scrollbar__view) {
    padding: 4px;
  }
}

.comment-item {
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: var(--el-bg-color);
  
  &.is-draft {
    background-color: #fff8e1;
  }
}

.comment-user {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  .user-info {
    margin-left: 12px;
    flex: 1;
    
    .username {
      font-weight: 500;
      display: block;
    }
    
    .time {
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }
  }
  
  .delete-btn {
    margin-left: auto;
    color: var(--el-text-color-secondary);
  }
}

.comment-content {
  margin-left: 48px;
  
  .comment-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }
}

.add-comment {
  margin-top: auto;
  padding-top: 16px;
  text-align: center;
}
</style>

<style>
.comment-drawer {
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1) !important;
  
  .el-drawer__body {
    padding: 0 !important;
  }
}

/* 高亮文本样式 */
.ql-editor [style*="background-color"] {
  border-radius: 3px;
  padding: 0 2px;
}
</style>