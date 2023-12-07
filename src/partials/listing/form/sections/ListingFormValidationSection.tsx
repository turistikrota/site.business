import { BoolRules, ListingFormValues } from '@/types/listing.ts'
import Input from '@turistikrota/ui/form/input'
import LineForm from '@turistikrota/ui/form/line'
import FormSection from '@turistikrota/ui/form/section'
import ToggleButton from '@turistikrota/ui/form/toggle'
import { FormikErrors } from 'formik'
import { useTranslation } from 'react-i18next'

type Props = {
  values: ListingFormValues
  errors: FormikErrors<ListingFormValues>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBoolFieldChange: (field: string, value: boolean) => void
}

const ListingFormValidationSection: React.FC<Props> = ({ values, errors, onBoolFieldChange, onChange }) => {
  const { t } = useTranslation('listings')
  return (
    <FormSection>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.validation.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.validation.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='grid grid-cols-12 gap-4 rounded-b-md'>
        <div className='col-span-12 sm:col-span-6'>
          <Input
            id={`validation.minAdult`}
            type='number'
            name={`validation.minAdult`}
            autoComplete={`validation.minAdult`}
            label={t('form.validation.minAdult')}
            ariaLabel={t('form.validation.minAdult')}
            value={values.validation.minAdult}
            error={errors.validation?.minAdult}
            onChange={onChange}
            onBlur={onChange}
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <Input
            id={`validation.maxAdult`}
            type='number'
            name={`validation.maxAdult`}
            autoComplete={`validation.maxAdult`}
            label={t('form.validation.maxAdult')}
            ariaLabel={t('form.validation.maxAdult')}
            value={values.validation.maxAdult}
            error={errors.validation?.maxAdult}
            onChange={onChange}
            onBlur={onChange}
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <Input
            id={`validation.minKid`}
            type='number'
            name={`validation.minKid`}
            autoComplete={`validation.minKid`}
            label={t('form.validation.minKid')}
            ariaLabel={t('form.validation.minKid')}
            value={values.validation.minKid}
            error={errors.validation?.minKid}
            onChange={onChange}
            onBlur={onChange}
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <Input
            id={`validation.maxKid`}
            type='number'
            name={`validation.maxKid`}
            autoComplete={`validation.maxKid`}
            label={t('form.validation.maxKid')}
            ariaLabel={t('form.validation.maxKid')}
            value={values.validation.maxKid}
            error={errors.validation?.maxKid}
            onChange={onChange}
            onBlur={onChange}
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <Input
            id={`validation.minBaby`}
            type='number'
            name={`validation.minBaby`}
            autoComplete={`validation.minBaby`}
            label={t('form.validation.minBaby')}
            ariaLabel={t('form.validation.minBaby')}
            value={values.validation.minBaby}
            error={errors.validation?.minBaby}
            onChange={onChange}
            onBlur={onChange}
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <Input
            id={`validation.maxBaby`}
            type='number'
            name={`validation.maxBaby`}
            autoComplete={`validation.maxBaby`}
            label={t('form.validation.maxBaby')}
            ariaLabel={t('form.validation.maxBaby')}
            value={values.validation.maxBaby}
            error={errors.validation?.maxBaby}
            onChange={onChange}
            onBlur={onChange}
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <Input
            id={`validation.minDate`}
            type='number'
            name={`validation.minDate`}
            autoComplete={`validation.minDate`}
            label={t('form.validation.minDate')}
            ariaLabel={t('form.validation.minDate')}
            value={values.validation.minDate}
            error={errors.validation?.minDate}
            onChange={onChange}
            onBlur={onChange}
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <Input
            id={`validation.maxDate`}
            type='number'
            name={`validation.maxDate`}
            autoComplete={`validation.maxDate`}
            label={t('form.validation.maxDate')}
            ariaLabel={t('form.validation.maxDate')}
            value={values.validation.maxDate}
            error={errors.validation?.maxDate}
            onChange={onChange}
            onBlur={onChange}
          />
        </div>

        {BoolRules.map((field) => (
          <LineForm key={field} className='col-span-12 rounded-md p-2 hover:bg-third'>
            <LineForm.Left>
              <LineForm.Left.Title>{t(`form.validation.${field}.title`)}</LineForm.Left.Title>
              <LineForm.Left.Description>{t(`form.validation.${field}.description`)}</LineForm.Left.Description>
            </LineForm.Left>
            <LineForm.Right>
              <ToggleButton
                defaultChecked={values.validation[field]}
                variant='error'
                title={t(`form.validation.${field}.alt`)}
                onChange={(e) => onBoolFieldChange(`validation.${field}`, e)}
              />
            </LineForm.Right>
          </LineForm>
        ))}
      </FormSection.Body>
    </FormSection>
  )
}

export default ListingFormValidationSection
