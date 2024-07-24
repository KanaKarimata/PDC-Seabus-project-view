<template>
  <link rel="stylesheet" href="/css/top.css" type="text/css">
  <div class="columns" v-for="rule in this.getOperationRuleList" :key="rule.id">
    <div class="column is-8 is-offset-2">
      <router-link
        :to="{
          name: 'TimeScheduleIndex',
          params: {operation_rule_id: rule.id}}"
        class="button index-button column is-full"
        :class="{'disabled-link disabled' : isDisabled(rule.id)}">
          <i class="fa-solid fa-anchor icon-size"></i>
          &emsp;{{rule.operation_rule_name}}
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AuthenticatedHeader from '../components/AuthenticatedHeader.vue'

  export default {
    name: 'OperationRuleIndex',
    components: {
      AuthenticatedHeader
    },
    computed: {
      ...mapGetters(['getEditPermission', 'getUserPermission', 'getOperationRuleList'])
    },
    mounted() {
      document.title = 'Top | シーバス'
    },
    methods: {
      isNotPermittedYokohama(id) {
        for (const permission of this.getUserPermission) {
          return id === 1
            && this.getEditPermission.YOKOHAMA_STATION !== permission.edit_permission.id
            && this.getEditPermission.MASTER !== permission.edit_permission.id
        }
      },
      isNotPermittedRedBrick(id) {
        for (const permission of this.getUserPermission) {
          return id === 2
            && this.getEditPermission.RED_BRICK !== permission.edit_permission.id
            && this.getEditPermission.MASTER !== permission.edit_permission.id
        }
      },
      isNotPermittedYamashitaPark(id) {
        for (const permission of this.getUserPermission) {
          return id === 3
            && this.getEditPermission.YAMASHITA_PARK !== permission.edit_permission.id
            && this.getEditPermission.MASTER !== permission.edit_permission.id
        }
      },
      isDisabled(id) {
        return this.isNotPermittedYokohama(id)
            || this.isNotPermittedRedBrick(id)
            || this.isNotPermittedYamashitaPark(id)
      }
    }
  }
</script>