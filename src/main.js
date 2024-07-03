import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bulma/css/bulma.css';
import 'bulma-calendar/dist/css/bulma-calendar.min.css';

createApp(App).use(store).use(router).mount('#app')
