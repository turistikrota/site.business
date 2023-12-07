import {BaseTranslation, CategoryAlert, CategoryMiniMeta} from '@/api/category/category.api.ts'
import {getI18nTranslation} from '@/types/base.ts'
import Alert from '@turistikrota/ui/alert'
import FormSection from '@turistikrota/ui/form/section'
import {useTranslation} from 'react-i18next'

type Props = {
    alerts: CategoryAlert[]
}

const ListingCategoryAlertSection: React.FC<Props> = ({alerts}) => {
    const {t, i18n} = useTranslation('listings')
    return (
        <FormSection
            className={`transition-opacity duration-200 ${alerts.length > 0 ? 'opacity-100' : 'hidden opacity-0'}`}
        >
            <FormSection.Head>
                <FormSection.Head.Title>{t('form.category-alerts.title')}</FormSection.Head.Title>
                <FormSection.Head.Subtitle>{t('form.category-alerts.subtitle')}</FormSection.Head.Subtitle>
            </FormSection.Head>
            <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'>
                {alerts.map((alert) => (
                    <Alert key={alert.uuid} type={alert.type} showIcon>
                        <Alert.Title className='flex justify-between'>
                            {getI18nTranslation<BaseTranslation>(alert.translations, i18n.language).name}{' '}
                            <small className='font-normal'>
                                {t('form.category-alerts.category', {
                                    name: getI18nTranslation<CategoryMiniMeta>(alert.categoryMeta, i18n.language).name,
                                })}
                            </small>
                        </Alert.Title>
                        <Alert.Description>
                            {getI18nTranslation<BaseTranslation>(alert.translations, i18n.language).description}
                        </Alert.Description>
                    </Alert>
                ))}
            </FormSection.Body>
        </FormSection>
    )
}

export default ListingCategoryAlertSection
