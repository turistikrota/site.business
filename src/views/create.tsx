import BusinessCreateForm from '@/components/forms/BusinessCreateForm'
import ConfigurationLayout from '@/layouts/ConfigurationLayout'
import DefaultLayout from '@/layouts/DefaultLayout'
import { useTranslation } from 'react-i18next'

const BusinessCreateView = () => {
  const { t } = useTranslation('select')
  return (
    <ConfigurationLayout title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <DefaultLayout>
        <BusinessCreateForm />
      </DefaultLayout>
    </ConfigurationLayout>
  )
}

export { BusinessCreateView as Component }
