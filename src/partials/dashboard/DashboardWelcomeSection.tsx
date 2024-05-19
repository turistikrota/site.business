import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { useTranslation } from 'react-i18next'

export default function DashboardWelcomeSection() {
  const { t } = useTranslation('dashboard')
  const [currentState] = useCurrentBusiness()
  return (
    <div className='flex flex-col rounded-md border bg-second p-2'>
      <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
        {t('sections.welcome.greeting', {
          business: currentState.business.realName,
          name: currentState.user.name,
        })}
      </h2>
      <p className='text-sm text-gray-700 dark:text-gray-300'>{t('sections.welcome.description')}</p>
    </div>
  )
}
