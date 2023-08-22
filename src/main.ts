/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-03 08:59:21
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-11 00:04:53
 * @FilePath: /Electron/src/main.ts
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import store from "./store/index.js";
import request from './service/request.js';

const app  = createApp(App);

app.config.globalProperties.request = request;
app.use(router).use(store).mount('#app')
