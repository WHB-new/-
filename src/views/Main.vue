<template>
    <el-container style="position:relative">
      <div class="img" v-show="homeStore.isCollapse" @click="homeStore.isCollapse=false">
        <svg t="1749734503742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3371" width="16" height="16"><path d="M907.264 70.656H116.736c-32.768 0-59.392 26.624-59.392 59.392v40.448c0 32.768 26.624 59.392 59.392 59.392h790.528c32.768 0 59.392-26.624 59.392-59.392v-40.448c0.512-32.768-26.624-59.392-59.392-59.392zM334.848 432.128H116.736c-32.768 0-59.392 26.624-59.392 59.392v40.448c0 32.768 26.624 59.392 59.392 59.392h218.624c32.768 0 59.392-26.624 59.392-59.392V491.52c0-32.768-26.624-59.392-59.904-59.392zM334.848 793.6H116.736c-32.768 0-59.392 26.624-59.392 59.392v40.448c0 32.768 26.624 59.392 59.392 59.392h218.624c32.768 0 59.392-26.624 59.392-59.392v-40.448c0-32.768-26.624-59.392-59.904-59.392zM925.184 621.568l-308.736-178.176C561.152 411.136 491.52 451.584 491.52 515.584v356.352c0 64 69.12 103.936 124.928 72.192l308.736-178.176c55.808-32.256 55.808-112.128 0-144.384z" fill="#707070" p-id="3372"></path></svg>
      </div>
       <div class="img" v-show="!homeStore.isCollapse && homeStore.isShowHistory" @click="homeStore.isCollapse = true">
        <svg t="1749734582862" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3610" width="16" height="16"><path d="M890.2 909.00000001l-756.4 0c-20.9 0-37.8-16.9-37.8-37.80000001l0-37.8c0-20.9 16.9-37.8 37.8-37.8L890.2 795.6c20.9 0 37.8 16.9 37.8 37.8l0 37.8c0 20.9-16.9 37.8-37.8 37.80000001zM890.2 568.7l-491.6 0c-20.9 0-37.8-16.9-37.8-37.8l0-37.8c0-20.9 16.9-37.8 37.8-37.8L890.2 455.3c20.9 0 37.8 16.9 37.8 37.8l0 37.8c0 20.9-16.9 37.8-37.8 37.8zM890.2 228.4l-756.4 0c-20.9 0-37.8-16.9-37.8-37.8l0-37.8c0-20.9 16.9-37.8 37.8-37.80000001L890.2 114.99999999c20.9 0 37.8 16.9 37.8 37.80000001l0 37.8c0 20.9-16.9 37.8-37.8 37.8zM266.2 423.29999999L266.2 600.70000001c0 22.00000001-29.2 33.1-46.2 17.49999999l-97.1-88.7c-10.6-9.7-10.6-25.29999999 0-35L220 405.9c17-15.6 46.2-4.6 46.2 17.39999999z" fill="#333333" p-id="3611"></path></svg>
       </div>
      <el-aside style="height: 100vh;border-right:1px solid #e5e7eb; background-color: #f5f6f7;" :collapse="true" v-show="!homeStore.isCollapse && homeStore.isShowHistory">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <div class="main">
          <el-main>
      <router-view></router-view>
          </el-main>
        </div>
      </el-container>
      <div class="history" v-show="!homeStore.isShowHistory">
        <div class="header">
          <div class="txt">历史记录</div>
          <div class="icon">
            <svg t="1750925301098" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5330" width="16" height="16"><path d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480z m0-64c229.76 0 416-186.24 416-416S741.76 96 512 96 96 282.24 96 512s186.24 416 416 416z" fill="#000000" p-id="5331"></path><path d="M552 601.696v22.432h-80v-22.432c0-51.296 24.192-99.808 58.816-136.704 26.464-28.224 25.728-27.424 33.28-36.384 19.968-23.776 27.904-40.768 27.904-60.608a80 80 0 1 0-160 0H352a160 160 0 0 1 320 0c0 41.664-15.68 75.2-46.656 112.064-5.216 6.208-10.88 12.576-17.856 20.096-2.688 2.88-5.44 5.888-9.152 9.792l-9.152 9.76c-21.952 23.36-37.184 53.92-37.184 81.984zM545.856 717.984c9.44 9.312 14.144 20.672 14.144 34.016 0 13.6-4.704 24.992-14.144 34.208A46.784 46.784 0 0 1 512 800c-13.12 0-24.448-4.608-33.856-13.792A45.856 45.856 0 0 1 464 752c0-13.344 4.704-24.704 14.144-34.016A46.464 46.464 0 0 1 512 704c13.12 0 24.448 4.672 33.856 13.984z" fill="#000000" p-id="5332"></path></svg>
          </div>
        </div>
        <div class="li">
          <div class="item" @click="handleChange">
            <div class="time">6月20日 21:07</div>
          <div class="recent">最近更新</div>
          <div class="name">
            <span style="background-color: rgb(141,85,237);" class="user-color"></span>
            <span class="user-name">王皓彬</span>
          </div>
          </div>
        </div>
      </div>
    </el-container>
</template>

<script setup>
import Aside from '@/components/Aside.vue'
import { useHomeStore } from '@/store/home';
const homeStore = useHomeStore()
const handleChange = ()=>{

}
</script>

<style lang="scss" scoped>
.el-container{
  height: 100%;
  border:0!important;
  .img{
    width: 24px;
    height: 24px;
    padding:4px;
    position:absolute;
    left:20px;
    top:24px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      cursor: pointer;
      background-color: #dddedf;
      border-radius: 4px;
    }
  }
  .main {
    min-width:200px;
  background: RGBA(255, 255, 255, 1);
  width: calc(100vw - 300px);
  height: 100%;
  padding-top: 0;
  .el-main{
    padding:0!important;
    height: 100vh;
  }
}
.history{
  height: 100vh;
  width: 300px;
  background-color: #fff;
  border-left:1px solid #e5e7eb;
  .header{
    width: 100%;
    height: 64px;
    border-bottom:1px solid #e5e7eb;
    display: flex;
    align-items: center;
    .txt{
      margin-left:15px;
      margin-right:10px;
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 16px;
      color:#1f2329;
    }
    .icon{
      display: flex;
      justify-content: center;
      align-items:center;
    }
  }
  .li{
    overflow-y:scroll;
    &::-webkit-scrollbar{
      display: none;
    }
    .item{
      cursor:pointer;
      padding:12px 13px 12px 40px;
      margin:-1px 0;
      position:relative;
      transition:all .2s ease;
      background-color: rgb(224 233 255);
      .time{
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      height: 20px;
      margin-bottom: 4px;
      color:#336df4;
    }
    .recent{
      font-size: 12px;
      line-height: 18px;
      margin:4px 0;
      height: 18px;
      color:#336df4
    }
    .name{
      position:relative;
      font-size: 12px;
      font-weight: 500;
      color:#1f2329;
      height: 18px;
      line-height: 18px;
      padding-left:18px;
      .user-color{
  position:absolute;
  left:0;
  top:6px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
}
.user-name{
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  display:inline-block;
}
    }
    }
  }
}

}

</style>

<style>
.router-link {
  text-decoration: none;
}
a{
  text-decoration: none;
}
</style>

