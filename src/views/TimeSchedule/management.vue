<template>

</template>

<script>
import axios from 'axios'

export default {
  name: 'TimeScheduleManagement',
  data() {
    return {
      timeScheduleList: []
    }
  },
  created() {
    this.getTimeScheduleList()
  },
  methods: {
    getTimeScheduleList() {

    }
  }
}
</script>