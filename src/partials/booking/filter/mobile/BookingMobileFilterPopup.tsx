import { useBookingFilter } from '@/contexts/booking.filter'
import { useBookingPusher } from '@/hooks/booking.pusher'
import { AllStatus, BookingStatus } from '@/types/booking'
import Button from '@turistikrota/ui/button'
import RadioGroup from '@turistikrota/ui/form/radio/group'
import Popup from '@turistikrota/ui/popup'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BookingFilterQueryGroup from '../shared/BookingFilterQueryGroup'
import FilterHead from './FilterHead'

type Props = {
  onClose: () => void
  open: boolean
}

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
    <RadioGroup
      title={t('filter.state.title')}
      clearText={t('filter.state.clear-text')}
      clearAriaLabel={t('filter.state.clear-aria-label')}
    >
      {AllStatus.map((status) => (
        <RadioGroup.Item
          key={status}
          id={status}
          name='status'
          reverse
          value={status === currentState}
          onChange={() => onSelect(status)}
        >
          {t(`filter.state.${status}`)}
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  )
}

const BookingMobileFilterPopup: FC<Props> = ({ open, onClose }) => {
  const { query } = useBookingFilter()
  const { push } = useBookingPusher()
  const { t } = useTranslation('booking')

  const onStatusSelect = (status?: BookingStatus) => {
    push({
      ...query,
      state: status,
    })
  }

  const clear = () => {
    push({})
  }

  return (
    <Popup
      onClose={onClose}
      open={open}
      size='2xl'
      head={
        <FilterHead.TitleSection>
          <FilterHead.Title>{t('filter.text')}</FilterHead.Title>
          {(query.q || query.state) && (
            <Button variant='transparent' block={false} onClick={clear}>
              {t('filter.clear')}
            </Button>
          )}
        </FilterHead.TitleSection>
      }
    >
      <div className='flex h-full flex-col gap-2 overflow-y-auto overflow-x-hidden pb-20 pr-2'>
        <BookingFilterQueryGroup />
        <BookingStateFilter selected={query.state} onSelect={onStatusSelect} />
      </div>
    </Popup>
  )
}

export default BookingMobileFilterPopup
