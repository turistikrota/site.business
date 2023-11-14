import ErrorPage from '@turistikrota/ui/pages/error'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function NotFoundView() {
  const { t } = useTranslation(['notfound'])
  return (
    <ErrorPage
      title={t('title')}
      subtitle={t('subtitle')}
      button={
        <Link
          to={'/'}
          className='my-4 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
        >
          {t('button')}
        </Link>
      }
    />
  )
}
