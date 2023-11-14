import Button from '@turistikrota/ui/button'
import { Coordinates, Locales } from '@turistikrota/ui/types'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import PostFormImageSection from './PostFormImageSection'
import PostFormLocationSection from './PostFormLocationSection'
import PostFormMetaSection from './PostFormMetaSection'
import PostFormValidationSection from './PostFormValidationSection'

export type PostCreateFormValues = {
  meta: {
    [key in Locales]: {
      title: string
      description: string
    }
  }
  location: {
    country: string
    city: string
    street: string
    address: string
    isStrict: boolean
    coordinates: Coordinates
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
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
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
    },
    onSubmit: () => {},
  })

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
      <PostFormImageSection images={images} setImages={setImages} files={files} setFiles={onFileChange} />
      <PostFormLocationSection
        values={form.values}
        errors={form.errors}
        onChange={form.handleChange}
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
      <Button htmlType='submit' variant='primary'>
        Submit
      </Button>
    </form>
  )
}

export default PostCreateForm
