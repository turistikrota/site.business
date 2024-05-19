import { fetchMyListing } from '@/api/listing/listing.api.ts'
import MetaWrapper from '@/components/MetaWrapper.tsx'
import { useQuery } from '@/hooks/query.tsx'
import RoleGuardView from '@/layouts/RoleGuard.tsx'
import ListingEditForm from '@/partials/listing/form/ListingEditForm.tsx'
import { ListingEditViewRoles } from '@/roles/listing'
import { getStaticRoute } from '@/static/page'
import DomLink from '@/utils/link'
import NotFoundView from '@/views/404.tsx'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import ContentLoader from '@turistikrota/ui/loader'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'

const ListingEditView: FC = () => {
  const params = useParams()
  const { t, i18n } = useTranslation(['listings', 'general'])
  const path = useLocation().pathname
  const { data, loading, notFound, refetch } = useQuery(() => fetchMyListing(params.uuid ?? ''))

  if (loading) return <ContentLoader noMargin />
  if (!data || notFound) return <NotFoundView />

  return (
    <MetaWrapper
      title={t('edit.meta.title')}
      description={t('edit.meta.description')}
      keywords={t('edit.meta.keywords')}
    >
      <section className='relative space-y-4'>
        <Breadcrumb>
          <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
            {t('general:utils.breadcrumb.home')}
          </Breadcrumb.Item>
          <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).listing.list} currentPath={path}>
            {t('breadcrumb.listings')}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            Link={DomLink}
            href={`${getStaticRoute(i18n.language).listing.list}/${params.uuid}`}
            currentPath={path}
          >
            {t('breadcrumb.detail')}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{t('breadcrumb.edit')}</Breadcrumb.Item>
        </Breadcrumb>
        <ListingEditForm details={data} onOk={() => refetch()} />
      </section>
    </MetaWrapper>
  )
}

export function Component() {
  return (
    <RoleGuardView roles={ListingEditViewRoles}>
      <ListingEditView />
    </RoleGuardView>
  )
}
