import { BaseTranslation, CategoryMiniMeta, CategoryRule } from '@/api/category/category.api'
import { getI18nTranslation } from '@/types/base'
import LineForm from '@turistikrota/ui/form/line'
import FormSection from '@turistikrota/ui/form/section'
import ToggleButton from '@turistikrota/ui/form/toggle'
import { useTranslation } from 'react-i18next'

type Props = {
  rules: CategoryRule[]
  acceptedRules: Record<string, boolean>
  toggleRule: (rule: CategoryRule, direction: boolean) => void
}

const PostCategoryRuleSection: React.FC<Props> = ({ rules, acceptedRules, toggleRule }) => {
  const { t, i18n } = useTranslation('posts')
  return (
    <FormSection className={`transition-opacity duration-200 ${rules.length > 0 ? 'opacity-100' : 'hidden opacity-0'}`}>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.category-rules.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.category-rules.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'>
        {rules.map((rule) => (
          <LineForm key={rule.uuid} className='col-span-12 rounded-md p-2 hover:bg-third'>
            <LineForm.Left>
              <small>
                {t('form.category-alerts.category', {
                  name: getI18nTranslation<CategoryMiniMeta>(rule.categoryMeta, i18n.language).name,
                })}
              </small>
              <LineForm.Left.Title>
                {getI18nTranslation<BaseTranslation>(rule.translations, i18n.language).name}
              </LineForm.Left.Title>
              <LineForm.Left.Description>
                {getI18nTranslation<BaseTranslation>(rule.translations, i18n.language).description}
              </LineForm.Left.Description>
            </LineForm.Left>
            <LineForm.Right>
              <ToggleButton
                defaultChecked={false}
                checked={acceptedRules[rule.uuid]}
                variant='success'
                title={getI18nTranslation<BaseTranslation>(rule.translations, i18n.language).name}
                onChange={(e) => toggleRule(rule, e)}
              />
            </LineForm.Right>
          </LineForm>
        ))}
      </FormSection.Body>
    </FormSection>
  )
}

export default PostCategoryRuleSection
