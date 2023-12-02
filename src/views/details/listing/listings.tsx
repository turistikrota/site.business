import { ListingListItem, fetchMyListings } from '@/api/listing/listing.api'
import EmptyContent from '@/components/EmptyContent'
import MetaWrapper from '@/components/MetaWrapper'
import ListingDragProvider from '@/partials/listing/ListingDragProvider'
import ListingListCard from '@/partials/listing/ListingListCard'
import { useListQuery } from '@/hooks/list'
import RoleGuardView from '@/layouts/RoleGuard'
import { getStaticRoute } from '@/static/page'
import { BusinessRoles, ListingRoles } from '@/static/role'
import Button from '@turistikrota/ui/button'
import ContentLoader from '@turistikrota/ui/loader'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ListingListView: React.FC = () => {
  const { t, i18n } = useTranslation('listings')
  const { firstLoading, list, setList } = useListQuery<ListingListItem>(fetchMyListings)

  if (firstLoading) return <ContentLoader noMargin />

  return (
    <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.List]}>
      <MetaWrapper
        title={t('list.meta.title')}
        description={t('list.meta.description')}
        keywords={t('list.meta.keywords')}
      >
        <section className='container relative mx-auto p-4'>
          <div className='grid w-full grid-cols-12 gap-4'>
            <div className='col-span-12'>
              <Link to={getStaticRoute(i18n.language).business.details.listing.create}>
                <Button block={false} variant='primary' className='flex items-center justify-center gap-1'>
                  <i className='bx bx-sm bx-plus' />
                  {t('list.actions.create')}
                </Button>
              </Link>
            </div>
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
