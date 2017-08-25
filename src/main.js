// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import store from './store'
import router from './router'
import {ToastPlugin, ConfirmPlugin} from 'vux'
import FastClick from 'fastclick'
import App from './App'
import Api from '@/assets/js/api'
import './assets/stylus/reset.styl'

Axios.defaults.timeout = 5000
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.prototype.axios = Axios
Vue.prototype.api = Api
FastClick.attach(document.body)
Vue.config.productionTip = false

const history = window.sessionStorage
history.clear()
let historyCount = 1
history.setItem('/', 0)
history.setItem('/home', 1)
history.setItem('/rank', 1)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) >= parseInt(fromIndex, 10)) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('/music/play', historyCount + 1)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  if (process.env.NODE_ENV === 'production') {
    window.ga && window.ga('set', 'page', to.fullPath)
    window.ga && window.ga('send', 'pageview')
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
