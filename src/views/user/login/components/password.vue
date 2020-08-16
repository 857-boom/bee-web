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
      <a-button
        type="primary"
        html-type="submit"
        size="large"
        block
        :loading="state.loginBtn"
        :disabled="state.loginBtn">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Password',
  data () {
    return {
      form: this.$form.createForm(this, { name: 'login_form' }),
      switched: false,
      state: {
        time: 60,
        loginBtn: false
      }
    }
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit (e) {
      e.preventDefault()
      const {
        state,
        Login
      } = this
      state.loginBtn = true
      this.form.validateFields((err, values) => {
        if (!err) {
          Login(values).then(res => {
            this.$router.push({ path: '/' })
          })
            .finally(() => {
              state.loginBtn = false
            })
        }
      })
    }
  }
}
</script>
