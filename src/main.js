// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import store from './store'
import router from './router'
import {ToastPlugin} from 'vux'
import FastClick from 'fastclick'
import App from './App'
import Api from '@/assets/js/api'

Axios.defaults.timeout = 5000
Vue.use(ToastPlugin)
Vue.prototype.axios = Axios
Vue.prototype.api = Api
FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
