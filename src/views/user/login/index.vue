<template>
  <section class="form-container">
    <header>
      <div class="qrcode-switch" :class="{animate:switched}" @click="switchLoginStyle" style="background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Cpath%20id%3D%22a%22%20d%3D%22M0%20.001h66c7.732%200%2014%206.268%2014%2014V80L0%20.001z%22%2F%3E%20%20%20%20%20%20%20%20%3Cfilter%20id%3D%22b%22%20width%3D%22107.5%25%22%20height%3D%22107.5%25%22%20x%3D%22-3.8%25%22%20y%3D%22-3.8%25%22%20filterUnits%3D%22objectBoundingBox%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20in%3D%22SourceAlpha%22%20result%3D%22shadowBlurInner1%22%20stdDeviation%3D%221.5%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%3CfeOffset%20dx%3D%223%22%20dy%3D%22-1%22%20in%3D%22shadowBlurInner1%22%20result%3D%22shadowOffsetInner1%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%3CfeComposite%20in%3D%22shadowOffsetInner1%22%20in2%3D%22SourceAlpha%22%20k2%3D%22-1%22%20k3%3D%221%22%20operator%3D%22arithmetic%22%20result%3D%22shadowInnerInner1%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%3CfeColorMatrix%20in%3D%22shadowInnerInner1%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.0203238225%200%22%2F%3E%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22%23FFF3E0%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22%23000%22%20filter%3D%22url%28%23b%29%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');">
        <a>
          <img alt="密码登录" title="工号密码登录" :src="imgUrl">
        </a>
      </div>
      <div class="logo">
        <img src="~@/assets/logo.png"/>
      </div>
      <h3 class="title">统一门户平台</h3>
    </header>
    <div class="tab-container">
      <password v-if="loginType === 'pwd'" />
      <qr-code ref="qrCode" v-else />
    </div>
    <p class="login-tips">登录时若有疑问，请联系产品经理</p>
    <p class="login-tips concat" v-if="loginType === 'pwd'" >
      <a id="forget-password" target="_blank" href="/password-forget.html">忘记密码？</a>
    </p>
  </section>
</template>

<script>
import Password from './components/password'
import QrCode from './components/qr-code'
import qrCodeSvg from '@/assets/qrcode.svg'
import pwdPng from '@/assets/password.png'
export default {
  name: 'Login',
  components: {
    Password,
    QrCode
  },
  data () {
    return {
      switched: false,
      loginType: 'pwd',
      imgUrl: qrCodeSvg
    }
  },
  methods: {
    switchLoginStyle () {
      this.switched = true
      setTimeout(() => {
        this.switched = false
        this.loginType = this.loginType === 'pwd' ? 'qrCode' : 'pwd'
        this.imgUrl = this.imgUrl === pwdPng ? qrCodeSvg : pwdPng
      }, 1000)
    }
  }

}
</script>

<style lang="stylus">
.form-container
  position: relative;
  margin: 8% auto;
  overflow: hidden;
  width: 400px;
  border-radius: 14px;
  background-color: #ffffff;
  box-shadow: 2px 10px 10px 0 rgba(0, 0, 0, 0.08);

  header
    .qrcode-switch
      position: absolute;
      width: 80px;
      height: 80px;
      right: 0;
      top: 0;
      cursor: pointer
      &.animate
        img
          transform:rotate(360deg);
      a
        display: inline-block;
        position: absolute;
        top: 8px;
        right: 8px;
        img
          transition: transform .8s ease-in-out;
          object-fit: contain;

    .logo
      margin-top: 48px;
      img
        display: block;
        margin: auto;
        width: 120px;
        height: 120px;
        text-align: center;
        object-fit: contain;
    .title
      margin-top: 10px;
      font-size: 22px;
      font-weight: 100;
      line-height: 1;
      text-align: center;

  .tab-container
    margin-top: 20px;

  .login-form
    margin: 10px 50px;

  .login-tips
    text-align: center;
    font-size: 14px;
    color: #929292;
    line-height: 1;
    margin-bottom: 25px;
</style>
