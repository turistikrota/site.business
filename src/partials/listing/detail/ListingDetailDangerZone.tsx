import { useBodyguard } from '@/hooks/permission.tsx'
import { BusinessRoles, ListingRoles } from '@/static/role.ts'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ListingDeleteForm from './ListingDeleteForm.tsx'
import ListingDisableForm from './ListingDisableForm.tsx'
import ListingEnableForm from './ListingEnableForm.tsx'
import ListingRestoreForm from './ListingRecoverForm.tsx'

type Props = {
  isActive: boolean
  isDeleted: boolean
  uuid: string
  title: string
  onOk: () => void
}

const ListingDetailDangerZone: React.FC<Props> = ({ isActive, isDeleted, uuid, title, onOk }) => {
  const { t } = useTranslation('listings')
  const bodyguard = useBodyguard()
  const isEnableActive = useMemo(() => {
    return bodyguard.check(BusinessRoles.Super, ListingRoles.Super, ListingRoles.Enable) && !isActive
  }, [isActive, bodyguard])
  const isDisableActive = useMemo(() => {
    return bodyguard.check(BusinessRoles.Super, ListingRoles.Super, ListingRoles.Disable) && isActive
  }, [isActive, bodyguard])
  const isDeleteActive = useMemo(() => {
    return bodyguard.check(BusinessRoles.Super, ListingRoles.Super, ListingRoles.Delete) && !isDeleted
  }, [isDeleted, bodyguard])
  const isRestoreActive = useMemo(() => {
    return bodyguard.check(BusinessRoles.Super, ListingRoles.Super, ListingRoles.Restore) && isDeleted
  }, [isDeleted, bodyguard])
  if (!isEnableActive && !isDisableActive && !isDeleteActive && !isRestoreActive) return <></>
  return (
    <section>
      <h2 className='mb-3 text-xl font-semibold'>{t('detail.sections.danger')}</h2>
      <div className='rounded-md border dark:border-red-900'>
        {isEnableActive && <ListingEnableForm onOk={onOk} uuid={uuid} title={title} />}
        {isDisableActive && <ListingDisableForm onOk={onOk} uuid={uuid} title={title} />}
        {isDeleteActive && <ListingDeleteForm onOk={onOk} uuid={uuid} title={title} />}
        {isRestoreActive && <ListingRestoreForm onOk={onOk} uuid={uuid} title={title} />}
      </div>
    </section>
  )
}

export default ListingDetailDangerZone
