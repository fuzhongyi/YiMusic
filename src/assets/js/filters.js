/**
 * 歌手名字拼接
 * @param {Array} val: 歌手名字
 * @return {String} name: 歌手名字
 */
const cutAr = val => {
  if (val.length === 1) {
    return val[0].name
  } else {
    return `${val[0].name}/${val[1].name}`
  }
}

/**
 * 播放数量(单位:万)
 *
 * @param val
 */
const playCount = val => Math.round(val / 10000)

export {
  cutAr,
  playCount
}
