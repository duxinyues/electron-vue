<!--
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-03 08:59:21
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-17 00:36:41
 * @FilePath: /Electron/src/App.vue
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
-->
<script setup lang="ts">
</script>
<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
