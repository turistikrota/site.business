import { SiteHosts } from '@/config/services'
import { Locales } from '@turistikrota/ui/types'

export type RouteType = {
  account: {
    select: string
  }
  settings: {
    notifications: string
    privacy: string
    security: string
    base: string
  }
  profile: {
    edit: string
    logs: string
    users: string
    select: string
  }
  payment: {
    list: string
  }
  listing: {
    create: string
    edit: string
    list: string
    logs: string
  }
  invoice: {
    create: string
    list: string
  }
  invite: {
    create: string
    list: string
  }
  booking: {
    list: string
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
      select: `${SiteHosts.account.en}/sec?redirect=`,
    },
    booking: {
      list: '/rezervasyonlar',
    },
    invite: {
      create: '/davetler/olustur',
      list: '/davetler',
    },
    invoice: {
      create: '/fatura/olustur',
      list: '/fatura',
    },
    listing: {
      create: '/ilanlar/olustur',
      edit: 'duzenle',
      list: '/ilanlar',
      logs: 'kayitlar',
    },
    payment: {
      list: '/odemeler',
    },
    profile: {
      edit: '/profil/duzenle',
      logs: '/profil/kayitlar',
      users: '/profil/kullanicilar',
      select: '/profil/sec',
    },
    settings: {
      base: '/ayarlar',
      notifications: '/ayarlar/bildirim-tercihleri',
      privacy: '/ayarlar/gizlilik',
      security: '/ayarlar/guvenlik',
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
      select: `${SiteHosts.account.en}/select?redirect=`,
    },
    contracts: {
      terms: 'https://turistikrota.com/contracts/terms-of-use',
      privacyNotify: 'https://turistikrota.com/contracts/privacy-notice',
      privacy: 'https://turistikrota.com/contracts/privacy-and-protection-of-personal-data',
    },
    booking: {
      list: '/bookings',
    },
    invite: {
      create: '/invites/create',
      list: '/invites',
    },
    invoice: {
      create: '/invoices/create',
      list: '/invoices',
    },
    listing: {
      create: '/listings/create',
      edit: 'edit',
      list: '/listings',
      logs: 'logs',
    },
    payment: {
      list: '/payments',
    },
    profile: {
      edit: '/profile/edit',
      logs: '/profile/logs',
      users: '/profile/users',
      select: '/profile/select',
    },
    settings: {
      base: '/settings',
      notifications: '/settings/notification-preferences',
      privacy: '/settings/privacy',
      security: '/settings/security',
    },
  },
}

export const getStaticRoute = (locale: string) => {
  return Routes[locale as Locales]
}

export const mergeUrlWithLocale = (locale: string, url: string) => `/${locale}${url}`
