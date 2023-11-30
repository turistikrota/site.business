import { getCurrentServeLocale } from '@/utils/lang'
import NotFoundView from '@/views/404'
import ServerErrorView from '@/views/500'
import { RouteObject, createBrowserRouter } from 'react-router-dom'

const trRoutes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('@/layouts/BusinessLayout'),
    children: [
      {
        path: 'menu',
        lazy: () => import('@/views/details/menu'),
      },
      {
        path: '',
        lazy: () => import('@/layouts/BusinessSubDetailLayout'),
        children: [
          {
            path: '',
            lazy: () => import('@/views/details/edit'),
            handle: {
              page: 'edit',
            },
          },
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
            lazy: () => import('@/views/details/invite/invite.tsx'),
            handle: {
              page: 'invite',
            },
          },
          {
            path: 'davet-et',
            lazy: () => import('@/views/details/invite/invite-create'),
            handle: {
              page: 'invite-create',
            },
          },
          {
            path: 'ilanlar',
            lazy: () => import('@/views/details/listing/listings'),
            handle: {
              page: 'listings',
            },
          },
          {
            path: 'ilanlar/:id',
            lazy: () => import('@/views/details/listing/detail'),
            handle: {
              page: 'listing-detail',
            },
          },
          {
            path: 'ilan-ekle',
            lazy: () => import('@/views/details/listing/listing-create'),
            handle: {
              page: 'listing-create',
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

  {
    path: '/sec',
    lazy: () => import('@/views/select'),
  },
]
const enRoutes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('@/layouts/BusinessLayout'),
    children: [
      {
        path: 'menu',
        lazy: () => import('@/views/details/menu'),
      },
      {
        path: '',
        lazy: () => import('@/layouts/BusinessSubDetailLayout'),
        children: [
          {
            path: 'edit',
            lazy: () => import('@/views/details/edit'),
            handle: {
              page: 'edit',
            },
          },
          {
            path: '',
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
            lazy: () => import('@/views/details/invite/invite.tsx'),
            handle: {
              page: 'invite',
            },
          },
          {
            path: 'invite',
            lazy: () => import('@/views/details/invite/invite-create'),
            handle: {
              page: 'invite-create',
            },
          },
          {
            path: 'listings',
            lazy: () => import('@/views/details/listing/listings'),
            handle: {
              page: 'listings',
            },
          },
          {
            path: 'listings/:id',
            lazy: () => import('@/views/details/listing/detail'),
            handle: {
              page: 'listing-detail',
            },
          },
          {
            path: 'add-listing',
            lazy: () => import('@/views/details/listing/listing-create'),
            handle: {
              page: 'listing-create',
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
  {
    path: '/select',
    lazy: () => import('@/views/select'),
  },
]

const routes: RouteObject[] = []

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

export const router = createBrowserRouter(
  routes.map((r) => ({
    ...r,
    errorElement: <ServerErrorView />,
  })),
)
