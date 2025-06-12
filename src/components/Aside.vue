<template>
    <div class="container">
      <div class="header">
        <div class="logo">
          
          <div class="img">图</div>
          <div class="txt">文档系统</div>
        </div>
        <div class="search">
        <div class="search-box">
       <div class="img">
        <svg t="1749735973815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4574" width="16" height="16"><path d="M446.112323 177.545051c137.567677 0.219798 252.612525 104.59798 266.162424 241.493333 13.562828 136.895354-78.778182 261.818182-213.617777 289.008485-134.852525 27.203232-268.386263-52.156768-308.945455-183.608889s25.018182-272.252121 151.738182-325.779394A267.235556 267.235556 0 0 1 446.112323 177.545051m0-62.060607c-182.794343 0-330.989899 148.195556-330.989899 330.989899s148.195556 330.989899 330.989899 330.989899 330.989899-148.195556 330.989899-330.989899-148.195556-330.989899-330.989899-330.989899z m431.321212 793.341415a30.849293 30.849293 0 0 1-21.94101-9.102223l-157.220202-157.220202c-11.752727-12.179394-11.584646-31.534545 0.37495-43.50707 11.972525-11.972525 31.327677-12.140606 43.494141-0.37495l157.220202 157.220202a31.036768 31.036768 0 0 1 6.723232 33.810101 31.004444 31.004444 0 0 1-28.651313 19.174142z m0 0" p-id="4575"></path></svg>
       </div>
       <div class="txt">搜索</div>
        </div>
        </div>
      </div>
    <div class="footer">
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" style="border:0!important">
          <RouterLink to='/file'>
            <el-menu-item :index="1" :class="{bg:activeIndex==index}">主页</el-menu-item>
          </RouterLink>
        <RouterLink to="/knowledges">
          <el-menu-item :index="2" :class="{bg:activeIndex==index}">知识库</el-menu-item>
        </RouterLink>
    </el-menu>
    <div class="file">
      <div class="file-header">
    <div class="txt">
      我的文档库
    </div>
    <div class="tool">
      <div class="add">
        <svg t="1749736784887" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6431" width="16" height="16"><path d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z" fill="#444444" p-id="6432"></path></svg>
      </div>
    </div>
      </div>
      <div class="file-list">
        文件列表
      </div>
    </div>
    </div>
  </div>

</template>

<script setup>
import {RouterLink} from 'vue-router'
import {ref} from 'vue';
//控制菜单
const activeIndex = ref(1)

</script>

<style lang="scss" scoped>
.is-active{
  background-color: rgb(212, 222, 244);
}
.el-menu{
  background-color:  #f5f6f7;
  margin:0 6px;
}
.container{
  box-sizing: border-box;
  padding:4px;
  display:flex;
  flex-direction: column;
 height: 100vh;
    .header{
  width: 100%;
  .logo{
    height: 64px;
    display: flex;
    align-items: center;
    padding:0 16px 0 20px;
    
    .img{
      width: 20px;
      height: 20px;
      margin-left:34px;
    }
    .txt{
      font-size: 14px;
      color:1F2329;
    }
  }
  .search{
    padding:0 8px;
    height: 38px;
    &-box{
      height: 32px;
      padding:0 2px 0 8px;
      background-color: #ffffff;
      border-radius: 6px;
      display: flex;
      align-items: center;
      .img{
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .txt{
        height: 22px;
        line-height: 22px;
        padding:0 2px 0 6px;
        color:#646A73;
        font-size: 14px;
      }
      &:hover{
        cursor: pointer;
      }
    }
  }
}
.footer{
  overflow-y:scroll;
  flex:1;
  .el-menu{
  .el-menu-item{
    height: 36px;
    border-radius: 5px;
  }
}
.file{
  margin-top:10px;
  &-header{
    display:flex;
  justify-content: space-between;
  padding:8px 4px;
  margin:1px 0;
  .txt{
    font-size: 12px;
    color:#646A73;
    margin-left:10px;
  }
  .tool{
    margin-right:3px;
    .add{
      width: 20px;
      height: 20px;
      margin:0 4px;
      padding:2px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
        cursor: pointer;
        background-color:  #dddedf;
        border-radius: 4px;
      }
    }
  }
  }
  &-list{
    padding:0 8px;
  }
}
}
}
//消除滚动条
::-webkit-scrollbar{
  display:none;
}
</style>