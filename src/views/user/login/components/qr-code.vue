<template>
  <div id="qrCode" class="qrCode"></div>
</template>

<script>
import remoteLoad from '@/utils/remote'
import defaultSettings from '@/config/defaultSettings'
import { isWechat, isDingtalk } from '@/utils/util'
export default {
  name: 'QrCode',
  async mounted () {
    if (isWechat()) {
      await remoteLoad('http://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js')
      window.WwLogin({
        id: 'qrCode',
        appid: defaultSettings.appId,
        agentid: defaultSettings.agentId,
        redirect_uri: defaultSettings.redirectUri,
        href: 'data:text/css;base64,TG1sdGNHOTNaWEpDYjNnZ0xuRnlZMjlrWlNCN2QybGtkR2c2SURJd01IQjRPMzBOQ2k1cGJYQnZkMlZ5UW05NElDNTBhWFJzWlNCN1pHbHpjR3hoZVRvZ2JtOXVaVHQ5RFFvdWFXMXdiM2RsY2tKdmVDQXVhVzVtYnlCN2QybGtkR2c2SURJd01IQjRPMzBOQ2k1emRHRjBkWE5mYVdOdmJpQjdaR2x6Y0d4aGVUb2dibTl1WlgwTkNpNXBiWEJ2ZDJWeVFtOTRJQzV6ZEdGMGRYTWdlM1JsZUhRdFlXeHBaMjQ2SUdObGJuUmxjanQ5'
      })
    } else if (isDingtalk()) {
      await remoteLoad('https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js')
      window.DDLogin({
        id: 'qrCode',
        goto: defaultSettings.redirectUri,
        style: 'border:none;background-color:#FFFFFF;'
      })
    }
  }
}
</script>
<style lang="stylus">
.qrCode
  text-align: center
  iframe
    width: 300px
    height 350px
</style>
