import Button from '@turistikrota/ui/button'
import { Locales } from '@turistikrota/ui/types'
import { useFormik } from 'formik'
import React from 'react'
import PostFormMetaSection from './PostFormMetaSection'
import PostFormValidationSection from './PostFormValidationSection'

export type PostCreateFormValues = {
  meta: {
    [key in Locales]: {
      title: string
      description: string
    }
  }
  validation: {
    minAdult: number
    maxAdult: number
    minKid: number
    maxKid: number
    minBaby: number
    maxBaby: number
    minDate: number
    maxDate: number
    onlyFamily: boolean
    noPet: boolean
    noSmoke: boolean
    noAlcohol: boolean
    noParty: boolean
    noUnmarried: boolean
    noGuest: boolean
  }
}

const PostCreateForm: React.FC = () => {
  const form = useFormik<PostCreateFormValues>({
    initialValues: {
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
    },
    onSubmit: () => {},
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.handleSubmit()
  }
  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-8 pb-10'>
      <PostFormMetaSection values={form.values} errors={form.errors} onChange={form.handleChange} />
      <PostFormValidationSection
        values={form.values}
        errors={form.errors}
        onChange={form.handleChange}
        onBoolFieldChange={(field, value) => {
          form.setFieldValue(field, value)
        }}
      />
      <Button htmlType='submit' variant='primary'>
        Submit
      </Button>
    </form>
  )
}

export default PostCreateForm
