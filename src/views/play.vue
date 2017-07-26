<template>
  <div class="play" ref="play">
    <blur :blur-amount="12" :url="song.al.picUrl" :height="height">
      <back :size="'1.5rem'"></back>
      <div class="name animated bounceInDown">
        <inline-loading v-show="isLoading"></inline-loading>
        <span class="text" :class="{small:song.name.length>12,smaller:song.name.length>22}">{{song.name}}</span>
      </div>
      <swiper :loop="true" :dots-position="'center'" :height="'65vh'" @on-index-change="swiperChange">
        <swiper-item>
          <div class="singer animated bounceInDown">
            <span class="line"></span>
            <span class="text"> {{ song.ar | cutAr }}</span>
            <span class="line"></span>
          </div>
          <div class="album animated bounceInDown">
            <span class="text">{{ song.al.name }}</span>
          </div>
          <div class="img animated flip">
            <img :src="song.al.picUrl" @click="showPic(0)" class="playing" :class="{paused:!isPlaying}"/>
          </div>
          <div class="lyric">
            {{isLoading ? '歌词加载中...' : ''}}
            {{lyric instanceof Array ? '' : (isLoading ? '' : lyric)}}
            {{lyricIndex === -1 ? '' : lyric[lyricIndex === undefined ? lyric.length - 1 : lyricIndex][1]}}
          </div>
        </swiper-item>
        <swiper-item>
          <div class="lyric-all">
            <p v-for="i in 6"></p>
            {{isLoading ? '歌词加载中...' : ''}}
            {{lyric instanceof Array ? '' : (isLoading ? '' : lyric)}}
            <p v-for="data,index in lyric" :class="{on:index==(lyricIndex===undefined?lyric.length-1:lyricIndex)}"
               @click="changeTime(data[0])">
              {{data[1]}}</p>
            <p v-for="i in 6"></p>
          </div>
        </swiper-item>
      </swiper>
      <div class="controls animated bounceInUp">
        <div class="progress">
          <range :value="progress"
                 :rangeBarHeight="3"
                 :minHTML="'00:00'"
                 :maxHTML="'00:00'"
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
      <audio ref="audio"></audio>
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
  import $ from 'jquery'
  import _ from 'underscore'

  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        index: 0,         // 当前播放歌曲下标
        isLoading: true,  // 是否加载
        isPlaying: false,  // 是否播放中
        isOnHold: true,   // 是否按住歌词
        song: {},         // 当前歌曲信息
        mp3: {url: null}, // MP3来源
        lyric: '暂无歌词', // 歌词
        height: 0,        // 窗口高度
        progress: 0,      // 播放进度
        current: 0,       // 当前时间
        duration: 0       // 总时间
      }
    },
    computed: {
      lyricIndex () {
        if (this.lyric instanceof Array && this.lyric.length !== 0) {
          for (let i in this.lyric) {
            if (this.current - 1.8 < this.lyric[i][0]) {
              return i
            }
          }
        } else {
          return -1
        }
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
          this.$vux.toast.text('已经是最后一首啦~', 'top')
          return
        }
        this.index += 1
        this.songDetail()
      },
      togglePlay () {
        let $audio = this.$refs.audio
        if ($audio.src.indexOf('null') !== -1) {
          this.isPlaying = false
          this.$vux.toast.text('sorry,暂未相关资源~', 'top')
          return
        }
        if ($audio.paused) {
          this.isPlaying = true
          this.isOnHold = false
          $audio.play()
          this.updateProgress()
          this.lyricRoll()
        } else {
          this.isPlaying = false
          $audio.pause()
        }
      },
      customTime (val) {
        if (!this.isPlaying && this.mp3.url !== null) {
          let $audio = this.$refs.audio
          let current = val / 100 * $audio.duration
          $audio.currentTime = current
          let min = document.getElementsByClassName('range-min')[0]
          min.innerHTML = util.formatTime(parseInt(current))
        }
      },
      changeTime (time) {
        let $audio = this.$refs.audio
        $audio.currentTime = time
        this.isOnHold = false
        this.lyricRoll()
      },
      showPic (index) {
        this.$refs.previewer.show(index)
      },
      songDetail () {
        const vm = this
        vm.song = vm.$store.state.songs.songs[vm.index]
        vm.songLyric()
        let id = vm.song.id
        vm.isLoading = true
        vm.axios.get(vm.api.music.detail, {params: {id}}).then((res) => {
          vm.isLoading = false
          if (res.data.status.code === 200) {
            vm.mp3 = res.data.data.mp3
            let $audio = vm.$refs.audio
            $audio.src = vm.mp3.url
            vm.togglePlay()
            let timer = setInterval(() => {
              if ($audio.duration) {
                vm.duration = parseInt($audio.duration)
                let max = document.getElementsByClassName('range-max')[0]
                let min = document.getElementsByClassName('range-min')[0]
                max.innerHTML = '00:00'
                min.innerHTML = '00:00'
                if (_.isUndefined(max)) {
                  clearInterval(timer)
                  return
                }
                max.innerHTML = util.formatTime(vm.duration)
                clearInterval(timer)
                vm.updateProgress()
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
        }).catch(() => {
          this.lyric = '暂无歌词'
        })
      },
      lyricRoll () {
        const vm = this
        let $audio = this.$refs.audio
        let timer = setInterval(() => {
          let on = $('.lyric-all p.on')
          if (vm.isOnHold || $audio.paused || on.length === 0) {
            clearInterval(timer)
            return
          }
          let top = on.parent().scrollTop() - (on.parent().offset().top - on.offset().top) - on.parent().height() / 2
          on.parent().animate({
            scrollTop: top
          })
        }, 3000)
      },
      updateProgress () {
        const vm = this
        let $audio = vm.$refs.audio
        let min = document.getElementsByClassName('range-min')[0]
        let timer = setInterval(() => {
          if (_.isUndefined($audio) || $audio.ended) {
            clearInterval(timer)
            vm.nextSong()
          } else if (_.isUndefined($audio) || $audio.paused) {
            clearInterval(timer)
          } else {
            vm.current = parseInt($audio.currentTime)
            min.innerHTML = util.formatTime(vm.current)
            vm.progress = vm.current / vm.duration * 100
          }
        }, 300)
      },
      swiperChange (index) {
        if (index && this.isOnHold) {
          this.isOnHold = false
          this.lyricRoll()
        }
      }
    },
    created () {
      this.index = this.$route.params.index
      this.songDetail()
    },
    mounted () {
      const vm = this
      vm.height = vm.$refs.play.offsetHeight
      vm.$nextTick(() => {
        let $progress = document.getElementsByClassName('progress')[0]
        let $rangeHandle = $progress.getElementsByClassName('range-handle')[0]
        let $ly = document.getElementsByClassName('lyric-all')[0]
        $rangeHandle.addEventListener('touchstart', () => {
          vm.togglePlay()
        })
        $rangeHandle.addEventListener('touchend', () => {
          setTimeout(() => {
            vm.togglePlay()
          }, 300)
        })
        $ly.addEventListener('touchstart', () => {
          vm.isOnHold = true
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
        max-height: 35px
        overflow: hidden
        &.small
          font-size: 1rem
        &.smaller
          font-size: 0.5rem
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
        display: inline-block
        padding: 2px 6px
        max-width: 220px
        overflow: hidden
        text-overflow: ellipsis
        font-size: 0.7rem
        line-height: 0.7rem
        border: 2px solid rgba(255, 255, 255, 0.5)
        border-radius: 5px
        white-space: nowrap
    .lyric
      position: absolute
      bottom: 30px
      width: 100%
      font-size: 0.9rem
      text-align: center
      color: $skin
    .lyric-all
      height: calc(100% - 30px)
      overflow: auto
      &::-webkit-scrollbar
        display: none
      p
        padding: 10px 0
        font-size: 0.8rem
        &.on
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
