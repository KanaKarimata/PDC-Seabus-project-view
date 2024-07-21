<template>
  <link rel="stylesheet" href="/css/confirm.css" type="text/css">
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1 class="title">{{ this.getOperationRuleName }}</h1>
      <div class="button-area">
        <div class="back-button-area">
          <router-link
          :to="{
            name: 'TimeScheduleIndex',
            params: {operation_rule_id: this.$route.params.operation_rule_id}}"
          class="button back-button"
          ><i class="fa-solid fa-backward"></i>&ensp;一覧へ戻る</router-link>
        </div>

        <div class="edit-copy-button-area">
          <router-link
            :to="{
              name: 'UpdateForm',
              params: {
                operation_rule_id: this.$route.params.operation_rule_id,
                time_schedule_id: this.$route.params.time_schedule_id,
                type: 'copy'
              }}"
            class="button copy-button"
          ><i class="fa-solid fa-clone"></i>&ensp;複製</router-link>

          <router-link
            :to="{
              name: 'UpdateForm',
              params: {
                operation_rule_id: this.$route.params.operation_rule_id,
                time_schedule_id: this.$route.params.time_schedule_id,
                type: 'update'
              }}"
            class="button edit-button"
          ><i class="fa-solid fa-feather"></i>&ensp;編集</router-link>
        </div>
      </div>

      <div class="card main-contents" v-if="this.time_schedule.publish_status_id === 1">
        <div class="card-content">
          <div>サイネージ時刻表URL</div>
          <div style="display: flex;">
            <input class="input" type="text" :value="this.url">
            <button class="button" @click="this.copyUrlValue()">Copy!</button>
          </div>
        </div>
      </div>

      <div class="card main-contents">
        <div class="card-content">
          <table class="table detail-index-table">
            <tbody class="table">
              <tr>
                <th>運航ルール名</th>
                <td>{{ this.time_schedule.time_schedule_name }}</td>
              </tr>
              <tr>
                <th>終日運休ボタンチェック</th>
                <td>チェックを入れるとサイネージが終日運休画面に変わります</td>
              </tr>
              <tr>
                <th>土日運航ボタンチェック</th>
                <td>チェックを入れると土日のみ表示されます</td>
              </tr>
              <tr>
                <th></th>
                <td></td>
              </tr>
            </tbody>
          </table>

          <table class="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>時間</th>
                <th>運航状況</th>
                <th>詳細</th>
                <th>詳細コメント</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in this.timeScheduleDetailList" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ formatDate(item.departure_time) }}</td>
                <td>{{ item.operation_status_info ? item.operation_status_info.operations_status_type : '' }}</td>
                <td>{{ item.operation_status_detail_info ? item.operation_status_detail_info.operation_status_detail : '' }}</td>
                <td>{{ item.detail_comment }}</td>
                <td>{{ item.memo }}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../../../src/axios'
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'bulma-toast'

export default {
  name: 'Confirm',
  data() {
    return{
      time_schedule: [],
      timeScheduleDetailList: [],
      url: ''
    }
  },
  created() {
    this.getTimeScheduleDetailList()
    this.getOperationRuleInfo(this.$route.params.operation_rule_id)
    this.url = 'http://localhost:8080/operation-rule/signage/' + this.$route.params.operation_rule_id + '/time-schedule/' + this.$route.params.time_schedule_id
  },
  mounted() {
    document.title = '時刻表-登録内容確認 | シーバス'
  },
  computed: {
    ...mapGetters(['getOperationRuleName'])
  },
  methods: {
    ...mapActions(['getOperationRuleInfo']),
    async getTimeScheduleDetailList() {
      try {
        const response = await axiosInstance.get('http://localhost:8000/operation-rule/time-schedule-detail/index/', {
          params: {
            time_schedule_id: this.$route.params.time_schedule_id
          }})
        console.log('APIレスポンス:', response.data)
        this.timeScheduleDetailList = response.data.scheduleDetails
        this.time_schedule = response.data.time_schedule
      } catch (error) {
        console.error('APIエラー:', error.response ? error.response.data : error.message)
      }
    },
    setViewData(data) {
      return data ? data : ''
    },
    formatDate(time) {
      return moment(time, 'HH:mm:ss').format('HH:mm');
    },
    copyUrlValue() {
      navigator.clipboard.writeText(this.url)

      toast({
            message: 'コピーしました！',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          });
    }
  }
}
</script>