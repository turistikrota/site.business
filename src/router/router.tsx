import { getCurrentServeLocale } from '@/utils/lang'
import NotFoundView from '@/views/404'
import { RouteObject, createBrowserRouter } from 'react-router-dom'

const trRoutes: RouteObject[] = [
  {
    path: '/basvuru',
    lazy: () => import('@/views/create'),
  },
]
const enRoutes: RouteObject[] = [
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
