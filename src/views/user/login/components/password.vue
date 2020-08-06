<template>
  <a-form :form="form" class="login-form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit">
    <a-form-item label="用户名">
      <a-input
        placeholder="请输入工号"
        size="large"
        v-decorator="['account', { rules: [{ required: true, message: '请输入工号' }] }]"
      />
    </a-form-item>
    <a-form-item>
      <label slot="label">密&nbsp;&nbsp;&nbsp;码</label>
      <a-input-password
        placeholder="请输入密码"
        size="large"
        v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 22, offset: 1 }">
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
