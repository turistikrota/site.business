import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import { getStaticRoute } from '@/static/page'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

function SecurityView() {
  const { t, i18n } = useTranslation(['settings', 'general'])
  const path = useLocation().pathname
  return (
    <MetaWrapper title={t('meta.titles.security')}>
      <Breadcrumb>
        <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
          {t('general:utils.breadcrumb.home')}
        </Breadcrumb.Item>
        <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).settings.base} currentPath={path}>
          {t('breadcrumb.settings')}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('breadcrumb.security')}</Breadcrumb.Item>
      </Breadcrumb>
      <MaintenanceAlert />
    </MetaWrapper>
  )
}
SecurityView.displayName = 'SecurityView'

export { SecurityView as Component }
