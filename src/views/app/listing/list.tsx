import { ListingListItem, fetchMyListings } from '@/api/listing/listing.api'
import EmptyContent from '@/components/EmptyContent'
import MetaWrapper from '@/components/MetaWrapper'
import RoleGuard from '@/components/RoleGuard'
import { useListQuery } from '@/hooks/list'
import RoleGuardView from '@/layouts/RoleGuard'
import ListingDragProvider from '@/partials/listing/list/ListingDragProvider.tsx'
import ListingListCard from '@/partials/listing/list/ListingListCard.tsx'
import { getStaticRoute } from '@/static/page'
import { BusinessRoles, ListingRoles } from '@/static/role'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import ContentLoader from '@turistikrota/ui/loader'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const ListingListView: React.FC = () => {
  const { t, i18n } = useTranslation(['listings', 'general'])
  const path = useLocation().pathname
  const { firstLoading, list, setList } = useListQuery<ListingListItem>(fetchMyListings)

  if (firstLoading) return <ContentLoader noMargin />

  return (
    <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.List]}>
      <MetaWrapper
        title={t('list.meta.title')}
        description={t('list.meta.description')}
        keywords={t('list.meta.keywords')}
      >
        <section className='relative space-y-4'>
          <Breadcrumb
            actions={
              <RoleGuard roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.Create]}>
                <Breadcrumb.Action href={getStaticRoute(i18n.language).listing.create} Link={DomLink}>
                  {t('fields.create')}
                </Breadcrumb.Action>
              </RoleGuard>
            }
          >
            <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
              {t('general:utils.breadcrumb.home')}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t('breadcrumb.listings')}</Breadcrumb.Item>
          </Breadcrumb>
          <div className='grid w-full grid-cols-12 gap-4'>
            {list.length === 0 && (
              <EmptyContent
                className='col-span-12'
                title={t('list.empty.title')}
                description={t('list.empty.description')}
              />
            )}
            {list.length > 0 && (
              <ListingDragProvider
                list={list.sort((a, b) => (a.order && b.order ? a.order - b.order : 0))}
                setList={setList}
                Renderer={ListingListCard}
              />
            )}
          </div>
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

ListingListView.displayName = 'ListingListView'

export { ListingListView as Component }
