import { useFormik } from 'formik'
import React from 'react'
import PostFormMetaSection from './PostFormMetaSection'

const PostCreateForm: React.FC = () => {
  const form = useFormik({
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
    },
    onSubmit: () => {},
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.handleSubmit()
  }
  return (
    <form onSubmit={onSubmit}>
      <PostFormMetaSection
        title={{
          en: {
            value: form.values.meta.en.title,
            error: form.errors.meta?.en?.title,
          },
          tr: {
            value: form.values.meta.tr.title,
            error: form.errors.meta?.tr?.title,
          },
        }}
        description={{
          en: {
            value: form.values.meta.en.description,
            error: form.errors.meta?.en?.description,
          },
          tr: {
            value: form.values.meta.tr.description,
            error: form.errors.meta?.tr?.description,
          },
        }}
        onChange={form.handleChange}
      />
    </form>
  )
}

export default PostCreateForm
