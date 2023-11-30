import { ListingValidation, ValidationKey } from '@/api/listing/listing.api'
import KeyValue from '@/components/KeyValue'
import Card from '@turistikrota/ui/cards/default'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  validation: ListingValidation
}

type Item = {
  label: string
  value: string
}

type Translation = ReturnType<typeof useTranslation>[0]

type Mixer = (t: Translation, value: number | boolean) => string

const RuleMixers: Record<ValidationKey, Mixer> = {
  minAdult: (t, value) => t('detail.rules.adult', { value }),
  maxAdult: (t, value) => t('detail.rules.adult', { value }),
  minKid: (t, value) => t('detail.rules.kid', { value }),
  maxKid: (t, value) => t('detail.rules.kid', { value }),
  minBaby: (t, value) => t('detail.rules.baby', { value }),
  maxBaby: (t, value) => t('detail.rules.baby', { value }),
  minDate: (t, value) => t('detail.rules.date', { value }),
  maxDate: (t, value) => t('detail.rules.date', { value }),
  onlyFamily: (t, value) => (value ? t('detail.rules.yes') : t('detail.rules.no')),
  noPet: (t, value) => (value ? t('detail.rules.yes') : t('detail.rules.no')),
  noSmoke: (t, value) => (value ? t('detail.rules.yes') : t('detail.rules.no')),
  noAlcohol: (t, value) => (value ? t('detail.rules.yes') : t('detail.rules.no')),
  noParty: (t, value) => (value ? t('detail.rules.yes') : t('detail.rules.no')),
  noUnmarried: (t, value) => (value ? t('detail.rules.yes') : t('detail.rules.no')),
  noGuest: (t, value) => (value ? t('detail.rules.yes') : t('detail.rules.no')),
}

const ListingDetailRuleSection: React.FC<Props> = ({ validation }) => {
  const { t } = useTranslation('listings')

  const items: Item[] = useMemo(
    () =>
      Object.entries(validation).map(([key, value]) => ({
        label: typeof value === 'boolean' ? t(`form.validation.${key}.title`) : t(`form.validation.${key}`),
        value: RuleMixers[key as ValidationKey](t, value),
      })),
    [t, validation],
  )

  return (
    <section>
      <h2 className='mb-3 text-xl font-semibold'>{t('detail.sections.rules')}</h2>
      <div className='grid grid-cols-12 gap-4'>
        {items.map((item, idx) => (
          <Card key={idx} className='col-span-12 md:col-span-6'>
            <KeyValue>
              <KeyValue.Item label={item.label} value={item.value} />
            </KeyValue>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default ListingDetailRuleSection
