import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function OwnershipEditView() {
  const { t } = useTranslation('edit')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='mx-auto container p-4'>
        <MaintenanceAlert />
      </section>
    </MetaWrapper>
  )
}

OwnershipEditView.displayName = 'OwnershipEditView'

export { OwnershipEditView as Component }
