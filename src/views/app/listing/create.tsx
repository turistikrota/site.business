import MetaWrapper from '@/components/MetaWrapper'
import RoleGuardView from '@/layouts/RoleGuard'
import ListingCreateForm from '@/partials/listing/form/ListingCreateForm.tsx'
import { getStaticRoute } from '@/static/page'
import { BusinessRoles, ListingRoles } from '@/static/role'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const ListingCreateView: React.FC = () => {
  const { t, i18n } = useTranslation(['listings', 'general'])
  const path = useLocation().pathname
  return (
    <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.Create]}>
      <MetaWrapper
        title={t('create.meta.title')}
        description={t('create.meta.description')}
        keywords={t('create.meta.keywords')}
      >
        <section className='relative space-y-4'>
          <Breadcrumb>
            <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
              {t('general:utils.breadcrumb.home')}
            </Breadcrumb.Item>
            <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).listing.list} currentPath={path}>
              {t('breadcrumb.listings')}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t('breadcrumb.create')}</Breadcrumb.Item>
          </Breadcrumb>
          <ListingCreateForm />
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

ListingCreateView.displayName = 'ListingCreateView'

export { ListingCreateView as Component }
