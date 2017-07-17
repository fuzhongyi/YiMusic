<template>
  <div class="music-list">
    <ul class="music-wrapper">
      <li>
        <div class="order">1
        </div>
        <div class="content">
          <span class="name">Brank New Vibe</span>
          <span class="author">Life</span>
        </div>
      </li>
      <li>
        <div class="order">2
        </div>
        <div class="content">
          <span class="name">绅士</span>
          <span class="author">薛之谦</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .music-list
    .music-wrapper
      li
        display: flex
        height: 100px
        width: 100%
        .order
          flex: 0 0 80px
          width: 80px
          font-size: 2rem
          font-weight: 400
          line-height: 100px
          text-align: center
          color: #56E3AF
        .content
          flex: 1
          .name
            display: block
            margin: 20px auto 20px 0
          .author
            display: block
            font-size: 1rem
            color: rgba(7, 17, 27, 0.5)
</style>
