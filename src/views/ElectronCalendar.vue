<template>
  <a-alert :message="`今日: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`"/>
  <a-calendar v-model:value="tagetDate" @select="onSelect" @panelChange="onPanelChange">
    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="item in getListData(current)" :key="item.content">
          <a-badge :status="item.type" :text="item.content"/>
        </li>
      </ul>
    </template>
  </a-calendar>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

import 'dayjs/locale/zh-cn';
import dayjs, {Dayjs} from 'dayjs';
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"

dayjs.extend(weekday)
dayjs.extend(localeData)

const date = ref(dayjs('2017-01-25'));
const selectedValue = ref(dayjs(Date.now()));
const tagetDate = ref<Dayjs>();
const getListData = (value: Dayjs) => {
  let listData;
  console.log("日期",value.date())
  switch (value.date()) {
    case 2:
      listData = [
        {type: 'warning', content: ''},
        {type: 'success', content: 'This is usual event.'},
      ];
      break;
    case 10:
      listData = [
        {type: 'warning', content: 'This is warning 4545645.'},
        {type: 'success', content: 'This is usual event.'},
        {type: 'error', content: 'This is error event.'},
      ];
      break;
    case 15:
      listData = [
        {type: 'warning', content: 'This is warning event'},
        {type: 'success', content: 'This is very long usual event。。....'},
        {type: 'error', content: 'This is error event 1.'},
        {type: 'error', content: 'This is error event 2.'},
        {type: 'error', content: 'This is error event 3.'},
        {type: 'error', content: 'This is error event 4.'},
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
  date.value = value;
};

</script>

