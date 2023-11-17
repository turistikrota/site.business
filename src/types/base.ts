import { I18nTranslation, isLocale } from '@turistikrota/ui/types'
export type ListResponse<T> = {
  list: T[]
  count: number
}

export const getI18nTranslation = <T>(data: I18nTranslation<T>, locale: string): T => {
  if (isLocale(locale)) {
    return data[locale]
  }
  return data.tr
}
