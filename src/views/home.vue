<template>
  <div class="home">
    <drawer
      :show="isShow">
      <div class="layout" slot="drawer">
        <h2><a href="#">bajian drawer</a></h2>
        <ul>
          <li v-for="item in [1,2,3,4]">{{item}}</li>
        </ul>
      </div>
    </drawer>
    123456
  </div>
</template>

<script type="text/ecmascript-6">
  import {Drawer} from 'vux'

  export default {
    components: {
      Drawer
    },
    data () {
      return {
        isShow: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .vux-demo
    text-align: center

  .logo
    width: 100px
    height: 100px
</style>
