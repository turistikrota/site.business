import { Locales } from '@turistikrota/ui/types'

export enum Services {
  Auth = 'auth',
  Account = 'account',
  Upload = 'upload',
  Owner = 'owner',
  Category = 'category',
  Post = 'post',
  PostLog = 'post-log',
  OwnerLog = 'owner-log',
}

export const ApiUrls: Record<Services, string> = {
  [Services.Auth]: import.meta.env.VITE_API_AUTH_SRV_URL as string,
  [Services.Account]: import.meta.env.VITE_API_ACCOUNT_SRV_URL as string,
  [Services.Upload]: import.meta.env.VITE_API_UPLOAD_SRV_URL as string,
  [Services.Owner]: import.meta.env.VITE_API_OWNER_SRV_URL as string,
  [Services.Category]: import.meta.env.VITE_API_CATEGORY_SRV_URL as string,
  [Services.Post]: import.meta.env.VITE_API_POST_SRV_URL as string,
  [Services.PostLog]: import.meta.env.VITE_API_POST_LOG_SRV_URL as string,
  [Services.OwnerLog]: import.meta.env.VITE_API_OWNER_LOG_SRV_URL as string,
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
