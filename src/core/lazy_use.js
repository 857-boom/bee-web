import Vue from 'vue'

import {
  Input,
  Button,
  Select,
  Form,
  Card,
  Steps,
  Icon
} from 'ant-design-vue'

Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Card)
Vue.use(Steps)
Vue.use(Icon)

process.env.NODE_ENV !== 'production' && console.warn('NOTICE: use lazy-load.')
