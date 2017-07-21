/*
 * 歌手名字拼接
 * @param {Array} val: 歌手名字
 * @return {String} name: 歌手名字
 */
export function cutAr (val) {
  if (val.length === 1) {
    return val[0].name
  } else {
    return `${val[0].name}/${val[1].name}`
  }
}

/*
 * 将秒数格式化时间
 * @param {Number} seconds: 整数类型的秒数
 * @return {String} time: 格式化之后的时间 182=>03:02
 */
export function formatSeconds (seconds) {
  let min = Math.floor(seconds / 60)
  let second = seconds % 60
  let hour = 0
  let newMin = 0
  if (min > 60) {
    hour = Math.floor(min / 60)
    newMin = min % 60
  }
  if (second < 10) {
    second = '0' + second
  }
  if (min < 10) {
    min = '0' + min
  }
  return hour ? (hour + ':' + newMin + ':' + second) : (min + ':' + second)
}
