import Alert from '@turistikrota/ui/alert'
import { useTranslation } from 'react-i18next'

export default function MaintenanceAlert() {
  const { t } = useTranslation('maintaining')

  return (
    <Alert type='info'>
      <Alert.Title>{t('title')}</Alert.Title>
      <Alert.Description>{t('description')}</Alert.Description>
    </Alert>
  )
}
