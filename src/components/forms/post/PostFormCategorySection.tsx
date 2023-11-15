import FormSection from '@turistikrota/ui/form/section'
import { FormikErrors } from 'formik'
import { useTranslation } from 'react-i18next'
import { PostCreateFormValues } from './PostCreateForm'

type Props = {
  values: PostCreateFormValues
  errors: FormikErrors<PostCreateFormValues>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PostFormCategorySection: React.FC<Props> = ({ values, errors, onChange }) => {
  const { t } = useTranslation('posts')
  return (
    <FormSection>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.category.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.category.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'></FormSection.Body>
    </FormSection>
  )
}

export default PostFormCategorySection
