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
