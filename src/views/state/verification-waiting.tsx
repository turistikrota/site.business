import ConfigurationLayout from '@/layouts/ConfigurationLayout'
import { getStaticRoute } from '@/static/page'
import Button from '@turistikrota/ui/button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const VerificationWaiting: React.FC = () => {
  const { t, i18n } = useTranslation('state')
  return (
    <ConfigurationLayout
      title={t('waiting.meta.title')}
      description={t('waiting.meta.description')}
      keywords={t('waiting.meta.keywords')}
    >
      <div className='flex flex-col gap-2 rounded-md bg-secondary-400 bg-opacity-5 p-2 dark:bg-secondary-800 dark:bg-opacity-5'>
        <div className='flex justify-center'>
          <i className={`bx bx-timer text-6xl text-secondary-500`} />
        </div>
        <div className='flex justify-center'>
          <h1 className='text-center text-2xl font-bold text-secondary-700 dark:text-secondary-400'>
            {t('waiting.title')}
          </h1>
        </div>
        <p className='text-center text-secondary-600 dark:text-secondary-300'>{t('waiting.description')}</p>
        <div className='mt-2 flex justify-center'>
          <Link to={getStaticRoute(i18n.language).business.select}>
            <Button block={false}>{t('back')}</Button>
          </Link>
        </div>
      </div>
    </ConfigurationLayout>
  )
}

export default VerificationWaiting
