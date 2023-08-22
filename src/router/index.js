/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-09 00:09:43
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-13 22:42:01
 * @FilePath: /Electron/src/router/index.js
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [{
    path: '/',
    name: 'main',
    component: () => import("@/views/Main/Main.vue"),
    redirect: '/home',
    children:[
        {
            path: '/home',
            name: 'home',
            meta: {
              keepAlive: false,
              transition: '',
              affix: true,
            },
            component: () => import('@/views/Home/Home.vue')
          },
    ]
}];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
