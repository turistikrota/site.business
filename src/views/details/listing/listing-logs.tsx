import { ListingLog, fetchListingLogs } from '@/api/listing/listing.log.api'
import MetaWrapper from '@/components/MetaWrapper'
import { useListQuery } from '@/hooks/list'
import RoleGuardView from '@/layouts/RoleGuard'
import { ListingLogsViewRoles } from '@/roles/listing'
import { useDayJS } from '@/utils/dayjs'
import NotFoundView from '@/views/404'
import ContentLoader from '@turistikrota/ui/loader'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ListingLogsView = () => {
  const { t, i18n } = useTranslation('listings')
  const dayJS = useDayJS(i18n.language)
  const params = useParams()
  const [page] = useState(1)
  const [limit] = useState(10)
  const { firstLoading, list } = useListQuery<ListingLog>(() => fetchListingLogs(params.id!, page, limit))

  if (firstLoading) return <ContentLoader noMargin />
  if (!list) return <NotFoundView />

  const fixDate = (date: string) => {
    const parsed = dayJS(date)
    const now = dayJS()
    const diff = now.diff(parsed, 'day')
    if (diff < 3) {
      return parsed.fromNow()
    }
    return parsed.format('DD MMMM YYYY HH:mm')
  }
  return (
    <MetaWrapper
      title={t('logs.meta.title')}
      description={t('logs.meta.description')}
      keywords={t('logs.meta.keywords')}
    >
      <section className='container relative mx-auto p-4 '>saa</section>
    </MetaWrapper>
  )
}

export function Component() {
  return (
    <RoleGuardView roles={ListingLogsViewRoles}>
      <ListingLogsView />
    </RoleGuardView>
  )
}
