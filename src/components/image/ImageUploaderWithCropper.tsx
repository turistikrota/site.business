import { FC, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImageCropper from '@/components/image/ImageCropper.tsx'

type Props = {
  src: string
  onSrcChange: (src: string) => void
  onChange: (file: File) => void
  buttonText: string
  minSize?: number
  maxSize?: number
  accept?: string
  loading?: boolean
  circle?: boolean
  aspectRatio?: number
  buttonPositionClassName?: string
  error: string | null
  onError: (error: string | null) => void
}

const ImageUploaderWithCropper: FC<Props> = ({
  buttonPositionClassName = 'bottom-1 right-1/2 translate-x-1/2 translate-y-1/2',
  onSrcChange: setSrc,
  onChange,
  circle = true,
  buttonText,
  aspectRatio = 1,
  minSize = 0,
  maxSize = 1,
  accept = 'image/png',
  onError: setError,
  loading,
}) => {
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [cropVisible, setCropVisible] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation('uploader')

  const validate = (file: File | undefined): Promise<File> => {
    return new Promise((resolve, reject) => {
      if (!file) return reject(t('errors.required').toString())
      if (file.size < minSize * 1024 * 1024)
        return reject(
          t('errors.min', {
            min: minSize,
          }).toString(),
        )

      if (file.size > maxSize * 1024 * 1024)
        return reject(
          t('errors.max', {
            max: maxSize,
          }).toString(),
        )

      if (!file.type.startsWith(accept)) return reject(t('errors.type', { accept }).toString())
      return resolve(file)
    })
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const validFile = await validate(file).catch((err) => {
      setError(err)
      return null
    })

    if (validFile) {
      setError(null)
      setCropSrc(URL.createObjectURL(validFile))
      setCropVisible(true)
    }
  }

  const focus = () => {
    if (!fileInputRef.current) return
    fileInputRef.current.click()
  }

  const onClose = () => {
    setCropVisible(false)
    if (!fileInputRef.current) return
    fileInputRef.current.value = ''
  }

  const onCrop = (file: File) => {
    setSrc(URL.createObjectURL(file))
    setCropVisible(false)
    onChange(file)
    if (!fileInputRef.current) return
    fileInputRef.current.value = ''
  }
  return (
    <>
      <ImageCropper
        visible={cropVisible}
        onClose={onClose}
        onCrop={onCrop}
        src={cropSrc!}
        circle={circle}
        aspectRatio={aspectRatio}
      ></ImageCropper>
      <span
        role='button'
        className={`absolute flex items-center justify-center gap-1 rounded-md border bg-second px-3 py-1 text-gray-800 transition-all duration-200 hover:brightness-125 dark:text-gray-200 ${buttonPositionClassName}`}
        onClick={() => {
          if (loading) return
          focus()
        }}
        title={buttonText}
        aria-label={buttonText}
        aria-disabled={loading}
      >
        <i className='bx bx-xs bx-edit'></i>
        {loading ? t('loading') : buttonText}
      </span>
      <input type='file' className='hidden' accept={accept} onChange={handleChange} ref={fileInputRef} />
    </>
  )
}

export default ImageUploaderWithCropper
