import { fetchMyBusiness } from '@/api/business/business.api.ts'
import MetaWrapper from '@/components/MetaWrapper'
import RoleGuard from '@/components/RoleGuard.tsx'
import { useCurrentBusiness } from '@/contexts/currentBusiness.tsx'
import { useQuery } from '@/hooks/query.tsx'
import RoleGuardView from '@/layouts/RoleGuard.tsx'
import BusinessDetailInformationSection from '@/partials/business/detail/BusinessDetailInformationSection.tsx'
import BusinessActionZone from '@/partials/business/edit/BusinessActionZone'
import BusinessEditDangerZone from '@/partials/business/edit/BusinessEditDangerZone.tsx'
import BusinessProfileCoverUploadSection from '@/partials/business/upload/BusinessProfileCoverUploadSection.tsx'
import BusinessProfileImageUploadSection from '@/partials/business/upload/BusinessProfileImageUploadSection.tsx'
import { BusinessRoles, BusinessUploadRoles } from '@/static/role.ts'
import DomLink from '@/utils/link'
import NotFoundView from '@/views/404.tsx'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import ContentLoader from '@turistikrota/ui/loader'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

function BusinessEditView() {
  const { t } = useTranslation(['profile', 'general'])
  const [current] = useCurrentBusiness()
  const path = useLocation().pathname

  const { data, loading, notFound } = useQuery(() => fetchMyBusiness(current.business.nickName))

  if (loading) return <ContentLoader noMargin />
  if (!data || notFound) return <NotFoundView />

  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='relative space-y-6'>
        <Breadcrumb>
          <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
            {t('general:utils.breadcrumb.home')}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{t('general:utils.breadcrumb.profile')}</Breadcrumb.Item>
        </Breadcrumb>
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
        <BusinessActionZone nickName={current.business.nickName} />
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
