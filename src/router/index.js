import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes = [
  {
    path: '/store',
    component: Layout,
    redirect: '/example/table',
    name: 'Store',
    alwaysShow: true,
    meta: { title: '店铺', icon: 'component', roles: ['ROLE_MERCHANT'] },
    children: [
      {
        path: 'manage',
        name: 'storeManage',
        component: () => import('@/views/Store/storeManage'),
        meta: { title: '店铺管理', icon: 'table', roles: ['ROLE_MERCHANT'] }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/manage',
    name: 'Goods',
    meta: { title: '商品', icon: 'example', roles: ['ROLE_MERCHANT'] },
    children: [
      {
        path: 'manage',
        name: 'goodsManage',
        component: () => import('@/views/Goods/goodsManage'),
        meta: { title: '商品管理', icon: 'nested', roles: ['ROLE_MERCHANT'] }
      },
      {
        path: 'classfiy',
        name: 'goodsClassfiy',
        component: () => import('@/views/Goods/goodsClassfiy'),
        meta: { title: '商品分类', icon: 'tree-table', roles: ['ROLE_MERCHANT'] }
      }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/manage',
    name: 'Orders',
    alwaysShow: true,
    meta: { title: '订单', icon: 'excel', roles: ['ROLE_MERCHANT'] },
    children: [
      {
        path: 'singleManage',
        name: 'orderManage',
        component: () => import('@/views/Orders/orderManage'),
        meta: { title: '订单管理', icon: 'documentation', roles: ['ROLE_MERCHANT'] }
      }, {
        path: 'groupManage',
        name: 'orderManage',
        component: () => import('@/views/Orders/groupOrderManage'),
        meta: { title: '团单管理', icon: 'table', roles: ['ROLE_MERCHANT'] }
      }
    ]
  },
  {
    path: '/comments',
    component: Layout,
    redirect: '/comments/comment',
    name: 'Comments',
    meta: { title: '评论', icon: 'example', roles: ['ROLE_MERCHANT'] },
    children: [
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@/views/Comment/comment'),
        meta: { title: '评论管理', icon: 'message', roles: ['ROLE_MERCHANT'] }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/finance',
    name: 'Finance',
    meta: { title: '财务', icon: 'example', roles: ['ROLE_MERCHANT'] },
    children: [
      {
        path: 'finance',
        name: 'finance',
        component: () => import('@/views/Finance/finance'),
        meta: { title: '财务管理', icon: 'money', roles: ['ROLE_MERCHANT'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
