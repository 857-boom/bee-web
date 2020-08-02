import Vue from 'vue'

import {
  Input,
  Button,
  Form
} from 'ant-design-vue'

Vue.use(Input)
Vue.use(Button)
Vue.use(Form)

process.env.NODE_ENV !== 'production' && console.warn('NOTICE: use lazy-load.')
