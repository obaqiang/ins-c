/*
 * @Description: 工具方法
 * @Author: panwenda
 * @Date: 2021-11-11 16:33:58
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-30 19:58:14
 */

function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

function deepCopy(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    o = {}
    for (const i in data) {
      o[i] = deepCopy(data[i])
    }
  } else {
    return data
  }

  return o
}

module.exports = {
  deepCopy
}
