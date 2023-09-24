import { useCurrentOwner } from '@/contexts/currentOwner'
import Button from '@turistikrota/ui/button'
import Condition from '@turistikrota/ui/condition'
import { useImageSrc } from '@turistikrota/ui/hooks/image'
import UserName from '@turistikrota/ui/username'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  open: boolean
}

export default function OwnerMenuProfileCard({ open }: Props) {
  const [detail] = useCurrentOwner()
  const { t } = useTranslation('menu')
  const { src, onError } = useImageSrc(detail.owner.avatarURL)
  return (
    <div className={`flex items-center justify-center gap-2 ${open ? 'flex-col' : ''}`}>
      <div className={`flex ${open ? 'items-center justify-center w-23 h-23' : 'h-12 w-12'}`}>
        <img
          src={src}
          onError={onError}
          width={`${open ? 110 : 48}px`}
          height={`${open ? 110 : 48}px`}
          alt={detail.owner.realName}
          title={detail.owner.realName}
          className={`rounded-md bg-second border p-2 lg:p-0`}
        />
      </div>
      <Condition value={open}>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <p className='text-md text-gray-500 dark:text-gray-300 font-medium'>{detail.owner.realName}</p>
          <UserName>{detail.owner.nickName}</UserName>
        </div>
        <Link to='/' className='my-2' title={t('buttons.change')} aria-label={t('buttons.change')}>
          <Button size='sm'>{t('buttons.change')}</Button>
        </Link>
      </Condition>
    </div>
  )
}
