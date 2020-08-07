import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
// import '@/components/NProgress/nprogress.less' // progress bar custom style

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './global.less'
Vue.config.productionTip = false

Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
