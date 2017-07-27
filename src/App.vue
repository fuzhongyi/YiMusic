<template>
  <div id="app">
    <loading></loading>
    <transition :name="direction === 'forward' ? 'in' : 'out'">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Loading from '@/components/loading'
  import 'animate.css'
  import {mapState} from 'vuex'
  export default {
    components: {
      Loading
    },
    computed: {
      ...mapState({
        direction: state => state.loading.direction
      })
    }
  }
</script>

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
</style>
