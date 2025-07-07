<template>
  <div class="container" >
    <div class="header">
      <div class="logo">
        <!-- 换logo -->
        <div class="img">
          <svg t="1750581584828" class="icon" viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11226" width="16" height="16"><path d="M1056 512h-64V32A32 32 0 0 0 960 0H448a32 32 0 0 0-32 32V128H128a32 32 0 0 0-32 32V512h-64a32 32 0 0 0-32 32v448a32 32 0 0 0 32 32h1024a32 32 0 0 0 32-32v-448a32 32 0 0 0-32-32z m-576-448h448v448h-192a32 32 0 0 0-32 32V640H480z m-320 128h256v448H384V544a32 32 0 0 0-32-32h-192zM1024 960H64V576h256v96a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V576h256z" fill="#115ECE" p-id="11227"></path><path d="M576 256h256a32 32 0 0 0 32-32 32 32 0 0 0-32-32H576a32.64 32.64 0 0 0-32 32.64A32 32 0 0 0 576 256zM576 448h256a32 32 0 0 0 32-32 32 32 0 0 0-32-32H576a32.64 32.64 0 0 0-32 32.64A32 32 0 0 0 576 448z" fill="#115ECE" p-id="11228"></path></svg>
        </div>
        <div class="txt">文档系统</div>
      </div>
      <!-- 后续功能添加，暂时不管 -->
      <div class="search" @click="handleSearch">
        <div class="search-box">
          <div class="img">
            <svg t="1749735973815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4574" width="16" height="16">
              <path
                d="M446.112323 177.545051c137.567677 0.219798 252.612525 104.59798 266.162424 241.493333 13.562828 136.895354-78.778182 261.818182-213.617777 289.008485-134.852525 27.203232-268.386263-52.156768-308.945455-183.608889s25.018182-272.252121 151.738182-325.779394A267.235556 267.235556 0 0 1 446.112323 177.545051m0-62.060607c-182.794343 0-330.989899 148.195556-330.989899 330.989899s148.195556 330.989899 330.989899 330.989899 330.989899-148.195556 330.989899-330.989899-148.195556-330.989899-330.989899-330.989899z m431.321212 793.341415a30.849293 30.849293 0 0 1-21.94101-9.102223l-157.220202-157.220202c-11.752727-12.179394-11.584646-31.534545 0.37495-43.50707 11.972525-11.972525 31.327677-12.140606 43.494141-0.37495l157.220202 157.220202a31.036768 31.036768 0 0 1 6.723232 33.810101 31.004444 31.004444 0 0 1-28.651313 19.174142z m0 0"
                p-id="4575"></path>
            </svg>
          </div>
          <div class="txt">搜索</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" style="border:0!important">
        <RouterLink to='/file'>
          <el-menu-item :index="'file'" :class="{ 'is-active': activeIndex === 'file' }"
            @click="handleMenuClick('file')">
            <div style="display:flex">
              <div class="txt">主页</div>
            </div>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/knowledges">
          <el-menu-item :index="'knowledges'" :class="{ 'is-active': activeIndex === 'knowledges' }"
            @click="handleMenuClick('knowledges')">知识库</el-menu-item>
        </RouterLink>
          <!-- 新增回收站菜单项 -->
          <!-- <RouterLink to="/Recycle">
          <el-menu-item :index="'recycle'" :class="{ 'is-active': activeIndex === 'recycle' }"
            @click="handleMenuClick('recycle')">
            <div style="display:flex;align-items:center">
              <svg t="1750569983191" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7415" width="16" height="16" style="margin-right:6px">
                <path d="M380 455a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v240a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V455zM644 455a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v240a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V455z" fill="#444444" p-id="7416"></path>
                <path d="M321 212V96c0-17.673 14.327-32 32-32h320c17.673 0 32 14.327 32 32v116h183a8 8 0 0 1 8 8v64a8 8 0 0 1-8 8h-55v635c0 17.673-14.327 32-32 32H225c-17.673 0-32-14.327-32-32V292h-58a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h186z m80-68v68h224v-68H401zM273 292v587h480V292H273z" fill="#444444" p-id="7417"></path>
              </svg>
              <div class="txt">回收站</div>
            </div>
          </el-menu-item>
        </RouterLink> -->
      </el-menu>
      <div class="file">
        <div class="file-header">
          <div class="txt">
            我的文档库
          </div>
          <div class="tool">
            <div class="add" @click="handleAddFile">
              <svg t="1749736784887" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="6431" width="16" height="16">
                <path
                  d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z"
                  fill="#444444" p-id="6432"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="file-list">
          <div class="li" v-for="(item, index) in homeStore.fileList" :key="item._id" @click="handleEnterFile(item._id, index,item)"
            :class="{ active: activeIndex === `file-${item._id}` }">
            <div class="left">
              <div style="width: 20px;height: 20px;"></div>
              <div class="icon">
                <svg t="1749798851413" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="4642" width="16" height="16">
                  <path
                    d="M288 320h448a32 32 0 0 0 0-64H288a32 32 0 0 0 0 64zM288 544h448a32 32 0 0 0 0-64H288a32 32 0 0 0 0 64zM544 704H288a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64z"
                    p-id="4643"></path>
                  <path
                    d="M896 132.928C896 77.28 851.552 32 796.928 32H227.04C172.448 32 128 77.28 128 132.928v758.144C128 946.72 172.448 992 227.04 992h435.008c1.568 0 2.912-0.672 4.416-0.896 8.96 1.6 18.464-0.256 25.984-6.528l192-160a31.424 31.424 0 0 0 10.816-27.2c0.16-1.184 0.736-2.208 0.736-3.424V132.928zM192 891.072V132.928C192 112.576 207.712 96 227.04 96h569.888C816.288 96 832 112.576 832 132.928V736h-96a96 96 0 0 0-96 96v96H227.04C207.712 928 192 911.424 192 891.072zM814.016 800L704 891.68V832a32 32 0 0 1 32-32h78.016z"
                    p-id="4644"></path>
                </svg>
              </div>
            </div>
            <div class="right">
              <div class="fileName">{{ item.title }}</div>
              <div class="tool">
                <!-- <div class="add">
                  <svg t="1749800508302" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="7518" width="16" height="16">
                    <path
                      d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z"
                      fill="#444444" p-id="7519"></path>
                  </svg>
                </div> -->
                
                  <el-dropdown placement="bottom">
      <template #default>
        <div class="more"><svg t="1749800207132" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5631" width="16" height="16">
                    <path
                      d="M841.085552 395.21211c-62.669318 0-113.472378 49.541323-113.472378 110.642936 0 61.093427 50.80306 110.652146 113.472378 110.652146 62.685691 0 113.487727-49.559742 113.487727-110.652146C954.573279 444.75241 903.77022 395.21211 841.085552 395.21211zM500.653069 395.21211c-62.668295 0-113.487727 49.541323-113.487727 110.642936 0 61.093427 50.820456 110.652146 113.487727 110.652146 62.669318 0 113.472378-49.559742 113.472378-110.652146C614.125447 444.75241 563.322387 395.21211 500.653069 395.21211zM182.915471 395.21211c-62.686714 0-113.488751 49.541323-113.488751 110.642936 0 61.093427 50.802036 110.652146 113.488751 110.652146 62.669318 0 113.471354-49.559742 113.471354-110.652146C296.385802 444.75241 245.583766 395.21211 182.915471 395.21211z"
                      p-id="5632"></path>
                  </svg></div>
      </template>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
           <div style="display:flex;align-items: center;" @click="changeFileName(item._id)">
              <div style="display: flex;justify-content: center;align-items: center;margin-right:5px;width:16px;height: 16px;">
                <svg t="1750569827551" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6423" width="16" height="16"><path d="M950.857143 950.857143H73.142857V73.142857h373.028572v73.142857H146.285714v731.428572h731.428572V548.571429h73.142857z" fill="" p-id="6424"></path><path d="M899.657143 160.914286l-51.2-51.2L292.571429 665.6l51.2 51.2 555.885714-555.885714z" fill="" p-id="6425"></path></svg>
              </div>
              <div style="font-size: 14px;">
                重命名
              </div>
            </div>
          </el-dropdown-item>
       
          <!-- <el-dropdown-item>
            <div style="display:flex;align-items: center;">
              <div style="display: flex;justify-content: center;align-items: center;margin-right:5px;width:16px;height: 16px;">
                <svg t="1750569983191" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7415" width="16" height="16"><path d="M380 455a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v240a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V455zM644 455a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v240a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V455z" fill="#323338" p-id="7416"></path><path d="M321 212V96c0-17.673 14.327-32 32-32h320c17.673 0 32 14.327 32 32v116h183a8 8 0 0 1 8 8v64a8 8 0 0 1-8 8h-55v635c0 17.673-14.327 32-32 32H225c-17.673 0-32-14.327-32-32V292h-58a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h186z m80-68v68h224v-68H401zM273 292v587h480V292H273z" fill="#323338" p-id="7417"></path></svg>
              </div>
              <div style="font-size: 14px;">
               删除
              </div>
            </div>
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 重命名 -->
   <el-dialog  width="500" align-center v-model="isShowName" :show-close="false">
       <template #default>
        <el-input v-model="changedName" placeholder="请输入你想修改的名字"></el-input>
      </template>
    <template #footer>
      <el-button @click="isShowName = false">取消</el-button>
      <el-button
        type="primary"
        @click="handleRename"
        :loading="loading"
      >
        确定
      </el-button>
       </template>
   </el-dialog>
   <!-- 搜索 -->
    <el-dialog  v-model="searchVisible" width="540" :before-close="dialogBeforeClose" :show-close="false" style="padding:0!important;">
      <template #header>
        <div style="height: 52px;display: flex;align-items: center;padding:0 8px 0 12px;width: 100%; background-color: rgba(251, 252, 252);">
          <div style="height: 26px;display: flex;align-items: center;width: 100%;">
          <svg t="1751035652633" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5567" width="16" height="16" style="margin:0 10px 0 4px;"><path d="M446.112323 177.545051c137.567677 0.219798 252.612525 104.59798 266.162424 241.493333 13.562828 136.895354-78.778182 261.818182-213.617777 289.008485-134.852525 27.203232-268.386263-52.156768-308.945455-183.608889s25.018182-272.252121 151.738182-325.779394A267.235556 267.235556 0 0 1 446.112323 177.545051m0-62.060607c-182.794343 0-330.989899 148.195556-330.989899 330.989899s148.195556 330.989899 330.989899 330.989899 330.989899-148.195556 330.989899-330.989899-148.195556-330.989899-330.989899-330.989899z m431.321212 793.341415a30.849293 30.849293 0 0 1-21.94101-9.102223l-157.220202-157.220202c-11.752727-12.179394-11.584646-31.534545 0.37495-43.50707 11.972525-11.972525 31.327677-12.140606 43.494141-0.37495l157.220202 157.220202a31.036768 31.036768 0 0 1 6.723232 33.810101 31.004444 31.004444 0 0 1-28.651313 19.174142z m0 0" p-id="5568"></path></svg>
          <el-input v-model="searchValue" placeholder="搜索"  class="no-border-input" @keydown.enter.native="search"></el-input>
          </div>
        </div>
      </template>
      <template #default>
        <div class="search-list">
          <div class="search-history" v-show="searchList.length==0">
            <div class="header" >
              搜索历史
            </div>
            <div class="li">
              <div class="icon">
                <svg t="1751037515072" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6573" width="21" height="21"><path d="M516.693333 19.2a495.36 495.36 0 1 0 495.36 495.36A495.786667 495.786667 0 0 0 516.693333 19.2z m0 926.72a431.36 431.36 0 1 1 431.36-431.36 431.786667 431.786667 0 0 1-431.36 431.786667z" fill="#bfbfbf" p-id="6574"></path><path d="M548.693333 501.333333V227.84a32 32 0 0 0-64 0v287.146667a31.573333 31.573333 0 0 0 9.813334 22.613333l235.946666 227.413333a32 32 0 1 0 42.666667-46.08z" fill="#bfbfbf" p-id="6575"></path></svg>
              </div>
              <div class="txt">
                测试数据
              </div>
            </div>
          </div>
          <div class="search-content">
            <div class="li" v-for="(item) in searchList" :key="item._id" @click="handleFile(item._id)">
              <div class="icon">
 <svg t="1751119283176" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3281" width="20" height="20"><path d="M654.826667 117.333333l209.173333 209.173334V928h-704v-810.666667h494.826667zM586.666667 181.312h-362.666667V864h576v-469.333333h-213.333333V181.333333zM704 672v64H320v-64h384z m0-170.666667v64H320v-64h384z m-203.264-170.666666v64H320v-64h180.736z m276.928 0L650.666667 203.669333V330.666667h126.997333z" fill="#1677FF" p-id="3282"></path></svg>
              </div>
              <div class="main">
                <div class="content-title">
                   {{ item.title }}
                </div>
                <div class="content-intro">
                  {{item.content}}
                </div>
                <div class="footer"></div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
</template>

<script setup>
import { saveFile } from '@/api/file'; 
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch, nextTick } from 'vue';
import { addFile, getFileList,fileListDetail} from '@/api/file';
import { ElMessage } from 'element-plus';
import {useHomeStore} from '@/store/home'
const currentDocId = ref('');
const loading = ref(false);
//引入搜索插件
import FlexSearch from 'flexsearch'

//搜索到的列表
const searchList = ref([])
const homeStore = useHomeStore()
let index
//搜索函数
const search=()=>{
  searchList.value = []
  const result = homeStore.searchIndex.search(searchValue.value)
  homeStore.fileList.map(item=>{
    if(result.includes(item._id)){
      searchList.value.push(item)
    }
  })
  
}

//控制菜单
const activeIndex = ref('file')
const route = useRoute()
const router = useRouter()
// const fileList = ref([])
const isShowName = ref(false)
const changedName = ref('')
const searchVisible  =ref(false)
const searchValue = ref('')
// 处理菜单点击
const handleMenuClick = (index) => {
  activeIndex.value = index
}

// 打开重命名对话框
const changeFileName = (id) => {
  // 获取当前文档信息，预填充标题
  const currentDoc = homeStore.fileList.find(doc => doc._id === id);
  if (currentDoc) {
    changedName.value = currentDoc.title;
    currentDocId.value = id;
    isShowName.value = true;
  }
};

// 处理重命名提交
const handleRename = async () => {
  if (!changedName.value.trim()) {
    ElMessage.error('标题不能为空');
    return;
  }
  
  loading.value = true;
  
  try {
    // 调用现有更新接口，只传递title字段
    const res = await saveFile(currentDocId.value, { title: changedName.value });
    
    if (res.data.code === 200) {
      ElMessage.success('重命名成功');
      isShowName.value = false;
      homeStore.getFileList(); // 刷新文件列表
    } else {
      ElMessage.error(res.data.message || '重命名失败');
    }
  } catch (error) {
    console.error('重命名错误:', error);
    ElMessage.error('服务器错误，请稍后再试');
  } finally {
    loading.value = false;
  }
};
// 搜索
const handleSearch =()=>{
searchVisible.value = true
//创建索引
homeStore.searchIndex = new FlexSearch.Index({
  tokenize:'reverse',//适合中英数字分词
  charset:"latin:extra",//支持特殊字符
  suggest:true,//支持建议
})
homeStore.fileList.forEach((item)=>{
  const titleAndContent = `${item.title} ${item.content}`
  console.log('触发了这个函数',titleAndContent)
  homeStore.searchIndex.add(item._id,titleAndContent)
})
}
// 处理文件点击
const handleEnterFile = async (id, index,item) => {
  activeIndex.value = `file-${id}`
  const userId = sessionStorage.getItem('userId')
  localStorage.setItem(`title${id}`,JSON.stringify({title:item.title,
    name:`用户${item.ownerId.slice(item.ownerId.length-6)}`
  }))
  const res = await fileListDetail(id,userId)
  console.log(res,'res')
  sessionStorage.setItem('permissionCode',res.data.permissionCode)
  router.push({
    name: 'content',
    params: {
      insertedId: id
    }
  })
}
const handleFile = async(id)=>{
   const userId = sessionStorage.getItem('userId')
  const res = await fileListDetail(id,userId)
   const url =router.resolve({name:'content',params:{insertedId:id}})
   window.open(url.href,'_blank')
  }
// 监听路由变化，更新高亮状态
watch(() => route.path, (newPath) => {
  if (newPath === '/knowledges') {
    activeIndex.value = 'knowledges'
  } else if (newPath === '/file') {
    activeIndex.value = 'file'
  } else if (newPath.includes('/cotent/')) {
    // 如果是文件内容页面，需要根据文件ID设置高亮
    const fileId = route.params.insertedId
    if (fileId) {
      activeIndex.value = `file-${fileId}`
    }
  }
}, { immediate: true })

// 同时监听路由参数变化
watch(() => route.params.insertedId, (newId) => {
  if (newId && route.path.includes('/cotent/')) {
    activeIndex.value = `file-${newId}`
  }
}, { immediate: true })

onMounted(() => {
homeStore.getFileList()
})

const handleAddFile = async () => {
  const baseId = sessionStorage.getItem('defaultKnowledgeId')
  let res = await addFile({
    baseId,
    ownerId: sessionStorage.getItem('userId'),
  })
  if (res.data.code === 201) {
    localStorage.setItem(`title${res.data.insertedId}`,JSON.stringify({
      title:'未命名文档',
      name:`用户${sessionStorage.getItem('defaultKnowledgeId').slice(sessionStorage.getItem('defaultKnowledgeId').length-6)}`
    }))
    homeStore.getFileList()
    const titleAndContent = `未命名文档`
    homeStore.searchIndex.add(
      res.data.insertedId,
      titleAndContent
    )
      router.push({
      name: 'content',
      params: {
        insertedId: res.data.insertedId
      },
    })
    ElMessage.success('添加文件成功')
  }
}
</script>

<style lang="scss" scoped>
.is-active {
  background-color: rgb(212, 222, 244) !important;
  color: #1296db !important;
}

.el-menu {
  background-color: #f5f6f7;
  margin: 0 6px;
}

.container {
  box-sizing: border-box;
  padding: 4px;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {
    width: 100%;

    .logo {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 16px 0 20px;

      .img {
        width: 20px;
        height: 20px;
        margin-left: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .txt {
        font-size: 14px;
        color: 1F2329;

      }
    }

    .search {
      padding: 0 8px;
      height: 38px;

      &-box {
        height: 32px;
        padding: 0 2px 0 8px;
        background-color: #ffffff;
        border-radius: 6px;
        display: flex;
        align-items: center;

        .img {
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .txt {
          height: 22px;
          line-height: 22px;
          padding: 0 2px 0 6px;
          color: #646A73;
          font-size: 14px;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .footer {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    flex: 1;

    .el-menu {
      .el-menu-item {
        height: 36px;
        border-radius: 5px;
      }
    }

    .file {
      flex: 1;
      margin-top: 10px;
      display: flex;
      flex-direction: column;

      &-header {
        display: flex;
        justify-content: space-between;
        padding: 8px 4px;
        margin: 1px 0;

        .txt {
          font-size: 12px;
          color: #646A73;
          margin-left: 10px;
          line-height: 24px;
        }

        .tool {
          margin-right: 3px;

          .add {
            width: 20px;
            height: 20px;
            margin: 0 4px;
            padding: 2px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
              cursor: pointer;
              background-color: #dddedf;
              border-radius: 4px;
            }
          }
        }
      }

      &-list {
        padding: 0 8px;
        flex: 1;
        overflow-y: scroll;
    
        .li {
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          &:hover {
            background-color: #dddedf;
            cursor: pointer;
            border-radius: 6px;
          }

          .left {
            display: flex;

            .icon {
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 6px;
            }
          }

          .right {
            padding-right: 5px;
            width: 266px;
            height: 35px;
            line-height: 35px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: normal;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .tool {
              width: 52px;
              height: 20px;
              display: flex;
              justify-content: flex-end;
              align-items: center;

              .add {
                margin-right: 5px;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                  cursor: pointer;
                  background-color: #c7c8c9;
                  border-radius: 5px;
                }
              }

              .more {
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                  cursor: pointer;
                  background-color: #c7c8c9;
                  border-radius: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}

//消除滚动条
::-webkit-scrollbar {
  display: none;
}

.active {
  background-color: rgb(212, 222, 244) !important;
  border-radius: 6px;
  color: #1296db !important;
}

.search-list{
  width: 100%;
  height: 362px;
  .search-history{
    width: 100%;
    .header{
  padding:2px 16px 0;
  height: 36px;
  display: flex;
  align-items: center;
  font-size: 12px;
    }
    .li{
      display: flex;
      margin:0 4px;
      padding:0 16px 0 12px;
      height: 36px;
      align-items: center;
      &:hover{
        cursor: pointer;
        background-color: #f4f4f4;
        border-radius: 5px;
      }
      .icon{
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding:2px;
      }
      .txt{
        margin-left:8px;
        line-height: 36px;
      }
    }
  }
  .search-content{
 
    padding:0 3px;
    width: 100%;
    .li{
      padding:8px 8px 8px 12px;
      display:flex;
      align-items: center;
      &:hover{
        cursor: pointer;
        background-color: #f4f4f4;
        border-radius: 5px;
      }
      .icon{
        width: 34px;
        height: 44px;
        display: flex;
        // justify-content: center;
        align-items: center;
        margin-right:10px;
      }
      .main{
        flex:1;
        max-width: 470px;
        .content-title{
          height: 22px;
          color:#1f2329;
          font-size: 14px;
          overflow:hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: LarkHackSafariFont;
        }
        .content-intro{
          font-size: 12px;
          color:#646A73;
          line-height: 20px;
            font-family: LarkHackSafariFont;
            display:-webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient:vertical;
            -webkit-line-clamp: 2;
            overflow:hidden;
            white-space:normal;
        }
        .footer{
          // margin-top:2px;
          // height: 20px;
          font-size: 12px;
          color:#646A73;
            font-family: LarkHackSafariFont;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.el-dialog__header{
  padding:0!important
}
.no-border-input{
  flex:1!important;
}
.no-border-input .el-input__inner {
  border: none !important;
  box-shadow: none !important;
  width: 100%!important;
}

/* 移除聚焦状态边框 */
.no-border-input .el-input__inner:focus {
  border: none !important;
  box-shadow: none !important;
  width: 100%!important;
}

/* 如果还有内阴影 */
.no-border-input .el-input__wrapper {
  box-shadow: none !important;
  padding:0!important;
  background-color: rgba(251, 252, 252);
}

</style>