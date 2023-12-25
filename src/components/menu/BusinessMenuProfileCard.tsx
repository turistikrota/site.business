import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { getStaticRoute } from '@/static/page'
import Button from '@turistikrota/ui/button'
import Condition from '@turistikrota/ui/condition'
import UserName from '@turistikrota/ui/username'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  open: boolean
}

export default function BusinessMenuProfileCard({ open }: Props) {
  const [detail] = useCurrentBusiness()
  const { t, i18n } = useTranslation('menu')

  if (!detail || !detail.business) return null
  return (
    <div className={`flex items-center justify-center gap-2 ${open ? 'flex-col' : ''}`}>
      <div className={`relative flex ${open ? 'w-23 h-23 items-center justify-center' : 'h-12 w-12'}`}>
        <img
          src={`https://avatar.turistikrota.com/~${detail.business.nickName}.png`}
          width={`${open ? 110 : 48}px`}
          height={`${open ? 110 : 48}px`}
          alt={detail.business.realName}
          title={detail.business.realName}
          className={`rounded-md bg-second`}
        />
        <img
          src={`https://avatar.turistikrota.com/@${detail.user.name}.png`}
          className='absolute -bottom-2 -left-5 h-12 w-12 rounded-full'
        />
      </div>
      <Condition value={open}>
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <p className='text-md font-medium text-gray-500 dark:text-gray-300'>{detail.business.realName}</p>
          <UserName>
            @{detail.user.name} | ~{detail.business.nickName}
          </UserName>
        </div>
        <Link
          to={getStaticRoute(i18n.language).business.select}
          className='mb-2'
          title={t('buttons.change')}
          aria-label={t('buttons.change')}
        >
          <Button size='sm'>{t('buttons.change')}</Button>
        </Link>
      </Condition>
    </div>
  )
}
