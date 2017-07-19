import Vue from 'vue'
import Vuex from 'vuex'
import loading from '@/store/loading'
import songs from '@/store/songs'

Vue.use(Vuex)

const store = new Vuex.Store({})
store.registerModule('loading', loading)
store.registerModule('songs', songs)
export default store
