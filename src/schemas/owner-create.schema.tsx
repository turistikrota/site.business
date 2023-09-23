import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export const useOwnerCreateSchema = () => {
  const { t } = useTranslation('validation')

  return yup.object().shape({
    nickName: yup.string().required(t('required', { field: t('fields.nickName') })),
    realName: yup.string().required(t('required', { field: t('fields.realName') })),
    ownerType: yup
      .string()
      .required(t('required', { field: t('fields.ownerType') }))
      .oneOf(
        ['individual', 'corporation'],
        t('either', {
          field: t('fields.ownerType'),
          value1: t('individual'),
          value2: t('corporation'),
        }),
      ),
    firstName: yup.string().when('ownerType', {
      is: 'individual',
      then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.firstName') })),
      otherwise: (schema) => schema.notRequired(),
    }),
    lastName: yup.string().when('ownerType', {
      is: 'individual',
      then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.lastName') })),
      otherwise: (schema) => schema.notRequired(),
    }),
    identityNumber: yup
      .string()
      .matches(/[0-9]{11}/, t('invalid', { field: t('fields.identityNumber') }))
      .when('ownerType', {
        is: 'individual',
        then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.identityNumber') })),
        otherwise: (schema) => schema.notRequired(),
      }),
    serialNumber: yup
      .string()
      .matches(/^[A-Z][0-9]{2}[A-Z][0-9]{5}$/, t('invalid', { field: t('fields.serialNumber') }))
      .when('ownerType', {
        is: 'individual',
        then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.serialNumber') })),
        otherwise: (schema) => schema.notRequired(),
      }),
    province: yup.string().required(t('required', { field: t('fields.province') })),
    district: yup.string().required(t('required', { field: t('fields.district') })),
    address: yup.string().required(t('required', { field: t('fields.address') })),
    dateOfBirth: yup.string().when('ownerType', {
      is: 'individual',
      then: (schema) => schema.required(t('requiredForIndividual', { field: t('fields.dateOfBirth') })),
      otherwise: (schema) => schema.notRequired(),
    }),
    taxNumber: yup
      .string()
      .matches(/[0-9]{10}/, t('invalid', { field: t('fields.taxNumber') }))
      .when('ownerType', {
        is: 'corporation',
        then: (schema) => schema.required(t('requiredForCorporate', { field: t('fields.taxNumber') })),
        otherwise: (schema) => schema.notRequired(),
      }),
    type: yup.string().when('ownerType', {
      is: 'corporation',
      then: (schema) => schema.required(t('requiredForCorporate', { field: t('fields.corporationType') })),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
}
