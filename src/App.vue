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
          <router-link to="/summer" class="navbar-item">Summer</router-link>
          <router-link to="/winter" class="navbar-item">Winter</router-link>

          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button is-light">Log in</router-link>

              <router-link to="/cart" class="button is-success">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Cart</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
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
  import { mapState } from 'vuex';

  export default {
  data() {
    return {
      showHeaderMenu: false,
    }
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
  }
}
</script>

<style lang="scss">
@import '~bulma';
</style>