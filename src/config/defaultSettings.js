export default {
  appId: process.env.VUE_APP_OA_APP_ID,
  agentId: process.env.VUE_APP_OA_AGENT_ID,
  redirectUri: process.env.VUE_APP_OA_REDIRECT_URI,
  loginType: process.env.VUE_APP_OA_TYPE,
  navTheme: 'dark', // theme for nav menu
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fixed', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: true, // sticky header
  fixSiderbar: true, // sticky siderbar
  colorWeak: false,
  multiTab: true,
  menu: {
    locale: false
  },
  title: '统一登录平台',
  pwa: false,
  iconfontUrl: '',
  localStorageOptions: {
    namespace: 'bee_', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },
  // 配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    fullPath: '/admin/dashboard/workplace',
    path: '/admin/dashboard/workplace',
    meta: {
      keepAlive: true,
      permission: [ 'dashboard' ],
      title: '首页'
    },
    params: {},
    close: false
  },
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}
