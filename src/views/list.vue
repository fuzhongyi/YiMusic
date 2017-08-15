<template>
  <div class="list">
    <music-list></music-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import MusicList from '@/components/musicList'
  export default {
    components: {
      MusicList
    },
    created () {
      const vm = this
      let id = vm.$route.params.id
      vm.$store.commit('updateLoadingStatus', {isLoading: true})
      vm.axios.get(vm.api.music.playlist, {
        params: {
          'id': id
        }
      }).then((res) => {
        vm.$store.commit('updateLoadingStatus', {isLoading: false})
        if (res.data.code === 200) {
          let songList = res.data.result.tracks
          let thumbs = Math.round(Math.random() * 5000) + 2000
          songList.forEach((v) => {
            thumbs -= Math.round(Math.random() * 100)
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
