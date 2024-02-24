import { BookingListItem, fetchMyBookings } from '@/api/booking/booking.api'
import EmptyContent from '@/components/EmptyContent'
import MetaWrapper from '@/components/MetaWrapper'
import BookingListCard from '@/components/booking/BookingListCard'
import { BookingFilterProvider, useBookingFilter } from '@/contexts/booking.filter'
import { useListQuery } from '@/hooks/list'
import RoleGuardView from '@/layouts/RoleGuard'
import BookingFilterSection from '@/partials/booking/filter/BookingFilterSection'
import { BookingRoles, BusinessRoles } from '@/static/role'
import { BookingFilter } from '@/types/booking'
import ContentLoader from '@turistikrota/ui/loader'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const BookingListView: FC = () => {
  const { t } = useTranslation('booking')
  const { query, clean } = useBookingFilter()
  const { firstLoading, list, setList } = useListQuery<BookingListItem, BookingFilter>(fetchMyBookings, query)

  if (firstLoading) return <ContentLoader noMargin />
  return (
    <MetaWrapper
      title={t('list.meta.title')}
      description={t('list.meta.description')}
      keywords={t('list.meta.keywords')}
    >
      <section className='container relative mx-auto p-2'>
        <div className='grid w-full grid-cols-12 gap-2'>
          <div className='col-span-12'>
            <BookingFilterSection />
          </div>
          {list.length === 0 && (
            <EmptyContent
              className='col-span-12'
              title={t('list.empty.title')}
              description={t('list.empty.description')}
            />
          )}
          {list.length > 0 && list.map((booking, idx) => <BookingListCard key={idx} {...booking} />)}
        </div>
      </section>
    </MetaWrapper>
  )
}

export function Component() {
  return (
    <RoleGuardView roles={[BusinessRoles.Super, BookingRoles.Super, BookingRoles.List]}>
      <BookingFilterProvider>
        <BookingListView />
      </BookingFilterProvider>
    </RoleGuardView>
  )
}
