import OwnerCreateForm from '@/components/forms/OwnerCreateForm'
import ConfigurationLayout from '@/layouts/ConfigurationLayout'
import DefaultLayout from '@/layouts/DefaultLayout'
import { useTranslation } from 'react-i18next'

const OwnerCreateView = () => {
  const { t } = useTranslation('select')
  return (
    <ConfigurationLayout title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <DefaultLayout>
        <OwnerCreateForm />
      </DefaultLayout>
    </ConfigurationLayout>
  )
}

export { OwnerCreateView as Component }
