import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export const useInviteCreateSchema = () => {
  const { t } = useTranslation('validation')

  return yup.object().shape({
    email: yup
      .string()
      .email(t('invalid', { field: t('fields.email') }))
      .required(t('required', { field: t('fields.email') })),
    locale: yup.string().required(t('required', { field: t('fields.locale') })),
  })
}
