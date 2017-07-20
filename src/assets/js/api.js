const agent = 'https://bird.ioliu.cn/v1/?url='

const wangYi = `${agent}http://music.163.com`

export default {
  music: {
    search: 'https://api.imjad.cn/cloudmusic/?type=search&s=',
    lyric: `${wangYi}/api/song/lyric`,
    detail: 'https://bird.ioliu.cn/netease/song',
    playlist: `${wangYi}/api/playlist/detail`
  }
}
