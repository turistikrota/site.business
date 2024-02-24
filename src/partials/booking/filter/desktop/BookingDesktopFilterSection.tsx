import { FC } from 'react'
import BookingDesktopOtherFiltersGroup from './BookingDesktopOtherFiltersGroup'
import BookingDesktopQueryGroup from './BookingDesktopQueryGroup'

const BookingDesktopFilterSection: FC = () => {
  return (
    <div className='col-span-12 flex justify-between'>
      <BookingDesktopQueryGroup />
      <BookingDesktopOtherFiltersGroup />
    </div>
  )
}

export default BookingDesktopFilterSection
