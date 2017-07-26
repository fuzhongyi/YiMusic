<template>
  <div id="app">
    <loading></loading>
    <transition name="slide-left">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Loading from '@/components/loading'
  import 'animate.css'
  export default {
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/stylus/common/reset.stylus'
  @import './assets/stylus/index.styl'
  @import '../node_modules/font-awesome/css/font-awesome.min.css'

  .slide-left-enter-active, .slide-left-leave-active
    transition: transform .5s
    transform-origin: left

  .slide-left-enter, .slide-left-leave-active
    transform: scale(0, 1)
</style>
