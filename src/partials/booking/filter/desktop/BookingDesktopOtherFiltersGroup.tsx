import { useBookingFilter } from '@/contexts/booking.filter'
import { useBookingPusher } from '@/hooks/booking.pusher'
import { AllStatus, BookingStatus } from '@/types/booking'
import Dropdown from '@turistikrota/ui/dropdown'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type BookingStatusFilterProps = {
  selected?: BookingStatus
  onSelect: (status?: BookingStatus) => void
}

const BookingStateFilter: FC<BookingStatusFilterProps> = ({ selected, onSelect }) => {
  const [currentState, setCurrentState] = useState<BookingStatus | undefined>(selected)
  const { t } = useTranslation('booking')

  useEffect(() => {
    setCurrentState(selected)
  }, [selected])

  return (
    <Dropdown>
      <Dropdown.Button active={currentState !== undefined}>{t('filter.state.title')}</Dropdown.Button>
      <Dropdown.Overlay>
        {AllStatus.map((status) => (
          <Dropdown.OverlayItem key={status} onClick={() => onSelect(status)} active={status === currentState}>
            {t(`filter.state.${status}`)}
          </Dropdown.OverlayItem>
        ))}
      </Dropdown.Overlay>
    </Dropdown>
  )
}

const BookingDesktopOtherFiltersGroup: FC = () => {
  const { query } = useBookingFilter()
  const { push } = useBookingPusher()

  const onStatusSelect = (status?: BookingStatus) => {
    push({
      ...query,
      state: status,
    })
  }

  return (
    <div className='flex items-center gap-2'>
      <BookingStateFilter selected={query.state} onSelect={onStatusSelect} />
    </div>
  )
}

export default BookingDesktopOtherFiltersGroup
