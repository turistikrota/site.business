import { Locales as LocaleConstant } from '@/config/i18n'
import Input from '@turistikrota/ui/form/input'
import FormSection from '@turistikrota/ui/form/section'
import { Locales } from '@turistikrota/ui/types'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Item = {
  value: string
  error?: string
}

type Props = {
  title: {
    [key in Locales]: Item
  }
  description: {
    [key in Locales]: Item
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PostFormMetaSection: React.FC<Props> = ({ title, description, onChange }) => {
  const { t } = useTranslation('posts')
  return (
    <FormSection>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.meta.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.meta.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='rounded-b-md space-y-4 md:space-y-4'>
        {LocaleConstant.map((locale) => (
          <React.Fragment key={locale}>
            <div className='text-md text-left font-semibold text-gray-800 dark:text-gray-200 mb-2'>
              {t(`config.${locale}`)}
            </div>
            <Input
              id={`meta.${locale}.title`}
              type='text'
              name={`meta.${locale}.title`}
              autoComplete={`meta.${locale}.title`}
              label={t('form.title')}
              ariaLabel={t('form.title')}
              value={title[locale].value}
              error={title[locale].error}
              onChange={onChange}
              onBlur={onChange}
            />
            <Input
              id={`meta.${locale}.description`}
              type='text'
              name={`meta.${locale}.description`}
              autoComplete={`meta.${locale}.description`}
              label={t('form.description')}
              ariaLabel={t('form.description')}
              value={description[locale].value}
              error={description[locale].error}
              onChange={onChange}
              onBlur={onChange}
            />
          </React.Fragment>
        ))}
      </FormSection.Body>
    </FormSection>
  )
}

export default PostFormMetaSection
