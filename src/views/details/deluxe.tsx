import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function OwnershipDeluxeView() {
  const { t } = useTranslation('deluxe')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='sm:max-w-md mx-auto min-h-screen h-full flex items-start justify-center'>
        deluxe vieww
      </section>
    </MetaWrapper>
  )
}

OwnershipDeluxeView.displayName = 'OwnershipDeluxeView'

export { OwnershipDeluxeView as Component }
