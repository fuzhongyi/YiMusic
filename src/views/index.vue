<template>
  <div class="index">
    <div class="logo">Yi</div>
    <div class="say">Yi&nbsp;音乐</div>
    <div class="hello">一起,音乐</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index',
    mounted () {
      setTimeout(() => {
        this.$router.push({
          name: 'search'
        })
      }, 4000)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/comm.styl'

  $textShadow = 0px 0px lighten($skin, 20)
  for n in 1...100
    $textShadow = $textShadow\,(n * 1.2)px (n - 0.5)px lighten($skin, 20)

  .index
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    background: $skin
    .logo
      width: 150px
      height: 150px
      font-size: 7rem
      font-weight: lighter
      text-align: center
      line-height: 150px
      overflow: hidden
      border-radius: 50%
      background: #fff
      color: $skin
      transition: text-shadow 1s ease-in
      animation: logo 2s cubic-bezier(.35, .54, .73, 1.38), textShadow 1.5s 2s linear forwards
    .say
      margin-top: 24px
      font-size: 1.5rem
      line-height: 1
      text-align: center
      color: #fff
      animation: say 1s linear
    .hello
      margin-top: 15px
      font-size: 1rem
      line-height: 1
      text-align: center
      font-family: KaiTi
      color: #fff
      animation: hello 1s linear

  @keyframes logo
    0%
      transform: translate3d(0, -100vh, 0)
    50%
      transform: translate3d(0, 20vh, 0)
    70%
      transform: translate3d(0, -10vh, 0)
    85%
      transform: translate3d(0, 5vh, 0)
    95%
      transform: translate3d(0, -5vh, 0)
    100%
      transform: translate3d(0, 0, 0)

  @keyframes say
    0%
      transform: translate3d(-100vw, 0, 0)
    100%
      transform: translate3d(0, 0, 0)

  @keyframes hello
    0%
      transform: translate3d(100vw, 0, 0)
    100%
      transform: translate3d(0, 0, 0)

  @keyframes textShadow
    from
      text-shadow: none
    to
      text-shadow: $textShadow
</style>
