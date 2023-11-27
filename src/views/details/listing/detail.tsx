import MetaWrapper from '@/components/MetaWrapper'
import RoleGuardView from '@/layouts/RoleGuard'
import { BusinessRoles, ListingRoles } from '@/static/role'
import { useTranslation } from 'react-i18next'

const ListingDetailView = () => {
  const { t } = useTranslation('listings')
  return (
    <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.View]}>
      <MetaWrapper
        title={t('detail.meta.title')}
        description={t('detail.meta.description')}
        keywords={t('detail.meta.keywords')}
      >
        <section className='container relative mx-auto p-4'></section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

ListingDetailView.displayName = 'ListingDetailView'

export { ListingDetailView as Component }
