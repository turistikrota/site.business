import { ListingPrice } from '@/api/listing/listing.api'
import Calendar, { PriceRenderer } from '@/components/calendar/Calendar'
import { useListingCalendar } from '@/hooks/calendar.listing'
import { useTranslation } from 'react-i18next'

type Props = {
  prices: ListingPrice[]
}

const ListingDetailCalendarSection: React.FC<Props> = ({ prices }) => {
  const { t } = useTranslation('listings')
  const calendarData = useListingCalendar(prices)
  return (
    <section>
      <h2 className='mb-3 text-xl font-semibold'>{t('detail.sections.priceCalendar')}</h2>
      <Calendar<number>
        data={calendarData}
        DetailRender={PriceRenderer}
        availableCalc={(date) => {
          const now = new Date()
          now.setHours(0, 0, 0, 0)
          if (date < now) return false
          return true
        }}
        variantCalc={() => {
          return 'primary'
        }}
      />
    </section>
  )
}

export default ListingDetailCalendarSection
