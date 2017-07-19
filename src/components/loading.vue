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

<style lang="stylus" rel="stylesheet/stylus">
  .loading
    position: fixed
    z-index: 999
    top: 0
    right: 0
    bottom: 0
    left: 0
    .img
      margin: calc(50vh - 15vw) auto
      width: 30vw
      height: 30vw
      border-radius: 10px
      background: url("../assets/image/loading.gif") no-repeat
      background-size: cover
</style>
