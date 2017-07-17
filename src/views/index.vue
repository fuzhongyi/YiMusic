<template>
  <div class="index">
    <div class="logo" ref="Yi" @click="shadow">Yi</div>
    <div class="say">Yi&nbsp;音乐</div>
    <div class="hello">一起,音乐</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index',
    methods: {
      shadow  () {
        setTimeout(() => {
          let yiElem = this.$refs.Yi
          let tsVal = []
          let i = 100
          while (i) {
            tsVal.push(`${i * 1}px ${i - 1 * 0.5}px #98eabc`)
            i--
          }
          yiElem.style.textShadow = tsVal.join(',')
        }, 1500)
      }
    },
    mounted () {
      this.shadow()
      setTimeout(() => {
        this.$router.push({
          name: 'home'
        })
      }, 4000)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .index
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: #13CE66
    .logo
      margin: 50% auto 0 auto
      width: 45vw
      height: 45vw
      font-size: 7rem
      font-weight: lighter
      text-align: center
      line-height: 45vw
      overflow: hidden
      border-radius: 50%
      background: #fff
      color: #13CE66
      transition: text-shadow 1s ease-in
      animation: logo 1.5s cubic-bezier(.35, .54, .73, 1.38)
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
</style>
