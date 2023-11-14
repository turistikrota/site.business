import ImageUploader from '@/components/image/ImageUploader'
import FormSection from '@turistikrota/ui/form/section'
import ImagePreviewProvider from '@turistikrota/ui/image/preview'
import { useTranslation } from 'react-i18next'

type Props = {
  images: string[]
  files: File[]
  setImages: (images: string[]) => void
  setFiles: (files: File[]) => void
}

const PostFormImageSection: React.FC<Props> = ({ files, images, setFiles, setImages }) => {
  const { t } = useTranslation('posts')
  return (
    <FormSection>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.images.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.images.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='rounded-b-md flex flex-wrap gap-4'>
        <ImagePreviewProvider list={images} altPrefix='aa'>
          <ImageUploader onChange={setFiles} value={files}></ImageUploader>
          <ImageUploader.Preview
            list={images}
            onChange={setImages}
            onRemove={(url: string) => {
              setFiles(files.filter((f) => URL.createObjectURL(f) !== url))
              setImages(images.filter((i) => i !== url))
            }}
          ></ImageUploader.Preview>
        </ImagePreviewProvider>
      </FormSection.Body>
    </FormSection>
  )
}

export default PostFormImageSection
