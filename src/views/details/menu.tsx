import MetaWrapper from '@/components/MetaWrapper'
import OwnerMenu from '@/components/menu/OwnerMenu'
import { useTranslation } from 'react-i18next'

function OwnershipMenuView() {
  const { t } = useTranslation('menu')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='sm:max-w-md mx-auto min-h-screen h-full flex items-start justify-center'>
        <OwnerMenu isDetail={false} />
      </section>
    </MetaWrapper>
  )
}

OwnershipMenuView.displayName = 'OwnershipMenuView'

export { OwnershipMenuView as Component }
