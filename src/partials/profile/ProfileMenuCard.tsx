import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { getStaticRoute } from '@/static/page'
import { makeBusinessAvatar } from '@/utils/cdn'
import Button from '@turistikrota/ui/button'
import { useImageSrc } from '@turistikrota/ui/hooks/image'
import UserName from '@turistikrota/ui/username'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ProfileMenuCard() {
  const [currentState] = useCurrentBusiness()
  const { t, i18n } = useTranslation('general')
  const { src, onError } = useImageSrc(makeBusinessAvatar(currentState.business.nickName))
  return (
    <div className={`flex flex-col items-center justify-center gap-2`}>
      <div className={`w-23 h-23 flex items-center justify-center`}>
        <img
          src={src}
          onError={onError}
          width={`${110}px`}
          height={`${110}px`}
          alt={currentState.business.realName}
          title={currentState.business.realName}
          className={`rounded-md border bg-second p-2 lg:p-0`}
        />
      </div>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <p className='text-md font-medium text-gray-500 dark:text-gray-300'>{currentState.business.realName}</p>
        <UserName>{currentState.business.nickName}</UserName>
      </div>
      <Link
        to={getStaticRoute(i18n.language).profile.select}
        className='mb-2'
        title={t('sections.menu.profile.change')}
        aria-label={t('sections.menu.profile.change')}
      >
        <Button size='sm'>{t('sections.menu.profile.change')}</Button>
      </Link>
    </div>
  )
}
