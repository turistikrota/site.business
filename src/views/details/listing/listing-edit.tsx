import { fetchMyListing } from '@/api/listing/listing.api.ts'
import MetaWrapper from '@/components/MetaWrapper.tsx'
import { useQuery } from '@/hooks/query.tsx'
import RoleGuardView from '@/layouts/RoleGuard.tsx'
import ListingEditForm from '@/partials/listing/form/ListingEditForm.tsx'
import { ListingEditViewRoles } from '@/roles/listing'
import NotFoundView from '@/views/404.tsx'
import ContentLoader from '@turistikrota/ui/loader'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ListingEditView: FC = () => {
  const params = useParams()
  const { t } = useTranslation('listings')
  const { data, loading, notFound, refetch } = useQuery(() => fetchMyListing(params.id ?? ''))

  if (loading) return <ContentLoader noMargin />
  if (!data || notFound) return <NotFoundView />

  return (
    <MetaWrapper
      title={t('edit.meta.title')}
      description={t('edit.meta.description')}
      keywords={t('edit.meta.keywords')}
    >
      <section className='container relative mx-auto p-2'>
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
