import { CategoryFields, CategoryRule, InputGroup, fetchCategoryFields } from '@/api/category/category.api'
import { Services, apiUrl } from '@/config/services'
import useAutoSave from '@/hooks/autosave'
import { httpClient } from '@/http/client'
import { useListingCreateSchema } from '@/schemas/listing-create.schema'
import { getStaticRoute } from '@/static/page'
import {
  EmptyListingCreateValues,
  ListingCreateFormValues,
  ListingFeature,
  isEmptyListingCreateFormValues,
} from '@/types/listing'
import Button from '@turistikrota/ui/button'
import { useToast } from '@turistikrota/ui/toast'
import { deepEqual } from '@turistikrota/ui/utils'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { FormikErrors, useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { debounce } from 'react-advanced-cropper'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ListingCategoryAlertSection from './ListingCategoryAlertSection'
import ListingCategoryInputGroupSection from './ListingCategoryInputGroupSection'
import ListingCategoryRuleSection from './ListingCategoryRuleSection'
import ListingFormCalendarSection from './ListingFormCalendarSection'
import ListingFormCategorySection from './ListingFormCategorySection'
import ListingFormImageSection from './ListingFormImageSection'
import ListingFormLocationSection from './ListingFormLocationSection'
import ListingFormMetaSection from './ListingFormMetaSection'
import ListingFormValidationSection from './ListingFormValidationSection'

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
  const autoSave = useAutoSave<ListingCreateFormValues>('listing-create-form')
  const [initialCategories, setInitialCategories] = useState<string[]>([])
  const existsData = useMemo(() => autoSave.get(), [])
  const form = useFormik<ListingCreateFormValues>({
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
        .post(apiUrl(Services.Listing, `/business`), values)
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
      !isEmptyListingCreateFormValues(existsData)
    ) {
      toast.askSuccess({
        title: t('autosave.ask.title'),
        cancelText: t('autosave.ask.cancel'),
        confirmText: t('autosave.ask.confirm'),
        description: t('autosave.ask.description'),
        onConfirm: () => {
          Object.entries(existsData).forEach(([key, value]) => {
            // @ts-ignore
            if (key === 'location' && value.coordinates[0] === 0 && value.coordinates[1] === 0) return
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
    if (isEmptyListingCreateFormValues(form.values)) return
    autoSave.set(form.values)
  }, [form.values])

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
              accepted: acceptedRules.length,
            })}
      </Button>
    </form>
  )
}

export default ListingCreateForm
