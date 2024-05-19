import { getCurrentServeLocale } from '@/utils/lang'
import NotFoundView from '@/views/404'
import ServerErrorView from '@/views/500'
import { RouteObject, createBrowserRouter } from 'react-router-dom'

const trRoutes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('@/layouts/BusinessDetailLayout'),
    children: [
      {
        path: '',
        lazy: () => import('@/views/app/dashboard'),
      },
      {
        path: 'rezervasyonlar',
        lazy: () => import('@/views/app/booking/list'),
      },
      {
        path: 'rezervasyonlar/:uuid',
        lazy: () => import('@/views/app/booking/detail'),
      },
      {
        path: 'davetler',
        lazy: () => import('@/views/app/invite/list'),
      },
      {
        path: 'davetler/olustur',
        lazy: () => import('@/views/app/invite/create'),
      },
      {
        path: 'ilanlar',
        lazy: () => import('@/views/app/listing/list'),
      },
      {
        path: 'ilanlar/olustur',
        lazy: () => import('@/views/app/listing/create'),
      },
      {
        path: 'ilanlar/:uuid',
        lazy: () => import('@/views/app/listing/detail'),
      },
      {
        path: 'ilanlar/:uuid/duzenle',
        lazy: () => import('@/views/app/listing/edit'),
      },
      {
        path: 'ilanlar/:uuid/kayitlar',
        lazy: () => import('@/views/app/listing/logs'),
      },
      {
        path: 'odemeler',
        lazy: () => import('@/views/app/payment/list'),
      },
      {
        path: 'faturalar',
        lazy: () => import('@/views/app/invoice/list'),
      },
      {
        path: 'profil/duzenle',
        lazy: () => import('@/views/app/profile/edit'),
      },
      {
        path: 'profil/kayitlar',
        lazy: () => import('@/views/app/profile/logs'),
      },
      {
        path: 'profil/kullanicilar',
        lazy: () => import('@/views/app/profile/users'),
      },
      {
        path: 'ayarlar',
        lazy: () => import('@/views/app/settings/index'),
      },
      {
        path: 'ayarlar/bildirim-tercihleri',
        lazy: () => import('@/views/app/settings/notifications'),
      },
      {
        path: 'ayarlar/gizlilik',
        lazy: () => import('@/views/app/settings/privacy'),
      },
      {
        path: 'ayarlar/guvenlik',
        lazy: () => import('@/views/app/settings/security'),
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
    lazy: () => import('@/layouts/BusinessDetailLayout'),
    children: [
      {
        path: '',
        lazy: () => import('@/views/app/dashboard'),
      },
      {
        path: 'bookings',
        lazy: () => import('@/views/app/booking/list'),
      },
      {
        path: 'bookings/:uuid',
        lazy: () => import('@/views/app/booking/detail'),
      },
      {
        path: 'invites',
        lazy: () => import('@/views/app/invite/list'),
      },
      {
        path: 'invites/create',
        lazy: () => import('@/views/app/invite/create'),
      },
      {
        path: 'listings',
        lazy: () => import('@/views/app/listing/list'),
      },
      {
        path: 'listings/create',
        lazy: () => import('@/views/app/listing/create'),
      },
      {
        path: 'listings/:uuid',
        lazy: () => import('@/views/app/listing/detail'),
      },
      {
        path: 'listings/:uuid/edit',
        lazy: () => import('@/views/app/listing/edit'),
      },
      {
        path: 'listings/:uuid/logs',
        lazy: () => import('@/views/app/listing/logs'),
      },
      {
        path: 'payments',
        lazy: () => import('@/views/app/payment/list'),
      },
      {
        path: 'invoices',
        lazy: () => import('@/views/app/invoice/list'),
      },
      {
        path: 'profile/edit',
        lazy: () => import('@/views/app/profile/edit'),
      },
      {
        path: 'profile/logs',
        lazy: () => import('@/views/app/profile/logs'),
      },
      {
        path: 'profile/users',
        lazy: () => import('@/views/app/profile/users'),
      },
      {
        path: 'settings',
        lazy: () => import('@/views/app/settings/index'),
      },
      {
        path: 'settings/notification-preferences',
        lazy: () => import('@/views/app/settings/notifications'),
      },
      {
        path: 'settings/privacy',
        lazy: () => import('@/views/app/settings/privacy'),
      },
      {
        path: 'settings/security',
        lazy: () => import('@/views/app/settings/security'),
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
