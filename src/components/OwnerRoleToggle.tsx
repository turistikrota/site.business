import LineForm from '@turistikrota/ui/form/line'
import ToggleButton from '@turistikrota/ui/form/toggle'
import React from 'react'
import { useTranslation } from 'react-i18next'

type RoleGroups = {
  key: string
  roles: string[]
}

type Props = {
  roles: string[]
}

type GroupProps = {
  title: string
}

type ItemProps = {
  role: string
  isExists: boolean
  canPermissionAdd: boolean
  canPermissionRemove: boolean
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

const RoleItem: React.FC<ItemProps> = ({ role, isExists, canPermissionAdd, canPermissionRemove }) => {
  const { t } = useTranslation('permissions')

  const handleChange = (checked: boolean) => {
    if (checked && canPermissionAdd) {
      console.log('add permission')
      //   addPermission(role)
    }
    if (!checked && canPermissionRemove) {
      console.log('remove permission')
      // removePermission(role)
    }
  }
  return (
    <LineForm className='rounded-md col-span-12 hover:bg-third p-2'>
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
          disabled={isExists ? !canPermissionRemove : !canPermissionAdd}
          size='sm'
        />
      </LineForm.Right>
    </LineForm>
  )
}

const OwnerRoleToggle: React.FC<Props> = ({ roles }) => {
  return (
    <>
      {StaticData.map((d) => (
        <RoleGroup key={d.key} title={d.key}>
          {d.roles.map((r) => (
            <RoleItem
              key={r}
              role={r}
              isExists={roles.includes(r)}
              canPermissionAdd={roles.includes('owner.user_perm_add') || roles.includes('owner.super')}
              canPermissionRemove={roles.includes('owner.user_perm_remove') || roles.includes('owner.super')}
            />
          ))}
        </RoleGroup>
      ))}
    </>
  )
}

export default OwnerRoleToggle
