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
  business: {
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
      listing: {
        list: string
        create: string
        detail: string
        logs: string
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
      select: `${SiteHosts.account.tr}/sec?redirect=`,
    },
    contracts: {
      terms: 'https://turistikrota.com/sozlesmeler/kullanim-kosullari',
      privacyNotify: 'https://turistikrota.com/sozlesmeler/gizlilik-bildirimi',
      privacy: 'https://turistikrota.com/sozlesmeler/kisisel-verilerin-korunmasi-ve-gizlilik-politikasi',
    },
    business: {
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
        listing: {
          create: '/ilan-ekle',
          list: '/ilanlar',
          detail: '/ilan/',
          logs: '/ilan-kayitlari/',
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
        edit: '/edit',
        notifications: '/notifications',
        privacy: '/privacy',
        security: '/security',
        settings: '/settings',
        vip: '/vip',
        default: '/menu',
      },
      select: `${SiteHosts.account.en}/select?redirect=`,
    },
    contracts: {
      terms: 'https://turistikrota.com/contracts/terms-of-use',
      privacyNotify: 'https://turistikrota.com/contracts/privacy-notice',
      privacy: 'https://turistikrota.com/contracts/privacy-and-protection-of-personal-data',
    },
    business: {
      select: '/select',
      create: '/apply',
      details: {
        default: '/menu',
        deluxe: '/deluxe',
        edit: '/edit',
        notification: '/notification-preferences',
        privacy: '/privacy',
        security: '/security',
        settings: '/settings',
        invite: '/invites',
        inviteCreate: '/invite',
        users: '/users',
        listing: {
          create: '/add-listing',
          list: '/listings',
          detail: '/listing/',
          logs: '/listing-logs/',
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
