import 'dayjs/locale/en'
import 'dayjs/locale/tr'
import relativeTime from 'dayjs/plugin/relativeTime'

import dayjs from 'dayjs'

export const useDayJS = (locale: string) => {
  dayjs.extend(relativeTime)
  dayjs.locale(locale)
  return dayjs
}
