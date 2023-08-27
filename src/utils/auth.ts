import { getStaticRoute } from '@/static/page'

export const openLoginWithRedirect = (lang: string) => {
  const currentUrl = window.location.href
  window.open(getStaticRoute(lang).auth.base + currentUrl, '_self')
}

export const openLogin = (lang: string) => {
  window.open(getStaticRoute(lang).auth.base, '_self')
}
