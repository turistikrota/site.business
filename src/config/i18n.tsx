import { getCurrentServeLocale } from '@/utils/lang'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

export const locale = getCurrentServeLocale() ?? 'tr'

export const Locales = ['tr', 'en'] as const

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: locale,
    ns: 'general',
    supportedLngs: [locale],
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
