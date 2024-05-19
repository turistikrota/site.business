import { uploadProfileAvatar } from '@/api/upload/upload.api.ts'
import ImageUploaderWithCropper from '@/components/image/ImageUploaderWithCropper.tsx'
import { makeBusinessAvatar } from '@/utils/cdn.ts'
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

const BusinessProfileImageUploadSection: FC<Props> = ({ nickName, onOk }) => {
  const { t } = useTranslation('profile')
  const [src, setSrc] = useState(makeBusinessAvatar(nickName))
  const [inputError, setInputError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const onUpload = (formData: FormData) => {
    setIsLoading(true)
    uploadProfileAvatar(formData)
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

  const handleUploadAvatar = (file: File) => {
    if (!file) return setInputError(t('uploads.required').toString())
    onUpload(toFormData({ avatar: file }))
  }

  return (
    <section className='relative flex flex-col items-center'>
      <Spin loading={isLoading}>
        <div className='flex items-center justify-center'>
          <img
            src={src}
            alt={t('uploads.avatar')}
            title={t('uploads.avatar')}
            width={150}
            height={150}
            className='h-40 w-40 rounded-md border bg-second object-cover transition-shadow hover:shadow-md md:h-48 md:w-48'
          />
        </div>
      </Spin>
      <ImageUploaderWithCropper
        src={src}
        onSrcChange={setSrc}
        onChange={handleUploadAvatar}
        buttonText={t('uploads.avatar')}
        error={inputError}
        onError={setInputError}
      />
    </section>
  )
}

export default BusinessProfileImageUploadSection
