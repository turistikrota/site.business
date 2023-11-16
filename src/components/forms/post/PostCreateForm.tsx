import { CategoryFields, InputGroup, fetchCategoryFields } from '@/api/category/category.api'
import Button from '@turistikrota/ui/button'
import { Coordinates, Locales } from '@turistikrota/ui/types'
import { FormikErrors, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { debounce } from 'react-advanced-cropper'
import PostCategoryAlertSection from './PostCategoryAlertSection'
import PostCategoryInputGroupSection from './PostCategoryInputGroupSection'
import PostCategoryRuleSection from './PostCategoryRuleSection'
import PostFormCalendarSection from './PostFormCalendarSection'
import PostFormCategorySection from './PostFormCategorySection'
import PostFormImageSection from './PostFormImageSection'
import PostFormLocationSection from './PostFormLocationSection'
import PostFormMetaSection from './PostFormMetaSection'
import PostFormValidationSection from './PostFormValidationSection'

export type Price = {
  startDate: string
  endDate: string
  price: number
}

export type Prices = Price[]

type BoolRuleType = 'onlyFamily' | 'noPet' | 'noSmoke' | 'noAlcohol' | 'noParty' | 'noUnmarried' | 'noGuest'

export const BoolRules: BoolRuleType[] = [
  'onlyFamily',
  'noPet',
  'noSmoke',
  'noAlcohol',
  'noParty',
  'noUnmarried',
  'noGuest',
] as const

export type BoolRule = (typeof BoolRules)[number]

export type PostFeature<T = any> = {
  categoryInputUUID: string
  value: T
  isPayed: boolean
  price: number
}

export type PostCreateFormValues = {
  meta: {
    [key in Locales]: {
      title: string
      description: string
    }
  }
  categoryUUIDs: string[]
  location: {
    country: string
    city: string
    street: string
    address: string
    isStrict: boolean
    coordinates: Coordinates
  }
  features: PostFeature[]
  validation: {
    minAdult: number
    maxAdult: number
    minKid: number
    maxKid: number
    minBaby: number
    maxBaby: number
    minDate: number
    maxDate: number
  } & {
    [key in BoolRule]: boolean
  }
  prices: Prices
}

const PostCreateForm: React.FC = () => {
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [inputIndexes, setInputIndexes] = useState<Record<string, number>>({})
  const [categoryFields, setCategoryFields] = useState<CategoryFields>({
    alerts: [],
    inputGroups: [],
    rules: [],
  })
  const form = useFormik<PostCreateFormValues>({
    initialValues: {
      categoryUUIDs: [],
      meta: {
        tr: {
          title: '',
          description: '',
        },
        en: {
          title: '',
          description: '',
        },
      },
      location: {
        address: '',
        city: '',
        coordinates: [0, 0],
        country: 'Türkiye',
        isStrict: false,
        street: '',
      },
      validation: {
        minAdult: 1,
        maxAdult: 0,
        minKid: 0,
        maxKid: 0,
        minBaby: 0,
        maxBaby: 0,
        minDate: 0,
        maxDate: 0,
        onlyFamily: false,
        noPet: false,
        noSmoke: false,
        noAlcohol: false,
        noParty: false,
        noUnmarried: false,
        noGuest: false,
      },
      features: [],
      prices: [],
    },
    onSubmit: () => {},
  })

  useEffect(() => {
    if (form.values.categoryUUIDs.length > 0) {
      debouncedCategoryFieldFetcher(form.values.categoryUUIDs)
    } else {
      setCategoryFields({
        alerts: [],
        inputGroups: [],
        rules: [],
      })
    }
  }, [form.values.categoryUUIDs])

  const debouncedCategoryFieldFetcher = debounce((categoryIds: string[]) => {
    fetchCategoryFields(categoryIds).then((res) => {
      setCategoryFields(res)
      calcInputIndexes(res.inputGroups)
    })
  }, 300)

  const calcInputIndexes = (inputGroups: InputGroup[]) => {
    const newIndex: Record<string, number> = {}
    const features: PostFeature[] = []
    inputGroups.forEach((group) => {
      group.inputs.forEach((input, index) => {
        features.push({
          categoryInputUUID: input.uuid,
          value: undefined,
          isPayed: false,
          price: 0,
        })
        newIndex[input.uuid] = index
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
      <PostFormImageSection images={images} setImages={setImages} files={files} setFiles={onFileChange} />
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
      <PostCategoryRuleSection rules={categoryFields.rules} toggleRule={() => {}} />
      <Button htmlType='submit' variant='primary'>
        Submit
      </Button>
    </form>
  )
}

export default PostCreateForm
