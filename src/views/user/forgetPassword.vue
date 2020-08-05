<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="currentTab">
      <a-step title="验证信息" />
      <a-step title="重置登陆密码" />
      <a-step title="完成" />
    </a-steps>
    <div class="content">
      <div class="steps-content" v-if="currentTab === 0" @nextStep="nextStep">
        <a-form :form="form" class="forget-form">
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
              v-decorator="['name', { rules: [{required: true, message: '请输入' + validateTypeName }] }]"/>
          </a-form-item>
          <a-form-item
            label="验证码"
            :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapperCol="{ lg: { span: 19 }, sm: { span: 19 } }"
          >
            <a-input
              placeholder="请输入验证码"
              v-decorator="['captcha', { rules: [{required: true, message: '请输入验证码'}] }]">
              <a-icon slot="addonAfter" type="setting" />
            </a-input>
          </a-form-item>
        </a-form>
      </div>
      <div class="steps-content" v-if="currentTab === 1" @nextStep="nextStep">
        <a-form :form="form" class="forget-form">
          <a-form-item
            label="新密码"
            :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapperCol="{ lg: { span: 19 }, sm: { span: 19 } }"
          >
            <a-input-password placeholder="新密码" />
          </a-form-item>
          <a-form-item
            label="确认新密码"
            :labelCol="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapperCol="{ lg: { span: 19 }, sm: { span: 19 } }"
          >
            <a-input-password placeholder="确认新密码" />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </a-card>
</template>

<script>
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
      form: null,
      validateTypeName: VALIDATE_TYPE.PHONE.name
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
  text-align: center;

.forget-form
  max-width: 500px;
  margin: 40px auto 0;

</style>
