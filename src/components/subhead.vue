<template>
  <div class="subhead" :style="{'border-left': '5px solid '+color}">
    {{text}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      color: {
        type: String
      },
      text: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .subhead
    font-size: 1rem
    line-height: 1.2rem
    margin: .6rem 0
    padding: 0 .6rem
    border-left: 5px solid #56e3af
</style>
