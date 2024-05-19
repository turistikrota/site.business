import { BookingStatus } from '@/types/booking'
import Badge from '@turistikrota/ui/badge'
import { useIsMobile } from '@turistikrota/ui/hooks/dom'
import { FullVariant } from '@turistikrota/ui/types'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  state: BookingStatus
}

type ItemVariant = {
  variant: FullVariant
  icon: string
}

const BookingStateCard: FC<Props> = ({ state }) => {
  const { t } = useTranslation('booking')
  const isMobile = useIsMobile()

  const item = useMemo<ItemVariant>(() => {
    if (
      [BookingStatus.Canceled, BookingStatus.NotValid, BookingStatus.PayCancelled, BookingStatus.PayExpired].includes(
        state,
      )
    )
      return { variant: 'danger', icon: 'bx-error' }
    if ([BookingStatus.PayPaid].includes(state)) return { variant: 'success', icon: 'bx-check' }
    if ([BookingStatus.PayRefunded, BookingStatus.Created].includes(state)) return { variant: 'blue', icon: 'bx-info' }
    if (BookingStatus.PayPending === state) return { variant: 'orange', icon: 'bx-time-five' }
    return { variant: 'default', icon: 'bx-info' }
  }, [state])

  return (
    <Badge size={isMobile ? 'sm' : 'md'} variant={item.variant} className='flex items-center gap-2'>
      <i className={`bx text-lg md:text-xl ${item.icon}`}></i>
      {t(`states.${state}.title`)}
    </Badge>
  )
}

export default BookingStateCard
