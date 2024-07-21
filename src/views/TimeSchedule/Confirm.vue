<template>
  <link rel="stylesheet" href="/css/confirm.css" type="text/css">
  <div class="columns">
    <div class="column">
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

      <div class="card main-contents">
        <div class="card-content">
          <div class="table detail-index-table">
            <tr>
              <td>運航ルール名</td>
              <td>{{ this.time_schedule_name }}</td>
            </tr>
            <tr>
              <td>終日運休ボタンチェック</td>
              <td>チェックを入れるとサイネージが終日運休画面に変わります</td>
            </tr>
          </div>
          <div class="table" v-for="(item, index) in this.timeScheduleDetailList" :key="item.id">
            <tr>
              <td>No.{{ index + 1 }} [時間]</td>
              <td>{{ formatDate(item.departure_time) }}</td>
            </tr>
            <tr>
              <td>No.{{ index + 1 }} [運航状況]</td>
              <td>{{ item.operation_status_info ? item.operation_status_info.operations_status_type : '' }}</td>
            </tr>
            <tr>
              <td>No.{{ index + 1 }} [詳細]</td>
              <td>{{ item.operation_status_detail_info ? item.operation_status_detail_info.operation_status_detail : '' }}</td>
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
import { mapGetters, mapActions } from 'vuex';

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
    this.getOperationRuleInfo(this.$route.params.operation_rule_id)
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
        this.time_schedule_name = response.data.time_schedule.time_schedule_name
      } catch (error) {
        console.error('APIエラー:', error.response ? error.response.data : error.message)
      }
    },
    setViewData(data) {
      return data ? data : ''
    },
    formatDate(time) {
      return moment(time, 'HH:mm:ss').format('HH:mm');
    }
  }
}
</script>