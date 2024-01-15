import { ListingFormValues } from '@/types/listing'
import Alert from '@turistikrota/ui/alert'
import FormSection from '@turistikrota/ui/form/section'
import Select from '@turistikrota/ui/form/select'
import { FormikErrors } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  values: ListingFormValues
  errors: FormikErrors<ListingFormValues>
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const ListingFormCurrencySection: FC<Props> = ({ values, errors, onChange }) => {
  const { t } = useTranslation('listings')
  return (
    <FormSection>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.currency.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.currency.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'>
        <Alert type='info' showIcon>
          <Alert.Title>{t('form.currency.alert.title')}</Alert.Title>
          <Alert.Description>{t('form.currency.alert.description')}</Alert.Description>
        </Alert>
        <Select
          id='currency'
          name='currency'
          label={t('form.currency.label')}
          ariaLabel={t('form.currency.label')}
          value={values.currency}
          error={errors.currency}
          onChange={onChange}
        >
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='TRY'>TRY</option>
        </Select>
      </FormSection.Body>
    </FormSection>
  )
}

export default ListingFormCurrencySection
