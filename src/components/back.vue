<template>
  <i class="back fa" :class="circle===true?'fa-arrow-circle-o-left':'fa-arrow-left'" :style="{fontSize:size}"
     aria-hidden="true" @click="goBack"></i>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: String,
        default: '1rem'
      },
      circle: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .back
    z-index: 999
    color: rgba(255, 255, 255, 0.8)
</style>
