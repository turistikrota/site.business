import Input from '@turistikrota/ui/form/input'
import { useTranslation } from 'react-i18next'

type MailProps = {
  email: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type SmsProps = {
  phone: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type TelegramProps = {
  chatId: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const MailForm: React.FC<MailProps> = ({ email, onChange, error }) => {
  const { t } = useTranslation('notification')
  return (
    <Input
      name='email'
      id='email'
      type='email'
      autoComplete='email'
      ariaLabel={t('actorConfig.form.email')}
      label={t('actorConfig.form.email')}
      value={email}
      error={error}
      onChange={onChange}
      onBlur={onChange}
      required
    />
  )
}

export const SmsForm: React.FC<SmsProps> = ({ phone, onChange, error }) => {
  const { t } = useTranslation('notification')
  return (
    <Input
      name='phone'
      id='phone'
      type='tel'
      autoComplete='tel'
      ariaLabel={t('actorConfig.form.phone')}
      label={t('actorConfig.form.phone')}
      value={phone}
      error={error}
      onChange={onChange}
      onBlur={onChange}
      required
    />
  )
}

export const TelegramForm: React.FC<TelegramProps> = ({ chatId, onChange, error }) => {
  const { t } = useTranslation('notification')
  return (
    <Input
      name='chatId'
      id='chatId'
      type='text'
      autoComplete='chatId'
      ariaLabel={t('actorConfig.form.chatId')}
      label={t('actorConfig.form.chatId')}
      value={chatId}
      error={error}
      onChange={onChange}
      onBlur={onChange}
      required
    />
  )
}
