/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-11-08 11:29:14
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 15:18:13
 */
// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'
// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home', hiddenHeaderContent: true, permission: ['runCenter'] },
    redirect: '/dashboard/workplace',

    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: '运营看板',
          keepAlive: true,
          permission: ['dashboard']
        },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '运营看板', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/setting',
        name: 'setting',
        redirect: '/setting/advertise',
        component: RouteView,
        meta: {
          title: '运营配置',
          keepAlive: true,
          permission: ['rcSetting'],
          hiddenHeaderContent: true
        },
        children: [
          {
            path: '/setting/advertise',
            name: 'advertise',
            component: () => import('@/views/setting/advertise/index'),
            meta: { title: '广告配置', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/setting/edit-advertise',
            name: 'editAdvertise',
            component: () => import('@/views/setting/advertise/EditAdvertise'),
            hidden: true,
            meta: { title: '编辑广告', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/setting/theme',
            name: 'theme',
            component: () => import('@/views/setting/theme/index'),
            meta: { title: '专题配置', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/setting/edit-theme',
            name: 'theme',
            component: () => import('@/views/setting/theme/EditTheme'),
            hidden: true,
            meta: { title: '编辑专题', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/setting/community',
            name: 'community',
            component: () => import('@/views/setting/community/index'),
            meta: { title: '社群管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/setting/add-community',
            name: 'add-community',
            component: () => import('@/views/setting/community/AddCommunity'),
            hidden: true,
            meta: { title: '新增社群', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/setting/view-community',
            name: 'view-community',
            component: () => import('@/views/setting/community/ViewCommunity'),
            hidden: true,
            meta: { title: '查看社群', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/setting/community-contact',
            name: 'community-contact',
            component: () => import('@/views/setting/community/CommunityContact'),
            hidden: true,
            meta: { title: '设置进群联系人', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/setting/law',
            name: 'law',
            component: () => import('@/views/setting/law/index'),
            meta: { title: '法律文案', keepAlive: true, permission: ['rcsLaw'] }
          },
          {
            path: '/setting/configure-law',
            name: 'law',
            component: () => import('@/views/setting/law/ConfigureLaw'),
            hidden: true,
            meta: { title: '配置法律文案', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/custom',
        name: 'custom',
        redirect: 'custom/index',
        component: RouteView,
        meta: {
          title: '自定义配置',
          keepAlive: true,
          permission: ['dashboard'],
          hiddenHeaderContent: true
        },
        children: [
          {
            path: '/custom/index',
            name: 'custompage',
            component: () => import('@/views/custom/index/index'),
            meta: { title: '自定义配置', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/basic',
        name: 'basic',
        component: RouteView,
        meta: {
          title: '基础配置',
          keepAlive: true,
          permission: ['rcBasic'],
          hiddenHeaderContent: true
        },
        children: [
          {
            path: '/basic/page',
            name: 'page',
            component: RouteView,
            redirect: '/basic/page/index',
            meta: { title: '页面配置', keepAlive: true, permission: ['dashboard'] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/basic/page/index',
                name: 'pageIndex',
                hidden: true,
                component: () => import('@/views/basic/page/index'),
                meta: { title: '页面配置', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/basic/page/editComp',
                name: 'editComp',
                hidden: true,
                component: () => import('@/views/basic/page/editComp'),
                meta: { title: '页面配置', keepAlive: true, permission: ['dashboard'] }
              }
            ]
          },
          {
            path: '/basic/multiple',
            name: 'multiple',
            component: RouteView,
            meta: { title: '多端配置', keepAlive: true, permission: ['dashboard'] },
            hideChildrenInMenu: true,
            redirect: '/basic/multiple/index',
            children: [
              {
                path: '/basic/multiple/index',
                name: 'multiplelist',
                component: () => import('@/views/basic/multiple/index'),
                hidden: true,
                meta: { title: '多端配置', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/basic/multiple/access',
                name: 'access',
                component: () => import('@/views/basic/multiple/access'),
                hidden: true,
                meta: { title: '接入/配置', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/basic/multiple/doAuth',
                name: 'doAuth',
                component: () => import('@/views/basic/multiple/doAuth'),
                hidden: true,
                meta: { title: '授权发布', keepAlive: true, permission: ['dashboard'] }
              }
            ]
          },
          // {
          //   path: '/basic/multiple/modifycon',
          //   name: 'modifycon',
          //   component: () => import('@/views/basic/multiple/modifyCon'),
          //   meta: { title: '修改配置', keepAlive: true, permission: ['dashboard'] }
          // },
          {
            path: '/basic/third',
            name: 'third',
            component: RouteView,
            meta: { title: '第三方平台设置', keepAlive: true, permission: ['dashboard'] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/basic/third',
                name: 'thirdlist',
                component: () => import('@/views/basic/third/index'),

                meta: { title: '第三方平台设置', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/basic/third/plus',
                name: 'thirdedit',
                component: () => import('@/views/basic/third/plus'),
                hidden: true,
                meta: { title: '第三方平台维护', keepAlive: true, permission: ['dashboard'] }
              }
            ]
          }
        ]
      },
      {
        path: '/content',
        name: 'content',
        redirect: 'content/article',
        component: RouteView,
        meta: {
          title: '内容中心',
          keepAlive: true,
          permission: ['rcContent'],
          hiddenHeaderContent: true
        },
        children: [
          {
            path: '/content/article',
            name: 'article',
            component: RouteView,
            meta: { title: '文章攻略', keepAlive: true, permission: ['rccArticle'] },
            redirect: '/content/article/index',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/content/article/index',
                name: 'articleList',
                component: () => import('@/views/content/article/index'),
                meta: { title: '文章攻略', keepAlive: true, permission: ['rccArticle'] }
              },
              {
                path: '/content/article/plusArticle',
                name: 'plusArticle',
                hidden: true,
                component: () => import('@/views/content/article/plusArticle'),
                meta: { title: '新增文章', keepAlive: true, permission: ['rccaAdd'] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
