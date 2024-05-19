import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { getStaticRoute } from '@/static/page'
import { makeBusinessAvatar } from '@/utils/cdn'
import Button from '@turistikrota/ui/button'
import { useImageSrc } from '@turistikrota/ui/hooks/image'
import UserName from '@turistikrota/ui/username'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'

export default function ProfileMenu() {
  const [currentState] = useCurrentBusiness()
  const { i18n, t } = useTranslation('general')
  const { src, onError } = useImageSrc(makeBusinessAvatar(currentState.business.nickName))
  return (
    <div className='group flex h-10 w-full items-center justify-center text-gray-400 transition-colors duration-200 hover:text-primary-500 dark:text-gray-300'>
      <img
        src={src}
        onError={onError}
        width={`${32}px`}
        height={`${32}px`}
        alt={currentState.business.realName}
        title={currentState.business.realName}
        className={`cursor-pointer rounded-md`}
      />
      <div className='bottom-4 left-20 z-9999 hidden w-60 flex-col gap-2 rounded-md border bg-second p-2 group-hover:fixed group-hover:flex group-hover:animate-fade-in-from-bottom'>
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
          to={getStaticRoute(i18n.language).profile.edit}
          title={t('sections.menu.profile.edit')}
          aria-label={t('buttons.edit')}
        >
          <Button>{t('sections.menu.profile.edit')}</Button>
        </Link>
        <Link
          to={getStaticRoute(i18n.language).profile.select}
          title={t('sections.menu.profile.change')}
          aria-label={t('sections.menu.profile.change')}
        >
          <Button>{t('sections.menu.profile.change')}</Button>
        </Link>
        <LogoutButton />
      </div>
    </div>
  )
}
