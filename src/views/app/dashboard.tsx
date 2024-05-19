import MetaWrapper from '@/components/MetaWrapper'
import DashboardWelcomeSection from '@/partials/dashboard/DashboardWelcomeSection'
import { useTranslation } from 'react-i18next'

function DashboardView() {
  const { t } = useTranslation('dashboard')
  return (
    <MetaWrapper title={t('meta.title')}>
      <DashboardWelcomeSection />
    </MetaWrapper>
  )
}

export { DashboardView as Component }
