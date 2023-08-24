/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-24 00:45:43
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-24 00:45:44
 * @FilePath: /electron-vue/src/antd/index.ts
 * @Description: 统一引入项目中需要的antd组件
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { Button, TimePicker } from "ant-design-vue";

const components = [Button, TimePicker]
// eslint-disable-next-line
export default function setupAtnd(app: any) {
  components.forEach((component) => {
    app.use(component)
  })
}
