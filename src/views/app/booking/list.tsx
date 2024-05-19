import { BookingListItem, fetchMyBookings } from '@/api/booking/booking.api'
import EmptyContent from '@/components/EmptyContent'
import MetaWrapper from '@/components/MetaWrapper'
import BookingListCard from '@/components/booking/BookingListCard'
import { BookingFilterProvider, useBookingFilter } from '@/contexts/booking.filter'
import { useBookingPusher } from '@/hooks/booking.pusher'
import { useListQuery } from '@/hooks/list'
import RoleGuardView from '@/layouts/RoleGuard'
import BookingFilterSection from '@/partials/booking/filter/BookingFilterSection'
import { BookingRoles, BusinessRoles } from '@/static/role'
import { BookingFilter } from '@/types/booking'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import { useInfiniteScroll } from '@turistikrota/ui/hooks/dom'
import ContentLoader from '@turistikrota/ui/loader'
import { deepMerge } from '@turistikrota/ui/utils'
import debounce from '@turistikrota/ui/utils/debounce'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const BookingListView: FC = () => {
  const { t } = useTranslation(['booking', 'general'])
  const { query } = useBookingFilter()
  const { push } = useBookingPusher()
  const path = useLocation().pathname
  const { firstLoading, loading, list, isNextVisible } = useListQuery<BookingListItem, BookingFilter>(
    fetchMyBookings,
    query,
  )

  const debouncedPush = debounce(() => {
    const newPage = (query.page || 1) + 1
    push(deepMerge(query, { page: newPage }))
  }, 100)

  const handleScroll = () => {
    if (!isNextVisible) return
    debouncedPush()
  }

  useInfiniteScroll({
    handle: handleScroll,
    loading: loading,
  })

  if (firstLoading) return <ContentLoader noMargin />
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='relative space-y-4'>
        <Breadcrumb>
          <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
            {t('general:utils.breadcrumb.home')}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{t('breadcrumb.list')}</Breadcrumb.Item>
        </Breadcrumb>
        <div className='grid w-full grid-cols-12 gap-4'>
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
