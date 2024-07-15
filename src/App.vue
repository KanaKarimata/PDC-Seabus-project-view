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
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <button class="button is-light" @click="this.executeLogout()">Log out</button>
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
  import AuthenticatedHeader from './components/AuthenticatedHeader.vue';
  import { toast } from 'bulma-toast'

  export default {
  data() {
    return {
      showHeaderMenu: false,
    }
  },
  components: {
    AuthenticatedHeader
  },
  computed: {
    ...mapState(['isAuthenticated'])
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
  methods: {
    ...mapActions(['logout']),
    executeLogout() {
      try {
        this.logout()
        toast({
          message: 'ログアウトしました。',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right',
        });

        this.$router.push('/');
      } catch {
        toast({
          message: 'ログアウトに失敗しました。',
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right',
        });
      }
    }
  }
}
</script>

<style lang="scss">
@import '~bulma';
</style>