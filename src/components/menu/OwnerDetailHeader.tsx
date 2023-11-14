import { getStaticRoute } from '@/static/page'
import MobileHeader from '@turistikrota/ui/headers/mobile'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { OwnerDetailContext } from './OwnerMenuLayout'

export type Pages =
  | 'edit'
  | 'notification'
  | 'settings'
  | 'security'
  | 'privacy'
  | 'deluxe'
  | 'invite'
  | 'users'
  | 'posts'

type Props = {
  page: Pages
}

type HeaderProps = {
  page: string
}

const BackButton = () => {
  const { t, i18n } = useTranslation('menu')
  return (
    <Link
      to={getStaticRoute(i18n.language).account.details.default}
      className='text-gray-700 transition-colors duration-200 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white'
      title={t('buttons.back')}
      aria-label={t('buttons.back')}
    >
      <i className='bx bx-left-arrow-alt text-3xl'></i>
    </Link>
  )
}

const ToggleButton = () => {
  const menuContext = useContext(OwnerDetailContext)
  const { t } = useTranslation('menu')
  return (
    <button
      className='flex items-center justify-center text-gray-700 transition-colors duration-200 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white'
      title={t('buttons.toggle')}
      aria-label={t('buttons.toggle')}
      onClick={() => menuContext.setOpenMenu(!menuContext.openMenu)}
    >
      <i className='bx bx-menu text-3xl'></i>
    </button>
  )
}

function FixedHeader({ page }: HeaderProps) {
  return (
    <MobileHeader className='justify-start gap-3' defaultFixed>
      <div className='hidden items-center justify-center gap-2 lg:flex'>
        <ToggleButton />
      </div>
      <div className='flex items-center justify-center gap-2 lg:hidden'>
        <BackButton />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <h1 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>{page}</h1>
      </div>
    </MobileHeader>
  )
}

export function OwnerDetailTitle({ page }: Props) {
  const { t } = useTranslation('menu')
  return (
    <div className='mx-auto max-w-4xl gap-2'>
      <h1 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>{t(`links.${page}`)}</h1>
      <p className='text-gray-500 dark:text-gray-400'>{t(`links.subtitles.${page}`)}</p>
    </div>
  )
}

export default function OwnerDetailHeader({ page }: Props) {
  const { t } = useTranslation('menu')
  return <FixedHeader page={t(`links.${page}`)} />
}
