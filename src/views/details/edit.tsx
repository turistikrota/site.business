import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function OwnershipEditView() {
  const { t } = useTranslation('edit')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='sm:max-w-md mx-auto min-h-screen h-full flex items-start justify-center'>edit vieww</section>
    </MetaWrapper>
  )
}

OwnershipEditView.displayName = 'OwnershipEditView'

export { OwnershipEditView as Component }
