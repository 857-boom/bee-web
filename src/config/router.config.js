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
      },
      {
        path: '/admin/application',
        name: 'application',
        redirect: '/admin/application/config',
        component: RouteView,
        meta: { title: '应用管理', keepAlive: true, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/admin/application/config',
            name: 'config',
            component: () => import('@/views/admin/application/config'),
            meta: { title: '应用配置', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },
      {
        path: '/admin/org',
        name: 'org',
        redirect: '/admin/org/config',
        component: RouteView,
        meta: { title: '组织架构', keepAlive: true, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/admin/org/department',
            name: 'department',
            component: () => import('@/views/admin/org/department'),
            meta: { title: '部门管理', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/admin/org/employee',
            name: 'employee',
            component: () => import('@/views/admin/org/employee'),
            meta: { title: '员工管理', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },
      {
        path: '/admin/system',
        name: 'system',
        redirect: '/admin/system',
        component: RouteView,
        meta: { title: '系统管理', keepAlive: true, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/admin/system/dictionary',
            name: 'dictionary',
            component: () => import('@/views/admin/system/dictionary/index'),
            meta: { title: '数据字典', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/admin/system/background',
            name: 'background',
            component: () => import('@/views/admin/system/background/index'),
            meta: { title: '背景图片', keepAlive: true, permission: [ 'dashboard' ] }
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
