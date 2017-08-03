<template>
  <div class="music-list">
    <ul class="music-wrapper">
      <swipeout>
        <transition-group enter-active-class="animated bounceIn">
          <swipeout-item transition-mode="reveal" :style="{'background': index%2!=0?'#F1F0F6':''}"
                         @click.native="toPlay(index)" v-for="song,index in getSongs" :key="index">
            <div slot="right-menu">
              <swipeout-button background-color="#59E3B0" @click.stop.native="thumbsUp(index)">
                <i class="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
              </swipeout-button>
            </div>
            <div slot="content">
              <li class="song-list" :style="{'background': index%2!=0?'#F1F0F6':''}">
                <div class="order">{{index + 1}}
                </div>
                <div class="content">
                  <span class="name">{{song.name}}</span>
                  <span class="singer">{{ song.ar | cutAr }} - {{ song.al.name }}</span>
                  <div class="thumbs">
                    <countup :start-val="1" :end-val="song.thumbs" :duration="2" class="num"></countup>
                    <span class="text">赞</span>
                  </div>
                </div>
              </li>
            </div>
          </swipeout-item>
        </transition-group>
      </swipeout>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Swipeout, SwipeoutItem, SwipeoutButton, Countup} from 'vux'
  import {mapGetters} from 'vuex'
  import {cutAr} from '@/assets/js/filters'

  export default {
    methods: {
      toPlay (index) {
        this.$router.push({
          name: 'play',
          params: {'index': index}
        })
      },
      thumbsUp (index) {
        this.$store.commit('songsThumbsAdd', index)
      }
    },
    computed: {
      ...mapGetters(['getSongs'])
    },
    filters: {
      cutAr
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
            max-width: 280px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            margin: 15px auto 15px 0
            line-height: 1.1
            @media only screen and (max-width: 320px)
              max-width: 180px
          .singer
            display: block
            max-width: 180px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            line-height: 1.1
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
