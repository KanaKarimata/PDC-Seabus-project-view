<template>
  <RecycleScroller
      :items="expandedDetails"
      :item-size="50"
      key-field="key_id"
      v-slot="{ item, index }"
    >
      <div :key="item.key_id">
        <div class="field">
          <label>No.{{ index + 1 }} [時間]</label>
          <div class="control column is-4">
            <DatetimePicker
              :id="`time-picker-${index}`"
              v-model="item.departure_time"
              format="hh:mm"
              formatted="hh:mm"
              label="Select time"
              color="#48c78e"
              only-time
              @change="emitUpdateDetails"
            />
          </div>
        </div>

        <div class="field">
          <label>No.{{ index + 1 }} [運行状況]</label>
          <div v-for="(group, i) in chunkedOperationStatus" :key="i"  class="columns">
            <div v-for="status in group" :key="status.id" class="column">
              <label class="radio">
                <input
                  type="radio"
                  :name="`operationStatus_${index}_${status.id}`"
                  v-model="item.operation_status_id"
                  :value="status.id"
                  @change="emitUpdateDetails"/>
                  {{ status.operations_status_type }}
              </label>
            </div>
          </div>
        </div>

        <div class="field">
          <label>No.{{ index + 1 }} [詳細]</label>
          <div v-for="(group, i) in chunkedOperationStatusDetail" :key="i" class="columns">
            <div v-for="detail in group" :key="detail.id" class="column">
              <label class="radio">
                <input
                  type="radio"
                  :name="`operationStatusDetail_${index}_${detail.id}`"
                  v-model="item.operation_status_detail_id"
                  :value="detail.id"
                  @change="emitUpdateDetails"/>
                  {{ detail.operation_status_detail }}
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
import DatetimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

export default {
  components: {
    RecycleScroller,
    DatetimePicker
  },
  props: {
    details: {
      type: Array,
      required: true
    },
    operation_status: {
      type: Array,
      required: true
    },
    operation_status_detail: {
      type: Array,
      required: true
    }
  },
  computed: {
    expandedDetails() {
      const emptyDetails = Array.from({ length: 20 - this.details.length }, (v, k) => ({
        key_id: this.details.length + k + 1,
        id: null,
        departure_time: null,
        operation_status_id: 0,
        operation_status_detail_id: 0,
        detail_comment: null,
        memo: null
      }));
      return [...this.details, ...emptyDetails];
    },
    chunkedOperationStatus() {
      return this.chunkArray(this.operation_status, 4);
    },
    chunkedOperationStatusDetail() {
      return this.chunkArray(this.operation_status_detail, 4);
    }
  },
  methods: {
    getTimeSelected(index, selectedTime) {
      this.details[index].departure_time = selectedTime
      this.emitUpdateDetails()
    },
    emitUpdateDetails() {
      this.$emit('updateDetails', this.expandedDetails)
    },
    chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
      }
      console.log(chunkedArray)
      return chunkedArray;
    }
  }
}
</script>

<style>
/* 必要に応じてスタイルを追加 */
</style>