import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function OwnershipDeluxeView() {
  const { t } = useTranslation('deluxe')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='mx-auto max-w-4xl p-4 lg:pl-0'>
        <MaintenanceAlert />
      </section>
    </MetaWrapper>
  )
}

OwnershipDeluxeView.displayName = 'OwnershipDeluxeView'

export { OwnershipDeluxeView as Component }
