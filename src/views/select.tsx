import BusinessSelection from '@/components/BusinessSelection'
import ConfigurationLayout from '@/layouts/ConfigurationLayout'
import DefaultLayout from '@/layouts/DefaultLayout'
import { useTranslation } from 'react-i18next'

const BusinessSelectView = () => {
  const { t } = useTranslation('select')
  return (
    <ConfigurationLayout title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <DefaultLayout>
        <BusinessSelection />
      </DefaultLayout>
    </ConfigurationLayout>
  )
}

BusinessSelectView.displayName = 'BusinessSelectView'

export { BusinessSelectView as Component }
