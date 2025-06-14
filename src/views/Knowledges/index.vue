<template>
  <div style="height: 100vh;display: flex;flex-direction: column;">
    <Nav name="知识库"></Nav>
     <div class="center">
      <!-- 文档创建 -->
      <div class="add">
        <div class="img">
        <svg t="1749739212870" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8439" width="24" height="24"><path d="M631.436 983.674l-533.843 0c-29.658 0-53.831-25.392-53.831-56.269l0-613.468 265.497-278.16 391.918 0c33.183-3.724 57.483 21.733 53.831 52.68l0.342 317.43-0.417 0 0 48.143-73.941 0 0-344.449-355.754 0 0 222.229-207.333 0 0 577.918 513.531 0 0 73.946zM991.997 679.239l-169.691 0 0-169.688-134.545 0 0 169.622-169.884 0 0 134.545 169.683 0 0 169.884 134.611 0 0-169.688 169.828 0 0-134.677z" fill="#1296db" p-id="8440"></path></svg>
        </div>
     <div class="right">
      <div class="title">新建</div>
      <div class="intro">新建文档开始协作</div>
     </div>
    
      </div>
      <!-- 知识库 -->
      <div class="add">
    <div class="img">
      <svg t="1749739212870" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8439" width="24" height="24"><path d="M631.436 983.674l-533.843 0c-29.658 0-53.831-25.392-53.831-56.269l0-613.468 265.497-278.16 391.918 0c33.183-3.724 57.483 21.733 53.831 52.68l0.342 317.43-0.417 0 0 48.143-73.941 0 0-344.449-355.754 0 0 222.229-207.333 0 0 577.918 513.531 0 0 73.946zM991.997 679.239l-169.691 0 0-169.688-134.545 0 0 169.622-169.884 0 0 134.545 169.683 0 0 169.884 134.611 0 0-169.688 169.828 0 0-134.677z" fill="#1296db" p-id="8440"></path></svg>
    </div>
    <div class="right">
      <div class="title">新建知识库</div>
      <div class="intro">创建你的知识库吧</div>
    </div>
      </div>
    </div>
    <div class="footer">
     <div class="title">
      <div class="left">
        <div class="txt">全部知识库</div>
      </div>
      <div class="right"></div>
     </div>
     <div class="list">
      <div class="li">后续内容
        <div class="img">...</div>
      </div>
       <div class="li">后续内容</div>
        <div class="li">后续内容</div>
         <div class="li">后续内容</div>
          <div class="li">后续内容</div>
           <div class="li">后续内容</div>
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
display: flex;
.add{
  margin-right:20px;
  border:1px solid #c5c0c0;
  height: 64px;
  width: 233px;
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
.footer{
  margin-top:20px;
    flex:1;
    padding:0 24px;
    .title{
      box-sizing: border-box;
      height: 44px;
      padding:1px 0 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .left{
        .txt{
        height: 21px;
        color:#1f2329;
        font-size: 16px;
      }
      }
      .right{

      }
    }
    .list{
      display: grid;
      grid-template-columns: repeat(auto-fill,140px);
      grid-column-gap:24px;
    
  .li{
    position:relative;
    width: 140px;
    height: 196px;
    background-color: skyblue;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(31, 35, 41, 0.12);
    .img{
      width: 20px;
      height: 20px;
      line-height: 20px;
      position:absolute;
      top:0;
      right:8px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
        background-color:#d6d9dc;
        cursor: pointer;
      }
    }
  }
    }
  }
</style>