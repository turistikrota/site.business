import { useBookingFilter } from '@/contexts/booking.filter'
import { useBookingPusher } from '@/hooks/booking.pusher'
import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Input from '@turistikrota/ui/form/input'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const BookingFilterQueryGroup: FC = () => {
  const [word, setWord] = useState<string>('')
  const { t } = useTranslation('booking')
  const { query } = useBookingFilter()
  const { push } = useBookingPusher()

  useEffect(() => {
    if (!!query.q && query.q !== word) {
      setWord(query.q)
    } else if (!query.q && word !== '') {
      setWord('')
    }
  }, [query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
    push({
      ...query,
      q: e.target.value,
    })
  }

  return (
    <div>
      <MobileInfoBox>{t('filter.query.description')}</MobileInfoBox>
      <Input
        label={t('filter.query.label')}
        name='word'
        size='md'
        suffix={<i className='bx bx-search-alt text-xl'></i>}
        value={word}
        onChange={handleChange}
      />
    </div>
  )
}

export default BookingFilterQueryGroup
