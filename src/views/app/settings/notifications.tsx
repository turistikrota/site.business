import MetaWrapper from '@/components/MetaWrapper'
import ActorConfigContainer from '@/partials/actor_config/ActorConfigContainer'
import { getStaticRoute } from '@/static/page'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

function NotificationView() {
  const { t, i18n } = useTranslation(['notifications', 'general'])
  const path = useLocation().pathname
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <Breadcrumb>
        <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
          {t('general:utils.breadcrumb.home')}
        </Breadcrumb.Item>
        <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).settings.base} currentPath={path}>
          {t('general:utils.breadcrumb.settings')}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('general:utils.breadcrumb.notifications')}</Breadcrumb.Item>
      </Breadcrumb>
      <ActorConfigContainer />
    </MetaWrapper>
  )
}

export { NotificationView as Component }
