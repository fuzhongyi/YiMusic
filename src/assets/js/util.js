/**
 * 将秒数格式化时间
 * @param {Number} time: 整数类型的秒数
 * @return {String} time: 格式化之后的时间 182=>03:02
 */
const formatTime = time => {
  var minute = parseInt(time / 60)
  if (minute < 10) {
    minute = '0' + minute
  }
  var secound = parseInt(time % 60)
  if (secound < 10) {
    secound = '0' + secound
  }
  return minute + ':' + secound
}

/**
 * 歌词数组化
 * @param {String} text  : 歌词
 * @returns {Array} result :数组化的歌词
 */
const lyricArr = text => {
  // 将数据分隔成一行一行，存入数组
  let lines = text.split('\n')
  // 用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
  let pattern = /\[\d{2}:\d{2}.\d{2}\]/g
  let pattern3 = /\[\d{2}:\d{2}.\d{3}\]/g
  // 保存最终结果的数组
  let result = []
  // 去掉不含时间的行[暂不考虑]
  // while (!pattern.test(lines[0])) {
  //   lines = lines.slice(1)
  // }
  // 上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
  lines[lines.length - 1].length === 0 && lines.pop()
  lines.forEach(function (v, i, a) {
    // 提取出时间[xx:xx.xx]
    let time = v.match(pattern)
    // 提取歌词
    let value = v.replace(pattern, '')
    if (time === null) {
      time = v.match(pattern3)
      value = v.replace(pattern3, '')
    }
    if (value !== '') {
      // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
      time.forEach(function (v1, i1, a1) {
        // 去掉时间里的中括号得到xx:xx.xx
        let t = v1.slice(1, -1).split(':')
        // 将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
      })
    }
  })
  // 最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
  result.sort(function (a, b) {
    return a[0] - b[0]
  })
  return result
}

export default {
  formatTime,
  lyricArr
}
