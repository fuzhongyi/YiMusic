import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import home from '@/views/rank'
import search from '@/views/search'
import play from '@/views/play'
import list from '@/views/list'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/rank',
    name: 'rank',
    component: home
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/music/play',
    name: 'play',
    component: play
  },
  {
    path: '/music/list/:id',
    name: 'list',
    component: list
  }
]

export default new Router({
  routes
})
