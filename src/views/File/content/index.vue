<template>
  <div class="container">
    <!-- <div class="nav">
      预留区域
    </div> -->
    <div class="content">
      <div class="content-center">
        <div class="page-header"></div>
        <div class="page-children" id="children" ref="quillEditor">

        </div>

        <!-- Quill 工具栏 -->
        <div id="toolbar">
          <!-- 标题和排序 -->
          <el-select v-model="formatValue" placeholder="正文" size="small" style="width: 150px"
            @change="handleFormatChange">

            <el-option-group label="标题">
              <el-option label="正文" value="paragraph">
                <span style="display: flex; align-items: center">
                  <el-icon style="margin-right: 8px">
                    <Document />
                  </el-icon>
                  <span>正文</span>
                </span>
              </el-option>
              <el-option label="标题1" value="h1">
                <span style="display: flex; align-items: center">
                  <el-icon style="margin-right: 8px">
                    <Sort />
                  </el-icon>
                  <span style="font-size: 1.2em; font-weight: bold">标题1</span>
                </span>
              </el-option>
              <el-option label="标题2" value="h2">
                <span style="display: flex; align-items: center">
                  <el-icon style="margin-right: 8px">
                    <Sort />
                  </el-icon>
                  <span style="font-weight: bold">标题2</span>
                </span>
              </el-option>
              <el-option label="标题3" value="h3">
                <span style="display: flex; align-items: center">
                  <el-icon style="margin-right: 8px">
                    <Sort />
                  </el-icon>
                  <span style="font-weight: bold">标题3</span>
                </span>
              </el-option>
            </el-option-group>


            <el-option-group label="列表">
              <el-option label="有序列表" value="ordered">
                <span style="display: flex; align-items: center">
                  <el-icon style="margin-right: 8px">
                    <List />
                  </el-icon>
                  <span>有序列表</span>
                </span>
              </el-option>
              <el-option label="无序列表" value="bullet">
                <span style="display: flex; align-items: center">
                  <el-icon style="margin-right: 8px">
                    <Menu />
                  </el-icon>
                  <span>无序列表</span>
                </span>
              </el-option>
            </el-option-group>
          </el-select>
          <!-- 文本格式 -->
          <span class="ql-formats">
            <el-tooltip effect="dark" content="粗体" placement="top">
              <button class="ql-bold"></button>
            </el-tooltip>
            <el-tooltip effect="dark" content="斜体" placement="top">
              <button class="ql-italic"></button>
            </el-tooltip>
            <el-tooltip effect="dark" content="下划线" placement="top">
              <button class="ql-underline"></button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除线" placement="top">
              <button class="ql-strike"></button>
            </el-tooltip>
            <!-- 颜色 -->
            <select class="ql-color"></select>
            <!-- 对齐方式 -->
            <select class="ql-align">
              <option value="" selected>默认对齐</option>
              <option value="center">居中对齐</option>
              <option value="right">右对齐</option>
              <option value="justify">两端对齐</option>
            </select>
            <!-- 链接和图片 -->
            <el-tooltip effect="dark" content="插入链接" placement="top">
              <button class="ql-link"></button>
            </el-tooltip>
            <!-- 代码块和引用 -->
            <el-tooltip effect="dark" content="代码块" placement="top">
              <button class="code-block" style="display: flex; justify-content: center; align-items: center;"
                @click="convertToCodeBlock">
                <svg t="1750058459639" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2825" width="16" height="16">
                  <path
                    d="M673.216 157.632a64 64 0 0 0-123.648-33.088l-198.784 741.76a64 64 0 0 0 123.648 33.152l198.784-741.76zM301.248 274.752a64 64 0 0 1 0 90.496L154.496 512l146.752 146.752a64 64 0 1 1-90.496 90.496l-192-192a64 64 0 0 1 0-90.496l192-192a64 64 0 0 1 90.496 0zM722.752 274.752a64 64 0 0 0 0 90.496L869.504 512l-146.752 146.752a64 64 0 0 0 90.496 90.496l192-192a64 64 0 0 0 0-90.496l-192-192a64 64 0 0 0-90.496 0z"
                    fill="#2c2c2c" p-id="2826"></path>
                </svg>
              </button>
            </el-tooltip>
            <el-tooltip effect="dark" content="引用" placement="top">
              <button class="ql-blockquote"></button>
            </el-tooltip>
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// 富文本引入
import Quill from 'quill';
import { onMounted, ref, onBeforeUnmount, watch, onUnmounted, nextTick } from 'vue';
import {
  Document,
  Sort,
  List,
  Menu,
} from '@element-plus/icons-vue'
// quill的css文件
import 'quill/dist/quill.snow.css';
import QuillCursors from 'quill-cursors'
// codeMirror引入
import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { fileListDetail } from '@/api/file';
import { useRoute } from 'vue-router';
//yjs部分
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import { WebrtcProvider } from 'y-webrtc';
let quill
let ydoc
let wsProvider
let binding

// 1. 自定义CodeMirror Block
const BlockEmbed = Quill.import('blots/block/embed')
const quillEditor = ref(null)
const route = useRoute()

// 初始化Yjs连接的函数
const initYjsConnection = (fileId, quillInstance) => {
  console.log('initYjsConnection 被调用，fileId:', fileId)
  console.log('quillInstance:', quillInstance)

  // 确保quill实例存在且有效
  if (!quillInstance) {
    console.log('Quill实例为空，跳过Yjs连接')
    return
  }

  // 检查quill实例的结构
  console.log('quillInstance.quill:', quillInstance.quill)
  console.log('quillInstance.getContents:', quillInstance.getContents)

  // 先销毁旧的连接
  if (binding) {
    try {
      binding.destroy()
      binding = null
    } catch (e) {
      console.log('销毁binding时出错:', e)
    }
  }

  if (wsProvider) {
    try {
      wsProvider.disconnect()
      wsProvider.destroy()
      wsProvider = null
    } catch (e) {
      console.log('销毁wsProvider时出错:', e)
    }
  }

  if (ydoc) {
    try {
      ydoc.destroy()
      ydoc = null
    } catch (e) {
      console.log('销毁ydoc时出错:', e)
    }
  }

  try {
    // 创建新的连接
    ydoc = new Y.Doc()
    const yText = ydoc.getText('quill')

    // 创建WebSocket连接，不传递awareness配置
    wsProvider = new WebsocketProvider(
      'ws://localhost:8001/onlineEdit',
      fileId,
      ydoc
    )

    // 等待连接建立后再创建binding
    wsProvider.on('status', (event) => {
      console.log('WebSocket状态:', event.status)
      if (event.status === 'connected') {
        // 连接成功后创建binding
        if (!binding && quillInstance) {
          // 尝试使用quillInstance.quill
          const quillEditor = quillInstance.quill || quillInstance
          binding = new QuillBinding(yText, quillEditor, wsProvider.awareness)
          console.log('建立新连接成功:', fileId)
        }
      }
    })

    // 连接错误处理
    wsProvider.on('connection-error', (err) => {
      console.error('WebSocket连接错误:', err)
    })

    console.log('开始建立连接:', fileId)
  } catch (e) {
    console.error('建立Yjs连接时出错:', e)
  }
}

// 监听路由参数变化
watch(() => route.params.insertedId, (newId, oldId) => {
  if (newId && newId !== oldId && quill) {
    console.log('路由参数变化:', oldId, '->', newId)
    console.log('当前quill实例:', quill)
    // 延迟执行，确保DOM更新完成
    nextTick(() => {
      initYjsConnection(newId, quill)
    })
  }
}, { immediate: false })

//代码块
const codeMirrorInstances = ref(new Map())
class CodeMirrorBlock extends BlockEmbed {
  static blotName = 'code-mirror'
  static tagName = 'div'
  static className = 'ql-code-mirror'

  static create(value) {
    const node = super.create()
    node.dataset.code = value.code || ''
    node.dataset.id = `cm-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    node.contentEditable = false // 禁止 Quill 直接编辑
    return node
  }

  static value(node) {
    return {
      code: node.dataset.code,
      id: node.dataset.id
    }
  }
}

const handleFormatChange = (value) => {
  // 清除可能冲突的格式
  quill.format('header', false);
  quill.format('list', false);

  // 应用新格式
  switch (value) {
    case 'h1':
      quill.format('header', 1);
      break;
    case 'h2':
      quill.format('header', 2);
      break;
    case 'h3':
      quill.format('header', 3);
      break;
    case 'ordered':
      quill.format('list', 'ordered');
      break;
    case 'bullet':
      quill.format('list', 'bullet');
      break;
    default: // paragraph
    // 无需操作（已清除格式）
  }
};

onMounted(() => {
  //注册代码块
  Quill.register(CodeMirrorBlock)
  //注册用户光标
  Quill.register('modules/cursors', QuillCursors)
  const options = {
    debug: 'info',
    modules: {
      toolbar: '#toolbar',
      cursors: true,
      keyboard: {
        bindings: {
          tab: false,
          enter: false,
          backspace: false
        }
      },
      //回撤
      history: {
        userOnly: true, // 关键配置
        delay: 500,
        maxStack: 200
      }
    },
    clipboard: {
      matchers: [
        ['div.ql-code-mirror', (node, delta) => {
          return delta.compose(new delta.constructor().retain(delta.length(), {
            'code-mirror': {
              code: node.dataset.code,
              id: node.dataset.id
            }
          }))
        }]
      ]
    },
    placeholder: '请输入内容',
    theme: 'snow'
  };
  const quillToolbar = document.querySelector('#toolbar');
  quill = new Quill('#children', options);

  console.log('Quill实例创建完成:', quill)
  console.log('quill.quill:', quill.quill)

  // 延迟初始化Yjs连接，确保Quill完全初始化
  nextTick(() => {
    if (route.params.insertedId) {
      console.log('onMounted中初始化Yjs连接，insertedId:', route.params.insertedId)
      initYjsConnection(route.params.insertedId, quill)
    }
  })

  // 选中的时候显示工具栏并根据选中的位置来决定工具栏位置
  quill.on('selection-change', (range) => {
    if (!range) return // 添加空值检查

    const bounds = quill.getBounds(range.index, range.length);
    if (range && range.length > 0) {
      quillToolbar.style.display = 'block';
      quillToolbar.style.top = bounds.top - 48 + 'px';
      quillToolbar.style.left = bounds.left + 'px';
    } else {
      quillToolbar.style.display = 'none';
    }
  })

  //当位置改变时，工具栏跟着变动
  quill.on('text-change', (delta, oldDelta, source) => {
    const range = quill.getSelection();
    if (!range) return // 添加空值检查

    const bounds = quill.getBounds(range.index, range.length);
    if (range && range.length > 0) {
      quillToolbar.style.top = bounds.top - 48 + 'px';
      quillToolbar.style.left = bounds.left + 'px';
    }
    if (source === 'user') {
      console.log(delta, 'delta')
      if (ydoc) {
        console.log(ydoc, '数据')
      }
    }
  })

  renderCodeMirrorBlocks()
  const observer = new MutationObserver(() => {
    renderCodeMirrorBlocks()
  })
  observer.observe(quillEditor.value, { childList: true, subtree: true })

  // 添加全局点击事件处理
  document.addEventListener('click', (e) => {
    const codeBlock = e.target.closest('.ql-code-mirror')
    if (!codeBlock) {
      // 如果点击的不是代码块，则移除所有代码块的焦点
      codeMirrorInstances.value.forEach(view => {
        if (view && view.dom) {
          view.dom.blur()
        }
      })
    }
  })
})

onBeforeUnmount(() => {
  // 清理Yjs连接
  if (binding) {
    try {
      binding.destroy()
      binding = null
    } catch (e) {
      console.log('销毁binding时出错:', e)
    }
  }

  if (wsProvider) {
    try {
      wsProvider.disconnect()
      wsProvider.destroy()
      console.log('销毁WebSocket连接')
    } catch (e) {
      console.log('销毁wsProvider时出错:', e)
    }
  }

  if (ydoc) {
    try {
      ydoc.destroy()
    } catch (e) {
      console.log('销毁ydoc时出错:', e)
    }
  }

  // 重置变量
  wsProvider = null
  binding = null
  ydoc = null
});

// 2. 将选中文本转换为代码块
const convertToCodeBlock = () => {
  if (!quill) return

  const range = quill.getSelection()
  const selectedText = range && range.length > 0
    ? quill.getText(range.index, range.length).trim()
    : '// 输入你的代码\n'

  const index = range ? range.index : quill.getLength()

  // 删除选中文本（如果有）
  if (range && range.length > 0) {
    quill.deleteText(range.index, range.length)
  }

  // 插入CodeMirror代码块
  quill.insertEmbed(index, 'code-mirror', {
    code: selectedText
  })

  // 将光标移动到新位置
  quill.setSelection(index + 1, 0)
}

// 3. 渲染CodeMirror块
const renderCodeMirrorBlocks = () => {
  const blocks = document.querySelectorAll('.ql-code-mirror:not(.cm-initialized)')

  blocks.forEach(block => {
    const id = block.dataset.id
    if (codeMirrorInstances.value.has(id)) return

    const code = block.dataset.code || '// 输入你的代码\n'

    const state = EditorState.create({
      doc: code,
      extensions: [
        javascript(),
        oneDark,
        EditorView.domEventHandlers({
          keydown: (e, view) => {
            // 处理Enter键
            if (e.key === 'Enter') {
              e.preventDefault()
              e.stopPropagation()
              const line = view.state.doc.lineAt(view.state.selection.main.from)
              const indent = line.text.match(/^\s*/)[0]

              view.dispatch({
                changes: {
                  from: view.state.selection.main.from,
                  insert: `\n${indent}`
                },
                selection: {
                  anchor: view.state.selection.main.from + 1 + indent.length
                }
              })
              return true
            }

            // 处理Backspace键
            if (e.key === 'Backspace') {
              e.preventDefault()
              e.stopPropagation()
              const selection = view.state.selection.main
              const doc = view.state.doc

              // 如果光标在文档开头且内容为空，则删除整个代码块
              if (selection.from === 0 && selection.to === 0 && doc.length === 0) {
                const blockElement = view.dom.closest('.ql-code-mirror')
                if (blockElement) {
                  const delta = new Quill.import('delta')
                  const index = Array.from(quillEditor.value.querySelectorAll('.ql-code-mirror')).indexOf(blockElement)
                  quill.updateContents(delta.retain(index).delete(1))
                }
                return true
              }

              // 如果光标在行首，则删除上一行的缩进
              if (selection.from === selection.to) {
                const line = doc.lineAt(selection.from)
                if (line.from === selection.from && line.number > 1) {
                  const prevLine = doc.line(line.number - 1)
                  const prevIndent = prevLine.text.match(/^\s*/)[0]
                  if (prevIndent.length > 0) {
                    view.dispatch({
                      changes: {
                        from: prevLine.from,
                        to: prevLine.from + prevIndent.length,
                        insert: ''
                      },
                      selection: {
                        anchor: prevLine.from
                      }
                    })
                    return true
                  }
                }
              }

              // 正常删除字符
              if (selection.from > 0) {
                view.dispatch({
                  changes: {
                    from: selection.from - 1,
                    to: selection.to,
                    insert: ''
                  },
                  selection: {
                    anchor: selection.from - 1
                  }
                })
                return true
              }
              return false
            }

            // 处理Tab键
            if (e.key === 'Tab') {
              e.preventDefault()
              e.stopPropagation()
              view.dispatch({
                changes: {
                  from: view.state.selection.main.from,
                  insert: '    '
                },
                selection: {
                  anchor: view.state.selection.main.from + 4
                }
              })
              return true
            }

            return false
          }
        }),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            block.dataset.code = update.state.doc.toString()
          }
        })
      ]
    })

    const view = new EditorView({
      state,
      parent: block
    })

    // 添加点击事件处理
    block.addEventListener('click', (e) => {
      e.stopPropagation()
      view.focus()
    })

    // 添加复制按钮
    const copyBtn = document.createElement('button')
    copyBtn.textContent = '复制'
    copyBtn.className = 'copy-btn'
    copyBtn.onclick = (e) => {
      e.stopPropagation()
      navigator.clipboard.writeText(block.dataset.code)
        .then(() => {
          ElMessage.success('复制成功')
          copyBtn.textContent = '已复制!'
          setTimeout(() => copyBtn.textContent = '复制', 2000)
        })
    }

    const header = document.createElement('div')
    header.className = 'cm-header'
    header.innerHTML = '<span>代码块</span>'
    header.appendChild(copyBtn)
    block.prepend(header)

    // 保存实例引用
    codeMirrorInstances.value.set(id, view)
    block.classList.add('cm-initialized')
  })
}
</script>
<style lang="scss">
.ql-container {
  border: none !important;
}

.ql-toolbar {
  // display:none;
  border: none !important;
  border-radius: 0 !important;
}

#toolbar {
  display: none;
  position: absolute;
  // top:5px;
  // right:50px;
  height: 40px;
  padding: 8px;
  background-color: rgb(230, 229, 229);
}

.editor-container {

  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}

.code-block {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.code-block:hover {
  background-color: #f5f7fa;
}

.page-children {
  min-height: 200px;
  margin-top: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.editor-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}

.code-block {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.ql-editor {
  &::-webkit-scrollbar {
    display: none
  }
}

.quill-editor {
  min-height: 300px;
}

/* CodeMirror代码块样式 */
.ql-code-mirror {
  margin: 10px 0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.cm-header {
  background: #333;
  padding: 6px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lang-label {
  color: #aaa;
  font-size: 12px;
  font-family: monospace;
}

.copy-btn {
  background: #555;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
}

/* 调整CodeMirror默认样式 */
.ql-code-mirror .cm-editor {
  height: auto;
}

.ql-code-mirror .cm-content {
  padding: 8px;
}

.ql-code-mirror .cm-line {
  padding: 0;
}

//第二份
.editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}

.quill-editor {
  min-height: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 代码块样式 - 确保独立不融合 */
.ql-code-mirror {
  margin: 16px 0;
  border: 1px solid #444;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.ql-code-mirror+.ql-code-mirror {
  margin-top: 20px;
}

.cm-header {
  background: #333;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #aaa;
  font-size: 0.9rem;
}

.cm-header span {
  font-family: monospace;
}

.copy-btn {
  background: #555;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.copy-btn:hover {
  background: #666;
}

/* CodeMirror内容区域 */
.ql-code-mirror .cm-editor {
  height: auto;
  max-height: 500px;
  overflow-y: auto;
}

.ql-code-mirror .cm-content {
  padding: 12px;
  font-size: 14px;
}

.ql-code-mirror .cm-line {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .nav {
    position: absolute;
    top: 0;
    left: 0;
    height: 64px;
    width: calc(100vw - 300px);
    background-color: skyblue;
  }

  .content {
    box-sizing: border-box;
    flex: 1;
    margin-top: 64px;

    &-center {
      height: calc(100vh - 86px);
      max-width: 820px;
      padding: 0 268px;
      position: relative;

      .page-header {
        padding: 20 0 0 0;
        margin-bottom: 22px;
        word-break: break-word;
        position: relative;
      }

      .page-children {
        width: 100%;
      }
    }
  }
}
</style>