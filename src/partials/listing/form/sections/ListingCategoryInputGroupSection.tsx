import { InputGroup, InputTranslation } from '@/api/category/category.api.ts'
import CategoryDateInput from '@/partials/listing/form/category-inputs/DateInput.tsx'
import { InputRender } from '@/partials/listing/form/category-inputs/types.tsx'
import { getI18nTranslation } from '@/types/base.ts'
import { ListingFeature, ListingFormValues } from '@/types/listing.ts'
import Checkbox from '@turistikrota/ui/form/checkbox'
import Input from '@turistikrota/ui/form/input'
import Radio from '@turistikrota/ui/form/radio'
import FormSection from '@turistikrota/ui/form/section'
import Select from '@turistikrota/ui/form/select'
import Textarea from '@turistikrota/ui/form/textarea'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import ErrorText from '@turistikrota/ui/text/error'
import { FormikErrors } from 'formik'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  values: ListingFormValues
  errors: FormikErrors<ListingFeature>[]
  inputGroups: InputGroup[]
  inputIndex: Record<string, number>
  setFieldValue: (field: string, value: any) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

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
  select: ({ formName, translator, translation, value, error, onChange, options }) => {
    return (
      <div className='col-span-12 sm:col-span-6'>
        <Select
          id={formName}
          name={formName}
          label={translation.name}
          ariaLabel={translation.name}
          value={value}
          error={error}
          onChange={onChange}
        >
          <Select.DefaultOption />
          {options.map((option) => (
            <option key={option} value={option}>
              {translator(option)}
            </option>
          ))}
        </Select>
      </div>
    )
  },
  textarea: ({ formName, translation, value, error, onChange }) => {
    return (
      <div className='col-span-12 sm:col-span-6'>
        <Textarea
          id={formName}
          name={formName}
          autoComplete={formName}
          label={translation.name}
          ariaLabel={translation.name}
          value={value}
          error={error}
          rows={3}
          onChange={onChange}
          onBlur={onChange}
        />
      </div>
    )
  },
  number: ({ formName, translation, value, error, onChange, extra }) => {
    return (
      <div className='col-span-12 sm:col-span-6'>
        <Input
          id={formName}
          type='number'
          name={formName}
          autoComplete={formName}
          label={
            translation.placeholder !== translation.name
              ? `${translation.name} | ${translation.placeholder}`
              : translation.name
          }
          ariaLabel={translation.name}
          value={value}
          error={error}
          min={extra?.find((e) => e.name === 'min')?.value}
          max={extra?.find((e) => e.name === 'max')?.value}
          onChange={onChange}
          onBlur={onChange}
        />
      </div>
    )
  },
  radio: ({ formName, translator, isDesktop, translation, value, error, setFieldValue, extra, options }) => {
    return (
      <div className='col-span-12'>
        <div className='text-sm font-medium text-gray-700 dark:text-gray-300'>{translation.name}</div>
        <div className='text-xs text-gray-500 dark:text-gray-400'>{translation.placeholder}</div>
        {options.map((option) => (
          <Radio
            key={`${formName}-${option}`}
            id={`${formName}-${option}`}
            name={formName}
            reverse={!isDesktop}
            effect={isDesktop ? 'hover' : undefined}
            value={value === option}
            onChange={(e: boolean) => {
              if (e) setFieldValue(formName, option)
              else setFieldValue(formName, undefined)
            }}
          >
            {extra.find((e) => e.name === 'no-translate')?.value ? option : translator(option)}
          </Radio>
        ))}
        <ErrorText>{error}</ErrorText>
      </div>
    )
  },
  checkbox: ({ formName, translator, isDesktop, translation, value, error, setFieldValue, extra, options }) => {
    return (
      <div className='col-span-12'>
        <div className='text-sm font-medium text-gray-700 dark:text-gray-300'>{translation.name}</div>
        <div className='text-xs text-gray-500 dark:text-gray-400'>{translation.placeholder}</div>
        <div className='mt-2 space-y-4'>
          {options.map((option) => (
            <Checkbox
              key={`${formName}-${option}`}
              id={`${formName}-${option}`}
              name={formName}
              reversed={!isDesktop}
              effect={isDesktop ? 'hover' : undefined}
              value={value?.includes(option)}
              onChange={(e: boolean) => {
                if (e) {
                  const newVal = value ? [...value, option] : [option]
                  setFieldValue(formName, newVal)
                } else {
                  setFieldValue(
                    formName,
                    value.filter((v: string) => v !== option),
                  )
                }
              }}
            >
              {extra.find((e) => e.name === 'no-translate')?.value ? option : translator(option)}
            </Checkbox>
          ))}
        </div>
        <ErrorText>{error}</ErrorText>
      </div>
    )
  },
  date: CategoryDateInput,
  price: ({ formName, translation, value, error, onChange, extra }) => {
    return (
      <div className='col-span-12 sm:col-span-6'>
        <Input
          id={formName}
          name={formName}
          type='number'
          pattern='[0-9]*'
          autoComplete={formName}
          label={translation.name}
          ariaLabel={translation.name}
          value={value}
          error={error}
          min={extra?.find((e) => e.name === 'min')?.value}
          max={extra?.find((e) => e.name === 'max')?.value}
          onChange={onChange}
          onBlur={onChange}
        />
      </div>
    )
  },
}

const ListingCategoryInputGroupSection: React.FC<Props> = ({
  inputIndex,
  values,
  errors,
  inputGroups,
  onChange,
  setFieldValue,
}) => {
  const { t, i18n } = useTranslation('listings')
  const isDesktop = useIsDesktop()
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
            {group.inputs.map((input, idx) => {
              const InputRender = Renderer[input.type]
              if (!InputRender) return null
              return (
                <Fragment key={input.uuid}>
                  <InputRender
                    formName={`features[${inputIndex[input.uuid]}].value`}
                    {...input}
                    isDesktop={isDesktop}
                    value={values.features[inputIndex[input.uuid]].value}
                    error={errors[inputIndex[input.uuid]]?.value as string}
                    translation={getI18nTranslation<InputTranslation>(input.translations, i18n.language)}
                    onChange={onChange}
                    setFieldValue={setFieldValue}
                    translator={(key: string) => t(`form.category-inputs.options.${key}`)}
                  />
                  {['checkbox', 'radio'].includes(input.type) &&
                    group.inputs.length > 1 &&
                    group.inputs.length - 1 !== idx && (
                      <div className='col-span-12'>
                        <hr className='mx-auto my-4' />
                      </div>
                    )}
                </Fragment>
              )
            })}
          </FormSection.Body>
        </FormSection>
      ))}
    </>
  )
}

export default ListingCategoryInputGroupSection
