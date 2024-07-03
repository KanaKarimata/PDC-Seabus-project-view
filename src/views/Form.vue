<template>
  <div class="page-form">
    <div class="columns">
      <div class="column is-8 is-offset-2">

        <form @submit.prevent="submitForm" style="font-size: 14px;">
          <div class="card">
            <div class="card-content">
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

              <div v-for="n in 20">
                <div style="margin: 60px 0 60px 0;">
                  <div class="field">
                    <label>No.{{ n }} [時間]</label>
                    <div class="control">
                      <TimePicker />
                      <input type="text" class="input" v-model="departure_time">
                    </div>
                  </div>
      
                  <div class="field">
                    <label>No.{{ n }} [運行状況]</label>
                    <div class="columns">
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            通常運航
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            運航見合わせ
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            欠航
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            運休
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            満席
                        </label>
                      </div>
        
                    </div>
                  </div>
      
                  <div class="field">
                    <label>No.{{ n }} [詳細]</label>
                    <div class="columns">
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            河川増水
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            潮位
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            荒天
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            強風
                        </label>
                      </div>
                    </div>
      
                    <div class="columns">
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            台風
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            濃霧
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            雪
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            大型客船入港
                        </label>
                      </div>
                    </div>
      
                    <div class="columns">
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            整備点検
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            定員満了
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            団体貸切
                        </label>
                      </div>
                      <div class="column">
                        <label class="radio">
                          <input type="radio" name="operationStatus"/>
                            表示しない
                        </label>
                      </div>
                    </div>
                  </div>
      
                  <div class="field">
                    <label>No.{{ n }}[詳細コメント]</label>
                    <span>※[詳細]が「表示しない」選択時、入力があれば表示する（推奨文字数20文字）</span>
                    <div class="control">
                      <input type="text" class="input" v-model="detail_comment">
                    </div>
                  </div>
      
                  <div class="field">
                    <label>No.{{ n }}[備考]</label>
                    <div class="control">
                      <input type="text" class="input" v-model="memo">
                    </div>
                  </div>
                </div>

                <hr>
                
              </div>
            </div>
          </div>

          <div class="field">
            <label>公開日時</label>
              <div class="control">
                <DateTimeRangePicker />
                <input type="text" class="input" v-model="time_schedule_name">
              </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button">下書き</button>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button">公開</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import TimePicker from '../components/TimePicker.vue';
  import DateTimeRangePicker from '../components/DateTimeRangePicker.vue';

  export default {
    name: 'From',
    components: {
      TimePicker,
      DateTimeRangePicker
    },
    data() {
      return {
        time_schedule_name: '',
        out_of_service_flg: false,
        scheduleDetails: [
          {
            time_schedule_name: '',
            departure_time: '',
            operation_status_id: '',
            operation_status_detail_id: '',
            detail_comment: '',
            memo:''
          }
        ],
        publish_status_id,
        publish_start_date,
        publish_end_date
      }
    },
  }
</script>