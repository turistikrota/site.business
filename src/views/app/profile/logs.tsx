import { BusinessLog, fetchMyBusinessLogs } from '@/api/business/business.log.api.ts'
import EmptyContent from '@/components/EmptyContent.tsx'
import MetaWrapper from '@/components/MetaWrapper.tsx'
import { useListQuery } from '@/hooks/list.tsx'
import RoleGuardView from '@/layouts/RoleGuard.tsx'
import RenderLogDetails from '@/partials/business/logs/BusinessLogRenderer.tsx'
import { getStaticRoute } from '@/static/page'
import { BusinessLogRoles, BusinessRoles } from '@/static/role.ts'
import { makeUserAvatar } from '@/utils/cdn.ts'
import { useDayJS } from '@/utils/dayjs.ts'
import DomLink from '@/utils/link'
import NotFoundView from '@/views/404.tsx'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import ContentLoader from '@turistikrota/ui/loader'
import Timeline from '@turistikrota/ui/timeline'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

function ProfileLogsView() {
  const { t, i18n } = useTranslation(['business', 'general'])
  const dayJS = useDayJS(i18n.language)
  const [page] = useState(1)
  const path = useLocation().pathname
  const [limit] = useState(100)
  const { firstLoading, list } = useListQuery<BusinessLog>(() => fetchMyBusinessLogs(page, limit))

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
      <section className={`space-y-4`}>
        <Breadcrumb>
          <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
            {t('general:utils.breadcrumb.home')}
          </Breadcrumb.Item>
          <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).profile.edit} currentPath={path}>
            {t('breadcrumb.profile')}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{t('breadcrumb.logs')}</Breadcrumb.Item>
        </Breadcrumb>
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
                  item.isAdminAction ? (
                    <Timeline.Admin />
                  ) : (
                    <Timeline.Avatar avatar={makeUserAvatar(item.user.name)} avatarAlt={item.user.name} />
                  )
                }
                date={fixDate(item.datetime)}
              >
                <RenderLogDetails {...item} />
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
    <RoleGuardView roles={[BusinessRoles.Super, BusinessLogRoles.Super, BusinessLogRoles.List]}>
      <ProfileLogsView />
    </RoleGuardView>
  )
}
