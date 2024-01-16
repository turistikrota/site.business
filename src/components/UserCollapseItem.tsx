import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { BusinessUserListItem } from '@/types/business'
import { useDayJS } from '@/utils/dayjs'
import Alert from '@turistikrota/ui/alert'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BusinessRoleToggle from './BusinessRoleToggle'

type Props = {
  user: BusinessUserListItem
}

const UserCollapseItem: React.FC<Props> = ({ user }) => {
  const { t, i18n } = useTranslation('users')
  const dayjs = useDayJS(i18n.language)
  const [current] = useCurrentBusiness()
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className='flex flex-col rounded-md border p-2'>
      <div className='flex cursor-pointer items-center gap-2' onClick={() => setOpen(!open)}>
        <div className='max-w-16 min-w-max'>
          <img
            src={`https://avatar.turistikrota.com/@${user.name}.png`}
            alt=''
            className='h-16 w-16 rounded-md object-cover'
          />
        </div>
        <div className='flex w-full  flex-col justify-center md:flex-row md:items-center md:justify-between'>
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
        <div className='flex items-center justify-end'>
          <i
            className={`bx bx-sm bx-chevron-down text-primary-500 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          ></i>
        </div>
      </div>
      <div className={` transition-all duration-200 ${open ? 'block opacity-100' : 'hidden opacity-0'}`}>
        <div className='mt-2 flex flex-col gap-2'>
          <div>
            <h2 className='text-lg font-bold text-gray-800 dark:text-gray-200'>{t('role.title')}</h2>
            <p className='text-sm text-gray-600 dark:text-gray-400'>{t('role.description')}</p>
            <Alert type='info' className='mt-2' showIcon>
              <Alert.Title>{t('role.info.title')}</Alert.Title>
              <Alert.Description>{t('role.info.desc')}</Alert.Description>
            </Alert>
          </div>
          <BusinessRoleToggle
            roles={user.roles}
            userRoles={current.user.roles}
            userName={user.name}
            businessName={current.business.nickName}
          />
        </div>
      </div>
    </div>
  )
}

export default UserCollapseItem
