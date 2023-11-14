import MetaWrapper from '@/components/MetaWrapper'
import OwnerMenu from '@/components/menu/OwnerMenu'
import { useTranslation } from 'react-i18next'

function OwnershipMenuView() {
  const { t } = useTranslation('menu')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='mx-auto flex h-full min-h-screen items-start justify-center sm:max-w-md'>
        <OwnerMenu isDetail={false} />
      </section>
    </MetaWrapper>
  )
}

OwnershipMenuView.displayName = 'OwnershipMenuView'

export { OwnershipMenuView as Component }
