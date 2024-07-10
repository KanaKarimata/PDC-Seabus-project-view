<template>
  <div class="page-form">
    <div class="columns">
      <div class="column is-8 is-offset-2">

        <h1 class="title">
          {{ this.title }}
          <span v-if="this.updateFlg">[編集]</span>
          <span v-else-if="this.copyFlg">[複製]</span>
          <span v-else>[新規]</span>
        </h1>

        <form @submit.prevent="submitForm" style="font-size: 14px;">
          <div class="card" style="height: 11000px;">
            <div class="card-content" style="height: 11000px;">
              <div style="height: 10740px;">
                <div class="field">
                  <label>運行ルール名</label>
                  <div class="control">
                    <input type="text" class="input" v-model="time_schedule_name">
                  </div>
                </div>

                <div class="field">
                  <label>終日運休ボタン</label>
                  <div class="box column is-3">
                    <label class="checkbox">
                      <input type="checkbox" v-model="out_of_service_flg">
                        終日運休
                    </label>
                  </div>
                </div>
  
                <hr>
  
                <ScheduleDetailForm
                  :details="time_schedule_detail"
                  :operation_status="operation_status"
                  :operation_status_detail="operation_status_detail"
                  @updateDetails="handleUpdateDetails"/>
              </div>

              <div class="field">
                <label>公開日時</label>
                  <div style="display: flex; justify-content: center;" class="control column is-10">
                    <DatetimePicker
                      v-model="publish_start_date"
                      format="YYYY-MM-DD HH:mm"
                      :minute-interval="1"
                      :only-time="false"
                      label="Select date & time"
                      color="#48c78e"
                    />
                    <div style="margin: 0 16px; padding-top: 8px;">〜</div>
                    <DatetimePicker
                      v-model="publish_end_date"
                      format="YYYY-MM-DD HH:mm"
                      :minute-interval="1"
                      :only-time="false"
                      label="Select date & time"
                      color="#48c78e"
                    />
                  </div>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button" @click="registerOnly">下書き</button>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button" @click="registerAndPublish">公開</button>
                </div>
              </div>
            </div>
          </div>


        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axiosInstance from '../../axios'
  import ScheduleDetailForm from '../../components/ScheduleDetailForm.vue';
  import DatetimePicker from 'vue-ctk-date-time-picker';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

  export default {
    name: 'Form',
    components: {
      ScheduleDetailForm,
      DatetimePicker
    },
    data() {
      return {
        operation_rule: null,
        time_schedule_name: null,
        out_of_service_flg: false,
        time_schedule_detail: Array.from({ length: 20 }, (v, k) => ({
          key_id: k + 1,
          id: null,
          departure_time: null,
          operation_status_id: null,
          operation_status_detail_id: null,
          detail_comment: null,
          memo: null
        })),
        publish_status_id: 0,
        publish_start_date: null,
        publish_end_date: null,
        operation_status: [],
        operation_status_detail: [],
        title: null,
        updateFlg: false,
        copyFlg: false
      }
    },
    created() {
      this.operation_rule = this.$route.params.operation_rule_id
      console.log(this.$route.params.type)
      console.log(this.operation_rule)
      if (this.$route.params.type) {
        if (this.$route.params.type === 'update') {
          // 編集
          this.updateFlg = true
          this.getTimeScheduleData()
        } else if (this.$route.params.type === 'copy') {
          // 複製
          this.copyFlg = true
          this.getTimeScheduleData()
        } else {
          this.getMasterData()
        }
      }
    },
    methods: {
      handleUpdateDetails(details) {
        this.time_schedule_detail = details;
      },
      getDateTimeRangeSelected(dateTimeRange) {
        this.publish_start_date = dateTimeRange.selectedStartDateTime
        this.publish_end_date = dateTimeRange.selectedEndDateTime
      },
      async getMasterData() {
        try {
          const response = await axiosInstance.get('http://localhost:8000/operation-rule/time-schedule/master/')
          this.operation_status = response.data.operation_status
          this.operation_status_detail = response.data.operation_status_detail
        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      },
      async getTimeScheduleData() {
        try {
          const response = await axiosInstance.get('http://localhost:8000/operation-rule/time-schedule-detail/index/', {
            params: {
              time_schedule_id: this.$route.params.time_schedule_id
            }
          })
          const time_schedule = response.data.time_schedule
          this.time_schedule_name = time_schedule.time_schedule_name
          this.out_of_service_flg = time_schedule.out_of_service_flg
          this.publish_start_date = time_schedule.publish_start_date
          this.publish_end_date = time_schedule.publish_end_date
          this.operation_status = response.data.operation_status
          this.operation_status_detail = response.data.operation_status_detail
          this.title = response.data.operation_rule_name
          const formattedData = response.data.scheduleDetails.map((item, index) => ({
            key_id: index + 1,
            id: item.id,
            departure_time: item.departure_time,
            operation_status_id: item.operation_status_id,
            operation_status_detail_id: item.operation_status_detail_id,
            detail_comment: item.detail_comment,
            memo: item.memo
          }));
          this.time_schedule_detail = formattedData

          console.log('時刻表詳細')
          console.log(this.time_schedule_detail)

        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      },
      async registerOnly() {
        let timeScheduleRequestData = this.time_schedule_detail.filter(item =>
          item.departure_time !== null ||
          item.operation_status_id !== null ||
          item.operation_status_detail_id !== null ||
          item.detail_comment !== null ||
          item.memo !== null
        )

        timeScheduleRequestData.forEach(item => {
          delete item.key_id
        })

        if (this.updateFlg) {
          this.update(timeScheduleRequestData)
        } else {
          this.create(timeScheduleRequestData)
        }
      },
      async create(timeScheduleRequestData) {
        try {
          const response = await axiosInstance.post('http://localhost:8000/operation-rule/time-schedule-create/', {
            operation_rule: this.operation_rule,
            time_schedule_name: this.time_schedule_name,
            out_of_service_flg: this.out_of_service_flg,
            time_schedule_detail: timeScheduleRequestData,
            publish_status_id: 0,
            publish_start_date: this.publish_start_date,
            publish_end_date: this.publish_end_date
          })
          console.log('APIレスポンス:', response.data)
          console.log('レスポンス:', response)
          if (response.status === 201) {
            this.$router.push('/confirm');
          }
        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      },
      async update(timeScheduleRequestData) {
        try {
          const timeScheduleId = this.$route.params.time_schedule_id;
          const response = await axiosInstance.put(`http://localhost:8000/operation-rule/time-schedule-update/${timeScheduleId}/`, {
            operation_rule: this.operation_rule,
            time_schedule_name: this.time_schedule_name,
            out_of_service_flg: this.out_of_service_flg,
            time_schedule_detail: timeScheduleRequestData,
            publish_status_id: 0,
            publish_start_date: this.publish_start_date,
            publish_end_date: this.publish_end_date
          })
          console.log('APIレスポンス:', response.data)
          console.log('レスポンス:', response)
          if (response.status === 201) {
            this.$router.push('/confirm');
          }
        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      }
    }
  }
</script>