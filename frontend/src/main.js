import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import ListMessage from './components/ListMessage'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('list-message', ListMessage)

new Vue({
  router,
  store,
  ListMessage,
  render: h => h(App)
}).$mount('#app')
