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
          className='inline-flex justify-center text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4'
          onClick={backToHome}
          block={false}
        >
          {t('button')}
        </Button>
      }
    />
  )
}
