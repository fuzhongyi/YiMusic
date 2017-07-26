import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: function (resolve) {
      require(['@/views/index'], resolve)
    }
  },
  {
    path: '/home',
    name: 'home',
    component: function (resolve) {
      require(['@/views/home'], resolve)
    }
  },
  {
    path: '/search',
    name: 'search',
    component: function (resolve) {
      require(['@/views/search'], resolve)
    }
  },
  {
    path: '/play',
    name: 'play',
    component: function (resolve) {
      require(['@/views/play'], resolve)
    }
  }
]

export default new Router({
  // mode: 'history',
  routes
})
