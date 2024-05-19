import MetaWrapper from '@/components/MetaWrapper'
import SettingsModuleList from '@/partials/settings/SettingsModuleList'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

function SettingsView() {
  const { t } = useTranslation(['settings', 'general'])
  const path = useLocation().pathname

  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <Breadcrumb>
        <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
          {t('general:utils.breadcrumb.home')}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('breadcrumb.settings')}</Breadcrumb.Item>
      </Breadcrumb>
      <SettingsModuleList />
    </MetaWrapper>
  )
}

export { SettingsView as Component }
