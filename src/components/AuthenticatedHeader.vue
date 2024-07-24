<template>
  <nav class="navbar tab-nav">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <router-link
            :to="{name: 'Top'}"
            active-class="onPage"
            class="button tab-button">
              TOP
          </router-link>
        </div>
        <div class="navbar-item" v-for="rule in this.getOperationRuleList" :key="rule.id">
          <router-link
            :to="{
              name: 'TimeScheduleIndex',
              params: {operation_rule_id: rule.id}}"
            class="button tab-button"
            active-class="onPage"
            :class="{'disabled-link disabled' : isDisabled(rule.id), 'onPage': isCurrentPage(rule.id)}"
            @click.native="setActivePage(rule.id)">
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
    isCurrentPage(id) {
      const currentId = this.$route.params.operation_rule_id;
      return currentId == id;
    },
    setActivePage(id) {
      this.activePageId = id;
    },
    isThePage(id) {
      return this.activePageId === id;
    },
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