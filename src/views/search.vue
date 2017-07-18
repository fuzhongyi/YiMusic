<template>
  <div class="search">
    <div class="search-header">
      <div class="back-off">
        <back :size="'1.5rem'"></back>
      </div>
      <div class="text">音乐菜单</div>
      <div class="content">
        <input type="text" placeholder="输入你所需要查找的歌曲" v-model="searchKey" @blur="searchMusic">
      </div>
    </div>
    <music-list :songs="songs"></music-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import back from '@/components/back'
  import musicList from '@/components/musicList'

  export default {
    data () {
      return {
        searchKey: '',
        songs: []
      }
    },
    methods: {
      searchMusic () {
        this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=' + this.searchKey, {jsonp: 'callback'}).then((res) => {
          var songList = res.body.song
          for (let item of songList) {
            let song = {}
            this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=' + item.songid, {jsonp: 'callback'}).then((res) => {
              song.mp3 = res.body.bitrate.show_link
              song.img = res.body.songinfo.pic_big
              song.name = item.songname
              song.singer = item.artistname
              song.album = song.title + '.mp3'
              song.thumbs = Math.round(Math.random() * 3000)
              this.songs.push(song)
            })
          }
        })
      }
    },
    components: {
      back,
      musicList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../node_modules/font-awesome/css/font-awesome.min.css'

  .search
    .search-header
      padding: 18px 24px
      background: #77b6ad
      .back-off
        margin-bottom: 4px
      .text
        margin-bottom: 20px
        text-align: center
        font-size: 1.2rem
        font-weight: lighter
        color: #fff
      .content
        text-align: center
        input
          width: 60%
          font-size: 0.9rem
          text-align: center
          padding: 8px 20px
          border: 1px solid rgba(255, 255, 255, 0.5)
          border-radius: 20px
          outline: none
          background: transparent
          color: #fff
          &::placeholder
            color: rgba(255, 255, 255, 0.5)
</style>
