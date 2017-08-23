<template>
  <div class="loading" v-show="isLoading">
    <div class="img"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        isLoading: store => store.loading.isLoading
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loading
    position: fixed
    z-index: 999
    top: 0
    right: 0
    bottom: 0
    left: 0
    .img
      margin: calc(50vh - 15vw) auto
      width: 90px
      height: 90px
      border-radius: 50%
      background: url("../assets/image/loading.gif") no-repeat
      background-size: cover
      box-shadow: 0 0 20px rgba(0, 0, 0, .1)
</style>
