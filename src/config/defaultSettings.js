console.log(process.env)
export default {
  title: 'bee',
  appId: process.env.VUE_APP_OA_APP_ID,
  agentId: process.env.VUE_APP_OA_AGENT_ID,
  redirectUri: process.env.VUE_APP_OA_REDIRECT_URI,
  loginType: process.env.VUE_APP_OA_TYPE
}
