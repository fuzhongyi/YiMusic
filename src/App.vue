<template>
  <div id="app">
    <loading></loading>
    <router-view></router-view>
  </div>
</template>

<script>
  import Loading from '@/components/loading'

  export default {
    components: {Loading},
    name: 'app'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/stylus/common/reset.stylus'
  @import './assets/stylus/index.styl'
</style>
