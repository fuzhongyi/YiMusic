import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import rank from '@/views/rank'
import home from '@/views/home'
import search from '@/views/search'
import play from '@/views/play'
import list from '@/views/list'
import songSheet from '@/views/songSheet'

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
    path: '/rank',
    name: 'rank',
    component: rank
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
  },
  {
    path: '/music/songsheet/:id',
    name: 'songsheet',
    component: songSheet
  }
]

export default new Router({
  routes
})
