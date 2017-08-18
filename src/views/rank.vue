<template>
  <div class="rank">
    <subhead text="音乐特色榜"></subhead>
    <flexbox justify="center" wrap="wrap" :gutter="0">
      <flexbox-item :span="1/2" v-for="item,index in specialList" :key="item.id">
        <router-link class="music-list" :to="{ path: '/music/list/'+item.id,query:{title: item.title}}"
                     :style="{'padding':(index+1)%2?'5px 2.5px 0px 5px':'5px 5px 0px 2.5px'}">
          <img :src="item.src" width="100%" height="100%">
        </router-link>
      </flexbox-item>
    </flexbox>
    <subhead text="全球榜"></subhead>
    <flexbox justify="center" wrap="wrap" :gutter="0">
      <flexbox-item :span="1/3" v-for="item,index in globalList" :key="item.id">
        <router-link class="music-list" :to="{ path: '/music/list/'+item.id,query:{title: item.title}}"
                     :style="{'padding':(index+1)%3?'5px 2.5px 0px 5px':'5px 5px 0px 2.5px'}">
          <img :src="item.src" width="100%" height="100%">
        </router-link>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import Subhead from '@/components/subhead'
  import {Flexbox, FlexboxItem} from 'vux'

  const data = require('../../data.json')

  export default {
    components: {
      Subhead,
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        specialList: data.specialList,
        globalList: data.globalList
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rank
    max-width: 750px
    margin: 0 auto
    .music-list
      display: block
      text-align: center
</style>
