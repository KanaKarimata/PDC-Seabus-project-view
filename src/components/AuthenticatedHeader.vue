<template>
  <nav class="navbar">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item" v-for="rule in this.getOperationRuleList" :key="rule.id">
          <router-link
            :to="{
              name: 'TimeScheduleIndex',
              params: {operation_rule_id: rule.id}}"
            class="button tab-button"
            :class="{'disabled-link disabled' : isDisabled(rule.id)}">
              {{rule.operation_rule_name}}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AuthenticatedHeader',
  computed: {
    ...mapGetters(['getEditPermission', 'getUserPermission', 'getOperationRuleList'])
  },
  created() {
    this.getOperationRuleListData()
  },
  methods: {
    ...mapActions(['getOperationRuleListData']),
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