import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export const usePostCreateSchema = () => {
  const { t } = useTranslation('validation')
  return yup.object().shape({
    categoryUUIDs: yup
      .array()
      .of(yup.string())
      .required(t('required', { field: t('fields.category') }))
      .min(1, t('min_select', { field: t('fields.category'), value: 1 })),
    meta: yup.object().shape({
      en: yup.object().shape({
        title: yup.string().required(t('required', { field: t('fields.title') })),
        description: yup.string().required(t('required', { field: t('fields.description') })),
      }),
      tr: yup.object().shape({
        title: yup.string().required(t('required', { field: t('fields.title') })),
        description: yup.string().required(t('required', { field: t('fields.description') })),
      }),
    }),
    location: yup.object().shape({
      country: yup.string().required(t('required', { field: t('fields.country') })),
      city: yup.string().required(t('required', { field: t('fields.city') })),
      street: yup.string().required(t('required', { field: t('fields.street') })),
      address: yup.string().required(t('required', { field: t('fields.address') })),
      isStrict: yup.boolean(),
      coordinates: yup
        .array()
        .of(yup.number())
        .required(t('required', { field: t('fields.coordinates') })),
    }),
    validation: yup.object().shape({
      minAdult: yup
        .number()
        .required(t('required', { field: t('fields.minAdult') }))
        .min(1, t('min', { field: t('fields.minAdult'), value: 1 })),
      maxAdult: yup.number(),
      minKid: yup.number(),
      maxKid: yup.number(),
      minBaby: yup.number(),
      maxBaby: yup.number(),
      minDate: yup.number(),
      maxDate: yup.number(),
      onlyFamily: yup.boolean(),
      noPet: yup.boolean(),
      noSmoke: yup.boolean(),
      noAlcohol: yup.boolean(),
      noParty: yup.boolean(),
      noUnmarried: yup.boolean(),
      noGuest: yup.boolean(),
    }),
    features: yup.array().of(
      yup.object().shape({
        categoryInputUUID: yup.string().required(t('required', { field: t('fields.categoryInput') })),
        isPayed: yup.boolean(),
        price: yup.number(),
      }),
    ),
    prices: yup
      .array()
      .of(
        yup.object().shape({
          startDate: yup.string().required(t('required', { field: t('fields.startDate') })),
          endDate: yup.string().required(t('required', { field: t('fields.endDate') })),
          price: yup.number().required(t('required', { field: t('fields.price') })),
        }),
      )
      .min(1, t('min_select', { field: t('fields.price'), value: 1 })),
  })
}
