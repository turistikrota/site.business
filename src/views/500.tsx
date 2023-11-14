import Button from '@turistikrota/ui/button'
import ErrorPage from '@turistikrota/ui/pages/error'
import { useTranslation } from 'react-i18next'

export default function ServerErrorView() {
  const { t } = useTranslation(['server-error'])

  const backToHome = () => {
    window.location.reload()
  }
  return (
    <ErrorPage
      code={500}
      title={t('title')}
      subtitle={t('subtitle')}
      button={
        <Button
          className='my-4 inline-flex justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
          onClick={backToHome}
          block={false}
        >
          {t('button')}
        </Button>
      }
    />
  )
}
