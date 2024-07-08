<template>
  <link rel="stylesheet" href="/css/top.css" type="text/css">
  <div class="columns" v-for="rule in this.operationRuleList" :key="rule.id">
    <div class="column is-8 is-offset-4">
      <router-link
      :to="{
        name: 'TimeScheduleIndex',
        params: {id: rule.id}}"
      class="column is-6"
      :class="{'disabled-link' : isDisabled(rule.id)}">
        <button
         class="button column is-full"
         :class="{'disabled': isDisabled(rule.id)}">
         {{rule.operation_rule_name}}
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import axiosInstance from '../../src/axios'

  export default {
    name: 'OperationRuleIndex',
    data() {
      return {
        operationRuleList: [],
        userPermissions: []
      }
    },
    created() {
      this.getOperationRuleList()
    },
    computed: {
      ...mapGetters(['getEditPermission']),
    },
    methods: {
      async getOperationRuleList() {
        try {
          const response = await axiosInstance.get('http://localhost:8000/operation-rule/index/')
          console.log('APIレスポンス:', response.data)
          this.operationRuleList = response.data.operation_rules;
          this.userPermissions = response.data.user_permissions;
        } catch (error) {
          console.error('APIエラー:', error.response ? error.response.data : error.message)
        }
      },
      isNotPermittedToYokohama(id) {
        return id === 1
          && this.getEditPermission.TO_YOKOHAMA_STATION !== this.userPermissions[0].edit_permission.id
          && this.getEditPermission.MASTER !== this.userPermissions[0].edit_permission.id
      },
      isNotPermittedFromBrickToYamashitaPark(id) {
        return id === 2
          && this.getEditPermission.FROM_RED_BRICK_TO_YAMASHITA_PARK !== this.userPermissions[0].edit_permission.id
          && this.getEditPermission.MASTER !== this.userPermissions[0].edit_permission.id
      },
      isNotPermittedFromBrickToHammerHead(id) {
        return id === 3
          && this.getEditPermission.FROM_RED_BRICK_TO_HAMMER_HEAD !== this.userPermissions[0].edit_permission.id
          && this.getEditPermission.MASTER !== this.userPermissions[0].edit_permission.id
      },
      isNotPermittedToYamashitaPark(id) {
        return id === 4
          && this.getEditPermission.TO_YAMASHITA_PARK !== this.userPermissions[0].edit_permission.id
          && this.getEditPermission.MASTER !== this.userPermissions[0].edit_permission.id
      },
      isDisabled(id) {
        return this.isNotPermittedToYokohama(id)
            || this.isNotPermittedFromBrickToYamashitaPark(id)
            || this.isNotPermittedFromBrickToHammerHead(id)
            || this.isNotPermittedToYamashitaPark(id)
      }
    }
  }
</script>
<!-- 
<style>
.disabled-link {
  pointer-events: none;
  cursor: not-allowed;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
</style> -->