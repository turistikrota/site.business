import { uploadProfileCover } from '@/api/upload/upload.api.ts'
import ImageUploaderWithCropper from '@/components/image/ImageUploaderWithCropper.tsx'
import { makeBusinessCover } from '@/utils/cdn.ts'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { toFormData } from '@turistikrota/ui/utils/transform'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin'

type Props = {
  nickName: string
  onOk: () => void
}

const BusinessProfileCoverUploadSection: FC<Props> = ({ nickName, onOk }) => {
  const { t } = useTranslation('profile')
  const [src, setSrc] = useState(makeBusinessCover(nickName))
  const [inputError, setInputError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const onUpload = (formData: FormData) => {
    setIsLoading(true)
    uploadProfileCover(formData)
      .then((res) => {
        if (res && res.status && [200, 201].includes(res.status)) {
          toast.success(t('uploads.success'))
          onOk()
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) return parseApiError({ error: err.response.data, toast })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleUploadCover = (file: File) => {
    if (!file) return setInputError(t('uploads.required').toString())
    onUpload(toFormData({ cover: file }))
  }

  return (
    <section className='relative flex flex-col items-center'>
      <Spin loading={isLoading}>
        <div className='flex items-center justify-center'>
          <img
            src={src}
            alt={t('uploads.cover')}
            title={t('uploads.cover')}
            width={'100%'}
            height={250}
            className='h-64 w-full rounded-md border bg-second object-cover transition-shadow hover:shadow-md'
          />
        </div>
      </Spin>
      <ImageUploaderWithCropper
        src={src}
        onSrcChange={setSrc}
        onChange={handleUploadCover}
        buttonPositionClassName='right-2 bottom-2'
        buttonText={t('uploads.cover')}
        error={inputError}
        onError={setInputError}
        aspectRatio={16 / 9}
        circle={false}
      />
    </section>
  )
}

export default BusinessProfileCoverUploadSection
