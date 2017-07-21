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

  export default {
    components: {
      Loading
    },
    name: 'app'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/stylus/common/reset.stylus'
  @import './assets/stylus/index.styl'

  .slide-left-enter-active, .slide-left-leave-active
    transition: transform .5s
    transform-origin: left

  .slide-left-enter, .slide-left-leave-active
    transform: scale(0, 1)
</style>
