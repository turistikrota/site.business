import { useBookingFilter } from '@/contexts/booking.filter'
import { useBookingPusher } from '@/hooks/booking.pusher'
import Button from '@turistikrota/ui/button'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import BookingFilterQueryGroup from '../shared/BookingFilterQueryGroup'

const BookingDesktopQueryGroup: FC = () => {
  const { t } = useTranslation('booking')
  const { query } = useBookingFilter()
  const { push } = useBookingPusher()

  const clearQuery = () => {
    push({})
  }

  return (
    <div className='flex min-w-max items-center gap-2'>
      <BookingFilterQueryGroup />
      {(query.q || query.state) && (
        <Button variant='transparent' block={false} onClick={clearQuery} className='min-w-max'>
          {t('filter.reset')}
        </Button>
      )}
    </div>
  )
}

export default BookingDesktopQueryGroup
