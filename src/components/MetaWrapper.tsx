import { useTranslation } from 'react-i18next'

type Props = {
  title?: string
  description?: string
  keywords?: string
}

const updateOrCreateMeta = (name: string, content: string, field = 'name') => {
  let meta = document.querySelector(`meta[${field}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

export default function MetaWrapper({ title, description, keywords, children }: React.PropsWithChildren<Props>) {
  const { t, i18n } = useTranslation('business')
  document.documentElement.lang = i18n.language

  const siteTitle = title || t('title')
  const siteDescription = description || t('description')
  const siteKeywords = keywords || t('keywords')
  const url = window.location.href
  document.title = `${siteTitle} | Turistikrota`
  updateOrCreateMeta('og:title', siteTitle, 'property')
  updateOrCreateMeta('twitter:title', siteTitle)
  updateOrCreateMeta('description', siteDescription)
  updateOrCreateMeta('og:description', siteDescription, 'property')
  updateOrCreateMeta('twitter:description', siteDescription)
  updateOrCreateMeta('keywords', siteKeywords)
  updateOrCreateMeta('og:url', url, 'property')
  return <>{children}</>
}
