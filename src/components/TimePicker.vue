<template>
  <div class="field">
    <div class="control">
      <input ref="timepicker" type="text" class="input" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import bulmaCalendar from 'bulma-calendar';

export default {
  name: 'TimePicker',
  emits: ['update:time'],
  setup(props, { emit }) {
    const timepicker = ref(null);

    onMounted(() => {
      if (timepicker.value) {
        const calendar = bulmaCalendar.attach(timepicker.value, {
          type: 'time',
          displayMode: 'dialog'
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
      timepicker
    };
  }
};
</script>

<style scoped>
/* カスタムスタイルが必要ならここに追加 */
</style>