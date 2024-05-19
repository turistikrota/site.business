import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BookingMobileFilterPopup from './BookingMobileFilterPopup'

const BookingMobileFilterSection: FC = () => {
  const { t } = useTranslation('booking')
  const [open, setOpen] = useState(false)
  return (
    <>
      <section
        className='col-span-12 flex w-full items-center justify-center rounded-md bg-second p-2'
        onClick={() => setOpen(true)}
      >
        <i className='bx bx-filter text-2xl text-gray-600 dark:text-gray-400' />
        <span className='ml-2 text-gray-600 dark:text-gray-400'>{t('filter.text')}</span>
      </section>
      <BookingMobileFilterPopup onClose={() => setOpen(false)} open={open} />
    </>
  )
}

export default BookingMobileFilterSection
