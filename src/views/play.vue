<template>
  <div class="play">{{song.mp3}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        song: {}
      }
    },
    methods: {
      getSongDate () {
        this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=' + this.song.songid, {jsonp: 'callback'}).then((res) => {
          this.$set(this.song, 'mp3', res.body.bitrate.show_link)
          this.$set(this.song, 'img', res.body.songinfo.pic_big)
        })
      }
    },
    created () {
      this.song = this.$route.params
      this.getSongDate()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
