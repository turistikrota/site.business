import MetaWrapper from '@/components/MetaWrapper'
import ErrorPage from '@turistikrota/ui/pages/error'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ForbiddenView() {
  const { t } = useTranslation('forbidden')

  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <ErrorPage
        title={t('title')}
        subtitle={t('subtitle')}
        code={403}
        button={
          <Link
            to={'/'}
            className='inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4'
          >
            {t('button')}
          </Link>
        }
      />
    </MetaWrapper>
  )
}
