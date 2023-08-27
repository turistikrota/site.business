import 'dayjs/locale/en'
import 'dayjs/locale/tr'

import dayjs from 'dayjs'

export const useDayJS = (locale: string) => {
  dayjs.locale(locale)
  return dayjs
}
