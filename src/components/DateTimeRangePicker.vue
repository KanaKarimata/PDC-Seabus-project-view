<template>
  <div class="field">
    <div class="control">
      <input ref="dateTimeRangePicker" type="text" class="input" />
    </div>
  </div>
</template>

<script>
import bulmaCalendar from 'bulma-calendar';

export default {
  name: 'DateTimeRangePicker',
  data() {
    return {
      dateTimeRange: {
        selectedStartDateTime: '',
        selectedEndDateTime: ''
      }
    }
  },
  mounted() {
    this.initializePicker();
  },
  methods: {
    initializePicker() {
      const datePickerElement = this.$refs.dateTimeRangePicker;

      if (!datePickerElement) {
        console.error('Date range picker element not found');
        return;
      }

      const datePicker = new bulmaCalendar(datePickerElement, {
        type: 'datetime', // 日付と時間の選択を有効にする
        isRange: true,    // 範囲選択を有効にする
        displayMode: 'dialog',
        validateLabel: 'Select',
        cancelLabel: 'Cancel',
        clearLabel: 'Clear',
        todayLabel: 'Today',
        nowLabel: 'Now',
        // 追加のオプションをここに設定可能
      });

      // 選択された範囲のイベントリスナーを追加
      datePicker.on('select', (datepicker) => {
        console.log('Start date:', datepicker.data.startDate)
        console.log('End date:', datepicker.data.endDate)
        this.dateTimeRange.selectedStartDateTime = datepicker.data.startDate
        this.dateTimeRange.selectedEndDateTime = datepicker.data.endDate
        this.$emit('dateTimeRangeSelected', this.dateTimeRange)
      });
    },
  },
};
</script>

<style scoped>
/* カスタムスタイルが必要ならここに追加 */
</style>