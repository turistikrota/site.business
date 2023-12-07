import {FC} from "react";
import RoleGuardView from "@/layouts/RoleGuard.tsx";
import {BusinessRoles, ListingRoles} from "@/static/role.ts";
import {useTranslation} from "react-i18next";
import MetaWrapper from "@/components/MetaWrapper.tsx";
import ListingCreateForm from "@/partials/listing/form/ListingCreateForm.tsx";

const ListingEditView: FC = () => {
    const {t} = useTranslation('listings')
    return <MetaWrapper
        title={t('edit.meta.title')}
        description={t('edit.meta.description')}
        keywords={t('edit.meta.keywords')}
    >
        <section className='container relative mx-auto p-4 '>
            <ListingCreateForm/>
        </section>
    </MetaWrapper>
}

export function Component() {
    return <RoleGuardView roles={[BusinessRoles.Super, ListingRoles.Super, ListingRoles.Update]}>
        <ListingEditView/>
    </RoleGuardView>
}