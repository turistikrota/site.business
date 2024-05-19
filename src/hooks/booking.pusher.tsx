import { useBookingFilter } from '@/contexts/booking.filter'
import { BookingFilter, toFilterQuery } from '@/types/booking'
import debounce from '@turistikrota/ui/utils/debounce'
import { useLocation, useNavigate } from 'react-router-dom'

type PusherResult = {
  immediatePush: (query: BookingFilter) => void
  push: (query: BookingFilter) => void
}

export const useBookingPusher = (): PusherResult => {
  const { setQuery } = useBookingFilter()
  const navigate = useNavigate()
  const location = useLocation()

  const debouncedPush = debounce((path: string) => {
    const url = `${location.pathname}?${path}`
    navigate(url, { replace: true })
  }, 500)

  const immediatePush = (query: BookingFilter) => {
    const path = toFilterQuery(query)
    const url = `${location.pathname}?${path}`
    navigate(url, { replace: true })
    setQuery(query)
  }

  const push = (query: BookingFilter) => {
    const path = toFilterQuery(query)
    debouncedPush(path)
    setQuery(query)
  }

  return {
    immediatePush,
    push,
  }
}
