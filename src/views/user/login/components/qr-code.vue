<template>
  <div></div>
</template>

<script>
import remoteLoad from '@/utils/remote'
export default {
  name: 'QrCode',
  async created () {
    console.log(2)
    await remoteLoad('https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js')
  },
  mounted () {
    const url = encodeURIComponent('http://localhost:8080/home')
    const goto = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=你的appid&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + url)
    var obj = DDLogin({
      id: 'tab-container',
      goto: goto,
      style: 'border:none;background-color:#FFFFFF;',
      width: '365',
      height: '400'
    })
  }
}
</script>
