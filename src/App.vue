<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
 <div style="width: 100%;height: 100vh;">
  <router-view></router-view>
   </div>
</template>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}

body {
  background-color: #f5f7f9;
  color: #515a6e;
  line-height: 1.6;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>