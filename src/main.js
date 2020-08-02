import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import '@/components/NProgress/nprogress.less' // progress bar custom style

import './core/lazy_use'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
