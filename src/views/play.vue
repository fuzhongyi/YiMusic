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
      <div class="progress">
        <range :value="progress"
               :minHtml="'00:00'"
               :maxHtml="'00:00'"
               :rangeBarHeight="3">
        </range>
      </div>
      <div class="controls">
        <div class="pre btn" @click="preSong">
          <i class="fa fa-step-backward"></i>
        </div>
        <div class="begin btn" @click="togglePlay">
          <i class="fa" :class="isPlaying?'fa-pause':'fa-play'"></i>
        </div>
        <div class="next btn" @click="nextSong">
          <i class="fa fa-step-forward"></i>
        </div>
      </div>
      <audio autoplay loop :src="mp3.url" ref="audio">
      </audio>
      <div v-transfer-dom>
        <previewer :list="[{src:song.al.picUrl}]" ref="previewer"></previewer>
      </div>
    </blur>
  </div>
</template>

<script type="text/ecmascript-6">
  import Back from '@/components/back'
  import {Blur, Previewer, Swiper, SwiperItem, TransferDom, Range} from 'vux'
  import {cutAr, formatSeconds} from '@/assets/js/filters'

  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        index: 0,
        isPlaying: true,
        song: {},
        mp3: {url: null},
        height: window.screen.availHeight,
        progress: 0,
        timer: null
      }
    },
    methods: {
      preSong () {
        if (this.index === 0) {
          this.$vux.toast.text('已经是第一首啦~~', 'top')
          return
        }
        this.index -= 1
        this.songDetail()
      },
      nextSong () {
        if (this.index === this.$store.state.songs.songs.length - 1) {
          this.$vux.toast.text('已经是最后一首啦~~', 'top')
          return
        }
        this.index += 1
        this.songDetail()
      },
      togglePlay () {
        let audio = this.$refs.audio
        if (audio.paused) {
          this.isPlaying = true
          audio.play()
        } else {
          this.isPlaying = false
          audio.pause()
        }
      },
      showPic (index) {
        this.$refs.previewer.show(index)
      },
      songDetail () {
        this.song = this.$store.state.songs.songs[this.index]
        let id = this.song.id
        this.$store.commit('updateLoadingStatus', {isLoading: true})
        this.axios.get(this.api.music.detail, {params: {'id': id}}).then((res) => {
          this.$store.commit('updateLoadingStatus', {isLoading: false})
          if (res.data.status.code === 200) {
            this.mp3 = res.data.data.mp3
            if (!this.timer) {
              this.updateProgress()
            }
          }
        }).catch(function () {
          this.$vux.toast.text('请求接口失败~~', 'middle')
        })
      },
      updateProgress () {
        let audio = this.$refs.audio
        this.timer = setInterval(() => {
          let duration = audio.duration
          if (duration) {
            let current = audio.currentTime
            let min = document.getElementsByClassName('range-min')[0]
            let max = document.getElementsByClassName('range-max')[0]
            min.innerHTML = formatSeconds(Math.round(current))
            max.innerHTML = formatSeconds(Math.round(duration))
            this.progress = current / duration * 100
          }
        }, 1000)
      }
    },
    created () {
      this.index = this.$route.params.index
      this.songDetail()
    },
    filters: {
      cutAr,
      formatSeconds
    },
    components: {
      Range,
      Blur,
      Back,
      Previewer,
      Swiper,
      SwiperItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  $skin = #56e3af

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
      color: $skin
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
    .progress
      height: 30px
      .vux-range-input-box
        margin-right: 50px !important
        .range-handle
          top: -5.5px !important
          width: 15px
          height: 15px
          background-color: $skin
        .range-min
          left: -40px
          color: #fff
        .range-max
          right: -35px
          color: #fff
        .range-quantity
          background-color: $skin
    .controls
      height: 100px
      text-align: center
      .btn
        display: inline-flex
        padding: 8px
        border: 4px solid $skin
        border-radius: 50%
        color: $skin
        align-items center
        justify-content: center
        margin: 0 10px
        &.pre, &.next
          width: 6vw
          height: 6vw
          font-size: 1.2rem
        &.begin
          width: 12vw
          height: 12vw
          font-size: 1.5rem

  @keyframes rotate
    from
      transform: rotate(0)
    to
      transform: rotate(360deg)
</style>
