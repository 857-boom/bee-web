// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '主页' },
    redirect: '/admin/dashboard/workplace',
    children: [
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        redirect: '/admin/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/admin/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/admin/dashboard/workplace'),
            meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: BlankLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/login')
      },
      {
        path: 'forget-password',
        name: 'forgetPassword',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/forgetPassword')
      }
    ]
  }
]
