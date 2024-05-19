import { EmptyTranslation, EmptyValidation, ListingTranslation, fetchMyListing } from '@/api/listing/listing.api'
import MetaWrapper from '@/components/MetaWrapper'
import { useQuery } from '@/hooks/query'
import RoleGuardView from '@/layouts/RoleGuard'
import ListingDetailContent from '@/partials/listing/detail/ListingDetailContent.tsx'
import { getStaticRoute } from '@/static/page'
import { BusinessRoles, ListingRoles } from '@/static/role'
import { getI18nTranslation } from '@/types/base'
import { Currency } from '@/types/listing'
import DomLink from '@/utils/link'
import NotFoundView from '@/views/404'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import ImagePreview from '@turistikrota/ui/image/preview'
import ContentLoader from '@turistikrota/ui/loader'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'

const ListingDetailView = () => {
  const params = useParams()
  const { t, i18n } = useTranslation(['listings', 'general'])
  const path = useLocation().pathname
  const { data, loading, notFound, refetch } = useQuery(() => fetchMyListing(params.uuid ?? ''))

  const translations = useMemo<ListingTranslation>(() => {
    if (!data) return EmptyTranslation
    return getI18nTranslation<ListingTranslation>(data.meta, i18n.language, EmptyTranslation)
  }, [data, i18n.language])

  const images = useMemo<string[]>(() => {
    if (!data) return []
    return data.images.sort((a, b) => a.order - b.order).map((image) => image.url)
  }, [data])

  if (loading) return <ContentLoader noMargin />
  if (notFound) return <NotFoundView />

  return (
    <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.View]}>
      <MetaWrapper
        title={t('detail.meta.title')}
        description={t('detail.meta.description')}
        keywords={t('detail.meta.keywords')}
      >
        <ImagePreview list={images} altPrefix={translations.title}>
          <section className='relative space-y-4'>
            <Breadcrumb>
              <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
                {t('general:utils.breadcrumb.home')}
              </Breadcrumb.Item>
              <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).listing.list} currentPath={path}>
                {t('breadcrumb.listings')}
              </Breadcrumb.Item>
              <Breadcrumb.Item>{t('breadcrumb.detail')}</Breadcrumb.Item>
            </Breadcrumb>
            <ListingDetailContent
              uuid={params.uuid ?? ''}
              title={translations.title}
              description={translations.description}
              isActive={data?.isActive ?? false}
              coordinates={data?.location.coordinates ?? [0, 0]}
              images={images}
              prices={data?.prices ?? []}
              features={data?.features ?? []}
              currency={data?.currency ?? Currency.USD}
              categoryUUIDs={data?.categoryUUIDs ?? []}
              validation={data?.validation ?? EmptyValidation}
              onOk={() => refetch()}
            />
          </section>
        </ImagePreview>
      </MetaWrapper>
    </RoleGuardView>
  )
}

ListingDetailView.displayName = 'ListingDetailView'

export { ListingDetailView as Component }
