<template>
  <div class="field">
    <div class="control">
      <input ref="timepicker" type="text" class="input" />
    </div>
  </div>
</template>

<script>
import bulmaCalendar from 'bulma-calendar';

export default {
  name: 'TimePicker',
  mounted() {
    this.initializePicker();
  },
  methods: {
    initializePicker() {
      const timePickerElement = this.$refs.timepicker;

      if (!timePickerElement) {
        console.error('Date range picker element not found');
        return;
      }

      const timePicker = new bulmaCalendar(timePickerElement, {
        type: 'time', // 時間の選択を有効にする
        displayMode: 'dialog',
        validateLabel: 'Select',
        cancelLabel: 'Cancel',
        clearLabel: 'Clear',
        todayLabel: 'Today',
        nowLabel: 'Now',
        // 追加のオプションをここに設定可能
      });

      // 選択された範囲のイベントリスナーを追加
      timePicker.on('select', (timepicker) => {
        let selectedTime = timepicker.data.time.start
        this.$emit('timeSelected', selectedTime)
      });
    },
  },
};
</script>

<style scoped>
/* カスタムスタイルが必要ならここに追加 */
</style>