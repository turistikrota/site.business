import { locale } from '@/config/i18n'
import axios from 'axios'

export const httpClient = axios.create({
  withCredentials: true,
  headers: {
    'Accept-Language': locale,
  },
})
