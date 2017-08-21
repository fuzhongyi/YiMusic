<template>
  <div id="app">
    <loading></loading>
    <drawer width="300px"
            :show.sync="drawerVisibility"
            :show-mode="'push'"
            :drawer-style="{width: '200px'}">
      <div class="layout" slot="drawer">
        <group title="一起,音乐" style="margin-top:20px;">
          <cell title="主页" link="/home" @click.native="drawerVisibility = false">
            <div slot="icon">
              <i class="fa fa-home" aria-hidden="true"></i>
            </div>
          </cell>
          <cell title="搜索" link="/search" @click.native="drawerVisibility = false">
            <div slot="icon">
              <i class="fa fa-search"></i>
            </div>
          </cell>
          <cell title="排行榜" link="/rank" @click.native="drawerVisibility = false">
            <div slot="icon">
              <i class="fa fa-headphones" aria-hidden="true"></i>
            </div>
          </cell>
        </group>
      </div>
      <view-box body-padding-bottom="0px">
        <transition :name="direction === 'forward' ? 'in' : 'out'">
          <router-view></router-view>
        </transition>
      </view-box>
    </drawer>
  </div>
</template>

<script>
  import Loading from '@/components/loading'
  import 'animate.css'
  import {Drawer, Group, Cell, ViewBox} from 'vux'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        drawerVisibility: false
      }
    },
    components: {
      Loading,
      Drawer,
      Group,
      Cell,
      ViewBox
    },
    computed: {
      ...mapState({
        direction: state => state.loading.direction
      })
    },
    created () {
      (() => {
        let startX = 0
        document.addEventListener('touchstart', (e) => {
          startX = e.changedTouches[0].clientX
        })
        document.addEventListener('touchend', (e) => {
          let endX = e.changedTouches[0].clientX
          if (endX - startX > 200) {
            this.drawerVisibility = true
          }
          if (endX - startX < -100) {
            this.drawerVisibility = false
          }
        })
      })()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../node_modules/vux/src/styles/1px.less';
  @import '../node_modules/vux/src/styles/close.less';
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/stylus/comm.styl'
  @import '../node_modules/font-awesome/css/font-awesome.min.css'

  .out-enter-active,
  .out-leave-active,
  .in-enter-active,
  .in-leave-active
    will-change: transform
    transition: all 500ms
    height: 100%
    position: absolute
    backface-visibility: hidden
    perspective: 1000

  .out-enter,
  .in-leave-active
    opacity: 0
    transform: translate3d(-100%, 0, 0)

  .out-leave-active,
  .in-enter
    opacity: 0
    transform: translate3d(100%, 0, 0)

  #app
    position: absolute
    width: 100%
    height: 100%
    overflow-x: hidden
    .vux-drawer-content
      .fa
        color: #56e3af
        margin-right: 5px
</style>
