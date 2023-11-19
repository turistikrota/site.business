import MetaWrapper from '@/components/MetaWrapper'
import BusinessMenu from '@/components/menu/BusinessMenu'
import { useTranslation } from 'react-i18next'

function BusinessshipMenuView() {
  const { t } = useTranslation('menu')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='mx-auto flex h-full min-h-screen items-start justify-center sm:max-w-md'>
        <BusinessMenu isDetail={false} />
      </section>
    </MetaWrapper>
  )
}

BusinessshipMenuView.displayName = 'BusinessshipMenuView'

export { BusinessshipMenuView as Component }
