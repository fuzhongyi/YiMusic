<template>
  <div class="search">
    <div class="search-header">
      <div class="back-off">
        <back :size="'1.5rem'"></back>
      </div>
      <div class="text">音乐菜单</div>
      <div class="content">
        <input type="text" placeholder="输入你所需要查找的歌曲"
               v-model="searchKey" @keyup="searchMusic" ref="search">
      </div>
    </div>
    <scroller height="-137" lock-x :bounce="false" ref="scroller">
      <div>
        <transition enter-active-class="animated bounceIn">
          <p class="inline-loading" v-show="isLoading">
            <inline-loading></inline-loading>
            <span class="text">正在加载</span>
          </p>
        </transition>
        <div class="history">
          <ul class="history-wrapper">
            <li class="history-item vux-1px-b" v-for="item in history">
              <i class="fa fa-history"></i>
              <span class="text">{{item}}</span>
              <i class="close fa fa-times"></i>
            </li>
          </ul>
          <p class="clear ">清空搜索历史</p>
        </div>
        <music-list></music-list>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import Back from '@/components/back'
  import MusicList from '@/components/musicList'
  import _ from 'underscore'
  import {Scroller, InlineLoading} from 'vux'

  export default {
    data () {
      return {
        searchKey: '',
        search: null,
        isLoading: false,
        history: []
      }
    },
    components: {
      Back,
      MusicList,
      Scroller,
      InlineLoading
    },
    methods: {
      getMusic () {
        if (this.searchKey.length === 0) {
          return
        }
        this.$refs.search.blur()
        this.$refs.scroller.reset({top: 0})
        this.$store.commit('songsInit')
        this.isLoading = true
        let searchKey = this.searchKey
        let history = localStorage.searchHistory ? localStorage.searchHistory.split(',') : []
        history.unshift(searchKey)
        this.history = _.uniq(history)
        localStorage.searchHistory = this.history.join(',')
        this.axios.post(this.api.music.search + searchKey).then((res) => {
          this.isLoading = false
          if (res.data.code === 200) {
            let songList = res.data.result.songs
            let time = 0
            for (let song of songList) {
              song.thumbs = Math.round(Math.random() * 3000)
              setTimeout(() => {
                this.$store.commit('songsAdd', song)
                this.$nextTick(() => {
                  this.$refs.scroller.reset()
                })
              }, time)
              time += 100
            }
          }
        }).catch(function () {
          this.$vux.toast.text('请求接口失败~~', 'middle')
          this.isLoading = false
        })
      },
      searchMusic () {
        if (this.search === null) {
          this.search = _.debounce(this.getMusic, 300)
        }
        this.search()
      }
    },
    created () {
      let history = localStorage.searchHistory.split(',')
      this.history = history
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/comm.styl'

  .search
    .search-header
      padding: 18px 24px
      background: $skin
      .back-off
        margin-bottom: 4px
      .text
        margin-bottom: 20px
        text-align: center
        font-size: 1.2rem
        font-weight: lighter
        color: #fff
      .content
        text-align: center
        input
          width: 60%
          font-size: 0.9rem
          text-align: center
          padding: 8px 20px
          border: 1px solid rgba(255, 255, 255, 0.5)
          border-radius: 20px
          outline: none
          background: transparent
          color: #fff
          &::placeholder
            color: rgba(255, 255, 255, 0.5)
    .inline-loading
      position: absolute
      top: 5px
      width: 100%
      z-index: 1
      text-align: center
      .text
        vertical-align: bottom
        font-size: 0.8rem
        line-height: 20px
        color: rgba(7, 17, 27, 0.8)
    .history
      .history-wrapper
        width: calc(100% - 30px)
        margin: 0 auto
        .history-item
          padding: 5px 10px
          font-size: 1rem
          line-height: 2
          .fa-history
            color: #C7C7C7
          .close
            position: absolute
            top: 4px
            right: 0
            padding: 8px
            color: #C7C7C7
      .clear
        height: 40px
        font-size: .8rem
        line-height: 40px
        text-align: center
        color: #C7C7C7
</style>
