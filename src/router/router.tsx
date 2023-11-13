import { getCurrentServeLocale } from '@/utils/lang'
import NotFoundView from '@/views/404'
import { RouteObject, createBrowserRouter } from 'react-router-dom'

const trRoutes: RouteObject[] = [
  {
    path: '/detay',
    lazy: () => import('@/layouts/OwnerLayout'),
    children: [
      {
        path: 'menu',
        lazy: () => import('@/views/details/menu'),
      },
      {
        path: '',
        lazy: () => import('@/layouts/OwnerSubDetailLayout'),
        children: [
          {
            path: 'duzenle',
            lazy: () => import('@/views/details/edit'),
            handle: {
              page: 'edit',
            },
          },
          {
            path: 'ayarlar',
            lazy: () => import('@/views/details/settings'),
            handle: {
              page: 'settings',
            },
          },
          {
            path: 'bildirim-tercihleri',
            lazy: () => import('@/views/details/notification'),
            handle: {
              page: 'notification',
            },
          },
          {
            path: 'gizlilik',
            lazy: () => import('@/views/details/privacy'),
            handle: {
              page: 'privacy',
            },
          },
          {
            path: 'guvenlik',
            lazy: () => import('@/views/details/security'),
            handle: {
              page: 'security',
            },
          },
          {
            path: 'deluxe',
            lazy: () => import('@/views/details/deluxe'),
            handle: {
              page: 'deluxe',
            },
          },
          {
            path: 'davetler',
            lazy: () => import('@/views/details/invite'),
            handle: {
              page: 'invite',
            },
          },
          {
            path: 'davet-et',
            lazy: () => import('@/views/details/invite-create'),
            handle: {
              page: 'invite-create',
            },
          },
          {
            path: 'kullanicilar',
            lazy: () => import('@/views/details/users'),
            handle: {
              page: 'users',
            },
          },
        ],
      },
    ],
  },
  {
    path: 'davet/:uuid',
    lazy: () => import('@/views/invite-use'),
    handle: {
      page: 'invite-use',
    },
  },
  {
    path: '/basvuru',
    lazy: () => import('@/views/create'),
  },
]
const enRoutes: RouteObject[] = [
  {
    path: '/detail',
    lazy: () => import('@/layouts/OwnerLayout'),
    children: [
      {
        path: 'menu',
        lazy: () => import('@/views/details/menu'),
      },
      {
        path: '',
        lazy: () => import('@/layouts/OwnerSubDetailLayout'),
        children: [
          {
            path: 'edit',
            lazy: () => import('@/views/details/edit'),
            handle: {
              page: 'edit',
            },
          },
          {
            path: 'settings',
            lazy: () => import('@/views/details/settings'),
            handle: {
              page: 'settings',
            },
          },
          {
            path: 'notification-preferences',
            lazy: () => import('@/views/details/notification'),
            handle: {
              page: 'notification',
            },
          },
          {
            path: 'privacy',
            lazy: () => import('@/views/details/privacy'),
            handle: {
              page: 'privacy',
            },
          },
          {
            path: 'security',
            lazy: () => import('@/views/details/security'),
            handle: {
              page: 'security',
            },
          },
          {
            path: 'deluxe',
            lazy: () => import('@/views/details/deluxe'),
            handle: {
              page: 'deluxe',
            },
          },
          {
            path: 'invites',
            lazy: () => import('@/views/details/invite'),
            handle: {
              page: 'invite',
            },
          },
          {
            path: 'invite',
            lazy: () => import('@/views/details/invite-create'),
            handle: {
              page: 'invite-create',
            },
          },
          {
            path: 'users',
            lazy: () => import('@/views/details/users'),
            handle: {
              page: 'users',
            },
          },
        ],
      },
    ],
  },
  {
    path: 'invite/:uuid',
    lazy: () => import('@/views/invite-use'),
    handle: {
      page: 'invite-use',
    },
  },
  {
    path: '/apply',
    lazy: () => import('@/views/create'),
  },
]

const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('@/views/select'),
  },
]

const locale = getCurrentServeLocale()

if (locale) {
  if (locale === 'tr') {
    routes.push(...trRoutes)
  } else if (locale === 'en') {
    routes.push(...enRoutes)
  }
} else {
  routes.push(...trRoutes, ...enRoutes)
}

routes.push({
  path: '*',
  element: <NotFoundView />,
})

export const router = createBrowserRouter(routes)
