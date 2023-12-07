import { Locales as LocaleConstant } from '@/config/i18n.tsx'
import { ListingFormValues } from '@/types/listing.ts'
import Input from '@turistikrota/ui/form/input'
import FormSection from '@turistikrota/ui/form/section'
import { FormikErrors } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  values: ListingFormValues
  errors: FormikErrors<ListingFormValues>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ListingFormMetaSection: React.FC<Props> = ({ values, errors, onChange }) => {
  const { t } = useTranslation('listings')
  return (
    <FormSection>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.meta.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.meta.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'>
        {LocaleConstant.map((locale) => (
          <React.Fragment key={locale}>
            <div className='text-md mb-2 text-left font-semibold text-gray-800 dark:text-gray-200'>
              {t(`config.${locale}`)}
            </div>
            <Input
              id={`meta.${locale}.title`}
              type='text'
              name={`meta.${locale}.title`}
              autoComplete={`meta.${locale}.title`}
              label={t('form.title')}
              ariaLabel={t('form.title')}
              value={values.meta[locale].title}
              error={errors.meta?.[locale]?.title}
              onChange={onChange}
              onBlur={onChange}
            />
            <Input
              id={`meta.${locale}.description`}
              type='text'
              name={`meta.${locale}.description`}
              autoComplete={`meta.${locale}.description`}
              label={t('form.description')}
              ariaLabel={t('form.description')}
              value={values.meta[locale].description}
              error={errors.meta?.[locale]?.description}
              onChange={onChange}
              onBlur={onChange}
            />
          </React.Fragment>
        ))}
      </FormSection.Body>
    </FormSection>
  )
}

export default ListingFormMetaSection
