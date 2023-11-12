import InviteDetail from '@/components/InviteDetail'
import ConfigurationLayout from '@/layouts/ConfigurationLayout'
import DefaultLayout from '@/layouts/DefaultLayout'
import { useTranslation } from 'react-i18next'

function InviteUseView() {
  const { t } = useTranslation('invite-use')
  return (
    <ConfigurationLayout title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <DefaultLayout>
        <InviteDetail />
      </DefaultLayout>
    </ConfigurationLayout>
  )
}

InviteUseView.displayName = 'InviteUseView'

export { InviteUseView as Component }
