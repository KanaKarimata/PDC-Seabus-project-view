<template>
  <div class="columns" v-for="rule in this.operationRuleList" :key="rule.id">
    <div class="column is-8 is-offset-4">
      <router-link
      :to="{
        name: 'TimeScheduleManagement',
        params: {id: rule.id}}"
      class="column is-6">
        <button class="button column is-full">{{rule.operation_rule_name}}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'OperationRuleIndex',
    data() {
      return {
        operationRuleList: []
      }
    },
    created() {
      this.getOperationRuleList()
    },
    methods: {
      async getOperationRuleList() {
        try {
          const response = await axios.get('http://localhost:8000/operation-rule/index/')
          console.log('APIレスポンス:', response.data)
          this.operationRuleList = response.data
          console.log(this.operationRuleList)
        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      }
    }
  }
</script>