<template>
  <div class="music-list">
    <ul class="music-wrapper">
      <swipeout>
        <template v-for="song,index in getSongs">
          <swipeout-item transition-mode="reveal" :style="{'background': index%2!=0?'#F1F0F6':''}"
                         @click.native="toPlay(song)">
            <div slot="right-menu">
              <swipeout-button background-color="#59E3B0" @click.native="thumbsUp(index)">
                <i class="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
              </swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <li class="song-list" :style="{'background': index%2!=0?'#F1F0F6':''}">
                <div class="order">{{index + 1}}
                </div>
                <div class="content">
                  <span class="name">{{song.songname}}</span>
                  <span class="singer">{{song.artistname}}</span>
                  <div class="thumbs">
                    <countup :start-val="1" :end-val="song.thumbs" :duration="2" class="num"></countup>
                    <span class="text">赞</span>
                  </div>
                </div>
              </li>
            </div>
          </swipeout-item>
        </template>
      </swipeout>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Swipeout, SwipeoutItem, SwipeoutButton, Countup} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    methods: {
      toPlay (song) {
        this.$router.push({
          name: 'play',
          params: song
        })
      },
      thumbsUp (index) {
        this.$store.commit('songsThumbsAdd', index)
      }
    },
    computed: {
      ...mapGetters(['getSongs'])
    },
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Countup
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .music-list
    .music-wrapper
      .song-list
        display: flex
        height: 80px
        width: 100%
        .order
          flex: 0 0 80px
          width: 80px
          font-size: 2rem
          font-weight: 400
          line-height: 80px
          text-align: center
          color: #56E3AF
          overflow: hidden
        .content
          flex: 1
          position: relative
          padding-left: 8px
          .name
            display: block
            margin: 15px auto 15px 0
          .singer
            display: block
            max-width: 180px
            overflow: hidden
            font-size: 1rem
            white-space: nowrap
            text-overflow: ellipsis
            color: rgba(7, 17, 27, 0.5)
            @media only screen and (max-width: 320px)
              max-width: 150px
          .thumbs
            position: absolute
            right: 8px
            bottom: 8px
            .num
              font-weight: bold
              letter-spacing: -1px
              color: rgba(7, 17, 27, 0.4)
            .text
              color: rgba(7, 17, 27, 0.5)
</style>
