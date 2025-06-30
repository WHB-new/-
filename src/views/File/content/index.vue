<template>
  <div class="container">
    <div class="nav" v-show="homeStore.isShowHistory">
     <div style="display:flex;align-items:center;justify-content: space-between;box-sizing: border-box;
     width: 100%;padding:0 20px">
       <div>

      </div>
      <div class="left">
        <div class="mode">
          <el-select
      v-model="modeValue"
      placeholder="编辑"
      style="width: 83px"
      @change="changeMode"
    >
      <el-option
      value="bianji"
      label="编辑"
      />
      <el-option
      value="xiuding"
      label="修订"
      />
      <el-option
      value="yuedu"
      label="阅读"
      />
    </el-select>
        </div>
        <div class="history" @click="goHistory">
        <div class="icon">
          <svg t="1750924024571" class="icon" viewBox="0 0 1029 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4316" width="16" height="16"><path d="M761.216 997.76c-144.64 0-262.4-117.76-262.4-262.4s117.76-262.4 262.4-262.4 262.4 117.76 262.4 262.4-117.76 262.4-262.4 262.4z m0-448c-102.4 0-185.6 83.2-185.6 185.6s83.2 185.6 185.6 185.6 185.6-83.2 185.6-185.6-83.328-185.6-185.6-185.6z" p-id="4317"></path><path d="M858.496 815.872l-116.48-58.24V588.16h51.2v137.728l88.192 44.16zM174.08 269.312h422.4v51.2h-422.4zM174.08 448.512h281.6v51.2h-281.6zM174.08 627.712h192v51.2h-192z" p-id="4318"></path><path d="M442.88 922.112H0v-883.2h775.68v364.8h-76.8V115.712H76.8v729.6h366.08z" p-id="4319"></path></svg>
        </div>
        <div class="txt">历史版本</div>
      </div>
       <div class="avatar" @click="toggleDropdown">
        <!-- <img src="./figure.png" alt="头像" class="avatar-img" /> -->
         <div class="icon">
          <svg t="1750566336287" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3669" width="16" height="16"><path d="M4.14791851 511.46598098c0 280.3599819 226.95808058 507.31806247 507.31806247 507.31806248s507.31806247-226.95808058 507.31806248-507.31806248-226.95808058-507.31806247-507.31806248-507.31806247-507.31806247 227.49209959-507.31806247 507.31806247" fill="#CCCCCC" p-id="3670"></path><path d="M444.71360435 580.35443368c-147.38924763 64.61630059-191.1788067 98.79351743-208.80143414 114.28006881-26.70095066 24.03085559-41.65348303 123.89241105-57.67405342 199.1890919 0 0 129.23260118 124.96044907 332.69384519 124.96044907s332.69384517-123.89241105 332.69384517-123.89241105c-16.02057039-75.29668085-30.43908375-177.29431236-57.1400344-200.79114894-17.62262743-15.48655138-59.81012947-49.12974921-207.1993771-113.21203077l-134.5727913-0.53401902z" fill="#FFD16D" p-id="3671"></path><path d="M582.49050974 451.65585152v162.875799c-39.51740697 48.06171118-103.59968854 46.45965414-143.11709552 0V451.65585152c0.53401902-88.11313717 143.11709552-88.11313717 143.11709552 0z" fill="#FFDECC" p-id="3672"></path><path d="M582.49050974 451.65585152v108.93987868c-27.23496967 19.75870349-52.8678823 30.97310276-71.55854776 30.97310276-18.15664645 0-44.32357809-11.21439928-71.55854776-30.97310276V451.65585152c0.53401902-88.11313717 143.11709552-88.11313717 143.11709552 0z" fill="#F7C5AA" p-id="3673"></path><path d="M432.96518606 578.75237664l-50.73180625 27.23496967 73.69462381 101.99763151 55.53797736-52.8678823-78.50079492-76.36471888z" fill="#FFFFFF" p-id="3674"></path><path d="M589.96677592 578.75237664l50.73180624 27.23496967-73.69462381 101.99763151-55.53797737-52.8678823 78.50079494-76.36471888z" fill="#FFFFFF" p-id="3675"></path><path d="M304.80062291 974.99448438l20.82674151 8.54430421C325.0933454 932.80698234 325.0933454 795.03007696 325.0933454 795.03007696l-20.29272249 179.96440742z m416.53483023-1.06803803l-24.5648746 10.14636126c0.53401902-50.73180625 0.53401902-188.50871164 0.53401902-188.50871164l24.03085558 178.36235038z" fill="#B98D39" p-id="3676"></path><path d="M511.46598098 170.76185061c-239.77453689 0-153.79747578 289.43830512-137.77690538 312.9351417 17.08860842 25.63291263 99.32753645 92.91930828 137.77690538 92.91930828 38.98338796 0 120.68829697-67.28639565 137.77690539-92.91930828 16.02057039-22.96281756 101.99763151-312.93514169-137.77690539-312.9351417z" fill="#FFDECC" p-id="3677"></path><path d="M327.22942146 360.87261928c12.81645632-4.27215211 28.83702671 10.14636125 35.77927388 32.04114079 6.94224717 21.89477954 2.67009507 42.72152105-9.61234224 46.99367316-12.81645632 4.27215211-28.83702671-10.14636125-35.77927388-32.04114079-7.47626619-21.89477954-2.67009507-42.72152105 9.61234224-46.99367316z m367.93910004 0c-12.81645632-4.27215211-28.83702671 10.14636125-35.77927387 32.04114079-6.94224717 21.89477954-2.67009507 42.72152105 9.61234223 46.99367316 12.81645632 4.27215211 28.83702671-10.14636125 35.77927387-32.04114079 7.47626619-21.89477954 2.67009507-42.72152105-9.61234223-46.99367316z" fill="#FFDECC" p-id="3678"></path><path d="M401.99208329 267.41929198c-13.88449434 75.83069987-48.5957302 68.8884527-45.92563512 158.06962789-11.21439928-69.4224717-27.76898869-161.80776098 19.22468447-222.68592848 37.91534993-48.5957302 162.875799-83.30696605 243.51266998-25.09889361 89.18117519 19.22468447 61.41218651 201.32516795 49.66376823 235.50238479-8.54430421-55.53797737-27.23496967-79.03481394-50.73180625-144.71915255-32.04114079 23.49683658-174.6242173 28.30300769-215.74368131-1.06803804z" fill="#CC7B53" p-id="3679"></path></svg>
         </div>
        <div v-if="showDropdown" class="unlogin">
          <button @click="logout" style="padding: 5px 0!important;">退出登录</button>
        </div>
      </div>
      </div>
     </div>
    </div>
     <!-- 历史记录 -->
     <div class="header" v-show="!homeStore.isShowHistory">
      <div class="back" @click="backContent">
        <div class="icon">
          <svg t="1750925620558" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6314" width="16" height="16"><path d="M682.666667 298.666667h-213.333334a256 256 0 1 0 0 512h384v85.333333h-384a341.333333 341.333333 0 1 1 0-682.666667h213.333334V42.666667l256 213.333333-256 213.333333V298.666667z" fill="#000000" p-id="6315"></path></svg>
        </div>
        <div class="txt">
          返回文档
        </div>
      </div>
      <div class="center" @click="backToHistory" :style="homeStore.historyIndex !=0 ?'background-color:#336df4;':'pointer-events: none;'">
        <div class="txt">还原此历史记录</div>
      </div>
      <div class="right"></div>
     </div>
    <div class="close" v-if="isShowClose" @click="handleClose">
      <svg t="1750512589823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2618" width="16" height="16">
        <path
          d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z"
          p-id="2619"></path>
      </svg>
    </div>
     <!-- v-show="homeStore.isShowHistory" -->
    <div class="content">
      <div class="content-header">
        <div style="height: 28px;"></div>

        <div class="title">
        {{title}}
        </div>
        <div class="info">
          <div class="icon">
            <svg t="1751187966181" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3252" width="20" height="20"><path d="M512 993.962667A481.962667 481.962667 0 1 1 993.962667 512 482.304 482.304 0 0 1 512 993.962667z" fill="#03ad82" p-id="3253"></path><path d="M512 60.074667A451.925333 451.925333 0 1 1 60.074667 512 451.925333 451.925333 0 0 1 512 60.074667M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z" fill="#03ad82" p-id="3254"></path><path d="M794.282667 755.029333a145.749333 145.749333 0 0 0-10.922667-13.653333 87.04 87.04 0 0 0-11.946667-11.264l-10.581333-8.192a34.133333 34.133333 0 0 0-8.192-4.778667L750.933333 716.8l-58.368-38.229333a247.466667 247.466667 0 0 0-27.306666-15.36l-78.848-38.229334v-37.546666a151.552 151.552 0 0 0 52.906666-53.248 178.858667 178.858667 0 0 0 20.138667-73.728v-28.672a245.76 245.76 0 0 0-2.730667-51.2l-2.389333-16.384a166.229333 166.229333 0 0 0-46.762667-113.664 140.288 140.288 0 0 0-116.053333-44.032 119.125333 119.125333 0 0 0-80.213333 45.397333 211.968 211.968 0 0 0-46.08 110.250667s-3.072 52.565333-2.730667 59.050666l2.730667 36.864a249.856 249.856 0 0 0 19.797333 73.728 130.389333 130.389333 0 0 0 53.248 53.248v37.546667l-78.506667 38.912q-8.874667 4.437333-17.408 9.898667L273.066667 716.8l-5.802667 3.413333a108.544 108.544 0 0 0-13.312 9.898667 136.533333 136.533333 0 0 0-16.725333 16.042667 95.232 95.232 0 0 0-13.312 20.138666A52.224 52.224 0 0 0 228.693333 819.2a344.064 344.064 0 0 0 74.069334 48.810667 427.349333 427.349333 0 0 0 467.626666-25.6 123.562667 123.562667 0 0 0 24.576-23.210667 50.858667 50.858667 0 0 0 10.581334-31.402667 52.224 52.224 0 0 0-3.072-17.749333 68.266667 68.266667 0 0 0-8.192-15.018667z" fill="#FFFFFF" p-id="3255"></path></svg>
          </div>
          <div class="name">{{name}}</div>
        </div>
      </div>
      <div class="content-center">
        <div class="page-children" id="children" ref="quillEditor" style="padding:0!important;">
        
        </div>

        <!-- Quill 工具栏 -->
        <div id="toolbar" style="z-index:5!important;">
          <!-- 标题和排序 -->
          <el-select v-model="formatValue" placeholder="正文" size="small" style="width:150px;margin-bottom:10px;"
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
    <!-- 权限管理 -->
      <permissionListSidebar />

   
  </div>
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router';
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
import { useRoute, useRouter } from 'vue-router';
import { useHomeStore } from '@/store/home';
//yjs部分
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import { WebrtcProvider } from 'y-webrtc';
import {saveFile,fileListDetail} from '@/api/file'
import {addContentHistory,getContentHistory} from '@/api/content'
import permissionListSidebar from '@/components/permissionListSidebar.vue';
const homeStore = useHomeStore()
let quill
let ydoc
let wsProvider
let binding
const historyList = ref([])
const title = ref(``)
const name = ref(``)
// 控制下拉框显示
const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const logout = () => {
isShow.value = true
};
//重新绑定
const rebinding = ()=>{
  quill.on('selection-change', (range) => {
    if (!range) return // 添加空值检查

    const bounds = quill.getBounds(range.index, range.length);
    if (range && range.length > 0) {
      quillToolbar.style.zIndex = 6;
      quillToolbar.style.display = 'block';
      quillToolbar.style.top = bounds.top - 48 + 'px';
      quillToolbar.style.left = bounds.left + 'px';
    } else {
      quillToolbar.style.display = 'none';
    }
  })
    // 防抖
  let timer = null
  //当位置改变时，工具栏跟着变动
  quill.on('text-change', (delta, oldDelta, source) => {
    const range = quill.getSelection();
    if (!range) return // 添加空值检查
    const bounds = quill.getBounds(range.index, range.length);
    if (range && range.length > 0) {
      quillToolbar.style.top = bounds.top - 48 + 'px';
      quillToolbar.style.left = bounds.left + 'px';
    }
    //简单的防抖
    //如果在历史版本界面，则不需要保存
    if(homeStore.isShowHistory && !sessionStorage.getItem(`${route.params.insertedId}`)){
      console.log('触发保存了吗')
 clearTimeout(timer)
    timer = null
    timer = setTimeout(()=>{
      addContentHistory(route.params.insertedId,JSON.stringify(quill.getContents()))
      saveFile(route.params.insertedId,{
        content:JSON.stringify(quill.getContents())
      }).then(res=>{
        console.log('保存成功',res)
      })
    },300)
    }
    if(source == 'user' && modeValue.value == 'bianji'){
       const selection = quill.getSelection();
        if (selection && selection.length === 0) {
            const formats = quill.getFormat(selection.index);
            console.log(formats,selection.index,'我看看进来这里吗？')
            if (formats.underline || formats.strike || formats.color === 'red') {
                quill.formatText(selection.index-1, 1, {
                    underline: false,
                    strike: false,
                    color: null
                }, 'silent');
            }
        }
    }
  })
}
//处理修订模式函回调
const handleReview = (e)=>{
  console.log(e,'backspace')
   const selection = quill.getSelection();
         let start
            let length
    if ((e.key === 'Backspace' || e.key === 'Delete') && 
        quill.hasFocus()) {  // 确保是Quill获得焦点时
          //阻止默认事件
           e.preventDefault();
            e.stopImmediatePropagation();
        if (selection.length > 0 ) {
            start = selection.index;
          length = selection.length
            quill.formatText(start , length, { 
                strike: true, 
                color: "red" 
            }, 'silent');
        }else if(selection.length == 0){
          start = selection.index
          length = 1
               quill.formatText(start - 1, length, { 
                strike: true, 
                color: "red" 
            }, 'silent');
                quill.setSelection(start - 1, 0, 'silent');
        }
    }
}
//改变文档模式
const changeMode= ()=>{
  //阅读没权限
  if(modeValue.value == 'yuedu'){
    quill.enable(false)
     quill.off('text-change')
    quill.off('selection-change')
     quillEditor.value.removeEventListener('keydown', handleReview, true);  // 关键：使用捕获阶段
  }else if(modeValue.value == 'bianji'){
    quill.enable(true)
     quill.off('text-change')
    rebinding()
    quillEditor.value.removeEventListener('keydown', handleReview, true);  // 关键：使用捕获阶段
  }else if(modeValue.value == 'xiuding'){
quill.enable(true)
//都删掉，然后自定义
    quill.off('selection-change')
    quill.off('text-change')
quillEditor.value.addEventListener('keydown', handleReview, true);  // 关键：使用捕获阶段
quill.on('text-change', (delta, oldDelta, source) => {
  if (source === 'user') {  
    const lastOp = delta.ops[delta.ops.length - 1];
    
    if (lastOp && lastOp.insert) {
      const cursorPos = quill.getSelection()?.index || 0;
      const textLength = lastOp.insert.length;
      
      // 给新插入的文本加下划线
      quill.formatText(cursorPos - textLength, textLength, {
        underline:true,
        color:"red"
      }, true);
    }
  }
});
 
  }



}


// 1. 自定义CodeMirror Block
const BlockEmbed = Quill.import('blots/block/embed')
const quillEditor = ref(null)
const route = useRoute()
const router = useRouter()
const isShowClose = ref(false)
let quillToolbar
const modeValue = ref('bianji')
const backToHistory = ()=>{
  sessionStorage.setItem(`${route.params.insertedId}`,JSON.stringify(quill.getContents()))
  homeStore.isShowHistory = true
  rebinding()
  quill.enable(true)
  quill.setContents(JSON.parse(sessionStorage.getItem(`${route.params.insertedId}`)))
  saveFile(route.params.insertedId,{
        content:JSON.stringify(quill.getContents())
      }).then(res=>{
        console.log('保存成功',res)
      })
  //初始化
   homeStore.quillData = null
   homeStore.historyIndex = 0

}
// 初始化Yjs连接的函数
const initYjsConnection = (fileId, quillInstance) => {
  if (!quillInstance) {
    return
  }
  if (binding) {
    binding.destroy()
    binding = null
  }
  if (wsProvider) {
    wsProvider.disconnect()
    wsProvider.destroy()
    wsProvider = null
  }
  if (ydoc) {
    ydoc.destroy()
    ydoc = null
  }

  try {
    ydoc = new Y.Doc()
    const yText = ydoc.getText('quill')
    wsProvider = new WebsocketProvider(
      `ws://localhost:8001/onlineEdit/${sessionStorage.getItem('userId')}`,
      fileId,
      ydoc,
    )
    wsProvider.on('message',(message)=>{
      console.log(message,'收到更新')
    })
   wsProvider.on('sync',()=>{
     //有缓存用缓存
        if(sessionStorage.getItem(`${route.params.insertedId}`)){
          quill.setContents(JSON.parse(sessionStorage.getItem(`${route.params.insertedId}`)))
          sessionStorage.removeItem(`${route.params.insertedId}`)
         
        }else if(yText.length ==0 || yText.lenght ==1){
          fileListDetail(route.params.insertedId,sessionStorage.getItem('userId')).then(res=>{
            sessionStorage.setItem('permissionCode',res.data.permissionCode)
            if(res.data.code == 200){
              if(Object.keys(res.data.data.content).length != 0){
                quill.setContents(JSON.parse(res.data.data.content))
               
              }
            }
  })
        }
   })
    wsProvider.on('status', (event) => {
      if (event.status === 'connected') {
         title.value=JSON.parse(localStorage.getItem(`title${route.params.insertedId}`)).title
         name.value = JSON.parse(localStorage.getItem(`title${route.params.insertedId}`)).name
          wsProvider.awareness.setLocalState({
  name: `用户${sessionStorage.getItem('defaultKnowledgeId').slice(sessionStorage.getItem('defaultKnowledgeId').length-4)}`, // 关键字段
})
        if (!binding && quillInstance) {
          const quillEditor = quillInstance.quill || quillInstance
          binding = new QuillBinding(yText, quillEditor, wsProvider.awareness)
        }
       
       
      }
    })
    wsProvider.on('connection-error', (err) => {
      console.error('WebSocket 连接错误:', err)
    })
wsProvider.on('disconnect',()=>{
  console.log('触发了吗断开连接')
})
  } catch (e) {
    console.error('建立Yjs连接时出错:', e)
  }
}
const goHistory = async()=>{
  sessionStorage.setItem(`${route.params.insertedId}`,JSON.stringify(quill.getContents()))
    homeStore.isShowHistory = false
    console.log(quillEditor,'quillEditor')
    quill.enable(false)
    quill.off('selection-change')
   let res = await getContentHistory(route.params.insertedId)
   if(res.data.code ==200){
       res.data.data.forEach((item,index)=>{
        item.createTime = changeTime(item.createTime)
        item.id = `用户${index}`
       })
       homeStore.historyList = res.data.data
   
   }
}
//改变返回的时间
const changeTime = (time)=>{
  const inputDate = new Date(time)
    const now = new Date();
  
  // 校验日期是否合法
  if (isNaN(inputDate.getTime())) {
    return "无效时间";
  }

  // 获取年月日时分，忽略秒和毫秒
  const inputYear = inputDate.getFullYear();
  const inputMonth = inputDate.getMonth() + 1; // 月份从0开始
  const inputDay = inputDate.getDate();
  const inputHours = inputDate.getHours().toString().padStart(2, '0');
  const inputMinutes = inputDate.getMinutes().toString().padStart(2, '0');

  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();

  // 判断是否为今天
  if (
    inputYear === todayYear &&
    inputMonth === todayMonth &&
    inputDay === todayDay
  ) {
    return `今天 ${inputHours}:${inputMinutes}`;
  }

  // 判断是否为昨天（考虑跨年/跨月）
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    inputYear === yesterday.getFullYear() &&
    inputMonth === yesterday.getMonth() + 1 &&
    inputDay === yesterday.getDate()
  ) {
    return `昨天 ${inputHours}:${inputMinutes}`;
  }

  // 更早的时间：返回 M月D日 HH:MM
  return `${inputMonth}月${inputDay}日 ${inputHours}:${inputMinutes}`;
}
const backContent = ()=>{
   homeStore.isShowHistory = true
        //先变回原来页面在渲染
        //重新绑定
        rebinding()
        quill.enable(true)
      quill.setContents(JSON.parse(sessionStorage.getItem(`${route.params.insertedId}`)))
   sessionStorage.removeItem(`${route.params.insertedId}`)
   //初始化
   homeStore.quillData = null
   homeStore.historyIndex = 0
}
// 监听路由参数变化
watch(() => route.params.insertedId, (newId, oldId) => {
  console.log(quill,'quill还在吗')
    nextTick(() => {
      initYjsConnection(newId, quill)
    })
}, { immediate: false })
//切换历史版本查看的时候 编辑器也切换对应版本的内容
watch(()=>homeStore.historyIndex,(newValue,oldValue)=>{
   console.log(homeStore.quillData,'触发了吗')
   nextTick(()=>{
    if(homeStore.quillData != null){
      quill.setContents(JSON.parse(homeStore.quillData))
    }
   })
})
onBeforeRouteLeave((to,from)=>{
  console.log('onMounted文件挂载了')
   saveFile(from.params.insertedId,{
      content:JSON.stringify(quill.getContents())
    }).then((res)=>{
      console.log(from,'from')
    })
})
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
  console.log('onMounted文件挂载了')
  if (sessionStorage.getItem('lastUrl')) {
    isShowClose.value = true
  }
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
        // 取消默认事件绑定
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
   quillToolbar = document.querySelector('#toolbar');
  quill = new Quill('#children', options);
 
  nextTick(() => {
    if (route.params.insertedId) {
      initYjsConnection(route.params.insertedId, quill)
    }
  })

 rebinding()

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
  // saveFile(route.params.insertedId,{
  //     content:JSON.stringify(quill.getContents())
  //   }).then((res)=>{
  //     console.log('保存成功',res)
  //   })

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
// 当从知识库进来的删除
const handleClose = () => {
  const url = sessionStorage.getItem('lastUrl')
  isShowClose.value = false
  router.push(url)
  sessionStorage.removeItem('lastUrl')
}

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

  .close {
    position: absolute;
    top: 30px;
    left: 50px;

    &:hover {
      cursor: pointer
    }
  }

  .nav {
    position: absolute;
    top: 0;
    left: 0;
    height: 64px;
    width: calc(100vw - 300px);
    display:flex;
    align-items: center;
    // background-color: skyblue;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
   .left{
    display:flex;
    align-items: center;
    .mode{
      margin-right:32px;
    }
     .avatar {
      border-left:1px solid #ddd;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      // overflow:hidden;
      position: relative;
      cursor: pointer;
      .icon {
        width: 100%;
        height: 100%;
        // width: 40px;
        // height: 40px;
        // border-radius: 50%;
      }
      .unlogin{
        position: absolute;
        top: 50px;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 10px 10px 0 10px;
        width: 100px;
        height: auto;
        justify-content: center;
        display: flex;
        align-content: center;
        button {

          background: none;
          border: none;
          cursor: pointer;
          color: #333;
          font-size: 14px;
        }
        button:hover {
          color: rgba(80, 98, 124, 0.788);
        }
      }
    }
    .history{
      margin-right:20px;
      height: 32px;
      display: flex;
      align-items:center!important;
      justify-content: center;
      border:1px solid #ddd;
      padding:10px;
      border-radius: 8px;
      &:hover{
        cursor: pointer;
      }
      .icon{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .txt{
        margin-left:5px;
        font-size: 14px;
        color:#1f2329;
      }
    }
   }
  }
.header{
  position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 300px);
  height: 64px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
   border-bottom: 1px solid #ddd;
  .back{
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
      height: 24px;
      background: #f5f7fa;
      cursor: pointer;
    }
    .icon{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .txt{
      font-size: 14px;
      color:#1f2329
    }
  }
  .center{
    margin-right:10px;
    display: flex;
    align-items: center;
    border:1px solid #ddd;
    border-radius: 8px;
    padding:6px 10px;
    background-color:#aaa;
    .txt{
      font-size: 14px;
      color:#fff;
    }
    &:hover{
      cursor: pointer;
    }
  }
}
  .content {
    box-sizing: border-box;
    flex: 1;
    margin-top: 61px;
   overflow-y:scroll ;
   &::-webkit-scrollbar{
    display:none;
   }
   &-header{
    padding:20px 268px 0;
    height: 150px;
    margin-bottom:22px;
    .title{
      font-size: 34px;
      display: flex;
      align-items: center;
      font-family: LackHackSafariFont;
      color:#1f2329;
      height: 55px;
      padding:0 12px;
    }
    .info{
      padding: 12px 12px 8px;
      height: 48px;
      display: flex;
      align-items: center;
      .icon{
        width: 20px;
        height: 20px;
        display: flex;
        // justify-content: center;
        // align-items: center;
      }
      .name{
        height: 20px;
        line-height: 20px;
      padding:0 4px;
      font-size: 14px;
      color: #646473;
      }
    }
   }
    &-center {
      box-sizing: content-box;
      height: calc(100vh - 86px);
      min-width: 820px !important;
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
