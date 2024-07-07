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
  
                <ScheduleDetailForm @updateDetails="handleUpdateDetails"/>
              </div>

              <div class="field">
                <label>公開日時</label>
                  <div class="control column is-8">
                    <DateTimeRangePicker v-model="publish_start_date"/>
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
  import axios from 'axios'
  import { mapGetters } from 'vuex';
  import TimePicker from '../components/TimePicker.vue';
  import DateTimeRangePicker from '../components/DateTimeRangePicker.vue';
  import ScheduleDetailForm from '../components/ScheduleDetailForm.vue'

  export default {
    name: 'CreateForm',
    components: {
      TimePicker,
      DateTimeRangePicker,
      ScheduleDetailForm
    },
    data() {
      return {
        time_schedule_name: '',
        out_of_service_flg: false,
        scheduleDetails: Array(20).fill().map(() => ({
          time_schedule_name: '',
          departure_time: '',
          operation_status_id: '',
          operation_status_detail_id: '',
          detail_comment: '',
          memo: ''
        })),
        publish_status_id: '',
        publish_start_date: '',
        publish_end_date: ''
      }
    },
    methods: {
      handleUpdateDetails(details) {
        this.scheduleDetails = details;
        console.log('handleUpdateDetails')
        console.log(details)
      },
      async registerOnly() {
        console.log('++++++++registerOnly++++++')
        console.log(this.time_schedule_name)
        console.log(this.scheduleDetails)

        try {
          const response = await axios.post('/time-schedule-create', {
            time_schedule_name: this.time_schedule_name,
            out_of_service_flg: this.out_of_service_flg,
            scheduleDetails: this.scheduleDetails,
            publish_status_id: 0,
            publish_start_date: this.publish_start_date,
            publish_end_date: this.publish_end_date
          })
          console.log('APIレスポンス:', response.data)
        } catch (error) {
          console.error('APIエラー:', error)
        }
      },
    }
  }
</script>