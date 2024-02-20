import { BusinessApplication, BusinessType } from '@/types/business'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export const useBusinessCreateSchema = () => {
  const { t } = useTranslation('validation')

  return yup.object().shape({
    nickName: yup.string().required(t('required', { field: t('fields.nickName') })),
    realName: yup.string().required(t('required', { field: t('fields.realName') })),
    businessType: yup
      .string()
      .required(t('required', { field: t('fields.businessType') }))
      .oneOf(
        [BusinessType.Individual, BusinessType.Corporation],
        t('either', {
          field: t('fields.businessType'),
          value1: t('individual'),
          value2: t('corporation'),
        }),
      ),
    firstName: yup.string().when('businessType', {
      is: 'individual',
      then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.firstName') })),
      otherwise: (schema) => schema.notRequired(),
    }),
    lastName: yup.string().when('businessType', {
      is: 'individual',
      then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.lastName') })),
      otherwise: (schema) => schema.notRequired(),
    }),
    application: yup
      .string()
      .required(t('required', { field: t('fields.application') }))
      .oneOf(
        [BusinessApplication.Accommodation, BusinessApplication.Place, BusinessApplication.Advert],
        t('oneof', {
          field: t('fields.application'),
          value1: t('accommodation'),
          value2: t('place'),
          value3: t('advert'),
        }),
      ),
    identityNumber: yup
      .string()
      .matches(/[0-9]{11}/, t('invalid', { field: t('fields.identityNumber') }))
      .when('businessType', {
        is: 'individual',
        then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.identityNumber') })),
        otherwise: (schema) => schema.notRequired(),
      }),
    serialNumber: yup
      .string()
      .matches(/^[A-Z][0-9]{2}[A-Z][0-9]{5}$/, t('invalid', { field: t('fields.serialNumber') }))
      .when('businessType', {
        is: 'individual',
        then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.serialNumber') })),
        otherwise: (schema) => schema.notRequired(),
      }),
    province: yup.string().required(t('required', { field: t('fields.province') })),
    district: yup.string().required(t('required', { field: t('fields.district') })),
    address: yup.string().required(t('required', { field: t('fields.address') })),
    dateOfBirth: yup.string().when('businessType', {
      is: 'individual',
      then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.dateOfBirth') })),
      otherwise: (schema) => schema.notRequired(),
    }),
    taxNumber: yup
      .string()
      .matches(/[0-9]{10}/, t('invalid', { field: t('fields.taxNumber') }))
      .when('businessType', {
        is: 'corporation',
        then: (schema) => schema.required(t('requiredForCorporate', { field: t('fields.taxNumber') })),
        otherwise: (schema) => schema.notRequired(),
      }),
    type: yup.string().when('businessType', {
      is: 'corporation',
      then: (schema) => schema.required(t('requiredForCorporate', { field: t('fields.corporationType') })),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
}
