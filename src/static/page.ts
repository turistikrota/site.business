import { SiteHosts } from '@/config/services'
import { Locales } from '@turistikrota/ui/types'

export type RouteType = {
  account: {
    create: string
    details: {
      edit: string
      notifications: string
      privacy: string
      security: string
      settings: string
      default: string
      vip: string
    }
    select: string
  }
  auth: {
    base: string
  }
  contracts: {
    terms: string
    privacyNotify: string
    privacy: string
  }
}

const Routes: Record<Locales, RouteType> = {
  tr: {
    auth: {
      base: `${SiteHosts.auth.tr}?redirect=`,
    },
    account: {
      create: '/olustur',
      details: {
        edit: '/detay/duzenle',
        notifications: '/detay/bildirim-tercihleri',
        privacy: '/detay/gizlilik',
        security: '/detay/guvenlik',
        settings: '/detay/ayarlar',
        vip: '/detay/vip',
        default: '/detay/menu',
      },
      select: '/',
    },
    contracts: {
      terms: 'https://turistikrota.com/sozlesmeler/kullanim-kosullari',
      privacyNotify: 'https://turistikrota.com/sozlesmeler/gizlilik-bildirimi',
      privacy: 'https://turistikrota.com/sozlesmeler/kisisel-verilerin-korunmasi-ve-gizlilik-politikasi',
    },
  },
  en: {
    auth: {
      base: `${SiteHosts.auth.en}?redirect=`,
    },
    account: {
      create: '/create',
      details: {
        edit: '/detail/edit',
        notifications: '/detail/notifications',
        privacy: '/detail/privacy',
        security: '/detail/security',
        settings: '/detail/settings',
        vip: '/detail/vip',
        default: '/detail/menu',
      },
      select: '/',
    },
    contracts: {
      terms: 'https://turistikrota.com/contracts/terms-of-use',
      privacyNotify: 'https://turistikrota.com/contracts/privacy-notice',
      privacy: 'https://turistikrota.com/contracts/privacy-and-protection-of-personal-data',
    },
  },
}

export const getStaticRoute = (locale: string) => {
  return Routes[locale as Locales]
}

export const mergeUrlWithLocale = (locale: string, url: string) => `/${locale}${url}`
