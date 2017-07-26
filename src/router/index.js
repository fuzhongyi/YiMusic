import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import home from '@/views/home'
import search from '@/views/search'
import play from '@/views/play'

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
  },
  {
    path: '/play',
    name: 'play',
    component: play
  }
]

export default new Router({
  routes
})
