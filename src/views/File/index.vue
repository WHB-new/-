<template>
  <div style="height: 100vh;display: flex;flex-direction: column;">
    <Nav name="主页"></Nav>
    <div class="center">
      <div class="add">
        <div class="img">
        <svg t="1749739212870" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8439" width="24" height="24"><path d="M631.436 983.674l-533.843 0c-29.658 0-53.831-25.392-53.831-56.269l0-613.468 265.497-278.16 391.918 0c33.183-3.724 57.483 21.733 53.831 52.68l0.342 317.43-0.417 0 0 48.143-73.941 0 0-344.449-355.754 0 0 222.229-207.333 0 0 577.918 513.531 0 0 73.946zM991.997 679.239l-169.691 0 0-169.688-134.545 0 0 169.622-169.884 0 0 134.545 169.683 0 0 169.884 134.611 0 0-169.688 169.828 0 0-134.677z" fill="#1296db" p-id="8440"></path></svg>
        </div>
     <div class="right">
      <div class="title">新建</div>
      <div class="intro">新建文档开始协作</div>
     </div>
      </div>
    </div>
    <div class="main">
      <div class="header">
        <div class="title">
          <div class="recent">
            最近访问
          </div>
        </div>
      </div>
      <div class="list">
        列表的区域
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from '@/components/Nav.vue';
</script>

<style lang="scss" scoped>
.center{
height: 64px;
margin:8px 0;
padding: 0 24px 0 24px;
margin-bottom:12px;
.add{
  border:1px solid #c5c0c0;
  height: 64px;
  max-width: 233px;
  border-radius: 8px;
  padding:0 8px 0 16px;
  display: flex;
  align-items: center;
  &:hover{
    cursor: pointer;
    background-color: #edeeee;
  }
  .img{
    margin-right:12px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right{
    .title{
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      color:#1f2329;
    }
    .intro{
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      color:#646A73
    }
  }
}
}
.main{
flex:1;
  padding-right:24px;
  .header{
    margin-left:12px;
     max-width: 268px;
   padding:10px 12px;
height: 48px;
.title{
  height: 48px;
  display: flex;
  align-items: center;
  .recent{
    width: 64px;
    height: 22px;
    line-height: 22px;
    font-size: 16px;
    padding:2px 4px;
    text-align: center;
    color:#646A73;
   
    &:hover{
      cursor: pointer;
        background-color: #f5f5f5;
        border-radius: 5px;
    }
  }
}

  }
}
</style>