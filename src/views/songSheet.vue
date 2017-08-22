<template>
  <div class="song-sheet">
    <back size="1.2rem" :circle="false"></back>
    <section class="sheet-header">
      <div class="h-back"
           :style="{'background-image':'url('+songSheet.coverImgUrl+')'}">
      </div>
      <div class="h-wrapper">
        <div class="h-left">
          <span class="h_icon">歌单</span>
          <img :src="songSheet.coverImgUrl">
          <div class="play-num">
            <i class="fa fa-headphones"></i>
            <span class="num" v-show="songSheet.playCount">
              {{songSheet.playCount | playCount}}万
            </span>
          </div>
        </div>
        <div class="h-right">
          <div class="title" @click="toggleDesc">{{songSheet.name}}</div>
          <!--<a class="avatar" :href="'http://music.163.com/#/user?id='+songSheet.creator.userId">-->
          <a class="avatar" @click="toggleDesc">
            <img class="photo" :src="songSheet.creator.avatarUrl">
            <span class="name">{{songSheet.creator.nickname}}</span>
          </a>
          <div class="intro" @click="toggleDesc">简介:{{songSheet.description}}</div>
        </div>
      </div>
    </section>
    <sticky>
      <tab :line-width="4" custom-bar-width="60px">
        <tab-item selected>歌曲</tab-item>
      </tab>
    </sticky>
    <music-list></music-list>
    <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
      <div class="sheet-intro" v-show="showDesc">
        <div class="i-back" :style="{'background-image':'url('+songSheet.coverImgUrl+')'}"></div>
        <div class="i-close" @click="toggleDesc">
          <i class="fa fa-close"></i>
        </div>
        <view-box body-padding-bottom="10px">
          <div class="i-img">
            <img :src="songSheet.coverImgUrl">
          </div>
          <p class="i-title">{{songSheet.name}}</p>
          <!--<a class="i-avatar" :href="'http://music.163.com/#/user?id='+songSheet.creator.userId">-->
          <a class="i-avatar">
            <img class="photo" :src="songSheet.creator.avatarUrl" width="28" height="28">
            <span class="name">{{songSheet.creator.nickname}}</span>
          </a>
          <ul class="tags-wrapper" v-if="songSheet.tags&&songSheet.tags.length>0">
            <li class="tags-item vux-1px" v-for="item in songSheet.tags">{{item}}</li>
          </ul>
          <div class="i-desc">
            {{songSheet.description}}
          </div>
        </view-box>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import MusicList from '@/components/musicList'
  import {Tab, TabItem, Sticky, ViewBox} from 'vux'
  import {playCount} from '@/assets/js/filters'
  import Back from '@/components/back'

  export default {
    data () {
      return {
        songSheet: {creator: []},
        showDesc: false
      }
    },
    components: {
      Tab,
      TabItem,
      Sticky,
      MusicList,
      ViewBox,
      Back
    },
    methods: {
      getSongSheet () {
        const vm = this
        let id = vm.$route.params.id
        vm.axios.post(vm.api.music.playlist, {
          'id': id
        }).then((res) => {
          if (res.data.code === 200) {
            let songList = []
            let tracks = res.data.result.tracks
            let thumbs = Math.round(Math.random() * 7999) + 2000
            let num = thumbs / tracks.length
            tracks.forEach((v) => {
              thumbs -= Math.round(Math.random() * num)
              v.thumbs = thumbs
              v.al = v.album
              v.ar = v.artists
              songList.push(v)
            })
            vm.$store.commit('setSongs', songList)
            vm.songSheet = res.data.result
          }
        }).catch(function () {
          vm.$vux.toast.text('请求接口失败~~', 'middle')
        })
      },
      toggleDesc () {
        this.showDesc = !this.showDesc
      }
    },
    created () {
      this.getSongSheet()
    },
    filters: {
      playCount
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .song-sheet
    .back
      position: absolute
      top: 7px
      left: 15px
    .sheet-header
      position: relative
      padding: 32px 10px 30px 15px
      z-index: 4
      overflow: hidden
      color: #fff
      .h-back
        z-index: -2
        background-repeat: no-repeat
        background-size: cover
        background-position: 50%
        filter: blur(20px)
        transform: scale(1.5)
        &:after
          content: ' '
          z-index: -1
          background-color: rgba(0, 0, 0, .25)
        &, &:after
          position: absolute
          left: 0
          top: 0
          right: 0
          bottom: 0
      .h-wrapper
        display: flex
        .h-left
          position: relative
          width: 114px
          height: 114px
          &:after
            content: ' '
            position: absolute
            left: 0
            bottom: 0
            width: 100%
            height: 30px
            background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.2))
          @media screen and (min-width: 360px)
            width: 126px
            height: 126px
          @media screen and (min-width: 414px)
            width: 145px
            height: 145px
          @media screen and (min-width: 768 pxpx)
            width: 200px
            height: 200px
          img
            height: 100%
          .h_icon
            position: absolute
            top: 10px
            font-size: .5rem
            line-height: 17px
            background-color: rgba(217, 48, 48, .8)
            padding: 0 8px
            border-radius: 0 17px 17px 0
          .play-num
            position: absolute
            left: 10px
            bottom: 5px
            z-index: 1
            font-size: 0.8rem
        .h-right
          display: flex
          flex-direction: column
          justify-content: space-between
          flex: 1 1 auto
          margin-left: 16px
          .title
            margin-top: 3px
            line-height: 1.4
            display: -webkit-box
            overflow: hidden
            text-overflow: ellipsis
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
          .avatar
            display: flex
            align-items: center
            .photo
              width: 28px
              height: 28px
              border-radius: 50%
              margin-right: 8px
            .name
              font-size: .9rem
              color: #fefefe
          .intro
            magrin-bottom: 5px
            font-size: .8rem
            line-height: 1.5
            display: -webkit-box
            overflow: hidden
            text-overflow: ellipsis
            -webkit-line-clamp: 1
            -webkit-box-orient: vertical
    .sheet-intro
      z-index: 999
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      color: #fff
      padding: 20px
      overflow: hidden
      .i-back
        z-index: -2
        background-repeat: no-repeat
        background-size: cover
        background-position: center
        filter: blur(20px)
        transform: scale(1.5)
        &:after
          content: ' '
          z-index: -1
          background-color: rgba(0, 0, 0, 0.25)
        &, &:after
          position: absolute
          left: 0
          top: 0
          right: 0
          bottom: 0
      .i-close
        height 10px
        .fa
          position: absolute
          top: 0
          right: 0
          padding: 10px
      .i-img
        width: 160px
        height: 160px
        margin: auto
        padding-bottom: 20px
        @media screen and (min-width: 360px)
          width: 175px
          height: 175px
        @media screen and (min-width: 414px)
          width: 200px
          height: 200px
        @media screen and (min-width: 768 pxpx)
          width: 240px
          height: 240px
        img
          height: 100%
      .i-title
        line-height: 1.4
        text-align: center
        padding-bottom: 20px
      .i-avatar
        display: flex
        align-items: center
        justify-content: center
        padding-bottom: 20px
        .photo
          border-radius: 50%
          margin-right: 8px
        .name
          font-size: 0.92rem
          font-weight: lighter
          color: #fff
      .tags-wrapper
        display: flex
        justify-content: center
        padding: 10px 0
        .tags-item
          margin: 0 5px
          padding: 5px 10px
          font-size: 12px
        .vux-1px:before
          box-sizing: border-box
          border: 1px solid #fff
          border-radius: 20px
      .i-desc
        font-size: 12px
        line-height: 1.4
        white-space: pre-line
</style>
