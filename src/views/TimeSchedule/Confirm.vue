<template>
  <link rel="stylesheet" href="/css/timeSchedule.css" type="text/css">
  <div class="columns">
    <div class="column">
      <div>
        <h1 class="title">{{ this.title }}</h1>
        <button class="button">複製</button>
        <button class="button">編集</button>
      </div>

      <div class="card">
        <div class="card-content">
          <div class="table detail-index-table">
            <tr>
              <td>運航ルール名</td>
              <td>{{ this.time_schedule_name }}</td>
            </tr>
          </div>
          <div class="table" v-for="(item, index) in this.timeScheduleDetailList" :key="item.id">
            <tr>
              <td>終日運休ボタンチェック</td>
              <td>チェックを入れるとサイネージが終日運休画面に変わります</td>
            </tr>
            <tr>
              <td>No.{{ index + 1 }} [時間]</td>
              <td>{{ formatDate(item.departure_time) }}</td>
            </tr>
            <tr>
              <td>No.{{ index + 1 }} [運航状況]</td>
              <td>{{ item.operation_status_id }}</td>
            </tr>
            <tr>
              <td>No.{{ index + 1 }} [詳細]</td>
              <td>{{ item.operation_status_detail_id }}</td>
            </tr>
            <tr>
              <td>No.{{ index + 1 }} [詳細コメント]</td>
              <td>{{ item.detail_comment }}</td>
            </tr>
            <tr>
              <td>No.{{ index + 1 }} [備考]</td>
              <td>{{ item.memo }}</td>
            </tr>

            <!-- <div>
              <div>No.{{ index + 1 }} [運航状況]</div>
              <div>No.{{ index + 1 }} [詳細]</div>
              <div>No.{{ index + 1 }} [詳細コメント]</div>
              <div>No.{{ index + 1 }} [備考]</div>
            </div>
            <div>
              <div>チェックを入れるとサイネージが終日運休画面に変わります</div>
              <div>{{ item.departure_time }}</div>
              <div>{{ setViewData(item.operation_status_id) }}</div>
              <div>{{ setViewData(item.operation_status_detail_id) }}</div>
              <div>{{ setViewData(item.detail_comment) }}</div>
              <div>{{ setViewData(item.memo) }}</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../../../src/axios'
import moment from 'moment';

export default {
  name: 'Confirm',
  data() {
    return{
      time_schedule_name: '',
      timeScheduleDetailList: [],
    }
  },
  created() {
    this.getTimeScheduleDetailList()
  },
  methods: {
    async getTimeScheduleDetailList() {
      try {
        const response = await axiosInstance.get('http://localhost:8000/operation-rule/time-schedule-detail/index/', {
          params: {
            time_schedule_id: this.$route.params.id
          }})
        console.log('APIレスポンス:', response.data)
        this.timeScheduleDetailList = response.data.scheduleDetails
        this.time_schedule_name = response.data.time_schedule_name
      } catch (error) {
        console.error('APIエラー:', error.response ? error.response.data : error.message)
      }
    },
    setViewData(data) {
      return data ? data : ''
    },
    formatDate(date) {
      return moment(date).format('HH:mm');
    }
  }
}
</script>