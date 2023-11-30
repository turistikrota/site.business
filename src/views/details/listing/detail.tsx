import { EmptyTranslation, ListingTranslation, fetchMyListing } from '@/api/listing/listing.api'
import MetaWrapper from '@/components/MetaWrapper'
import ListingDetailContent from '@/components/listing/ListingDetailContent'
import { useQuery } from '@/hooks/query'
import RoleGuardView from '@/layouts/RoleGuard'
import { BusinessRoles, ListingRoles } from '@/static/role'
import { getI18nTranslation } from '@/types/base'
import NotFoundView from '@/views/404'
import ContentLoader from '@turistikrota/ui/loader'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ListingDetailView = () => {
  const { t, i18n } = useTranslation('listings')
  const params = useParams()
  const { data, loading, notFound } = useQuery(() => fetchMyListing(params.id ?? ''))
  const translations = useMemo<ListingTranslation>(() => {
    if (!data) return EmptyTranslation
    return getI18nTranslation<ListingTranslation>(data.meta, i18n.language)
  }, [data, i18n.language])
  if (loading) return <ContentLoader />
  if (notFound) return <NotFoundView />
  return (
    <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.View]}>
      <MetaWrapper
        title={t('detail.meta.title')}
        description={t('detail.meta.description')}
        keywords={t('detail.meta.keywords')}
      >
        <section className='container relative mx-auto p-4'>
          <ListingDetailContent uuid={params.id ?? ''} title={translations.title} />
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

ListingDetailView.displayName = 'ListingDetailView'

export { ListingDetailView as Component }
