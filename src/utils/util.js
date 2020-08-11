import defaultSettings from '@/config/defaultSettings'

export function isWechat () {
  console.log(defaultSettings.loginType)
  console.log(defaultSettings.loginType === 'wechat')
  return defaultSettings.loginType === 'wechat'
}

export function isDingtalk () {
  console.log(defaultSettings.loginType)
  console.log(defaultSettings.loginType === 'dingtalk')
  return defaultSettings.loginType === 'dingtalk'
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

export function actionToObject (json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log('err', e.message)
  }
  return []
}

export function objectToJson (obj) {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    console.log('err', e.message)
  }
  return []
}

export function diff (obj1, obj2) {
  delete obj1.close
  const o1 = obj1 instanceof Object
  const o2 = obj2 instanceof Object
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }

  for (const attr in obj1) {
    const t1 = obj1[attr] instanceof Object
    const t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
