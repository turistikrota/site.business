import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function OwnershipSecurityView() {
  const { t } = useTranslation('security')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='p-4 lg:pl-0 max-w-4xl mx-auto'>
        <MaintenanceAlert />
      </section>
    </MetaWrapper>
  )
}

OwnershipSecurityView.displayName = 'OwnershipSecurityView'

export { OwnershipSecurityView as Component }
