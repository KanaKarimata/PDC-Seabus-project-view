<template>
  <RecycleScroller
      :items="details"
      :item-size="50"
      key-field="id"
      v-slot="{ item, index }"
    >
      <div :key="item.id">
        <div class="field">
          <label>No.{{ index + 1 }} [時間]</label>
          <div class="control column is-3">
            <TimePicker v-model="item.departure_time" @timeSelected="getTimeSelected(index, $event)"/>
          </div>
        </div>

        <div class="field">
          <label>No.{{ index + 1 }} [運行状況]</label>
          <div class="columns">
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatus_${index}`" v-model="item.operation_status_id" value="1" @change="emitUpdateDetails"/>
                  通常運航
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatus_${index}`" v-model="item.operation_status_id" value="2" @change="emitUpdateDetails"/>
                  運航見合わせ
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatus_${index}`" v-model="item.operation_status_id" value="3" @change="emitUpdateDetails"/>
                  欠航
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatus_${index}`" v-model="item.operation_status_id" value="4" @change="emitUpdateDetails"/>
                  運休
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatus_${index}`" v-model="item.operation_status_id" value="5" @change="emitUpdateDetails"/>
                  満席
              </label>
            </div>
          </div>
        </div>

        <div class="field">
          <label>No.{{ index + 1 }} [詳細]</label>
          <div class="columns">
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="1" @change="emitUpdateDetails"/>
                  河川増水
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="2" @change="emitUpdateDetails"/>
                  潮位
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="3" @change="emitUpdateDetails"/>
                  荒天
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="4" @change="emitUpdateDetails"/>
                  強風
              </label>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="5" @change="emitUpdateDetails"/>
                  台風
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="6" @change="emitUpdateDetails"/>
                  濃霧
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="7" @change="emitUpdateDetails"/>
                  雪
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="8" @change="emitUpdateDetails"/>
                  大型客船入港
              </label>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="9" @change="emitUpdateDetails"/>
                  整備点検
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="10" @change="emitUpdateDetails"/>
                  定員満了
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="11" @change="emitUpdateDetails"/>
                  団体貸切
              </label>
            </div>
            <div class="column">
              <label class="radio">
                <input type="radio" :name="`operationStatusDetail_${index}`" v-model="item.operation_status_detail_id" value="12" @change="emitUpdateDetails"/>
                  表示しない
              </label>
            </div>
          </div>
        </div>

        <div class="field">
          <label>No.{{ index + 1 }} [詳細コメント]</label>
          <span>※[詳細]が「表示しない」選択時、入力があれば表示する（推奨文字数20文字）</span>
          <div class="control">
            <input type="text" class="input" v-model="item.detail_comment" @change="emitUpdateDetails">
          </div>
        </div>

        <div class="field">
          <label>No.{{ index + 1 }} [備考]</label>
          <div class="control">
            <input type="text" class="input" v-model="item.memo" @change="emitUpdateDetails">
          </div>
        </div>

      </div>
      <hr>
  </RecycleScroller>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import TimePicker from './TimePicker.vue'

export default {
  components: {
    RecycleScroller,
    TimePicker
  },
  data() {
    return {
      details: Array.from({ length: 20 }, (v, k) => ({
        id: k + 1,
        departure_time: null,
        operation_status_id: null,
        operation_status_detail_id: null,
        detail_comment: null,
        memo: null
      }))
    }
  },
  methods: {
    getTimeSelected(index, selectedTime) {
      this.details[index].departure_time = selectedTime
      this.emitUpdateDetails()
    },
    emitUpdateDetails() {
      this.$emit('updateDetails', this.details)
    }
  }
}
</script>

<style>
/* 必要に応じてスタイルを追加 */
</style>