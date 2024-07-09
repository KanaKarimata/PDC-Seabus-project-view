<template>
  <div class="page-form">
    <div class="columns">
      <div class="column is-8 is-offset-2">

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
  
                <ScheduleDetailForm :details="time_schedule_detail" @updateDetails="handleUpdateDetails"/>
              </div>

              <div class="field">
                <label>公開日時</label>
                  <div class="control column is-8">
                    <DateTimeRangePicker v-model="publish_start_date" @dateTimeRangeSelected="getDateTimeRangeSelected"/>
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
  import TimePicker from '../../components/TimePicker.vue';
  import DateTimeRangePicker from '../../components/DateTimeRangePicker.vue';
  import ScheduleDetailForm from '../../components/ScheduleDetailForm.vue'

  export default {
    name: 'Form',
    components: {
      TimePicker,
      DateTimeRangePicker,
      ScheduleDetailForm
    },
    data() {
      return {
        operation_rule: null,
        time_schedule_name: null,
        out_of_service_flg: false,
        time_schedule_detail: Array.from({ length: 20 }, (v, k) => ({
          id: k + 1,
          departure_time: null,
          operation_status_id: null,
          operation_status_detail_id: null,
          detail_comment: null,
          memo: null
        })),
        publish_status_id: 0,
        publish_start_date: null,
        publish_end_date: null
      }
    },
    created() {
      this.operation_rule = this.$route.params.id
      console.log(this.$route.params.type)
      if (this.$route.params.type) {
        if (this.$route.params.type === 'update') {
          this.getTimeScheduleData()
        } else {

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
      async getTimeScheduleData() {
        try {
          const response = await axiosInstance.get('http://localhost:8000/operation-rule/time-schedule-detail/index/', {
            params: {
              time_schedule_id: this.$route.params.id
            }
          })
          console.log('APIレスポンス:', response.data.scheduleDetails)
          console.log('レスポンス:', response.data.time_schedule)

          const time_schedule = response.data.time_schedule

          this.time_schedule_name = time_schedule.time_schedule_name
          this.out_of_service_flg = time_schedule.out_of_service_flg
          this.publish_start_date = time_schedule.publish_start_date
          this.publish_end_date = time_schedule.publish_end_date
          this.time_schedule_detail = response.data.scheduleDetails

        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      },
      async registerOnly() {
        const timeScheduleRequestData = this.time_schedule_detail.filter(item =>
          item.departure_time !== null ||
          item.operation_status_id !== null ||
          item.operation_status_detail_id !== null ||
          item.detail_comment !== null ||
          item.memo !== null
        )

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
    }
  }
</script>