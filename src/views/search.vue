<template>
  <div class="search">
    <sticky>
      <div class="search-header" :style="{height:isShowHistory?'101px':'34px'}">
        <transition
          enter-active-class="animated bounceIn"
          leave-active-class="animated bounceOut">
          <div class="text" v-show="isShowHistory">音乐菜单</div>
        </transition>
        <div class="content">
          <input type="text" placeholder="输入你所需要查找的歌曲"
                 v-model="searchKey" @keyup="searchMusic" ref="search">
        </div>
      </div>
    </sticky>
    <view-box body-padding-bottom="0px">
      <transition enter-active-class="animated bounceIn">
        <p class="inline-loading" v-show="isLoading">
          <inline-loading></inline-loading>
          <span class="text">正在加载</span>
        </p>
      </transition>
      <div class="history" v-show="isShowHistory">
        <ul class="history-wrapper">
          <li class="history-item vux-1px-b"
              v-for="item,index in history"
              :key="index"
              @click="chooseHistory(item)">
            <i class="fa fa-history"></i>
            <span class="text">{{item}}</span>
            <i class="close fa fa-times" @click.stop="delHistory(item)"></i>
          </li>
          <li class="clear vux-1px-b" @click="clearHistory">
            {{history.length ? '清空搜索历史' : '暂未搜索记录'}}
          </li>
        </ul>
      </div>
      <music-list v-show="!isShowHistory"></music-list>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import Back from '@/components/back'
  import MusicList from '@/components/musicList'
  import _ from 'underscore'
  import $ from 'jquery'
  import {ViewBox, Sticky, InlineLoading} from 'vux'

  export default {
    data () {
      return {
        searchKey: '',
        search: null,
        isLoading: false,
        isFocus: false,
        history: []
      }
    },
    components: {
      Back,
      MusicList,
      ViewBox,
      Sticky,
      InlineLoading
    },
    computed: {
      isShowHistory () {
        if (_.isEmpty(this.searchKey) && !this.isFocus) {
          return true
        }
        return false
      }
    },
    watch: {
      searchKey (curVal) {
        if (curVal.trim().length === 0) {
          this.searchKey = ''
        }
        sessionStorage.searchKey = this.searchKey
      }
    },
    methods: {
      getMusic () {
        const vm = this
        if (vm.searchKey.length === 0) {
          return
        }
        vm.$refs.search.blur()
        vm.$store.commit('songsInit')
        vm.isLoading = true
        vm.searchKey = vm.searchKey.trim()
        let searchKey = vm.searchKey
        sessionStorage.searchKey = ''
        let history = localStorage.searchHistory ? localStorage.searchHistory.split(',') : []
        history.unshift(searchKey)
        vm.history = _.uniq(history)
        localStorage.searchHistory = vm.history.join(',')
        vm.axios.post(vm.api.music.search + searchKey).then((res) => {
          vm.isLoading = false
          if (res.data.code === 200) {
            let songList = res.data.result.songs
            let time = 0
            let thumbs = Math.round(Math.random() * 7999) + 2000
            let num = thumbs / songList.length
            songList.forEach((v) => {
              thumbs -= Math.round(Math.random() * num)
              v.thumbs = thumbs
              setTimeout(() => {
                vm.$store.commit('songsAdd', v)
              }, time)
              time += 100
            })
          }
        }).catch(function () {
          vm.$vux.toast.text('请求接口失败~~', 'middle')
          vm.isLoading = false
        })
      },
      searchMusic () {
        if (this.search === null) {
          this.search = _.debounce(this.getMusic, 1000)
        }
        this.search()
      },
      clearHistory () {
        const vm = this
        if (vm.history.length === 0) {
          return
        }
        vm.$vux.confirm.show({
          title: '温馨提示',
          content: '是否清空所有搜索记录',
          hideOnblur: true,
          onConfirm () {
            vm.history = []
            localStorage.removeItem('searchHistory')
          }
        })
      },
      delHistory (searchKey) {
        const vm = this
        let $hItem = $(`.history-item:eq(${vm.history.indexOf(searchKey)})`)
        $hItem.addClass('animated bounceOutLeft')
        setTimeout(() => {
          $hItem.removeClass('animated bounceOutLeft')
          vm.history = vm.history.filter(v => v !== searchKey)
          localStorage.searchHistory = vm.history.join(',')
        }, 300)
      },
      chooseHistory (searchKey) {
        this.searchKey = searchKey
        this.getMusic()
      }
    },
    created () {
      let history = localStorage.searchHistory ? localStorage.searchHistory.split(',') : []
      let searchKey = sessionStorage.searchKey ? sessionStorage.searchKey : ''
      this.history = history
      this.searchKey = searchKey
    },
    mounted () {
      let $search = this.$refs.search
      $search.addEventListener('focus', () => {
        this.isFocus = true
      })
      $search.addEventListener('blur', () => {
        this.isFocus = false
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/comm.styl'

  .search
    .search-header
      padding: 18px 24px
      background-image: linear-gradient(45deg, #46B3BA, rgba(0, 0, 0, 0))
      transition: all .3s
      &:after
        content: ''
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        z-index: -1
        background: rgba(70, 179, 186, 0.2)
      .text
        margin: 20px 0 28px 0
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
          padding: 5px 20px 5px 10px
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
