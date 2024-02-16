import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

export const useActorConfigSchema = () => {
  const { t } = useTranslation('validation')

  return Yup.object().shape({
    name: Yup.string().required(t('required')),
    type: Yup.string().required(t('required')),
    chatId: Yup.string().when('type', {
      is: 'telegram',
      then: (s) => s.required(t('required')).matches(/^\d{9,}$/, t('invalidChatId')),
      otherwise: (s) => s.notRequired(),
    }),
    phone: Yup.string().when('type', {
      is: 'sms',
      then: (s) => s.required(t('required')).matches(/^\+[1-9]\d{1,14}$/, t('invalidPhone')),
      otherwise: (s) => s.notRequired(),
    }),
    email: Yup.string().when('type', {
      is: 'mail',
      then: (s) => s.required(t('required')),
      otherwise: (s) => s.notRequired(),
    }),
  })
}
