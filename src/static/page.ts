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
  owner: {
    create: string
    details: {
      default: string
      deluxe: string
      edit: string
      notification: string
      invite: string
      inviteCreate: string
      privacy: string
      security: string
      settings: string
    }
    inviteUse: string
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
      select: `${SiteHosts.account.tr}?redirect=`,
    },
    contracts: {
      terms: 'https://turistikrota.com/sozlesmeler/kullanim-kosullari',
      privacyNotify: 'https://turistikrota.com/sozlesmeler/gizlilik-bildirimi',
      privacy: 'https://turistikrota.com/sozlesmeler/kisisel-verilerin-korunmasi-ve-gizlilik-politikasi',
    },
    owner: {
      create: '/basvuru',
      details: {
        default: '/detay/menu',
        deluxe: '/detay/deluxe',
        edit: '/detay/duzenle',
        notification: '/detay/bildirim-tercihleri',
        privacy: '/detay/gizlilik',
        security: '/detay/guvenlik',
        settings: '/detay/ayarlar',
        invite: '/detay/davetler',
        inviteCreate: '/detay/davet-et',
      },
      inviteUse: '/davet',
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
      select: `${SiteHosts.account.en}?redirect=`,
    },
    contracts: {
      terms: 'https://turistikrota.com/contracts/terms-of-use',
      privacyNotify: 'https://turistikrota.com/contracts/privacy-notice',
      privacy: 'https://turistikrota.com/contracts/privacy-and-protection-of-personal-data',
    },
    owner: {
      create: '/apply',
      details: {
        default: '/detail/menu',
        deluxe: '/detail/deluxe',
        edit: '/detail/edit',
        notification: '/detail/notification-preferences',
        privacy: '/detail/privacy',
        security: '/detail/security',
        settings: '/detail/settings',
        invite: '/detail/invites',
        inviteCreate: '/detail/invite',
      },
      inviteUse: '/invite',
    },
  },
}

export const getStaticRoute = (locale: string) => {
  return Routes[locale as Locales]
}

export const mergeUrlWithLocale = (locale: string, url: string) => `/${locale}${url}`
