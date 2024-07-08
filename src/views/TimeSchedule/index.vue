<template>
  <link rel="stylesheet" href="/css/timeSchedule.css" type="text/css">
  <div class="columns">
    <div class="column is-full">
      <h1 class="title">{{ this.title }}</h1>
      <div>
        <button class="button is-success">
          <router-link :to="{
            name: 'CreateForm'
            , params: {id: this.$route.params.id}
          }"
          class="font-white">新規作成</router-link>
        </button>
      </div>
      <!-- table header -->
      <div class="columns has-text-white-bis index-table">
        <div class="column is-1"><input type="checkbox" /></div>
        <div class="column is-1">ステータス</div>
        <div class="column is-4">運航ルール名</div>
        <div class="column is-2">公開開始</div>
        <div class="column is-2">公開終了</div>
        <div class="column is-1">更新者</div>
        <div class="column is-1">アクション</div>
      </div>
      <!-- table data -->
      <div class="columns index-table-data" v-for="item in this.timeScheduleList" :key="item.id">
        <div class="column is-1"><input type="checkbox" /></div>
        <div class="column is-1">{{ item.publish_status_id }}</div>
        <div class="column is-4">
          <router-link :to="{name: 'Confirm', params: {id: item.id}}">{{ item.time_schedule_name }}</router-link>
        </div>
        <div class="column is-2">{{ formatDate(item.publish_start_date) }}</div>
        <div class="column is-2">{{ formatDate(item.publish_end_date) }}</div>
        <div class="column is-1">{{ item.update_user.username }}</div>
        <div class="column is-1">アクション</div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../../../src/axios'
import moment from 'moment';

export default {
  name: 'TimeScheduleIndex',
  data() {
    return {
      title: '',
      timeScheduleList: []
    }
  },
  created() {
    this.getTimeScheduleList()
  },
  methods: {
    async getTimeScheduleList() {
      try {
        const response = await axiosInstance.get('http://localhost:8000/operation-rule/time-schedule/index/', {
          params: {
            operation_rule_id: this.$route.params.id
          }})
        console.log('APIレスポンス:', response.data)
        this.timeScheduleList = response.data.schedules
        this.title = response.data.operation_rule_name
      } catch (error) {
        console.error('APIエラー:', error.response ? error.response.data : error.message)
      }
    },
    formatDate(date) {
      return moment(date).format('YYYY/MM/DD HH:mm');
    }
  }
}
</script>