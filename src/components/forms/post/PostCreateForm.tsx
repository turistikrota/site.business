import { CategoryFields, CategoryRule, InputGroup, fetchCategoryFields } from '@/api/category/category.api'
import useAutoSave from '@/hooks/autosave'
import { usePostCreateSchema } from '@/schemas/post-create.schema'
import { EmptyPostCreateValues, PostCreateFormValues, PostFeature, isEmptyPostCreateFormValues } from '@/types/post'
import Button from '@turistikrota/ui/button'
import { useToast } from '@turistikrota/ui/toast'
import { deepEqual } from '@turistikrota/ui/utils'
import { FormikErrors, useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { debounce } from 'react-advanced-cropper'
import { useTranslation } from 'react-i18next'
import PostCategoryAlertSection from './PostCategoryAlertSection'
import PostCategoryInputGroupSection from './PostCategoryInputGroupSection'
import PostCategoryRuleSection from './PostCategoryRuleSection'
import PostFormCalendarSection from './PostFormCalendarSection'
import PostFormCategorySection from './PostFormCategorySection'
import PostFormImageSection from './PostFormImageSection'
import PostFormLocationSection from './PostFormLocationSection'
import PostFormMetaSection from './PostFormMetaSection'
import PostFormValidationSection from './PostFormValidationSection'

const PostCreateForm: React.FC = () => {
  const { t } = useTranslation('posts')
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [inputIndexes, setInputIndexes] = useState<Record<string, number>>({})
  const [categoryFields, setCategoryFields] = useState<CategoryFields>({
    alerts: [],
    inputGroups: [],
    rules: [],
  })
  const [acceptedRules, setAcceptedRules] = useState<string[]>([])
  const toast = useToast()
  const schema = usePostCreateSchema()
  const autoSave = useAutoSave<PostCreateFormValues>('post-create-form')
  const [initialCategories, setInitialCategories] = useState<string[]>([])
  const existsData = useMemo(() => autoSave.get(), [])
  const form = useFormik<PostCreateFormValues>({
    initialValues: {
      ...EmptyPostCreateValues,
    },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: () => {
      setLoading(true)
    },
  })

  const isAllRulesAccepted = useMemo(() => {
    const uniqueAcceptedRules = [...new Set(acceptedRules)]
    return uniqueAcceptedRules.length === categoryFields.rules.length
  }, [acceptedRules, categoryFields.rules])

  useEffect(() => {
    if (
      existsData &&
      JSON.stringify(existsData) !== JSON.stringify(form.values) &&
      !deepEqual(existsData, form.values) &&
      !isEmptyPostCreateFormValues(existsData)
    ) {
      toast.askPrimary({
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
      })
    }
  }, [])

  useEffect(() => {
    if (isEmptyPostCreateFormValues(form.values)) return
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
      setAcceptedRules([])
    }
  }, [form.values.categoryUUIDs])

  const debouncedCategoryFieldFetcher = debounce((categoryIds: string[]) => {
    fetchCategoryFields(categoryIds).then((res) => {
      setAcceptedRules([])
      setCategoryFields(res)
      calcInputIndexes(res.inputGroups)
    })
  }, 300)

  const calcInputIndexes = (inputGroups: InputGroup[]) => {
    const newIndex: Record<string, number> = {}
    const features: PostFeature[] = []
    inputGroups.forEach((group) => {
      group.inputs.forEach((input, index) => {
        newIndex[input.uuid] = index
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

  const onFileChange = (files: File[]) => {
    setFiles(files)
    setImages(files.map((f) => URL.createObjectURL(f)))
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-8 pb-10'>
      <PostFormMetaSection values={form.values} errors={form.errors} onChange={form.handleChange} />
      <PostFormCategorySection
        initialSelectedCategories={initialCategories}
        values={form.values}
        errors={form.errors}
        onChange={form.handleChange}
        setFieldValue={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <PostCategoryAlertSection alerts={categoryFields.alerts} />
      <PostCategoryInputGroupSection
        inputGroups={categoryFields.inputGroups}
        errors={(form.errors?.features as FormikErrors<PostFeature>[]) || []}
        values={form.values}
        inputIndex={inputIndexes}
        onChange={form.handleChange}
        setFieldValue={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <PostFormImageSection
        images={images}
        errors={form.errors}
        setImages={setImages}
        files={files}
        setFiles={onFileChange}
      />
      <PostFormLocationSection
        values={form.values}
        errors={form.errors}
        onChange={form.handleChange}
        setFieldValue={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <PostFormCalendarSection
        values={form.values}
        errors={form.errors}
        setFieldValue={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <PostFormValidationSection
        values={form.values}
        errors={form.errors}
        onChange={form.handleChange}
        onBoolFieldChange={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <PostCategoryRuleSection
        rules={categoryFields.rules}
        toggleRule={(rule: CategoryRule, direction: boolean) => {
          if (direction) {
            setAcceptedRules([...acceptedRules, rule.uuid])
          } else {
            setAcceptedRules(acceptedRules.filter((r) => r !== rule.uuid))
          }
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

export default PostCreateForm
