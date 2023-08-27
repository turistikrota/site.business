import { getStaticRoute } from '@/static/page'

export const openAccountSelectionWithRedirect = (lang: string) => {
  const currentUrl = window.location.href
  window.open(getStaticRoute(lang).auth.base + currentUrl, '_self')
}

export const openAccountSelection = (lang: string) => {
  window.open(getStaticRoute(lang).auth.base, '_self')
}
