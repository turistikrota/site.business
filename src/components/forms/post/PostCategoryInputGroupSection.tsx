import { CategoryInput, InputGroup, InputTranslation } from '@/api/category/category.api'
import { getI18nTranslation } from '@/types/base'
import Input from '@turistikrota/ui/form/input'
import FormSection from '@turistikrota/ui/form/section'
import { FormikErrors } from 'formik'
import { useTranslation } from 'react-i18next'
import { PostCreateFormValues, PostFeature } from './PostCreateForm'

type Props = {
  values: PostCreateFormValues
  errors: FormikErrors<PostFeature>[]
  inputGroups: InputGroup[]
  inputIndex: Record<string, number>
  setFieldValue: (field: string, value: any) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type RenderProps = {
  formName: string
  value: any
  error?: string
  translation: InputTranslation
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setFieldValue: (field: string, value: any) => void
}

type InputRender = React.FC<CategoryInput & RenderProps>

const Renderer: Record<string, InputRender> = {
  text: ({ formName, translation, value, error, onChange }) => {
    return (
      <div className='col-span-12 sm:col-span-6'>
        <Input
          id={formName}
          type='text'
          name={formName}
          autoComplete={formName}
          label={translation.name}
          ariaLabel={translation.name}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onChange}
        />
      </div>
    )
  },
}

const PostCategoryInputGroupSection: React.FC<Props> = ({
  inputIndex,
  values,
  errors,
  inputGroups,
  onChange,
  setFieldValue,
}) => {
  const { i18n } = useTranslation('posts')
  return (
    <>
      {inputGroups.map((group) => (
        <FormSection key={group.uuid}>
          <FormSection.Head>
            <FormSection.Head.Title>
              {getI18nTranslation(group.translations, i18n.language).name}
            </FormSection.Head.Title>
            <FormSection.Head.Subtitle>
              {getI18nTranslation(group.translations, i18n.language).description}
            </FormSection.Head.Subtitle>
          </FormSection.Head>
          <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'>
            {group.inputs.map((input) => {
              const InputRender = Renderer[input.type]
              if (!InputRender) return null
              return (
                <InputRender
                  key={input.uuid}
                  formName={`features.${inputIndex[input.uuid]}.value`}
                  {...input}
                  value={values.features[inputIndex[input.uuid]].value}
                  error={errors[inputIndex[input.uuid]]?.value as string}
                  translation={getI18nTranslation<InputTranslation>(input.translations, i18n.language)}
                  onChange={onChange}
                  setFieldValue={setFieldValue}
                />
              )
            })}
          </FormSection.Body>
        </FormSection>
      ))}
    </>
  )
}

export default PostCategoryInputGroupSection
