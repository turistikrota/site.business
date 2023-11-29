import { useTranslation } from 'react-i18next'
import ZoneModal from './ZoneModal'

type Props = {
  title: string
  subtitle: string
  text: string
  inputLabel: string
  inputName?: string
  confirmationText?: string
  warningText?: string
  loadingText?: string
  buttonText?: string
  confirmText?: string
  loading: boolean
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ZoneWarningModal: React.FC<Props> = ({
  text,
  visible,
  title,
  subtitle,
  loading,
  inputLabel,
  buttonText,
  confirmText,
  confirmationText,
  loadingText,
  warningText,
  inputName = 'confirm-text',
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation('general')
  return (
    <ZoneModal
      buttonText={buttonText ?? t('warning.delete')}
      confirmText={confirmText ?? t('warning.confirm')}
      confirmationText={confirmationText ?? 'warning.confirmation'}
      inputLabel={inputLabel}
      loading={loading}
      loadingText={loadingText ?? t('warning.loading')}
      onCancel={onCancel}
      onConfirm={onConfirm}
      subtitle={subtitle}
      text={text}
      title={title}
      visible={visible}
      warningText={warningText ?? t('warning.text')}
      inputName={inputName}
      variant='warning'
    />
  )
}

export default ZoneWarningModal
