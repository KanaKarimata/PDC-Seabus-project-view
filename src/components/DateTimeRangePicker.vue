<template>
  <div class="field">
    <div class="control">
      <input ref="dateTimeRangePicker" type="text" class="input" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import bulmaCalendar from 'bulma-calendar';

export default {
  name: 'DateTimeRangePicker',
  emits: ['update:time'],
  setup(props, { emit }) {
    const dateTimeRangePicker = ref(null);

    onMounted(() => {
      if (dateTimeRangePicker.value) {
        const calendar = bulmaCalendar.attach(dateTimeRangePicker.value, {
          type: 'datetime',
          isRange: true,
          validateLabel: 'Select',
          cancelLabel: 'Cancel',
          clearLabel: 'Clear',
          todayLabel: 'Today',
          nowLabel: 'Now',
        });

        calendar.forEach(instance => {
          instance.on('select', date => {
            const time = date ? date.time : '';
            emit('update:time', time);
          });
        });
      }
    });

    return {
      dateTimeRangePicker
    };
  }
};
</script>

<style scoped>
/* カスタムスタイルが必要ならここに追加 */
</style>