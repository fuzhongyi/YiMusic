<template>
  <i class="back fa fa-arrow-circle-o-left" :style="{fontSize:size}" aria-hidden="true" @click="goBack"></i>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: String,
        default: '1rem'
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../node_modules/font-awesome/css/font-awesome.min.css'

  .back
    color: rgba(255, 255, 255, 0.8)
</style>
