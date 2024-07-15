<template>
  <link rel="stylesheet" href="/css/common.css" type="text/css">
  <div id="wrapper">
    <nav class="navbar head-nav">
      <div class="navbar-brand">
        <strong class="navbar-item brand-name">シーバス</strong>

        <a v-if="isAuthenticated" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showHeaderMenu = !showHeaderMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div v-if="!isAuthenticated" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item navbar-item-not-authenticated">
            ようこそ
          </div>
        </div>
      </div>
      
      <div v-if="isAuthenticated" class="navbar-menu" id="navbar-menu" :class="{'is-active': showHeaderMenu}">
        <!-- <div class="navbar-start">
          <div class="navbar-item" v-for="rule in this.operationRuleList" :key="rule.id">
            <router-link
              :to="{
                name: 'TimeScheduleIndex',
                params: {operation_rule_id: rule.id}}"
              class="tab-button"
              :class="{'disabled-link disabled' : isDisabled(rule.id)}">
                {{rule.operation_rule_name}}
            </router-link>
          </div>
        </div> -->
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button is-light">Log in</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nav v-if="isAuthenticated">
      <AuthenticatedHeader />
    </nav>

    <section class="section">
      <router-view/>
    </section>

    <footer class="footer fix-bottom">
      <p class="has-text-centered">Copyright (c) 2024</p>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapGetters, mapActions } from 'vuex';
  import AuthenticatedHeader from './components/AuthenticatedHeader.vue'
  // import axiosInstance from '../src/axios'

  export default {
  data() {
    return {
      showHeaderMenu: false,
      // operationRuleList: [],
      // userPermissions: []
    }
  },
  components: {
    AuthenticatedHeader
  },
  computed: {
    ...mapState(['isAuthenticated']),
    // ...mapGetters(['getEditPermission', 'getUserPermission'])
  },
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  created() {
    // this.getOperationRuleListData()
  },
  methods: {
    // async getOperationRuleListData() {
    //   try {
    //     const response = await axiosInstance.get('http://localhost:8000/operation-rule/index/')
    //     console.log('APIレスポンス:', response.data)
    //     this.operationRuleList = response.data.operation_rules;
    //     this.userPermissions = response.data.user_permissions;
    //     this.commitOperationRuleList(this.operationRuleList)
    //     this.commitUserPermission(this.userPermissions)
    //   } catch (error) {
    //     console.error('APIエラー:', error.response ? error.response.data : error.message)
    //   }
    // },
    // isNotPermittedYokohama(id) {
    //   for (const permission of this.getUserPermission) {
    //     return id === 1
    //       && this.getEditPermission.YOKOHAMA_STATION !== permission.edit_permission.id
    //       && this.getEditPermission.MASTER !== permission.edit_permission.id
    //   }
    // },
    // isNotPermittedRedBrick(id) {
    //   for (const permission of this.getUserPermission) {
    //     return id === 2
    //       && this.getEditPermission.RED_BRICK !== permission.edit_permission.id
    //       && this.getEditPermission.MASTER !== permission.edit_permission.id
    //   }
    // },
    // isNotPermittedYamashitaPark(id) {
    //   for (const permission of this.getUserPermission) {
    //     return id === 3
    //       && this.getEditPermission.YAMASHITA_PARK !== permission.edit_permission.id
    //       && this.getEditPermission.MASTER !== permission.edit_permission.id
    //   }
    // },
    // isDisabled(id) {
    //   return this.isNotPermittedYokohama(id)
    //       || this.isNotPermittedRedBrick(id)
    //       || this.isNotPermittedYamashitaPark(id)
    // }
  }
}
</script>

<style lang="scss">
@import '~bulma';
</style>