import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function BusinessshipSettingsView() {
  const { t } = useTranslation('settings')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='container mx-auto p-2'>
        <MaintenanceAlert />
      </section>
    </MetaWrapper>
  )
}

BusinessshipSettingsView.displayName = 'BusinessshipSettingsView'

export { BusinessshipSettingsView as Component }
