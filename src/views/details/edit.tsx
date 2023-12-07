import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'
import { useCurrentBusiness } from '@/contexts/currentBusiness.tsx'
import RoleGuardView from '@/layouts/RoleGuard.tsx'
import { BusinessRoles, BusinessUploadRoles } from '@/static/role.ts'
import BusinessEditDangerZone from '@/partials/business/edit/BusinessEditDangerZone.tsx'
import { useQuery } from '@/hooks/query.tsx'
import { fetchMyBusiness } from '@/api/business/business.api.ts'
import ContentLoader from '@turistikrota/ui/loader'
import NotFoundView from '@/views/404.tsx'
import BusinessDetailInformationSection from '@/partials/business/detail/BusinessDetailInformationSection.tsx'
import BusinessProfileImageUploadSection from '@/partials/business/upload/BusinessProfileImageUploadSection.tsx'
import BusinessProfileCoverUploadSection from '@/partials/business/upload/BusinessProfileCoverUploadSection.tsx'
import RoleGuard from '@/components/RoleGuard.tsx'

function BusinessEditView() {
  const { t } = useTranslation('edit')
  const [current] = useCurrentBusiness()

  const { data, loading, notFound } = useQuery(() => fetchMyBusiness(current.business.nickName))

  if (loading) return <ContentLoader noMargin />
  if (!data || notFound) return <NotFoundView />

  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='container relative mx-auto flex flex-col space-y-8 p-4'>
        <RoleGuard roles={[BusinessRoles.Super, BusinessUploadRoles.Cover]}>
          <BusinessProfileCoverUploadSection
            nickName={current.business.nickName}
            onOk={() => window.location.reload()}
          />
        </RoleGuard>
        <RoleGuard roles={[BusinessRoles.Super, BusinessUploadRoles.Avatar]}>
          <BusinessProfileImageUploadSection
            nickName={current.business.nickName}
            onOk={() => window.location.reload()}
          />
        </RoleGuard>
        <BusinessDetailInformationSection business={data} />
        <BusinessEditDangerZone
          onOk={() => window.location.reload()}
          nickName={current.business.nickName}
          isEnabled={data.isEnabled}
        />
      </section>
    </MetaWrapper>
  )
}

export function Component() {
  return (
    <RoleGuardView roles={[BusinessRoles.Super, BusinessRoles.View]}>
      <BusinessEditView />
    </RoleGuardView>
  )
}
