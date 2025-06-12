<template>
  <div class="container" :style="homeStore.isCollapse?'margin-left:35px':'margin-left:0;'">
    <div class="header">
      <div class="name">
        {{name}}
      </div>
      <div class="tool">
        工具区域
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from '@/store/home';
const homeStore = useHomeStore()
const props = defineProps({
 name:String,
})
</script>

<style lang="scss" scoped>
.container{
  padding:0 24px 0 20px;
  height: 64px;
  margin-bottom:12px;
  .header{
    height: 64px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .name{
      
    }
  }

}
</style>