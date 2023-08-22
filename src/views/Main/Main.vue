<!--
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-10 23:49:30
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-13 22:44:55
 * @FilePath: /Electron/src/views/Main/Main.vue
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
-->
<template>
    <el-container class="w100 h100">
      <el-aside width="150px" class="aside-content">
        lgklgjsl
        <!-- <el-header v-if="isShowLogo">
          <logo-vue />
        </el-header>
        <menu-vue v-if="isShowMenu" /> -->
      </el-aside>
      <el-container class="main-container" direction="vertical">
        <!-- <el-header v-if="isShowTopNav">
          <header-vue />
        </el-header> -->
        <!-- <TagsViewVue v-if="isShowTags" /> -->
        <el-main>
          <RouterView v-slot="{ Component, route }">
            <transition
              :name="<string>route.meta.transition || 'fade'"
              mode="out-in"
            >
              <div class="w100 h100">
                <template v-if="route.meta.keepAlive">
                  <keep-alive>
                    <suspense>
                      <template #default>
                        <component
                          :is="Component"
                          :key="route.meta.usePathKey ? route.path : undefined"
                        />
                      </template>
                      <template #fallback> <LoadingVue /> </template>
                    </suspense>
                  </keep-alive>
                </template>
                <template v-else>
                  <suspense>
                    <template #default>
                      <component
                        :is="Component"
                        :key="route.meta.usePathKey ? route.path : undefined"
                      />
                    </template>
                    <template #fallback> <LoadingVue /> </template>
                  </suspense>
                </template>
              </div>
            </transition>
          </RouterView>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script lang="ts" setup>
//   import { computed } from "vue";
  import { RouterView } from "vue-router";
//   import MenuVue from "./Menu.vue";
//   import HeaderVue from "./Header.vue";
//   import LogoVue from "./Logo.vue";
//   import TagsViewVue from "./TagsView.vue";
//   import LoadingVue from "./Loading.vue";
//   import { useSettingStore } from "@/stores/counter";
//   const settingStore = useSettingStore();
//   const isShowTopNav = computed(() => settingStore.getIsShowTopNav);
//   const isShowTags = computed(() => settingStore.getIsShowTags);
//   const isShowLogo = computed(() => settingStore.getIsShowLogo);
//   const isShowMenu = computed(() => settingStore.getIsShowMenu);
  </script>
  
  <style lang="scss" scoped>
  .aside-content {
    background-color: #191a23;
  }
  .main-container {
    border-left: solid 1px var(--el-menu-border-color);
  
    .el-main {
      border-top: solid 1px var(--el-menu-border-color);
    }
  }
  </style>
  