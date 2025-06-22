<template>
  <div class="container" :style="homeStore.isCollapse ? 'margin-left:35px' : 'margin-left:0;'">
    <div class="header">
      <div class="name">
        {{ name }}
      </div>
      <div class="tool">
        工具区域
      </div>
      <!-- 头像区域 -->
      <div class="avatar" @click="toggleDropdown">
        <img src="./figure.png" alt="头像" class="avatar-img" />
        <div v-if="showDropdown" class="dropdown">
          <button @click="logout">退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from '@/store/home';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const homeStore = useHomeStore();
const props = defineProps({
  name: String,
});

// 控制下拉框显示
const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// 路由跳转
const router = useRouter();
const logout = () => {
  localStorage.removeItem('token'); // 删除 token
  router.push('/test-login'); // 跳转到登录页面
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 24px 0 20px;
  height: 64px;
  .header {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
    }
    .tool {
    }
    .avatar {
      position: relative;
      cursor: pointer;
      .avatar-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .dropdown {
        position: absolute;
        top: 50px;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 10px;
        width: 100px;
        height: auto;
        justify-content: center;
        display: flex;
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
  }
}
</style>