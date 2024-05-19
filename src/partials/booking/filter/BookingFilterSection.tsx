import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { FC } from 'react'
import BookingDesktopFilterSection from './desktop/BookingDesktopFilterSection'
import BookingMobileFilterSection from './mobile/BookingMobileFilterSection'

const BookingFilterSection: FC = () => {
  const isDesktop = useIsDesktop()
  return (
    <>
      {isDesktop && <BookingDesktopFilterSection />}
      {!isDesktop && <BookingMobileFilterSection />}
    </>
  )
}

export default BookingFilterSection
