import MetaWrapper from '@/components/MetaWrapper'
import { useTranslation } from 'react-i18next'
import {useCurrentBusiness} from "@/contexts/currentBusiness.tsx";
import RoleGuardView from "@/layouts/RoleGuard.tsx";
import {BusinessRoles, BusinessUploadRoles} from "@/static/role.ts";
import BusinessEditDangerZone from "@/partials/business/BusinessEditDangerZone.tsx";
import {useQuery} from "@/hooks/query.tsx";
import {fetchMyBusiness} from "@/api/business/business.api.ts";
import ContentLoader from "@turistikrota/ui/loader";
import NotFoundView from "@/views/404.tsx";

function BusinessEditView() {
  const { t } = useTranslation('edit')
    const [current] = useCurrentBusiness()

    const { data, loading, notFound, refetch } = useQuery(() => fetchMyBusiness(current.business.nickName))

    if (loading) return <ContentLoader noMargin />
    if (!data || notFound) return <NotFoundView />

  return (
        <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
            <section className='container relative mx-auto p-4 flex flex-col space-y-8'>
                <BusinessEditDangerZone onOk={() => refetch()} nickName={current.business.nickName} isEnabled={data.isEnabled} />
            </section>
        </MetaWrapper>
  )
}

export function Component() {
    return <RoleGuardView
        roles={[BusinessRoles.Super, BusinessRoles.Enable, BusinessRoles.Disable, BusinessUploadRoles.Avatar, BusinessUploadRoles.Cover]}>
        <BusinessEditView/>
    </RoleGuardView>
}