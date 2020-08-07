export default {
  appId: process.env.VUE_APP_OA_APP_ID,
  agentId: process.env.VUE_APP_OA_AGENT_ID,
  redirectUri: process.env.VUE_APP_OA_REDIRECT_URI,
  loginType: process.env.VUE_APP_OA_TYPE,
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#52C41A', // primary color of ant design
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: true, // sticky header
  fixSiderbar: true, // sticky siderbar
  colorWeak: false,
  menu: {
    locale: true
  },
  title: 'bee',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}
