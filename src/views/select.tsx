import OwnerSelection from '@/components/OwnerSelection'
import ConfigurationLayout from '@/layouts/ConfigurationLayout'
import { useTranslation } from 'react-i18next'

const OwnerSelectView = () => {
  const { t } = useTranslation('select')
  return (
    <ConfigurationLayout title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <OwnerSelection />
    </ConfigurationLayout>
  )
}

OwnerSelectView.displayName = 'OwnerSelectView'

export { OwnerSelectView as Component }
