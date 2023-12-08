import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { BusinessLogRoles, BusinessRoles, BusinessUploadRoles, ListingLogRoles, ListingRoles } from '@/static/role'
import LineForm from '@turistikrota/ui/form/line'
import ToggleButton from '@turistikrota/ui/form/toggle'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin'

type RoleGroups = {
  key: string
  roles: string[]
}

type Props = {
  roles: string[]
  userRoles: string[]
  userName: string
  businessName: string
}

type GroupProps = {
  title: string
}

type ItemProps = {
  role: string
  isExists: boolean
  canPermissionAdd: boolean
  canPermissionRemove: boolean
  userName: string
  businessName: string
}

const StaticData: RoleGroups[] = [
  {
    key: 'business',
    roles: Object.values(BusinessRoles),
  },
  {
    key: 'listing',
    roles: Object.values(ListingRoles),
  },
  {
    key: 'listing_log',
    roles: Object.values(ListingLogRoles),
  },
  {
    key: 'business_log',
    roles: Object.values(BusinessLogRoles),
  },
  {
    key: 'business_upload',
    roles: Object.values(BusinessUploadRoles),
  },
]

const RoleGroup: React.FC<React.PropsWithChildren<GroupProps>> = ({ title, children }) => {
  const { t } = useTranslation('permissions')
  return (
    <div className='mb-2 flex w-full flex-col border-b pb-2'>
      <div className='text-md mb-2 text-left font-bold text-gray-800 dark:text-gray-200'>{t(`titles.${title}`)}</div>
      <div className='grid grid-cols-12'>{children}</div>
    </div>
  )
}

const RoleItem: React.FC<ItemProps> = ({
  role,
  isExists,
  canPermissionAdd,
  canPermissionRemove,
  businessName,
  userName,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const { t } = useTranslation('permissions')

  const handleChange = (checked: boolean) => {
    if (checked && canPermissionAdd) {
      setLoading(true)
      httpClient
        .patch(apiUrl(Services.Business, `/~${businessName}/user/@${userName}/add-role`), {
          permission: role,
        })
        .then(() => {
          toast.success(t('add-success'))
        })
        .catch((err: any) => {
          parseApiError({
            error: err?.response?.data,
            toast,
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
    if (!checked && canPermissionRemove) {
      setLoading(true)
      httpClient
        .patch(apiUrl(Services.Business, `/~${businessName}/user/@${userName}/rm-role`), {
          permission: role,
        })
        .then(() => {
          toast.success(t('rm-success'))
        })
        .catch((err: any) => {
          parseApiError({
            error: err?.response?.data,
            toast,
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }
  return (
    <div className='col-span-12'>
      <Spin loading={loading}>
        <LineForm className='rounded-md p-2 hover:bg-third'>
          <LineForm.Left>
            <div className='text-md text-left font-semibold text-gray-800 dark:text-gray-200'>
              {t(`roles.${role}.title`)}
            </div>
            <LineForm.Left.Description>{t(`roles.${role}.description`)}</LineForm.Left.Description>
          </LineForm.Left>
          <LineForm.Right>
            <ToggleButton
              defaultChecked={isExists}
              title={t(`roles.${role}.title`)}
              variant='primary'
              onChange={handleChange}
              disabled={loading ? true : isExists ? !canPermissionRemove : !canPermissionAdd}
              size='sm'
            />
          </LineForm.Right>
        </LineForm>
      </Spin>
    </div>
  )
}

const BusinessRoleToggle: React.FC<Props> = ({ roles, userRoles, businessName, userName }) => {
  return (
    <>
      {StaticData.map((d) => (
        <RoleGroup key={d.key} title={d.key}>
          {}
          {d.roles.map((r) => (
            <RoleItem
              key={r}
              role={r}
              businessName={businessName}
              userName={userName}
              isExists={roles.includes(r)}
              canPermissionAdd={userRoles.includes('business.user_perm_add') || userRoles.includes('business.super')}
              canPermissionRemove={
                userRoles.includes('business.user_perm_remove') || userRoles.includes('business.super')
              }
            />
          ))}
        </RoleGroup>
      ))}
    </>
  )
}

export default BusinessRoleToggle
