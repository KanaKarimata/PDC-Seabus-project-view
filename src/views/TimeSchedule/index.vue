<template>
  <h1 class="title">{{ this.title }}</h1>
  <div>
    <button class="button">
      <router-link :to="{
        name: 'CreateForm'
        , params: {id: this.$route.params.id}
      }">新規作成</router-link>
    </button>
  </div>
</template>

<script>
import axiosInstance from '../../../src/axios'

export default {
  name: 'TimeScheduleIndex',
  data() {
    return {
      title: '',
      timeScheduleList: []
    }
  },
  created() {
    this.getTimeScheduleList()
  },
  methods: {
    async getTimeScheduleList() {
      try {
        const response = await axiosInstance.get('http://localhost:8000/operation-rule/time-schedule/index/', {
          params: {
            id: this.$route.params.id
          }})
        console.log('APIレスポンス:', response.data)
        this.timeScheduleList = response.data
      } catch (error) {
        console.error('APIエラー:', error.response ? error.response.data : error.message)
      }
    }
  }
}
</script>