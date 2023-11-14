import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function OwnershipEditView() {
  const { t } = useTranslation('edit')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='mx-auto max-w-4xl p-4 lg:pl-0'>
        <MaintenanceAlert />
      </section>
    </MetaWrapper>
  )
}

OwnershipEditView.displayName = 'OwnershipEditView'

export { OwnershipEditView as Component }
