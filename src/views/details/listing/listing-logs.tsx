import MetaWrapper from '@/components/MetaWrapper'
import RoleGuardView from '@/layouts/RoleGuard'
import { ListingLogsViewRoles } from '@/roles/listing'
import { useTranslation } from 'react-i18next'

const ListingLogsView = () => {
  const { t } = useTranslation('listings')
  return (
    <MetaWrapper
      title={t('logs.meta.title')}
      description={t('logs.meta.description')}
      keywords={t('logs.meta.keywords')}
    >
      <section className='container relative mx-auto p-4 '>saa</section>
    </MetaWrapper>
  )
}

export function Component() {
  return (
    <RoleGuardView roles={ListingLogsViewRoles}>
      <ListingLogsView />
    </RoleGuardView>
  )
}
