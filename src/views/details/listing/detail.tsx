import MetaWrapper from '@/components/MetaWrapper'
import ListingDetailContent from '@/components/listing/ListingDetailContent'
import RoleGuardView from '@/layouts/RoleGuard'
import { BusinessRoles, ListingRoles } from '@/static/role'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ListingDetailView = () => {
  const { t } = useTranslation('listings')
  const params = useParams()
  return (
    <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.View]}>
      <MetaWrapper
        title={t('detail.meta.title')}
        description={t('detail.meta.description')}
        keywords={t('detail.meta.keywords')}
      >
        <section className='container relative mx-auto p-4'>
          <ListingDetailContent uuid={params.id ?? ''} />
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

ListingDetailView.displayName = 'ListingDetailView'

export { ListingDetailView as Component }
