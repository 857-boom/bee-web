<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="currentTab">
      <a-step title="验证信息" />
      <a-step title="重置登陆密码" />
      <a-step title="完成" />
    </a-steps>
    <div class="content">
      <div class="steps-content" v-if="currentTab === 0" @nextStep="nextStep">
        <a-form :form="sendCaptchaForm" class="forget-form" @submit="handleValidateSubmit">
          <a-form-item
            label="验证方式"
            :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapperCol="{ lg: { span: 19 }, sm: { span: 19 } }"
          >
            <a-select defaultValue="0" @change="switchValidate">
              <a-select-option value="0">手机验证</a-select-option>
              <a-select-option value="1">邮箱验证</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="用户名"
            :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapperCol="{ lg: { span: 19 }, sm: { span: 19 } }"
          >
            <a-input
              placeholder="请输入用户名"
              v-decorator="['username', { rules: [{required: true, message: '请输入用户名'}] }]"/>
          </a-form-item>
          <a-form-item
            :label="validateTypeName"
            :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapperCol="{ lg: { span: 19 }, sm: { span: 19 } }"
          >
            <a-input
              :placeholder="'请输入' + validateTypeName"
              v-decorator="['channel', { rules: [{required: true, message: '请输入' + validateTypeName }, {validator: validate}] }]"/>
          </a-form-item>
          <a-form-item
            label="验证码"
            :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapperCol="{ lg: { span: 19 }, sm: { span: 19 } }"
          >
            <a-input-search
              placeholder="请输入验证码"
              v-decorator="['captcha', { rules: [{required: true, message: '请输入验证码'}] }]"
              :enter-button="!captcha.send ? captcha.enterButton : captcha.time"
              @search="sendCaptcha" />
          </a-form-item>
          <a-form-item
            :wrapperCol="{ lg: { span: 5 }, sm: { span: 19 }, offset: 21 }"
          >
            <a-button type="primary" html-type="submit">
              确定
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="steps-content" v-if="currentTab === 1" @nextStep="nextStep">
        <a-alert
          message="密码要求"
          type="info"
          show-icon
        >
          <span slot="description">
            <P>* 长度：6-20，不能输入空格</P>
            <P>* 需包含大小写 字母、数字、特称字符，至少8个字符</P>
            <P>* 不能使用系统分配的初始默认密码</P>
          </span>
        </a-alert>
        <a-form :form="passwordForm" class="forget-form" @submit="handleSubmit">
          <a-form-item
            label="新密码"
            :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapperCol="{ lg: { span: 19 }, sm: { span: 19 } }"
          >
            <a-input-password
              placeholder="请输入新密码"
              v-decorator="['password', { rules: [{required: true, message: '请输入新密码' }, {validator: validatePassword}] }]" />
          </a-form-item>
          <a-form-item
            label="确认新密码"
            :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapperCol="{ lg: { span: 19 }, sm: { span: 19 } }"
          >
            <a-input-password
              placeholder="请输入确认新密码"
              v-decorator="['configPassword', { rules: [{required: true, message: '请输入新密码' }, {validator: validatePassRepeat}] }]" />
          </a-form-item>
          <a-form-item
            :wrapperCol="{ lg: { span: 5 }, sm: { span: 19 }, offset: 20 }"
          >
            <a-button type="primary" html-type="submit">
              确定
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="steps-content" v-if="currentTab === 1" @nextStep="nextStep">
        <a-form>
          <a-result title="操作成功" :is-success="true" sub-title="正在跳转中..." style="max-width: 560px; margin: 40px auto 0;" />
        </a-form>
      </div>
    </div>
  </a-card>
</template>

<script>
import { testPhone, testEmail, testPassword } from '@/utils/validate'
const VALIDATE_TYPE = {
  PHONE: {
    name: '手机号码'
  },
  EMAIL: {
    name: '电子邮箱'
  }
}
export default {
  name: 'Forget',
  data () {
    return {
      currentTab: 0,
      sendCaptchaForm: this.$form.createForm(this, { name: 'sendCaptchaForm' }),
      passwordForm: this.$form.createForm(this, { name: 'passwordForm' }),
      validateTypeName: VALIDATE_TYPE.PHONE.name,
      captcha: {
        enterButton: '发送验证码',
        time: 60,
        send: false
      }
    }
  },
  methods: {
    // handler
    nextStep () {
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    },
    switchValidate (value) {
      this.validateTypeName = this.validateTypeName === VALIDATE_TYPE.PHONE.name ? VALIDATE_TYPE.EMAIL.name : VALIDATE_TYPE.PHONE.name
    },
    handleValidateSubmit (e) {
      e.preventDefault()
      this.sendCaptchaForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.passwordForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    sendCaptcha () {
      if (this.captcha.send) {
        return
      }
      this.sendCaptchaForm.validateFields(['username', 'channel'], { force: true }, (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.captcha.time = 60
          this.captcha.send = true
          this.countDown()
        }
      })
    },
    countDown () {
      if (this.captchaTimer) {
        clearTimeout(this.captchaTimer)
      }
      this.captchaTimer = setTimeout(() => {
        this.captcha.time -= 1
        if (this.captcha.time < 0) {
          this.captcha.send = false
          clearTimeout(this.captchaTimer)
        } else {
          this.countDown()
        }
      }, 1000)
    },
    validate (rule, value, callback) {
      if (typeof (value) === 'undefined' || value === '') {
        callback()
      } else {
        if (this.validateTypeName === VALIDATE_TYPE.PHONE.name) {
          if (!testPhone(value)) {
            callback(new Error('请输入正确手机格式'))
          }
          callback()
        } else {
          if (!testEmail(value)) {
            callback(new Error('请输入正确邮箱格式'))
          }
          callback()
        }
      }
    },
    validatePassword (rule, value, callback) {
      if (!testPassword(value)) {
        return callback(new Error('必须包含大小写 字母、数字、特称字符，至少8个字符'))
      } else {
        callback()
      }
    },
    validatePassRepeat (rule, value, callback) {
      if (!testPassword(value)) {
        return callback(new Error('必须包含大小写 字母、数字、特称字符，至少8个字符'))
      } else {
        const pwd = this.passwordForm.getFieldValue('password')
        if (pwd !== value) {
          return callback(new Error('确认密码与新密码不一致'))
        }
        callback()
      }
    }
  }
}
</script>

<style lang="stylus">
.steps-content
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;

.forget-form
  max-width: 500px;
  margin: 40px auto 0;

</style>
