import Button from '@turistikrota/ui/button'
import { useImagePreview } from '@turistikrota/ui/image/preview'
import ErrorText from '@turistikrota/ui/text/error'
import React from 'react'
import Dropzone from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import DraggableContainer, { move } from 's-dnm'
import 's-dnm/dist/style.css'
import './image.css'

type PreviewProps = {
  list: string[]
  onChange: (list: string[]) => void
  onRemove: (url: string) => void
}

type Props = {
  value: File[]
  onChange: (value: File[]) => void
  invalid?: boolean
  error?: string
}

type UploaderType = React.FC<Props> & {
  Preview: React.FC<PreviewProps>
}

const ImagePreview: React.FC<PreviewProps> = ({ list, onChange, onRemove }) => {
  const preview = useImagePreview()

  const onOrderChange = (current: number, to: number) => {
    onChange(move(list, current, to))
  }

  const openPreview = (idx: number) => {
    preview.show(idx)
  }
  return (
    <>
      <DraggableContainer onOrderChange={onOrderChange}>
        {list.map((li, idx) => (
          <div key={idx} className='w-40 flex flex-col gap-2'>
            <img
              data-dz-thumbnail=''
              className='rounded h-40 w-40 object-cover'
              src={li}
              onClick={() => openPreview(idx)}
            />
            <Button
              onClick={() => {
                onRemove(li)
              }}
              size='sm'
            >
              Remove
            </Button>
          </div>
        ))}
      </DraggableContainer>
    </>
  )
}

const ImageUploader: UploaderType = ({ invalid = false, value, error, onChange }) => {
  const { t } = useTranslation('dropzone')

  const handleAcceptedFiles = (files: File[]) => {
    onChange([...value, ...files])
  }
  return (
    <Dropzone onDrop={(f: File[]) => handleAcceptedFiles(f)}>
      {({ getRootProps, getInputProps }) => (
        <div className='dropzone w-full'>
          <div className='dz-message needsclick border-dashed border-2 rounded-md h-56' {...getRootProps()}>
            <input {...getInputProps()} className={invalid ? `is-invalid` : ''} aria-invalid={invalid} />
            <div className='dz-message needsclick w-full h-full flex flex-col justify-center items-center'>
              <i className='bx bx-2xl bxs-cloud-upload' />
              <p className='text-md'>{t('text')}</p>
            </div>
            <ErrorText>{error}</ErrorText>
          </div>
        </div>
      )}
    </Dropzone>
  )
}

ImageUploader.Preview = ImagePreview

export default ImageUploader
