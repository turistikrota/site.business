import { OwnerUserListItem } from '@/types/owner'
import { useDayJS } from '@/utils/dayjs'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OwnerRoleToggle from './OwnerRoleToggle'

type Props = {
  user: OwnerUserListItem
}

const UserCollapseItem: React.FC<Props> = ({ user }) => {
  const { t, i18n } = useTranslation('users')
  const dayjs = useDayJS(i18n.language)
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className='flex flex-col  bg-second rounded-md p-2'>
      <div className='flex gap-2 cursor-pointer' onClick={() => setOpen(!open)}>
        <div className='h-16 w-16 flex items-center'>
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
          <OwnerRoleToggle roles={user.roles} />
        </div>
      </div>
    </div>
  )
}

export default UserCollapseItem
