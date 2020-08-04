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
