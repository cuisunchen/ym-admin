import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },

  {
    path: '/orderManage',
    component: Layout,
    redirect: '/orderManage/business',
    meta: { title: '订单管理', icon: 'documentation' },
    children: [
      {
        path: 'question',
        component: () => import('@/myPages/orderManage/questionOrder'),
        name: 'question',
        meta: { title: '问答订单', icon: 'documentation' }
      },
      {
        path: 'luckDraw',
        component: () => import('@/myPages/orderManage/luckDrawOrder'),
        name: 'luckDraw',
        meta: { title: '好运订单', icon: 'documentation' }
      },
      {
        path: 'swiper',
        component: () => import('@/myPages/orderManage/swiperOrder'),
        name: 'swiper',
        meta: { title: '轮播订单', icon: 'documentation' }
      },
      {
        path: 'cover',
        component: () => import('@/myPages/orderManage/coverOrder'),
        name: 'cover',
        meta: { title: '开屏订单', icon: 'documentation' }
      },
      {
        path: 'dialog',
        component: () => import('@/myPages/orderManage/dialogOrder'),
        name: 'dialog',
        meta: { title: '插屏订单', icon: 'documentation' }
      },
      {
        path: 'recommend',
        component: () => import('@/myPages/orderManage/recommendOrder'),
        name: 'recommend',
        meta: { title: '推荐订单', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/usersManage',
    component: Layout,
    redirect: '/usersManage/business',
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'business',
        component: () => import('@/myPages/usrsManage/business'),
        name: 'business',
        meta: { title: '广告商用户', icon: 'documentation' }
      },
      {
        path: 'ordinary',
        component: () => import('@/myPages/usrsManage/ordinary'),
        name: 'ordinary',
        meta: { title: '普通用户', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/accountManage',
    component: Layout,
    redirect: '/messageManage/business',
    meta: { title: '账单管理', icon: 'documentation' },
    children: [
      {
        path: 'platfrom',
        component: () => import('@/myPages/accountManage/platfrom'),
        name: 'accountPlatfrom',
        meta: { title: '平台账单', icon: 'documentation' }
      },
      {
        path: 'business',
        component: () => import('@/myPages/accountManage/business'),
        name: 'accountBusiness',
        meta: { title: '广告商账单', icon: 'documentation' }
      },
      {
        path: 'ordinary',
        component: () => import('@/myPages/accountManage/ordinary'),
        name: 'accountOrdinary',
        meta: { title: '普通用户账单', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/messageManage',
    component: Layout,
    redirect: '/messageManage/business',
    meta: { title: '消息管理', icon: 'documentation' },
    children: [
      {
        path: 'business',
        component: () => import('@/myPages/messageManage/business'),
        name: 'messageManage',
        meta: { title: '广告商消息', icon: 'documentation' }
      },
      {
        path: 'ordinary',
        component: () => import('@/myPages/messageManage/ordinary'),
        name: 'messageManage',
        meta: { title: '普通用户消息', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/feedBackManage',
    component: Layout,
    redirect: '/feedBackManage/business',
    meta: { title: '反馈管理', icon: 'documentation' },
    children: [
      {
        path: 'business',
        component: () => import('@/myPages/feedBackManage/business'),
        name: 'feedBackManage',
        meta: { title: '广告商问题', icon: 'documentation' }
      },
      {
        path: 'ordinary',
        component: () => import('@/myPages/feedBackManage/ordinary'),
        name: 'feedBackManage',
        meta: { title: '普通用户问题', icon: 'documentation' }
      },
      {
        path: 'appeal',
        component: () => import('@/myPages/feedBackManage/appeal'),
        name: 'feedBackManage',
        meta: { title: '申诉问题', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/configManage',
    component: Layout,
    redirect: '/configManage/system/hobby',
    name: 'configManage',
    meta: {
      title: '配置管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'system',
        component: () => import('@/myPages/configManage/system'), // Parent router-view
        name: 'system',
        meta: { title: '系统配置', icon: 'documentation' },
        redirect: '/configManage/system/hobby',
        alwaysShow: true,
        children: [
          {
            path: 'hobby',
            component: () => import('@/myPages/configManage/system/hobby'),
            name: 'hobby',
            meta: { title: '兴趣配置' }
          },
          {
            path: 'message',
            component: () => import('@/myPages/configManage/system/message'),
            name: 'message',
            meta: { title: '消息配置' }
          },
          {
            path: 'others',
            component: () => import('@/myPages/configManage/system/others'),
            name: 'others',
            meta: { title: '其他配置' }
          },
          {
            path: 'loginConf',
            component: () => import('@/myPages/configManage/system/loginConfig'),
            name: 'loginConf',
            meta: { title: '登录方式配置' }
          }
        ]
      },
      {
        path: 'business',
        name: 'business',
        component: () => import('@/myPages/configManage/business'),
        meta: { title: '广告商配置', icon: 'documentation' },
        redirect: '/configManage/business/issue',
        alwaysShow: true,
        children: [
          {
            path: 'issue',
            component: () => import('@/myPages/configManage/business/issue'),
            name: 'issue',
            meta: { title: '发布配置' }
          },
          {
            path: 'othder',
            component: () => import('@/myPages/configManage/business/others'),
            name: 'othder',
            meta: { title: '其他配置' }
          }
        ]
      },
      {
        path: 'ordinary',
        name: 'ordinary',
        component: () => import('@/myPages/configManage/ordinary'),
        redirect: '/configManage/ordinary/orderTaking',
        meta: { title: '普通用户配置', icon: 'documentation' },
        children: [
          {
            path: 'orderTaking',
            component: () => import('@/myPages/configManage/ordinary/orderTaking'),
            name: 'orderTaking',
            meta: { title: '默认广告' }
          },
          {
            path: 'mine',
            component: () => import('@/myPages/configManage/ordinary/mine'),
            name: 'mine',
            meta: { title: '我的' }
          }
        ]
      }
    ]
  },
  {
    path: '/issueOrder',
    component: Layout,
    redirect: '/issueOrder/index',
    meta: { title: '官方发布', icon: 'documentation' },
    children: [
      {
        path: 'question',
        component: () => import('@/myPages/issueOrder/index'),
        name: 'issueOrder',
        meta: { title: '发布订单', icon: 'documentation' }
      },
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    // hidden: true,
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    hidden: true,
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    hidden: true,
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/theme',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
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
