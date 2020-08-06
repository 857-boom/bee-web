import Vue from 'vue'

import {
  Input,
  Button,
  Select,
  Form,
  Card,
  Steps,
  Icon,
  Alert,
  Result
} from 'ant-design-vue'

Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Card)
Vue.use(Steps)
Vue.use(Icon)
Vue.use(Alert)
Vue.use(Result)

process.env.NODE_ENV !== 'production' && console.warn('NOTICE: use lazy-load.')
