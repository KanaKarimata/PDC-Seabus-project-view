<template>
  <link rel="stylesheet" href="/css/form.css" type="text/css">
  <div class="page-form">
    <div class="columns">
      <div class="column is-8 is-offset-2">

        <h1 class="title">
          {{ this.getOperationRuleName }}
          <span v-if="this.updateFlg">[編集]</span>
          <span v-else-if="this.copyFlg">[複製]</span>
          <span v-else>[新規]</span>
        </h1>

        <div class="back-button-area">
          <router-link
            v-if="!this.updateFlg && !this.copyFlg"
            :to="{
            name: 'TimeScheduleIndex',
            params: {operation_rule_id: this.operation_rule_id}}"
            class="button back-button pushright"
          ><span><i class="fa-solid fa-backward"></i>&ensp;一覧へ戻る</span></router-link>

          <router-link
              v-else
            :to="{
              name: 'Confirm',
              params: {
                operation_rule_id: this.operation_rule_id,
                time_schedule_id: this.time_schedule_id}}"
            class="button back-button"
          ><i class="fa-solid fa-backward"></i>&ensp;確認画面へ戻る</router-link>
        </div>

        <form class="create-update-form-area" @submit.prevent="submitForm" style="font-size: 14px;">
          <div class="card" style="height: 12300px;">
            <div class="card-content" style="height: 12300px;">
              <div style="height: 11900px;">
                <div class="field">
                  <label>運行ルール名<span class="alert">&ensp;※必須</span></label>
                  <div class="control">
                    <input type="text" class="input" v-model="time_schedule_name">
                  </div>
                </div>

                <div class="field">
                  <label>行き先<span class="alert">&ensp;※必須</span></label>
                  <div class="control">
                    <div class="select is-rounded">
                      <select v-model="destination_id">
                        <option v-for="destination in this.destination" :value="destination.id">{{ destination.destination_name }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="field">
                  <label>終日運休ボタン</label>
                  <div class="checkbox non-operate-allday">
                    <div class="block">
                      <span>終日運休</span>
                      <input data-index="0" id="cheap" type="checkbox" v-model="out_of_service_flg" />
                      <label for="cheap"></label>
                    </div>
                  </div>
                </div>

                <div class="hr"></div>

                <ScheduleDetailForm
                  :details="time_schedule_detail"
                  :operation_status="operation_status"
                  :operation_status_detail="operation_status_detail"
                  @updateDetails="handleUpdateDetails"/>
              </div>
              <hr>
              <div class="field">
                <label>土日運航ボタン</label>
                <div class="checkbox non-operate-allday">
                  <div class="block">
                    <span>土日運航</span>
                    <input data-index="1" id="cheap2" type="checkbox" v-model="publish_holiday_flg" />
                    <label for="cheap2"></label>
                  </div>
                </div>
                <!-- <div class="box column is-3">
                  <label class="checkbox">
                    <input type="checkbox" v-model="publish_holiday_flg">
                      土日運航
                  </label>
                </div> -->
              </div>

              <div class="hr"></div>

              <div class="field">
                <label>公開日時<span class="alert">&ensp;※必須</span></label>
                  <div style="display: flex; justify-content: center;" class="control column is-10">
                    <DatetimePicker
                      v-model="publish_start_date"
                      format="YYYY-MM-DD HH:mm"
                      :minute-interval="1"
                      :only-time="false"
                      label="Select date & time"
                      color="#48c78e"
                      :key="start_date_time"
                    />
                    <div style="margin: 0 16px; padding-top: 8px;">〜</div>
                    <DatetimePicker
                      v-model="publish_end_date"
                      format="YYYY-MM-DD HH:mm"
                      :minute-interval="1"
                      :only-time="false"
                      label="Select date & time"
                      color="#48c78e"
                      :key="end_date_time"
                    />
                  </div>
              </div>

              <div class="register-buttons">
                <div class="field">
                  <div class="control">
                    <button class="button is-rounded non-publish-button" @click="registerOnly">下書き</button>
                  </div>
                </div>
  
                <div class="field">
                  <div class="control">
                    <button class="button is-rounded publish-button" @click="registerAndPublish">公開</button>
                  </div>
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
  import { mapGetters, mapActions } from 'vuex';
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
        publish_holiday_flg: false,
        destination_id: 0,
        time_schedule_detail: Array.from({ length: 20 }, (v, k) => ({
          key_id: k + 1,
          id: null,
          departure_time: null,
          operation_status_id: 0,
          operation_status_detail_id: 0,
          detail_comment: null,
          memo: null,
          requiredFlg: false
        })),
        publish_status_id: 0,
        publish_start_date: null,
        publish_end_date: null,
        operation_status: [],
        operation_status_detail: [],
        destination: [],
        title: null,
        updateFlg: false,
        copyFlg: false,
        time_schedule_id: 0,
        publish_status_id: 0
      }
    },
    created() {
      this.operation_rule = this.$route.params.operation_rule_id
      if (this.$route.params.type) {
        if (this.$route.params.type === 'update') {
          this.time_schedule_id = this.$route.params.time_schedule_id
          // 編集
          this.updateFlg = true
          this.getTimeScheduleData()
        } else if (this.$route.params.type === 'copy') {
          this.time_schedule_id = this.$route.params.time_schedule_id
          // 複製
          this.copyFlg = true
          this.getTimeScheduleData()
        } else {
          this.getMasterData()
        }
      }
    },
    mounted() {
      document.title = '時刻表-作成 | シーバス'
      if (this.$route.params.type) {
        if (this.$route.params.type === 'update') {
          document.title = '時刻表-編集 | シーバス'
        } else if (this.$route.params.type === 'copy') {
          document.title = '時刻表-複製 | シーバス'
        } else {
          document.title = '時刻表-作成 | シーバス'
        }
      }
    },
    computed: {
      ...mapGetters(['getOperationRuleName'])
    },
    methods: {
      ...mapActions(['getOperationRuleInfo']),
      handleUpdateDetails(details) {
        this.time_schedule_detail = details;
      },
      getDateTimeRangeSelected(dateTimeRange) {
        this.publish_start_date = dateTimeRange.selectedStartDateTime
        this.publish_end_date = dateTimeRange.selectedEndDateTime
      },
      async getMasterData() {
        try {
          const response = await axiosInstance.get(process.env.VUE_APP_API_URL + '/operation-rule/time-schedule/master/')
          this.operation_status = response.data.operation_status
          this.operation_status_detail = response.data.operation_status_detail
          this.destination = response.data.destination
          this.getOperationRuleInfo(this.operation_rule)
        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      },
      async getTimeScheduleData() {
        try {
          const response = await axiosInstance.get(process.env.VUE_APP_API_URL + '/operation-rule/time-schedule-detail/index/', {
            params: {
              time_schedule_id: this.time_schedule_id
            }
          })
          const time_schedule = response.data.time_schedule
          this.time_schedule_name = time_schedule.time_schedule_name
          this.destination_id = time_schedule.destination
          this.out_of_service_flg = time_schedule.out_of_service_flg
          this.publish_holiday_flg = time_schedule.publish_holiday_flg
          this.publish_start_date = time_schedule.publish_start_date
          this.publish_end_date = time_schedule.publish_end_date
          this.operation_status = response.data.operation_status
          this.operation_status_detail = response.data.operation_status_detail
          this.destination = response.data.destination
          this.title = response.data.operation_rule_name
          const formattedData = response.data.scheduleDetails.map((item, index) => ({
            key_id: index + 1,
            id: item.id,
            departure_time: item.departure_time,
            operation_status_id: item.operation_status_id,
            operation_status_detail_id: item.operation_status_detail_id,
            detail_comment: item.detail_comment,
            memo: item.memo,
            requiredFlg: false
          }));
          this.time_schedule_detail = formattedData

          this.getOperationRuleInfo(this.operation_rule)

        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      },
      registerAndPublish() {
        this.publish_status_id = 1
        this.executeAction()
      },
      registerOnly() {
        this.publish_status_id = 0
        this.executeAction()
      },
      executeAction() {
        if (!this.time_schedule_name) {
          alert('運航ルール名は必須です')
          return
        }
        if (this.destination_id === 0) {
          alert('行き先は必須です')
          return
        }
        if(!this.publish_start_date || !this.publish_end_date) {
          alert('公開日時は必須です')
          return
        }

        let timeScheduleRequestData = this.time_schedule_detail.filter(item =>
          item.departure_time !== null ||
          item.operation_status_id !== 0 ||
          item.operation_status_detail_id !== 0 ||
          item.detail_comment !== null ||
          item.memo !== null
        )

        timeScheduleRequestData.forEach(item => {
          delete item.key_id
          delete item.requiredFlg
        })

        if (this.updateFlg) {
          this.update(timeScheduleRequestData)
        } else {
          this.create(timeScheduleRequestData)
        }
      },
      async create(timeScheduleRequestData) {
        let formData = timeScheduleRequestData.map(item => ({
          ...item,
          id: item.id !== null ? null : item.id
        }))

        try {
          const response = await axiosInstance.post(process.env.VUE_APP_API_URL + '/operation-rule/time-schedule-create/', {
            operation_rule: this.operation_rule,
            time_schedule_name: this.time_schedule_name,
            destination: this.destination_id,
            out_of_service_flg: this.out_of_service_flg,
            publish_holiday_flg: this.publish_holiday_flg,
            time_schedule_detail: formData,
            publish_status_id: this.publish_status_id,
            publish_start_date: this.publish_start_date,
            publish_end_date: this.publish_end_date
          })

          if (response.status === 201) {
            let timeScheduleId = response.data.id;
            this.$router.push({
              name: 'Confirm',
              params: {
                operation_rule_id: this.operation_rule,
                time_schedule_id: timeScheduleId
              }
            });
          }
        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      },
      async update(timeScheduleRequestData) {
        try {
          const timeScheduleId = this.time_schedule_id;
          const response = await axiosInstance.put(process.env.VUE_APP_API_URL + `/operation-rule/time-schedule-update/${timeScheduleId}/`, {
            operation_rule: this.operation_rule,
            time_schedule_name: this.time_schedule_name,
            destination: this.destination_id,
            out_of_service_flg: this.out_of_service_flg,
            publish_holiday_flg: this.publish_holiday_flg,
            time_schedule_detail: timeScheduleRequestData,
            publish_status_id: this.publish_status_id,
            publish_start_date: this.publish_start_date,
            publish_end_date: this.publish_end_date
          })

          if (response.status === 200) {
            this.$router.push({
              name: 'Confirm',
              params: {
                operation_rule_id: this.operation_rule,
                time_schedule_id: this.time_schedule_id
              }
            });
          }
        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      }
    }
  }
</script>