import ConfigurationLayout from '@/layouts/ConfigurationLayout'
import { getStaticRoute } from '@/static/page'
import Button from '@turistikrota/ui/button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  reason: string
}

const VerificationRejected: React.FC<Props> = ({ reason }) => {
  const { t, i18n } = useTranslation('state')
  return (
    <ConfigurationLayout
      title={t('rejected.meta.title')}
      description={t('rejected.meta.description')}
      keywords={t('rejected.meta.keywords')}
    >
      <div className='flex flex-col gap-2 rounded-md bg-red-400 bg-opacity-5 p-2 dark:bg-red-800 dark:bg-opacity-5'>
        <div className='flex justify-center'>
          <i className={`bx bx-error text-8xl text-red-500`} />
        </div>
        <div className='flex justify-center'>
          <h1 className='text-center text-2xl font-bold text-red-700 dark:text-red-400'>{t('rejected.title')}</h1>
        </div>
        <p className='text-center text-red-600 dark:text-red-300'>{t('rejected.description')}</p>
        <div className='mt-2 flex w-full flex-col'>
          <span className='font-bold text-red-600 dark:text-red-400'>{t('rejected.reason')}</span>
          <p className='text-red-500'>{reason}</p>
        </div>
        <div className='mt-2 flex justify-center'>
          <Link to={getStaticRoute(i18n.language).profile.select}>
            <Button block={false}>{t('back')}</Button>
          </Link>
        </div>
      </div>
    </ConfigurationLayout>
  )
}

export default VerificationRejected
