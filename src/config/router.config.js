
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    redirect: '/homeUser',
  },
  {
    path: '/homeUser',
    name: 'homeUser',
    meta: { title: '门禁刷脸记录' },
    component: () => import('@/views/homeUser'),
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '酒精检测历史' },
    component: () => import('@/views/home'),
  },
  {
    path: '/statData',
    name: 'statData',
    meta: { title: '管理数据' },
    component: () => import('@/views/statData'),
  },
  {
    path: '/query',
    name: 'query',
    meta: { title: '管理数据', nav: true },
    component: () => import('@/views/query'),
  },
  {
    path: '/myHome',
    name: 'myHome',
    meta: { title: '酒精检测历史' },
    component: () => import('@/views/home'),
  },
  {
    path: '*', redirect: '/'
  }
]
/**
* 基础路由
* @type { *[] }
*/
export const constantRouterMap = []
