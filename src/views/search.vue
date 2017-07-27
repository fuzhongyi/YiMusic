<template>
  <div class="search">
    <div class="search-header">
      <div class="back-off">
        <back :size="'1.5rem'"></back>
      </div>
      <div class="text">音乐菜单</div>
      <div class="content">
        <input type="text" placeholder="输入你所需要查找的歌曲" v-model="searchKey" @keyup="searchMusic">
      </div>
    </div>
    <scroller height="-137" lock-x :bounce="false" ref="scroller">
      <div>
        <music-list></music-list>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import Back from '@/components/back'
  import MusicList from '@/components/musicList'
  import _ from 'underscore'
  import {Scroller} from 'vux'

  export default {
    data () {
      return {
        searchKey: '',
        search: null
      }
    },
    components: {
      Back,
      MusicList,
      Scroller
    },
    methods: {
      getMusic () {
        this.$store.commit('songsInit')
        this.$store.commit('updateLoadingStatus', {isLoading: true})
        this.axios.post(this.api.music.search + this.searchKey).then((res) => {
          this.$store.commit('updateLoadingStatus', {isLoading: false})
          if (res.data.code === 200) {
            var songList = res.data.result.songs
            for (let song of songList) {
              song.thumbs = Math.round(Math.random() * 3000)
              this.$store.commit('songsAdd', song)
            }
          }
          this.$nextTick(() => {
            this.$refs.scroller.reset()
          })
        }).catch(function () {
          this.$vux.toast.text('请求接口失败~~', 'middle')
        })
      },
      searchMusic () {
        if (this.search === null) {
          this.search = _.debounce(this.getMusic, 300)
        }
        this.search()
      }
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
</style>
