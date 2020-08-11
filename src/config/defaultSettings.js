export default {
  appId: process.env.VUE_APP_OA_APP_ID,
  agentId: process.env.VUE_APP_OA_AGENT_ID,
  redirectUri: process.env.VUE_APP_OA_REDIRECT_URI,
  loginType: process.env.VUE_APP_OA_TYPE,
  navTheme: 'dark', // theme for nav menu
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fixed', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: true, // sticky header
  fixSiderbar: false, // sticky siderbar
  colorWeak: false,
  multiTab: true,
  menu: {
    locale: false
  },
  title: 'bee',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}
