import { Locales } from '@turistikrota/ui/types'

export enum Services {
  Auth = 'auth',
  Account = 'account',
  Upload = 'upload',
  Business = 'business',
  Category = 'category',
  Listing = 'listing',
  ListingLog = 'listing-log',
  BusinessLog = 'business-log',
}

export const ApiUrls: Record<Services, string> = {
  [Services.Auth]: import.meta.env.VITE_API_AUTH_SRV_URL as string,
  [Services.Account]: import.meta.env.VITE_API_ACCOUNT_SRV_URL as string,
  [Services.Upload]: import.meta.env.VITE_API_UPLOAD_SRV_URL as string,
  [Services.Business]: import.meta.env.VITE_API_BUSINESS_SRV_URL as string,
  [Services.Category]: import.meta.env.VITE_API_CATEGORY_SRV_URL as string,
  [Services.Listing]: import.meta.env.VITE_API_LISTING_SRV_URL as string,
  [Services.ListingLog]: import.meta.env.VITE_API_LISTING_LOG_SRV_URL as string,
  [Services.BusinessLog]: import.meta.env.VITE_API_BUSINESS_LOG_SRV_URL as string,
}

export enum Sites {
  Auth = 'auth',
  Account = 'account',
}

type Hosts = {
  [key in Locales]: string
}

export const SiteHosts: Record<Sites, Hosts> = {
  [Sites.Auth]: {
    tr: import.meta.env.VITE_AUTH_SITE_TR_HOST as string,
    en: import.meta.env.VITE_AUTH_SITE_EN_HOST as string,
  },
  [Sites.Account]: {
    tr: import.meta.env.VITE_ACCOUNT_SITE_TR_HOST as string,
    en: import.meta.env.VITE_ACCOUNT_SITE_EN_HOST as string,
  },
}

export const apiUrl = (service: Services, path: string) => `${ApiUrls[service]}${path}`
