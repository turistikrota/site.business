import { ListingLog, fetchListingLogs } from '@/api/listing/listing.log.api'
import EmptyContent from '@/components/EmptyContent'
import MetaWrapper from '@/components/MetaWrapper'
import { useListQuery } from '@/hooks/list'
import RoleGuardView from '@/layouts/RoleGuard'
import ListingLogRenderer from '@/partials/listing/log/ListingLogRenderer'
import { ListingLogsViewRoles } from '@/roles/listing'
import { getStaticRoute } from '@/static/page'
import { makeUserAvatar } from '@/utils/cdn'
import { useDayJS } from '@/utils/dayjs'
import DomLink from '@/utils/link'
import NotFoundView from '@/views/404'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import ContentLoader from '@turistikrota/ui/loader'
import Timeline from '@turistikrota/ui/timeline'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'

const ListingLogsView = () => {
  const params = useParams()
  const { t, i18n } = useTranslation(['listings', 'general'])
  const path = useLocation().pathname
  const dayJS = useDayJS(i18n.language)
  const [page] = useState(1)
  const [limit] = useState(10)
  const { firstLoading, list } = useListQuery<ListingLog>(() => fetchListingLogs(params.uuid!, page, limit))

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
      <Breadcrumb>
        <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
          {t('general:utils.breadcrumb.home')}
        </Breadcrumb.Item>
        <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).listing.list} currentPath={path}>
          {t('breadcrumb.listings')}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          Link={DomLink}
          href={`${getStaticRoute(i18n.language).listing.list}/${params.uuid}`}
          currentPath={path}
        >
          {t('breadcrumb.detail')}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('breadcrumb.logs')}</Breadcrumb.Item>
      </Breadcrumb>
      <section className='relative space-y-4'>
        {list.length === 0 && (
          <EmptyContent
            className='col-span-12'
            title={t('logs.empty.title')}
            description={t('logs.empty.description')}
          />
        )}
        {list.length > 0 && (
          <Timeline>
            {list.map((item) => (
              <Timeline.Item
                key={item.id}
                avatar={
                  item.user ? (
                    <Timeline.Avatar avatar={makeUserAvatar(item.user.name)} avatarAlt={item.user.name} />
                  ) : (
                    <Timeline.System />
                  )
                }
                date={fixDate(item.datetime)}
              >
                <ListingLogRenderer {...item} />
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </section>
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
