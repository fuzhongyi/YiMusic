<template>
  <div class="play" ref="play">
    <blur :blur-amount="12" :url="song.al.picUrl" :height="height">
      <back :size="'1.5rem'"></back>
      <div class="name">
        <inline-loading v-show="isLoading"></inline-loading>
        <span class="text">{{song.name }}</span>
      </div>
      <swiper :loop="true" :dots-position="'center'" :height="'65vh'">
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
            <img :src="song.al.picUrl" @click="showPic(0)" class="playing" :class="isPlaying?'':'paused'"/>
          </div>
          <div class="lyric">为你我用了半年的积蓄</div>
        </swiper-item>
        <swiper-item>
          <p v-for="data,index in lyric">
            {{data[1]}}
          </p>
        </swiper-item>
      </swiper>
      <div class="controls">
        <div class="progress">
          <range :value="progress"
                 :rangeBarHeight="3"
                 :minHtml="'00:00'"
                 :maxHtml="'00:00'"
                 @on-change="customTime">
          </range>
        </div>
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
      <audio autoplay loop ref="audio">
      </audio>
      <div v-transfer-dom>
        <previewer :list="[{src:song.al.picUrl}]" ref="previewer"></previewer>
      </div>
    </blur>
  </div>
</template>

<script type="text/ecmascript-6">
  import Back from '@/components/back'
  import {Blur, Previewer, Swiper, SwiperItem, TransferDom, Range, InlineLoading} from 'vux'
  import {cutAr} from '@/assets/js/filters'
  import util from '@/assets/js/util'

  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        index: 0,
        isLoading: false, // 是否加载
        isPlaying: true,  // 是否播放中
        song: {},         // 当前歌曲信息
        mp3: {url: null}, // MP3来源
        lyric: '',        // 歌词
        height: 0,        // 窗口高度
        progress: 0       // 播放进度
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
      customTime (val) {
        if (!this.isPlaying) {
          let $audio = this.$refs.audio
          let current = val / 100 * $audio.duration
          $audio.currentTime = current
        }
      },
      showPic (index) {
        this.$refs.previewer.show(index)
      },
      songDetail () {
        let vm = this
        vm.song = vm.$store.state.songs.songs[vm.index]
        let id = vm.song.id
        vm.isLoading = true
        vm.axios.get(vm.api.music.detail, {params: {id}}).then((res) => {
          vm.isLoading = false
          if (res.data.status.code === 200) {
            vm.mp3 = res.data.data.mp3
            let $audio = vm.$refs.audio
            $audio.src = vm.mp3.url
            let timer = setInterval(() => {
              if ($audio.duration) {
                vm.updateProgress()
                clearInterval(timer)
              }
            }, 300)
          }
        }).catch(() => {
          this.$vux.toast.text('请求接口失败~~', 'middle')
        })
      },
      songLyric () {
        let id = this.song.id
        this.axios.get(this.api.music.lyric, {
          params: {
            id,
            'lv': -1,
            'kv': -1,
            'tv': -1
          }
        }).then((res) => {
          if (res.data.code === 200) {
            if (res.data.hasOwnProperty('lrc')) {
              this.lyric = util.lyricArr(res.data.lrc.lyric)
            } else {
              this.lyric = '暂无歌词'
            }
          }
        })
      },
      updateProgress () {
        let $audio = this.$refs.audio
        let duration = $audio.duration
        let min = document.getElementsByClassName('range-min')[0]
        let max = document.getElementsByClassName('range-max')[0]
        max.innerHTML = util.formatTime(duration)
        let timer = setInterval(() => {
          if ($audio.paused) {
            clearInterval(timer)
          } else {
            let current = $audio.currentTime
            min.innerHTML = util.formatTime(current)
            this.progress = current / duration * 100
          }
        }, 300)
      }
    },
    created () {
      this.index = this.$route.params.index
      this.songDetail()
      this.songLyric()
    },
    mounted () {
      let vm = this
      vm.height = vm.$refs.play.offsetHeight
      let $audio = vm.$refs.audio
      vm.$nextTick(() => {
        let $progress = document.getElementsByClassName('progress')[0]
        let $rangeHandle = $progress.getElementsByClassName('range-handle')[0]
        $rangeHandle.addEventListener('touchstart', function () {
          if (!$audio.paused) {
            vm.isPlaying = false
            $audio.pause()
          }
        })
        $rangeHandle.addEventListener('touchend', () => {
          setTimeout(() => {
            vm.isPlaying = true
            vm.updateProgress()
            $audio.play()
          }, 300)
        })
      })
    },
    filters: {
      cutAr
    },
    components: {
      Range,
      Blur,
      Back,
      Previewer,
      Swiper,
      SwiperItem,
      InlineLoading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  $skin = #56e3af

  .play
    position: absolute
    width: 100%
    height: 100%
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
      text-align: center
      .weui-loading
        vertical-align: top
      .text
        display: inline-block
        margin: 0 auto
        max-width: 200px
    .vux-slider
      text-align: center
    .singer
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
      position: absolute
      bottom: 30px
      width: 100%
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
          animation: 30s rotate linear forwards infinite
        &.paused
          animation-play-state: paused
    .controls
      position: absolute
      bottom: 30px
      width: 100%
      text-align: center
      .progress
        margin-bottom: 24px
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
