import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
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
  ownerName: string
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
  ownerName: string
}

const StaticData: RoleGroups[] = [
  {
    key: 'owner',
    roles: [
      'owner.super',
      'owner.member',
      'owner.user_remove',
      'owner.user_perm_add',
      'owner.user_perm_remove',
      'owner.enable',
      'owner.disable',
      'owner.user_list',
      'owner.invite_create',
      'owner.invite_delete',
      'owner.invite_view',
    ],
  },
  {
    key: 'post',
    roles: [
      'post.super',
      'post.create',
      'post.update',
      'post.delete',
      'post.enable',
      'post.disable',
      'post.re_order',
      'post.restore',
      'post.list',
      'post.view',
    ],
  },
  {
    key: 'post_log',
    roles: ['post_log.super', 'post_log.view', 'post_log.count'],
  },
  {
    key: 'owner_log',
    roles: ['owner_log.super', 'owner_log.view', 'owner_log.count'],
  },
]

const RoleGroup: React.FC<React.PropsWithChildren<GroupProps>> = ({ title, children }) => {
  const { t } = useTranslation('permissions')
  return (
    <div className='w-full flex flex-col mb-2 border-b pb-2'>
      <div className='text-lg text-left font-bold text-gray-800 dark:text-gray-200 mb-2'>{t(`titles.${title}`)}</div>
      <div className='grid grid-cols-12'>{children}</div>
    </div>
  )
}

const RoleItem: React.FC<ItemProps> = ({
  role,
  isExists,
  canPermissionAdd,
  canPermissionRemove,
  ownerName,
  userName,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const { t } = useTranslation('permissions')

  const handleChange = (checked: boolean) => {
    if (checked && canPermissionAdd) {
      setLoading(true)
      httpClient
        .patch(apiUrl(Services.Owner, `/~${ownerName}/user/@${userName}/add-role`), {
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
        .patch(apiUrl(Services.Owner, `/~${ownerName}/user/@${userName}/rm-role`), {
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
        <LineForm className='rounded-md hover:bg-third p-2'>
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

const OwnerRoleToggle: React.FC<Props> = ({ roles, userRoles, ownerName, userName }) => {
  return (
    <>
      {StaticData.map((d) => (
        <RoleGroup key={d.key} title={d.key}>
          {}
          {d.roles.map((r) => (
            <RoleItem
              key={r}
              role={r}
              ownerName={ownerName}
              userName={userName}
              isExists={roles.includes(r)}
              canPermissionAdd={userRoles.includes('owner.user_perm_add') || userRoles.includes('owner.super')}
              canPermissionRemove={userRoles.includes('owner.user_perm_remove') || userRoles.includes('owner.super')}
            />
          ))}
        </RoleGroup>
      ))}
    </>
  )
}

export default OwnerRoleToggle
