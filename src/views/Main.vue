<template>
    <el-container style="position:relative">
      <div class="img" v-show="homeStore.isCollapse" @click="homeStore.isCollapse=false">
        <svg t="1749734503742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3371" width="16" height="16"><path d="M907.264 70.656H116.736c-32.768 0-59.392 26.624-59.392 59.392v40.448c0 32.768 26.624 59.392 59.392 59.392h790.528c32.768 0 59.392-26.624 59.392-59.392v-40.448c0.512-32.768-26.624-59.392-59.392-59.392zM334.848 432.128H116.736c-32.768 0-59.392 26.624-59.392 59.392v40.448c0 32.768 26.624 59.392 59.392 59.392h218.624c32.768 0 59.392-26.624 59.392-59.392V491.52c0-32.768-26.624-59.392-59.904-59.392zM334.848 793.6H116.736c-32.768 0-59.392 26.624-59.392 59.392v40.448c0 32.768 26.624 59.392 59.392 59.392h218.624c32.768 0 59.392-26.624 59.392-59.392v-40.448c0-32.768-26.624-59.392-59.904-59.392zM925.184 621.568l-308.736-178.176C561.152 411.136 491.52 451.584 491.52 515.584v356.352c0 64 69.12 103.936 124.928 72.192l308.736-178.176c55.808-32.256 55.808-112.128 0-144.384z" fill="#707070" p-id="3372"></path></svg>
      </div>
       <div class="img" v-show="!homeStore.isCollapse" @click="homeStore.isCollapse = true">
        <svg t="1749734582862" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3610" width="16" height="16"><path d="M890.2 909.00000001l-756.4 0c-20.9 0-37.8-16.9-37.8-37.80000001l0-37.8c0-20.9 16.9-37.8 37.8-37.8L890.2 795.6c20.9 0 37.8 16.9 37.8 37.8l0 37.8c0 20.9-16.9 37.8-37.8 37.80000001zM890.2 568.7l-491.6 0c-20.9 0-37.8-16.9-37.8-37.8l0-37.8c0-20.9 16.9-37.8 37.8-37.8L890.2 455.3c20.9 0 37.8 16.9 37.8 37.8l0 37.8c0 20.9-16.9 37.8-37.8 37.8zM890.2 228.4l-756.4 0c-20.9 0-37.8-16.9-37.8-37.8l0-37.8c0-20.9 16.9-37.8 37.8-37.80000001L890.2 114.99999999c20.9 0 37.8 16.9 37.8 37.80000001l0 37.8c0 20.9-16.9 37.8-37.8 37.8zM266.2 423.29999999L266.2 600.70000001c0 22.00000001-29.2 33.1-46.2 17.49999999l-97.1-88.7c-10.6-9.7-10.6-25.29999999 0-35L220 405.9c17-15.6 46.2-4.6 46.2 17.39999999z" fill="#333333" p-id="3611"></path></svg>
       </div>
      <el-aside style="height: 100vh;border-right:1px solid #e5e7eb; background-color: #f5f6f7;" :collapse="true" v-show="!homeStore.isCollapse">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <div class="main">
          <el-main>
      <router-view></router-view>
          </el-main>
        </div>
      </el-container>
    </el-container>
</template>

<script setup>
import Aside from '@/components/Aside.vue'
import { useHomeStore } from '@/store/home';
const homeStore = useHomeStore()
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

