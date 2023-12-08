import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { CircleStencil, Cropper, type CropperRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import 'react-advanced-cropper/dist/themes/corners.css'
import Button from '@turistikrota/ui/button'
import Condition from '@turistikrota/ui/condition'
import Modal from '@turistikrota/ui/modal'

type ImageCropperProps = {
  src: string
  visible: boolean
  aspectRatio?: number
  circle?: boolean
  onClose: () => void
  onCrop: (file: File) => void
}

function ImageCropper({ src, visible, aspectRatio = 1, circle = true, onClose, onCrop }: ImageCropperProps) {
  const cropperRef = useRef<CropperRef>(null)
  const { t } = useTranslation('uploader')

  const handleOnCrop = () => {
    if (!cropperRef.current) return
    const canvas = cropperRef.current.getCanvas()
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) return
      const file = new File([blob], 'image.png', {
        type: 'image/png',
        lastModified: Date.now(),
      })
      onCrop(file)
    })
  }

  useEffect(() => {
    setTimeout(() => {
      if (!cropperRef.current) return
      cropperRef.current.reset()
    }, 300)
  }, [visible])

  const rotateLeft = () => {
    if (!cropperRef.current) return
    cropperRef.current.rotateImage(-90)
  }

  const rotateRight = () => {
    if (!cropperRef.current) return
    cropperRef.current.rotateImage(90)
  }

  const flipHorizontal = () => {
    if (!cropperRef.current) return
    cropperRef.current.flipImage(false, true)
  }

  const flipVertical = () => {
    if (!cropperRef.current) return
    cropperRef.current.flipImage(true, false)
  }

  const handleOnCancel = () => {
    onClose()
  }

  return (
    <Modal open={visible} onClose={handleOnCancel} shadow={false}>
      <div className='flex h-full w-full items-center justify-center'>
        <span className='h-full max-h-[90vh] w-full md:max-h-[70vh]'>
          <Condition value={visible}>
            <Cropper
              src={src}
              ref={cropperRef}
              stencilProps={{
                aspectRatio: aspectRatio,
                grid: true,
                previewClassName: 'preview',
              }}
              onReady={(cropper) => {
                cropper.reset()
              }}
              checkOrientation={true}
              stencilComponent={circle ? CircleStencil : undefined}
            />
          </Condition>
          <div className='absolute -top-14 right-1/2 flex translate-x-1/2 transform gap-2'>
            <Button
              block={false}
              className='flex items-center justify-center'
              htmlType='button'
              title={t('button.rotate-left')}
              aria-label={t('button.rotate-left')}
              onClick={rotateLeft}
              variant='opacity'
            >
              <i className='bx bx-sm bx-rotate-left'></i>
            </Button>
            <Button
              block={false}
              className='flex items-center justify-center'
              htmlType='button'
              title={t('button.rotate-right')}
              aria-label={t('button.rotate-right')}
              onClick={rotateRight}
              variant='opacity'
            >
              <i className='bx bx-sm bx-rotate-right'></i>
            </Button>
            <Button
              block={false}
              className='flex items-center justify-center'
              htmlType='button'
              title={t('button.flip-horizontal')}
              aria-label={t('button.flip-horizontal')}
              onClick={flipHorizontal}
              variant='opacity'
            >
              <i className='bx bx-sm bx-reflect-horizontal'></i>
            </Button>
            <Button
              block={false}
              className='flex items-center justify-center'
              htmlType='button'
              title={t('button.flip-vertical')}
              aria-label={t('button.flip-vertical')}
              onClick={flipVertical}
              variant='opacity'
            >
              <i className='bx bx-sm bx-reflect-vertical'></i>
            </Button>
          </div>
          <div className='absolute -bottom-14 right-1/2 mx-auto mt-4 flex translate-x-1/2 transform justify-center gap-2'>
            <Button
              block={false}
              className='flex items-center justify-center'
              htmlType='button'
              title={t('button.save')}
              aria-label={t('button.save')}
              onClick={handleOnCrop}
            >
              <i className='bx bx-sm bx-check'></i>
            </Button>
            <Button
              block={false}
              variant='error'
              className='flex items-center justify-center'
              htmlType='button'
              title={t('button.cancel')}
              aria-label={t('button.cancel')}
              onClick={handleOnCancel}
            >
              <i className='bx bx-sm bx-trash'></i>
            </Button>
          </div>
        </span>
      </div>
    </Modal>
  )
}

export default ImageCropper
