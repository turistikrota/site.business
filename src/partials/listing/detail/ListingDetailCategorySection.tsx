import { FC } from 'react'
import {
  CategoryFields,
  CategoryListItem,
  fetchCategoryFields,
  fetchCategoryListByUUIDs,
} from '@/api/category/category.api.ts'
import { useQuery } from '@/hooks/query.tsx'
import ContentLoader from '@turistikrota/ui/loader'
import { useTranslation } from 'react-i18next'
import { getI18nTranslation } from '@/types/base.ts'
import FormSection from '@turistikrota/ui/form/section'
import { ListingFeature } from '@/types/listing.ts'
import { useCategoryFeatures } from '@/hooks/category.fields.tsx'
import Card from '@turistikrota/ui/cards/default'
import KeyValue from '@/components/KeyValue.tsx'

type Props = {
  categoryUUIDs: string[]
  features: ListingFeature[]
}

const ListingDetailCategorySection: FC<Props> = ({ categoryUUIDs, features }) => {
  const { t, i18n } = useTranslation('listings')
  const { data: fields, loading: fieldLoading } = useQuery<CategoryFields>(() => fetchCategoryFields(categoryUUIDs))
  const { data: categories, loading: categoryLoading } = useQuery<CategoryListItem[]>(() =>
    fetchCategoryListByUUIDs(categoryUUIDs),
  )

  const { filterByGroup, fixValue } = useCategoryFeatures(fields?.inputGroups ?? [], features)

  if (fieldLoading || categoryLoading) return <ContentLoader noMargin />
  if (!fields && !categories) return <></>

  return (
    <>
      <section>
        <h2 className='mb-3 text-xl font-semibold'>{t('detail.sections.category')}</h2>
        {categories && <div>{categories.map((c) => c.meta.tr.title).join(', ')}</div>}
      </section>

      {fields && (
        <>
          {fields.inputGroups.map((group, groupIdx) => (
            <section key={groupIdx}>
              <FormSection.Head.Title className='text-lg font-semibold'>
                {getI18nTranslation(group.translations, i18n.language).name}
              </FormSection.Head.Title>
              <FormSection.Head.Subtitle>
                {getI18nTranslation(group.translations, i18n.language).description}
              </FormSection.Head.Subtitle>
              <section className={'mt-4 grid grid-cols-12 gap-4'}>
                {filterByGroup(group.uuid).map((feature, featureIdx) => (
                  <Card key={featureIdx} className={'col-span-12 md:col-span-6'}>
                    <KeyValue>
                      <KeyValue.Item label={feature.translation.name} value={fixValue(feature.value, feature.extra)} />
                    </KeyValue>
                  </Card>
                ))}
              </section>
            </section>
          ))}
        </>
      )}
    </>
  )
}

export default ListingDetailCategorySection
