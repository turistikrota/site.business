import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import { getStaticRoute } from '@/static/page'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

function PrivacyView() {
  const { t, i18n } = useTranslation(['settings', 'general'])
  const path = useLocation().pathname
  return (
    <MetaWrapper title={t('meta.titles.privacy')}>
      <Breadcrumb>
        <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
          {t('general:utils.breadcrumb.home')}
        </Breadcrumb.Item>
        <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).settings.base} currentPath={path}>
          {t('breadcrumb.settings')}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('breadcrumb.privacy')}</Breadcrumb.Item>
      </Breadcrumb>
      <MaintenanceAlert />
    </MetaWrapper>
  )
}
PrivacyView.displayName = 'PrivacyView'

export { PrivacyView as Component }
