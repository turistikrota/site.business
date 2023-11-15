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
    select: string
    create: string
    details: {
      default: string
      deluxe: string
      edit: string
      notification: string
      invite: string
      inviteCreate: string
      privacy: string
      users: string
      security: string
      settings: string
      post: {
        list: string
        create: string
      }
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
        edit: '/duzenle',
        notifications: '/bildirim-tercihleri',
        privacy: '/gizlilik',
        security: '/guvenlik',
        settings: '/ayarlar',
        vip: '/vip',
        default: '/menu',
      },
      select: `${SiteHosts.account.tr}?redirect=`,
    },
    contracts: {
      terms: 'https://turistikrota.com/sozlesmeler/kullanim-kosullari',
      privacyNotify: 'https://turistikrota.com/sozlesmeler/gizlilik-bildirimi',
      privacy: 'https://turistikrota.com/sozlesmeler/kisisel-verilerin-korunmasi-ve-gizlilik-politikasi',
    },
    owner: {
      select: '/sec',
      create: '/basvuru',
      details: {
        default: '/menu',
        deluxe: '/deluxe',
        edit: '/duzenle',
        notification: '/bildirim-tercihleri',
        privacy: '/gizlilik',
        security: '/guvenlik',
        settings: '/ayarlar',
        invite: '/davetler',
        inviteCreate: '/davet-et',
        users: '/kullanicilar',
        post: {
          create: '/ilan-ekle',
          list: '/ilanlar',
        },
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
      select: '/select',
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
        users: '/detail/users',
        post: {
          create: '/detail/add-post',
          list: '/detail/posts',
        },
      },
      inviteUse: '/invite',
    },
  },
}

export const getStaticRoute = (locale: string) => {
  return Routes[locale as Locales]
}

export const mergeUrlWithLocale = (locale: string, url: string) => `/${locale}${url}`
