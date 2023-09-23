import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'

function OwnershipSettingsView() {
  const { t } = useTranslation('settings')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='sm:max-w-md mx-auto min-h-screen h-full flex items-start justify-center'>
        settings vieww
      </section>
    </MetaWrapper>
  )
}

OwnershipSettingsView.displayName = 'OwnershipSettingsView'

export { OwnershipSettingsView as Component }