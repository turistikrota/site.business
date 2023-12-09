import { CategoryFields, CategoryRule, InputGroup, fetchCategoryFields } from '@/api/category/category.api.ts'
import { Services, apiUrl } from '@/config/services.ts'
import useAutoSave from '@/hooks/autosave.tsx'
import { httpClient } from '@/http/client.tsx'
import { useListingCreateSchema } from '@/schemas/listing-create.schema.tsx'
import { getStaticRoute } from '@/static/page.ts'
import {
  EmptyListingCreateValues,
  ListingFeature,
  ListingFormValues,
  isEmptyListingFormValues,
  isImages,
} from '@/types/listing.ts'
import Button from '@turistikrota/ui/button'
import { useToast } from '@turistikrota/ui/toast'
import { isCoordinates } from '@turistikrota/ui/types'
import { deepEqual } from '@turistikrota/ui/utils'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { FormikErrors, useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { debounce } from 'react-advanced-cropper'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ListingCategoryAlertSection from './sections/ListingCategoryAlertSection.tsx'
import ListingCategoryInputGroupSection from './sections/ListingCategoryInputGroupSection.tsx'
import ListingCategoryRuleSection from './sections/ListingCategoryRuleSection.tsx'
import ListingFormCalendarSection from './sections/ListingFormCalendarSection.tsx'
import ListingFormCategorySection from './sections/ListingFormCategorySection.tsx'
import ListingFormImageSection from './sections/ListingFormImageSection.tsx'
import ListingFormLocationSection from './sections/ListingFormLocationSection.tsx'
import ListingFormMetaSection from './sections/ListingFormMetaSection.tsx'
import ListingFormValidationSection from './sections/ListingFormValidationSection.tsx'

const ListingCreateForm: React.FC = () => {
  const { t, i18n } = useTranslation('listings')
  const [images, setImages] = useState<string[]>([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [inputIndexes, setInputIndexes] = useState<Record<string, number>>({})
  const [categoryFields, setCategoryFields] = useState<CategoryFields>({
    alerts: [],
    inputGroups: [],
    rules: [],
  })
  const [acceptedRules, setAcceptedRules] = useState<Record<string, boolean>>({})
  const toast = useToast()
  const schema = useListingCreateSchema()
  const autoSave = useAutoSave<ListingFormValues>('listing-create-form')
  const [initialCategories, setInitialCategories] = useState<string[]>([])
  const existsData = useMemo(() => autoSave.get(), [])
  const form = useFormik<ListingFormValues>({
    initialValues: {
      ...EmptyListingCreateValues,
    },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: (values) => {
      setLoading(true)
      httpClient
        .post(apiUrl(Services.Listing, `/business`), {
          ...values,
          images: images.map((img, indx) => ({
            url: img,
            order: indx + 1,
          })),
        })
        .then(() => {
          autoSave.remove()
          toast.success(t('create.success'))
          navigate(getStaticRoute(i18n.language).business.details.listing.list)
        })
        .catch((err) => {
          parseApiError({
            error: err.response.data,
            form,
            toast,
            scroller: (elId: string) => {
              const el = document.getElementById(elId)
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
            },
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
    if (
      existsData &&
      JSON.stringify(existsData) !== JSON.stringify(form.values) &&
      !deepEqual(existsData, form.values) &&
      !isEmptyListingFormValues(existsData)
    ) {
      toast.askSuccess({
        title: t('autosave.ask.title'),
        cancelText: t('autosave.ask.cancel'),
        confirmText: t('autosave.ask.confirm'),
        description: t('autosave.ask.description'),
        onConfirm: () => {
          Object.entries(existsData).forEach(([key, value]) => {
            // @ts-ignore
            if (key === 'location' && isCoordinates(value) && value.coordinates[0] === 0 && value.coordinates[1] === 0)
              return
            if (key === 'images') {
              if (isImages(value)) {
                // @ts-ignore
                setImages(value.map((img) => img.url))
              }
              if (Array.isArray(value)) {
                // @ts-ignore
                setImages(value)
              }
            }
            form.setFieldValue(key, value)
          })
          setInitialCategories(existsData.categoryUUIDs)
        },
        onCancel: () => {
          autoSave.remove()
        },
      })
    }
  }, [])

  useEffect(() => {
    if (isEmptyListingFormValues(form.values)) return
    autoSave.set({ ...form.values, images: images })
  }, [form.values])

  useEffect(() => {
    const errors = Object.keys(form.errors)
    if (errors.length === 0) return
    const el = document.getElementById(errors[0])
    console.log('el::', el, errors[0])
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [form.errors])

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
          form.setFieldValue(field, value)
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
          ? t('button.create')
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

export default ListingCreateForm
