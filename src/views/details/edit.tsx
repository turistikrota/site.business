import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function BusinessshipEditView() {
  const { t } = useTranslation('edit')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='container mx-auto p-4'>
        <MaintenanceAlert />
      </section>
    </MetaWrapper>
  )
}

BusinessshipEditView.displayName = 'BusinessshipEditView'

export { BusinessshipEditView as Component }
