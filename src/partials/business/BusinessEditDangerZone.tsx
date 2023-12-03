import {FC, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useBodyguard} from "@/hooks/permission.tsx";
import {BusinessRoles} from "@/static/role.ts";
import BusinessDisableForm from "@/partials/business/BusinessDisableForm.tsx";
import BusinessEnableForm from "@/partials/business/BusinessEnableForm.tsx";

type Props = {
    isEnabled: boolean
    nickName: string
    onOk: () => void
}

const BusinessEditDangerZone : FC<Props> = ({ isEnabled, nickName, onOk}) => {
    const { t } = useTranslation('edit')
    const bodyguard = useBodyguard()
    const isEnableActive = useMemo(() => {
        return bodyguard.check(BusinessRoles.Super, BusinessRoles.Enable) && !isEnabled
    }, [isEnabled, bodyguard])
    const isDisableActive = useMemo(() => {
        return bodyguard.check(BusinessRoles.Super, BusinessRoles.Disable) && isEnabled
    }, [isEnabled, bodyguard])

    if (!isEnableActive && !isDisableActive) return <></>
    return <section>
        <h2 className="mb-3 text-xl font-semibold">{t('sections.danger')}</h2>
        <div className='rounded-md border dark:border-red-900'>
            {isEnableActive && <BusinessEnableForm onOk={onOk} nickName={nickName} />}
            {isDisableActive && <BusinessDisableForm onOk={onOk} nickName={nickName} />}
        </div>
    </section>
}

export default BusinessEditDangerZone