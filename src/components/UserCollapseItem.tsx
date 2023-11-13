import { useCurrentOwner } from '@/contexts/currentOwner'
import { OwnerUserListItem } from '@/types/owner'
import { useDayJS } from '@/utils/dayjs'
import Alert from '@turistikrota/ui/alert'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OwnerRoleToggle from './OwnerRoleToggle'

type Props = {
  user: OwnerUserListItem
}

const UserCollapseItem: React.FC<Props> = ({ user }) => {
  const { t, i18n } = useTranslation('users')
  const dayjs = useDayJS(i18n.language)
  const [current] = useCurrentOwner()
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className='flex flex-col bg-second rounded-md p-2'>
      <div className='flex gap-2 cursor-pointer items-center' onClick={() => setOpen(!open)}>
        <div className='min-w-max max-w-16'>
          <img
            src={`https://avatar.turistikrota.com/@${user.name}.png`}
            alt=''
            className='rounded-md h-16 w-16 object-cover'
          />
        </div>
        <div className='flex flex-col  md:flex-row justify-center md:justify-between md:items-center w-full'>
          <div className='flex flex-col'>
            <span className='font-bold'>{user.name}</span>
            <span className='text-muted'>
              {t(`joinAt`, {
                date: dayjs(user.joinAt).format('DD MMMM YYYY'),
              })}
            </span>
          </div>
          <p className='text-muted'>
            {t('totalRole', {
              total: user.roles.length,
            })}
          </p>
        </div>
        <div className='flex justify-end items-center'>
          <i
            className={`bx bx-sm text-primary-500 bx-chevron-down transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          ></i>
        </div>
      </div>
      <div className={` transition-all duration-200 ${open ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
        <div className='flex flex-col gap-2 mt-2'>
          <div>
            <h2 className='text-lg font-bold text-gray-800 dark:text-gray-200'>{t('role.title')}</h2>
            <p className='text-sm text-gray-600 dark:text-gray-400'>{t('role.description')}</p>
            <Alert type='info' className='mt-2' showIcon>
              <Alert.Title>{t('role.info.title')}</Alert.Title>
              <Alert.Description>{t('role.info.desc')}</Alert.Description>
            </Alert>
          </div>
          <OwnerRoleToggle
            roles={user.roles}
            userRoles={current.user.roles}
            userName={user.name}
            ownerName={current.owner.nickName}
          />
        </div>
      </div>
    </div>
  )
}

export default UserCollapseItem
