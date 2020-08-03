<template>
  <div id="qrCode" class="qrCode"></div>
</template>

<script>
import remoteLoad from '@/utils/remote'
export default {
  name: 'QrCode',
  async created () {
    await remoteLoad('https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js')
    await remoteLoad('http://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js')
  },
  methods: {
    login () {
      this.$nextTick(() => {
        const url = encodeURIComponent('http://localhost:8080/home')
        const goto = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=你的appid&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + url)
        window.DDLogin({
          id: 'qrCode',
          goto: goto,
          style: 'border:none;background-color:#FFFFFF;',
          width: '365',
          height: '400'
        })
        window.WwLogin({
          id: 'qrCode',
          appid: '1000000',
          agentid: '1000000',
          redirect_uri: encodeURIComponent('http://www.baidu.com'),
          state: '1211111'
        })
      })
    }
  }
}
</script>
<style lang="stylus">
.qrCode
  text-align: center
</style>
