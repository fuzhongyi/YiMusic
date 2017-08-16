<template>
  <div class="list">
    <view-box body-padding-top="46px" body-padding-bottom="0px">
      <x-header slot="header"
                style="width:100%;position:fixed;left:0;top:0;z-index:100;"
                :left-options="{backText: ''}"
                :title="$route.query.title"
                :transition="headerTransition"></x-header>
      <music-list></music-list>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import MusicList from '@/components/musicList'
  import {XHeader, ViewBox} from 'vux'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        direction: state => state.loading.direction
      }),
      headerTransition () {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      }
    },
    components: {
      MusicList,
      XHeader,
      ViewBox
    },
    created () {
      const vm = this
      let id = vm.$route.params.id
      vm.$store.commit('songsInit')
      vm.$store.commit('updateLoadingStatus', {isLoading: true})
      vm.axios.get(vm.api.music.playlist, {
        params: {
          'id': id
        }
      }).then((res) => {
        vm.$store.commit('updateLoadingStatus', {isLoading: false})
        if (res.data.code === 200) {
          let songList = res.data.result.tracks
          let thumbs = Math.round(Math.random() * 7999) + 2000
          let num = thumbs / songList.length
          songList.forEach((v) => {
            thumbs -= Math.round(Math.random() * num)
            v.thumbs = thumbs
            v.al = v.album
            v.ar = v.artists
          })
          vm.$store.commit('setSongs', songList)
        } else {
          vm.$vux.toast.text(`请求接口失败~~${res.data.code}`, 'middle')
        }
      }).catch((error) => {
        vm.$store.commit('updateLoadingStatus', {isLoading: false})
        vm.$vux.toast.text('请求接口失败~~', 'middle')
        console.log(error)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
