<template>
  <div class="play">
    <blur :blur-amount="12" :url="song.al.picUrl" :height="height">
      <back :size="'1.5rem'"></back>
      <div class="name">
        <span class="text">{{song.name }}</span>
      </div>
      <swiper :loop="true" :dots-position="'center'" :height="'60vh'">
        <swiper-item>
          <div class="singer">
            <span class="line"></span>
            <span class="text"> {{ song.ar | cutAr }}</span>
            <span class="line"></span>
          </div>
          <div class="album">
            <span class="text">{{ song.al.name }}</span>
          </div>
          <div class="img">
            <img :src="song.al.picUrl" @click="showPic(0)" :class="isPlaying?'playing':''"/>
          </div>
          <div class="lyric">为你我用了半年的积蓄</div>
        </swiper-item>
        <swiper-item>歌词</swiper-item>
      </swiper>
      <audio autoplay>
        <source :src="song.mp3.url"/>
      </audio>
      <previewer :list="[{src:song.al.picUrl}]" ref="previewer"></previewer>
    </blur>
  </div>
</template>

<script type="text/ecmascript-6">
  import Back from '@/components/back'
  import {Blur, Previewer, Swiper, SwiperItem} from 'vux'
  import {cutAr} from '@/assets/js/filters'

  export default {
    data () {
      return {
        isPlaying: false,
        song: {},
        height: window.screen.availHeight
      }
    },
    methods: {
      showPic (index) {
        this.$refs.previewer.show(index)
      },
      songDetail () {
        let id = this.song.id
        this.axios.get(this.api.music.detail, {params: {'id': id}}).then((res) => {
          this.$store.commit('updateLoadingStatus', {isLoading: false})
          if (res.data.status.code === 200) {
            this.$set(this.song, 'mp3', res.data.data.mp3)
          }
        }).catch(function () {
          console.log('请求接口失败！')
        })
      }
    },
    created () {
      this.song = this.$route.params
      this.songDetail()
    },
    filters: {
      cutAr
    },
    components: {
      Blur,
      Back,
      Previewer,
      Swiper,
      SwiperItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .play
    background: rgba(7, 17, 27, 0.3)
    color: #fff
    .vux-icon-dot.active
      background-color: #fff !important
    .back
      position: absolute
      top: 18px
      left 24px
    .name
      padding: 20px 24px
      font-size: 1.1rem
      line-height: 1.2
      .text
        display: block
        margin: 0 auto
        max-width: 200px
        text-align: center
    .singer
      text-align: center
      .line
        display: inline-block
        position: relative
        top: -0.3rem
        width: 12px
        border-top: 1px solid #fff
      .text
        font-size: 0.9rem
    .album
      text-align: center
      padding: 20px
      .text
        padding: 1px 6px
        border: 2px solid rgba(255, 255, 255, 0.5)
        border-radius: 5px
        font-size: 0.7rem
        line-height: 0.7rem
    .lyric
      margin-top: 10px
      font-size: 0.9rem
      text-align: center
      color: #56e3af
    .img
      text-align: center
      img
        width: 65vw
        height: 65vw
        border-radius: 50%
        border: 5px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px)
          width: 60vw
          height: 60vw
        &.playing
          animation: 30s rotate infinite linear forwards

  @keyframes rotate
    from
      transform: rotate(0)
    to
      transform: rotate(360deg)
</style>
