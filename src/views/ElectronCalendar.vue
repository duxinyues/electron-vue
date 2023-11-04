<!--
 * @Author: wei26445 weiyy26445@yunrong.cn
 * @Date: 2023-11-02 00:02:40
 * @LastEditors: wei26445 weiyy26445@yunrong.cn
 * @LastEditTime: 2023-11-02 20:02:26
 * @FilePath: /electron-vue/src/views/ElectronCalendar.vue
 * @Description:
 * Copyright (c) 2023 by ${wei26445} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
-->
<template>
  <a-alert :message="`今日: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`" />
  <a-calendar  v-model:value="tagetDate" @select="onSelect" @panelChange="onPanelChange" >
    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="item in getListData(current)" :key="item.content">
          <a-badge :status="item.type" :text="item.content" />
        </li>
      </ul>
    </template>
  </a-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"

dayjs.extend(weekday)
dayjs.extend(localeData)

const date = ref(dayjs('2017-01-25'));
const selectedValue = ref(dayjs('2017-01-25'));
const  tagetDate = ref<Dayjs>();
const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 2:
      listData = [
        { type: 'warning', content: '' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const onSelect = (value: Dayjs) => {
  date.value = value;
  selectedValue.value = value;
};
const onPanelChange = (value: Dayjs) => {
  console.log("切换", value)
  date.value = value;
};
</script>

