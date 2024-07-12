<template>
  <link rel="stylesheet" href="/css/logIn.css" type="text/css">
  <div class="page-log-in">
    <div class="columns log-in-area">
      <div class="column is-4 is-offset-4">
        <h1 class="title">シーバス 管理画面</h1>

        <form class="login-info" @submit.prevent="submitForm">
          <div class="field">
            <label>ログインID</label>
            <div class="control">
              <input type="text" class="input input-box" v-model="username">
            </div>
          </div>

          <div class="field">
            <label>パスワード</label>
            <div class="control">
              <input type="password" class="input input-box" v-model="password">
            </div>
          </div>

          <div class="notification" v-if="errors.length">
            <p class="has-text-danger" v-for="error in errors" :key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button login-button column is-full">Log in</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Log in | TimetableManagement'
  },
  methods: {
    ...mapActions(['login']),
    async submitForm() {
      this.errors = []

      if (!this.username) {
        this.errors.push('IDが入力されていません')
      }
      if (!this.password) {
        this.errors.push('Passwordが入力されていません')
      }

      if (!this.errors.length) {

        try {
          await this.login({ username: this.username, password: this.password });

          // ログイン成功時の処理
          toast({
            message: 'ログインしました！',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          });

          this.$router.push('/top');
        } catch (error) {
          if (error.response) {
            if (error.response.data.non_field_errors) {
              this.errors.push(...error.response.data.non_field_errors);
            } else {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`);
              }
            }
          } else {
            this.errors.push('エラーが発生しました。再度お試しください。');
            console.error('ログインエラー:', error);
          }
        }
      }
    }
  }
}
</script>