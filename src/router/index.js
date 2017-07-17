import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import home from '@/views/home'
import search from '@/views/search'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
]

export default new Router({
  mode: 'history',
  routes
})
