import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function BusinessshipSecurityView() {
  const { t } = useTranslation('security')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='container mx-auto p-2'>
        <MaintenanceAlert />
      </section>
    </MetaWrapper>
  )
}

BusinessshipSecurityView.displayName = 'BusinessshipSecurityView'

export { BusinessshipSecurityView as Component }
