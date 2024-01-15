import { ListingPrice } from '@/api/listing/listing.api.ts'
import { useListingCalendar } from '@/hooks/calendar.listing.tsx'
import { Currency } from '@/types/listing'
import Calendar, { PriceRenderer } from '@turistikrota/ui/calendar'
import { Locales } from '@turistikrota/ui/types'
import { useTranslation } from 'react-i18next'

type Props = {
  prices: ListingPrice[]
  currency: Currency
}

const ListingDetailCalendarSection: React.FC<Props> = ({ prices, currency }) => {
  const { t, i18n } = useTranslation('listings')
  const calendarData = useListingCalendar(prices)
  return (
    <section>
      <h2 className='mb-3 text-xl font-semibold'>{t('detail.sections.priceCalendar')}</h2>
      <Calendar<number>
        data={calendarData}
        textSelected={t('detail.sections.priceCalendarSelected')}
        textToday={t('detail.sections.priceCalendarToday')}
        currency={currency}
        locale={i18n.language as Locales}
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
