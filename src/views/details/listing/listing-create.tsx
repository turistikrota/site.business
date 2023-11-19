import MetaWrapper from '@/components/MetaWrapper'
import ListingCreateForm from '@/components/forms/listing/ListingCreateForm'
import RoleGuardView from '@/layouts/RoleGuard'
import { BusinessRoles, ListingRoles } from '@/static/role'
import { useTranslation } from 'react-i18next'

const ListingCreateView: React.FC = () => {
  const { t } = useTranslation('listings')
  return (
    <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.Create]}>
      <MetaWrapper
        title={t('create.meta.title')}
        description={t('create.meta.description')}
        keywords={t('create.meta.keywords')}
      >
        <section className='container relative mx-auto p-4 '>
          <ListingCreateForm />
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

ListingCreateView.displayName = 'ListingCreateView'

export { ListingCreateView as Component }
