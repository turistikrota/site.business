import { CategoryFields, CategoryRule, InputGroup, fetchCategoryFields } from '@/api/category/category.api'
import { ListingDetails } from '@/api/listing/listing.api.ts'
import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useListingEditSchema } from '@/schemas/listing-edit.schema'
import { ListingFeature, ListingFormValues, crateListingFormValuesFromDetails } from '@/types/listing'
import Button from '@turistikrota/ui/button'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { FormikErrors, useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { debounce } from 'react-advanced-cropper'
import { useTranslation } from 'react-i18next'
import ListingCategoryAlertSection from './sections/ListingCategoryAlertSection'
import ListingCategoryInputGroupSection from './sections/ListingCategoryInputGroupSection'
import ListingCategoryRuleSection from './sections/ListingCategoryRuleSection'
import ListingFormCalendarSection from './sections/ListingFormCalendarSection'
import ListingFormCategorySection from './sections/ListingFormCategorySection'
import ListingFormImageSection from './sections/ListingFormImageSection'
import ListingFormLocationSection from './sections/ListingFormLocationSection'
import ListingFormMetaSection from './sections/ListingFormMetaSection'
import ListingFormValidationSection from './sections/ListingFormValidationSection'

type Props = {
  details: ListingDetails
  onOk: () => void
}

const ListingEditForm: React.FC<Props> = ({ details, onOk }) => {
  const { t } = useTranslation('listings')
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [inputIndexes, setInputIndexes] = useState<Record<string, number>>({})
  const [categoryFields, setCategoryFields] = useState<CategoryFields>({
    alerts: [],
    inputGroups: [],
    rules: [],
  })
  const [acceptedRules, setAcceptedRules] = useState<Record<string, boolean>>({})
  const toast = useToast()
  const schema = useListingEditSchema()
  const [initialCategories, setInitialCategories] = useState<string[]>([])
  const form = useFormik<ListingFormValues>({
    initialValues: crateListingFormValuesFromDetails(details),
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: (values) => {
      setLoading(true)
      httpClient
        .put(apiUrl(Services.Listing, `/business/${details.uuid}`), {
          ...values,
          images: images.map((img, indx) => ({
            url: img,
            order: indx + 1,
          })),
        })
        .then(() => {
          toast.success(t('edit.success'))
          onOk()
        })
        .catch((err) => {
          parseApiError({
            error: err.response.data,
            form,
            toast,
          })
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })
  const isAllRulesAccepted = useMemo(() => {
    return Object.keys(acceptedRules).length === categoryFields.rules.length
  }, [acceptedRules, categoryFields.rules])

  useEffect(() => {
    if (form.values.categoryUUIDs.length > 0) {
      debouncedCategoryFieldFetcher(form.values.categoryUUIDs)
    } else {
      setCategoryFields({
        alerts: [],
        inputGroups: [],
        rules: [],
      })
      setAcceptedRules({})
    }
  }, [form.values.categoryUUIDs])

  useEffect(() => {
    if (details) {
      setInitialCategories(details.categoryUUIDs)
      setImages(details.images.sort((a, b) => a.order - b.order).map((image) => image.url))
    }
  }, [details])

  const debouncedCategoryFieldFetcher = debounce((categoryIds: string[]) => {
    fetchCategoryFields(categoryIds).then((res) => {
      setAcceptedRules({})
      setCategoryFields(res)
      calcInputIndexes(res.inputGroups)
    })
  }, 300)

  const onImagesChange = (images: string[]) => {
    const mapped = images.map((img, indx) => ({
      url: img,
      order: indx + 1,
    }))
    form.setFieldValue('images', mapped)
    setImages(images)
  }

  const calcInputIndexes = (inputGroups: InputGroup[]) => {
    const newIndex: Record<string, number> = {}
    const features: ListingFeature[] = []
    inputGroups.forEach((group) => {
      group.inputs.forEach((input) => {
        newIndex[input.uuid] = features.length
        const already = form.values.features.find((f) => f.categoryInputUUID === input.uuid)
        if (already) {
          features.push(already)
          return
        }
        features.push({
          categoryInputUUID: input.uuid,
          value: undefined,
          isPayed: false,
          price: 0,
        })
      })
    })
    form.setFieldValue('features', features)
    setInputIndexes(newIndex)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.handleSubmit()
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-8 pb-10'>
      {JSON.stringify(form.errors)}
      <ListingFormMetaSection values={form.values} errors={form.errors} onChange={form.handleChange} />
      <ListingFormCategorySection
        initialSelectedCategories={initialCategories}
        values={form.values}
        errors={form.errors}
        onChange={form.handleChange}
        setFieldValue={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <ListingCategoryAlertSection alerts={categoryFields.alerts} />
      <ListingCategoryInputGroupSection
        inputGroups={categoryFields.inputGroups}
        errors={(form.errors?.features as FormikErrors<ListingFeature>[]) || []}
        values={form.values}
        inputIndex={inputIndexes}
        onChange={form.handleChange}
        setFieldValue={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <ListingFormImageSection
        images={images}
        errors={form.errors}
        setImages={onImagesChange}
        title={form.values.meta.tr.title}
      />
      <ListingFormLocationSection
        values={form.values}
        errors={form.errors}
        onChange={form.handleChange}
        setFieldValue={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <ListingFormCalendarSection
        values={form.values}
        errors={form.errors}
        setFieldValue={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <ListingFormValidationSection
        values={form.values}
        errors={form.errors}
        onChange={form.handleChange}
        onBoolFieldChange={(field, value) => {
          form.setFieldValue(field, typeof value === 'boolean' ? value : false)
        }}
      />
      <ListingCategoryRuleSection
        rules={categoryFields.rules}
        acceptedRules={acceptedRules}
        toggleRule={(rule: CategoryRule, direction: boolean) => {
          setAcceptedRules({
            ...acceptedRules,
            [rule.uuid]: direction,
          })
        }}
      />
      <Button
        htmlType='submit'
        variant='primary'
        disabled={!isAllRulesAccepted || loading}
        className='disabled:opacity-50'
      >
        {isAllRulesAccepted
          ? t('button.edit')
          : loading
            ? t('button.loading')
            : t('button.disabled', {
                total: categoryFields.rules.length,
                accepted: Object.keys(acceptedRules).length,
              })}
      </Button>
    </form>
  )
}

export default ListingEditForm
