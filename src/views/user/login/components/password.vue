<template>
  <a-form :form="form" class="login-form" :wrapper-col="{ span: 20, offset: 2 }" @submit="handleSubmit">
    <a-form-item>
      <a-input
        placeholder="请输入工号"
        size="large"
        v-decorator="['account', { rules: [{ required: true, message: '请输入工号' }] }]"
      >
        <a-icon slot="prefix" type="user" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password
        placeholder="请输入密码"
        size="large"
        v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" size="large" block>
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'Password',
  data () {
    return {
      form: this.$form.createForm(this, { name: 'login_form' }),
      switched: false
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
