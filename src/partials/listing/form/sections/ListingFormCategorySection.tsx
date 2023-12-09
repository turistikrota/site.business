import { ListingFormValues } from '@/types/listing.ts'
import FormSection from '@turistikrota/ui/form/section'
import { FormikErrors } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ListingFormCategorySelection from './ListingFormCategorySelection.tsx'

type Props = {
  initialSelectedCategories?: string[]
  values: ListingFormValues
  errors: FormikErrors<ListingFormValues>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setFieldValue: (field: string, value: any) => void
}

const ListingFormCategorySection: React.FC<Props> = ({ initialSelectedCategories, values, errors, setFieldValue }) => {
  const { t } = useTranslation('listings')
  return (
    <FormSection id='categoryUUIDs'>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.category.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.category.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'>
        <ListingFormCategorySelection
          initialSelectedCategories={initialSelectedCategories}
          selectedCategories={values.categoryUUIDs}
          setSelectedCategories={(categories) => {
            setFieldValue('categoryUUIDs', categories)
          }}
          error={
            typeof errors.categoryUUIDs === 'string' ? (
              errors.categoryUUIDs
            ) : (
              <>{errors.categoryUUIDs?.map((e, idx) => <React.Fragment key={idx}>{e}</React.Fragment>)}</>
            )
          }
        />
      </FormSection.Body>
    </FormSection>
  )
}

export default ListingFormCategorySection
