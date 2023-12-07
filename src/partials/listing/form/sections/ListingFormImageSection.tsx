import ImageUploader from '@/components/image/ImageUploader.tsx'
import { Services, apiUrl } from '@/config/services.ts'
import { httpClient } from '@/http/client.tsx'
import { ListingFormValues } from '@/types/listing.ts'
import FormSection from '@turistikrota/ui/form/section'
import ImagePreviewProvider from '@turistikrota/ui/image/preview'
import DisabledSection from '@turistikrota/ui/section/disabled'
import ErrorText from '@turistikrota/ui/text/error'
import { toFormData } from '@turistikrota/ui/utils/transform'
import { FormikErrors } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin'

type DisabledProps = {
  title: string
}

type Props = DisabledProps & {
  images: string[]
  errors: FormikErrors<ListingFormValues>

  setImages: (images: string[]) => void
}

const DisabledWrapper: React.FC<React.PropsWithChildren<DisabledProps>> = ({ title, children }) => {
  const { t } = useTranslation('listings')
  if (!title || title.length < 5)
    return (
      <DisabledSection
        brightness
        variant='error'
        title={t('form.images.error.title')}
        description={t('form.images.error.description')}
      >
        {children}
      </DisabledSection>
    )
  return <>{children}</>
}

const ListingFormImageSection: React.FC<Props> = ({ errors, images, setImages, title }) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('listings')

  const onUploadFiles = async (files: File[]) => {
    setLoading(true)
    const promises = files.map((file) =>
      httpClient
        .post(
          apiUrl(Services.Upload, '/listing'),
          toFormData({
            title: title,
            image: file,
          }),
        )
        .catch(() => ({ data: { url: null } })),
    )
    const responses = await Promise.all(promises)
    const urls = responses.map((res) => res.data.url)
    setImages([...images, ...urls.filter((url) => url !== null)])
    setLoading(false)
  }
  return (
    <DisabledWrapper title={title}>
      <Spin loading={loading}>
        <FormSection>
          <FormSection.Head>
            <FormSection.Head.Title>{t('form.images.title')}</FormSection.Head.Title>
            <FormSection.Head.Subtitle>{t('form.images.subtitle')}</FormSection.Head.Subtitle>
          </FormSection.Head>
          <FormSection.Body className='flex flex-wrap gap-4 rounded-b-md'>
            <ImagePreviewProvider list={images} altPrefix='aa'>
              <ImageUploader onUpload={onUploadFiles}></ImageUploader>
              <ImageUploader.Preview
                list={images}
                onChange={setImages}
                onRemove={(url: string) => {
                  setImages(images.filter((i) => i !== url))
                }}
              ></ImageUploader.Preview>
            </ImagePreviewProvider>
            {typeof errors?.images === 'string' && <ErrorText>{errors.images}</ErrorText>}
          </FormSection.Body>
        </FormSection>
      </Spin>
    </DisabledWrapper>
  )
}

export default ListingFormImageSection
