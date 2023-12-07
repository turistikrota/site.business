import {FC} from "react";
import RoleGuardView from "@/layouts/RoleGuard.tsx";
import {BusinessRoles, ListingRoles} from "@/static/role.ts";
import {useTranslation} from "react-i18next";
import MetaWrapper from "@/components/MetaWrapper.tsx";
import {useParams} from "react-router-dom";
import {useQuery} from "@/hooks/query.tsx";
import {fetchMyListing} from "@/api/listing/listing.api.ts";
import ContentLoader from "@turistikrota/ui/loader";
import NotFoundView from "@/views/404.tsx";
import ListingEditForm from "@/partials/listing/form/ListingEditForm.tsx";

const ListingEditView: FC = () => {
    const params = useParams()
    const {t} = useTranslation('listings')
    const {data, loading, notFound, refetch} = useQuery(() => fetchMyListing(params.id ?? ''))

    if (loading) return <ContentLoader noMargin/>
    if (!data || notFound) return <NotFoundView/>

    return <MetaWrapper
        title={t('edit.meta.title')}
        description={t('edit.meta.description')}
        keywords={t('edit.meta.keywords')}
    >
        <section className='container relative mx-auto p-4 '>
            <ListingEditForm details={data} onOk={() => refetch()}/>
        </section>
    </MetaWrapper>
}

export function Component() {
    return <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.Update]}>
        <ListingEditView/>
    </RoleGuardView>
}