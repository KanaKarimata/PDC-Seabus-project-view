<template>
  <link rel="stylesheet" href="/css/timeSchedule.css" type="text/css">
  <div class="columns">
    <div class="column is-full">
      <h1 class="title">{{ this.title }}</h1>
      <div class="main-contents">
        <div class="action-area">
          <router-link :to="{
            name: 'Form',
            params: {
              operation_rule_id: this.$route.params.operation_rule_id,
              type: 'create'
            }}"
          class="button create-button"><i class="fa-solid fa-feather"></i>&ensp;新規作成</router-link>

          <div class="control-data">
            <div class="dropdown is-hoverable is-right sort-button-area">
              <div class="dropdown-trigger">
                <button class="button sort-button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>表示順</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" @click="sortNameAsc()">運航ルール名　昇順</a>
                  <a class="dropdown-item" @click="sortNameDesc()">運航ルール名　降順</a>
                  <a class="dropdown-item" @click="sortStartPublishDateAsc()">公開開始　昇順</a>
                  <a class="dropdown-item" @click="sortStartPublishDateDesc()">公開開始　降順</a>
                  <a class="dropdown-item" @click="sortEndPublishDateAsc()">終了開始　昇順</a>
                  <a class="dropdown-item" @click="sortEndPublishDateDesc()">終了開始　降順</a>
                </div>
              </div>
            </div>

            <div class="control">
              <input class="input is-rounded" type="text" placeholder="運航ルール名を検索" v-model="searchQuery" @input="filterList">
            </div>
          </div>

        </div>


      </div>
      <!-- table header -->
      <div class="columns index-table">
        <div class="column is-1"><input type="checkbox" /></div>
        <div class="column is-1">ステータス</div>
        <div class="column is-4">運航ルール名</div>
        <div class="column is-2">公開開始</div>
        <div class="column is-2">公開終了</div>
        <div class="column is-1">更新者</div>
        <div class="column is-1">アクション</div>
      </div>
      <!-- table data -->
      <div class="columns index-table-data" v-for="item in this.filteredTimeScheduleList" :key="item.id">
        <div class="column is-1"><input type="checkbox" /></div>
        <div class="column is-1">
          <div class="noPublish" v-if="item.publish_status_id === 0">非公開</div>
          <div class="publish" v-else>公開</div>
        </div>
        <div class="column is-4">
          <router-link
            :to="{
              name: 'Confirm',
              params: {
                operation_rule_id: this.$route.params.operation_rule_id,
                time_schedule_id: item.id
                }}
          "><span class="link-font">{{ item.time_schedule_name }}</span></router-link>
        </div>
        <div class="column is-2">{{ formatDate(item.publish_start_date) }}</div>
        <div class="column is-2">{{ formatDate(item.publish_end_date) }}</div>
        <div class="column is-1">{{ item.update_user.username }}</div>
        <div class="column is-1">
          <button class="button" @click="confirmDelete(item.id)">削除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../../../src/axios'
import moment from 'moment';
import { toast } from 'bulma-toast'

export default {
  name: 'TimeScheduleIndex',
  data() {
    return {
      title: '',
      timeScheduleList: [],
      searchQuery: '',
      filteredTimeScheduleList: []
    }
  },
  created() {
    this.getTimeScheduleList()
  },
  mounted() {
    document.title = '時刻表一覧 | シーバス'
  },
  watch: {
    '$route.params.operation_rule_id': 'getTimeScheduleList'
  },
  methods: {
    async getTimeScheduleList() {
      try {
        const response = await axiosInstance.get(process.env.VUE_APP_API_URL + '/operation-rule/time-schedule/index/', {
          params: {
            operation_rule_id: this.$route.params.operation_rule_id
          }})

        this.timeScheduleList = response.data.schedules
        this.title = response.data.operation_rule_name
        this.filteredTimeScheduleList = this.timeScheduleList
      } catch (error) {
        console.error('APIエラー:', error.response ? error.response.data : error.message)
      }
    },
    formatDate(date) {
      return moment(date).format('YYYY/MM/DD HH:mm');
    },
    confirmDelete(id) {
      const isConfirmed = confirm('削除します。よろしいですか？')
      if (isConfirmed) {
        this.executeDelete(id)
      }
    },
    async executeDelete(id) {
      try {
        const response = await axiosInstance.delete(process.env.VUE_APP_API_URL + `/operation-rule/time-schedule/delete/${id}`)

        toast({
          message: '削除しました',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right',
        });
        this.getTimeScheduleList()
      } catch (error) {
        console.error('APIエラー:', error.response ? error.response.data : error.message)
      }
    },
    sortNameAsc() {
      this.filteredTimeScheduleList.sort((a, b) => a.time_schedule_name.localeCompare(b.time_schedule_name))
    },
    sortNameDesc() {
      this.filteredTimeScheduleList.sort((a, b) => b.time_schedule_name.localeCompare(a.time_schedule_name))
    },
    sortStartPublishDateAsc() {
      this.filteredTimeScheduleList.sort((a, b) => new Date(a.publish_start_date) - new Date(b.publish_start_date));
    },
    sortStartPublishDateDesc() {
      this.filteredTimeScheduleList.sort((a, b) => new Date(b.publish_start_date) - new Date(a.publish_start_date));
    },
    sortEndPublishDateAsc() {
      this.filteredTimeScheduleList.sort((a, b) => new Date(a.publish_end_date) - new Date(b.publish_end_date));
    },
    sortEndPublishDateDesc() {
      this.filteredTimeScheduleList.sort((a, b) => new Date(b.publish_end_date) - new Date(a.publish_end_date));
    },
    filterList() {
      if (this.searchQuery === '') {
        // 検索クエリが空の場合、全件表示
        this.filteredTimeScheduleList = this.timeScheduleList;
      } else {
        this.filteredTimeScheduleList = this.timeScheduleList.filter(item =>
          item.time_schedule_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  }
}
</script>