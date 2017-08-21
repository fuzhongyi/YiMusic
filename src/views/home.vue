<template>
  <div class="home" :style="{width: homeWidth}">
    <div class="banner-wrapper">
      <swiper :loop="true"
              :aspect-ratio="147/320"
              :auto="true">
        <swiper-item v-for="(item,index) in banner" :key="index">
          <a :href="item.url" class="banner-item">
            <img :src="item.picUrl" width="100%">
          </a>
        </swiper-item>
      </swiper>
    </div>
    <sticky>
      <tab :line-width="2" custom-bar-width="100px" v-model="index">
        <tab-item selected>推荐音乐</tab-item>
        <tab-item>热歌榜</tab-item>
      </tab>
    </sticky>
    <swiper v-model="index" :show-dots="false" ref="swiper" height="800px">
      <swiper-item>
        <div class="remd" ref="remd">
          <subhead text="推荐歌单"></subhead>
          <div class="remd-songs">
            <template v-for="songs in recommend">
              <div class="remd-wrapper">
                <a class="remd-item" v-for="song in songs" :href="'#/music/songsheet/'+song.id">
                  <div class="remd-img">
                    <img :src="song.picUrl">
                    <div class="play-num">
                      <i class="fa fa-headphones"></i>
                      <span class="num">{{song.playCount | playCount}}万</span>
                    </div>
                  </div>
                  <p class="remd-text">{{song.name}}</p>
                </a>
              </div>
            </template>
          </div>
          <subhead text="最新音乐"></subhead>
          <div class="new">
            <ul class="new-wrapper">
              <li class="new-item" :class="{'vux-1px-b':index!==newSongs.length-1}" v-for="(song,index) in newSongs">
                <div class="new-info">
                  <div class="name thide">{{song.name}}</div>
                  <div class="singer thide">
                    <i class="sghot hot-icon" v-if="song.score===0"></i>
                    {{ song.ar | cutAr }} - {{ song.al.name }}
                  </div>
                </div>
                <div class="new-play" @click="toPlay(index)">
                  <span class="icon hot-icon"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="hot" ref="hot">
          <div class="hot-banner">
            <div class="hot-opct">
              <div class="hot-icon"></div>
              <div class="hot-time">更新日期：{{updateTime}}</div>
            </div>
          </div>
          <div class="hot-songs">
            <ul class="hot-wrapper">
              <li class="hot-item" v-for="(song,index) in hotSongs">
                <div class="rank" :class="{'three':index<3}">{{(index + 1) < 10 ? '0' + (index + 1) : index + 1}}</div>
                <div class="hot-info" :class="{'vux-1px-b':index!==hotSongs.length-1}">
                  <div class="name thide">{{song.name}}</div>
                  <div class="singer thide">
                    <i class="sghot hot-icon" v-if="song.fee===0"></i>
                    {{ song.ar | cutAr }} - {{ song.al.name }}
                  </div>
                </div>
                <div class="hot-play" :class="{'vux-1px-b':index!==hotSongs.length-1}" @click="toPlay(index)">
                  <span class="icon hot-icon"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  import Subhead from '@/components/subhead'
  import MusicList from '@/components/musicList'
  import {Swiper, SwiperItem, Tab, TabItem, Sticky} from 'vux'
  import {cutAr, playCount} from '@/assets/js/filters'
  import moment from 'moment'

  const data = require('../../data.json')
  window.REDUX_STATE = ''
  export default {
    components: {
      Swiper,
      SwiperItem,
      Tab,
      TabItem,
      Subhead,
      MusicList,
      Sticky
    },
    watch: {
      index (val) {
        let height = 0
        if (val) {
          height = this.$refs.hot.offsetHeight
          this.$store.commit('setSongs', this.hotSongs)
        } else {
          height = this.$refs.remd.offsetHeight
          this.$store.commit('setSongs', this.newSongs)
        }
        this.$nextTick(() => {
          this.$refs.swiper.xheight = `${height}px`
        })
      }
    },
    data () {
      return {
        banner: data.banner,
        index: 0,
        tabName: '推荐音乐',
        recommend: data.recommend,
        newSongs: [],
        hotSongs: [],
        updateTime: '',
        homeWidth: window.screen.availWidth + 'px'
      }
    },
    methods: {
      getNewSong () {
        const vm = this
        vm.axios.post(vm.api.music.newSong, {
          params: 'ygDCZ5yRxa2xuo/gnu9IJn/lIeCt8hjKNeH0BaIkOGE=',
          encSecKey: 'cff9edb3b2ca91426e5e771e27d4c95fbe507235297624a885f20ea372bd7eafc151dc1d7648a4a9cb2d3d6e7621ac72e5fee1597764fb852cc110d1375b04008b5d57d4c7bed7bcdafdbd207478333412c2564c3ea37d6695f0de6e181e83b4d31666ff5cfd749ba28558b989f95adf388df016936148e8e4fcdb9652fff9c0'
        }).then((res) => {
          if (res.data.code === 200) {
            let songList = []
            let result = res.data.result
            let thumbs = Math.round(Math.random() * 7999) + 2000
            let num = thumbs / result.length
            result.forEach((v) => {
              thumbs -= Math.round(Math.random() * num)
              v.song.thumbs = thumbs
              v.song.al = v.song.album
              v.song.ar = v.song.artists
              songList.push(v.song)
            })
            vm.newSongs = songList
            this.$store.commit('setSongs', vm.newSongs)
            this.$nextTick(() => {
              let height = this.$refs.remd.offsetHeight
              this.$refs.swiper.xheight = `${height}px`
            })
          }
        }).catch(function () {
          vm.$vux.toast.text('请求接口失败~~', 'middle')
        })
      },
      getHotSong () {
        const vm = this
        vm.axios.post(vm.api.music.hotSong, {
          params: 'KucyorrrlRXI8sD+WFrwaMf0slKKBcb4bgN0tYXJTwQSosYN1BqCZj+QhEGh9uTV',
          encSecKey: 'c2783725abb843e9cb3e55257bed71a06b6018abfc5315f2918905e5e410375e50b24cc2668506b3bb319b49a42eff3d30f538a7cb158b7cbd460b33ce71559d3125d61e83e4c97f729316f8d2b8878087187c8203ba2c7bfd0726e723ccdf77dec8251b8be7b0f4f5f202c4a664a9103fe7c32e05031b7a97966e5fdb89757a'
        }).then((res) => {
          if (res.data.code === 200) {
            let songList = []
            let tracks = res.data.playlist.tracks
            vm.updateTime = moment(new Date(res.data.playlist.updateTime)).format('MM月DD日')
            let thumbs = Math.round(Math.random() * 7999) + 2000
            let num = thumbs / tracks.length
            tracks.forEach((v) => {
              thumbs -= Math.round(Math.random() * num)
              v.thumbs = thumbs
              songList.push(v)
            })
            vm.hotSongs = songList
          }
        }).catch(function () {
          vm.$vux.toast.text('请求接口失败~~', 'middle')
        })
      },
      toPlay (index) {
        this.$router.push({
          name: 'play',
          params: {'index': index}
        })
      }
    },
    created () {
      this.getNewSong()
      this.getHotSong()
    },
    filters: {
      cutAr,
      playCount
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home
    .hot-icon
      background: url('../assets/image/hot_icon.png') no-repeat
      background-size: 166px 97px
    .remd
      display: table
      .remd-songs
        display: flex
        flex-direction: column
        padding-bottom: 10px
        .remd-wrapper
          padding-bottom: 16px
          .remd-item
            display: inline-flex
            flex-direction: column
            width: (100 / 3) %
            padding-left: 1px
            padding-right: 1px
            box-sizing: border-box
            &:first-child
              padding-left: 0
              padding-right: 2px
            &:last-child
              padding-left: 2px
              padding-right: 0px
            .remd-img
              position: relative
              img
                width: 100%
              .play-num
                position: absolute
                top: 2px
                right: 5px
                z-index: 1
                color: #fff
                font-size: .7rem
                text-shadow: 1px 0 0 rgba(0, 0, 0, .15)
              &:after
                content: " "
                position: absolute
                left: 0;
                top: 0;
                width: 100%
                height: 20px
                background-image: linear-gradient(180deg, rgba(0, 0, 0, .2), transparent)
            .remd-text
              display: -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
              overflow: hidden
              padding: 6px 2px 0 6px
              line-height: 1.2
              font-size: 13px
      .new
        .new-wrapper
          .new-item
            display: flex
            margin-left: 10px
            color: #333
            .new-info
              flex: 1 1 auto
              padding: 6px 0
              width: 0
              .name
                font-size: 1rem
                line-height: 1.5
              .singer
                font-size: .8px
                line-height: 1.5
                color: #888
                .sghot
                  display: inline-block
                  width: 12px
                  height: 8px
                  margin-right: 4px
              .thide
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                word-break: normal
            .new-play
              display: flex
              align-items: center
              padding: 0 10px
              color: #AAAAAA
              .icon
                display: inline-block
                width: 22px
                height: 22px
                background-position: -24px 0
    .hot
      .hot-banner
        position: relative
        padding-top: 38.9%
        overflow: hidden
        background: url('../assets/image/hot_music.jpg') no-repeat
        background-size: contain
        .hot-opct, .hot-opct:after
          position: absolute
          left: 0
          top: 0
          right: 0
          bottom: 0
        .hot-opct
          display: flex
          flex-direction: column
          justify-content: center
          padding-left: 20px
          &:after
            content: " "
            z-index: 1
            background-color: rgba(0, 0, 0, .2)
          .hot-icon
            z-index: 2
            width: 142px
            height: 67px
            background-position: -24px -30px
          .hot-time
            z-index: 2
            margin-top: 10px
            color: hsla(0, 0%, 100%, .8)
            font-size: 12px
            transform: scale(.91)
            transform-origin: left top
      .hot-songs
        .hot-wrapper
          .hot-item
            display: flex
            margin-left: 10px
            color: #333
            .rank
              display: flex
              align-items: center
              width: 28px
              font-size: 17px
              color: #999
            .three
              color: #df3436
            .hot-info
              flex: 1 1 auto
              padding: 6px 0
              width: 0
              .name
                font-size: 1rem
                line-height: 1.5
              .singer
                font-size: .8px
                line-height: 1.5
                color: #888
                .sghot
                  display: inline-block
                  width: 12px
                  height: 8px
                  margin-right: 4px
              .thide
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                word-break: normal
            .hot-play
              display: flex
              align-items: center
              padding: 0 10px
              color: #AAAAAA
              .icon
                display: inline-block
                width: 22px
                height: 22px
                background-position: -24px 0
</style>
