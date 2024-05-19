import { BusinessDetails, BusinessTypes } from '@/api/business/business.api.ts'
import KeyValue from '@/components/KeyValue.tsx'
import { useDayJS } from '@/utils/dayjs.ts'
import Card from '@turistikrota/ui/cards/default'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  business: BusinessDetails
}

type Item = {
  label: string
  value: string
}

const BusinessDetailInformationSection: FC<Props> = ({ business }) => {
  const { t, i18n } = useTranslation(['profile', 'general'])
  const dayjs = useDayJS(i18n.language)

  const items = useMemo<Item[]>(() => {
    const list: Item[] = [
      {
        label: t(`general:key-value.nickName`),
        value: business.nickName,
      },
      {
        label: t(`general:key-value.realName`),
        value: business.realName,
      },
      {
        label: t(`general:key-value.businessType`),
        value: t(`general:key-value.businessTypes.${business.businessType}`),
      },
    ]

    if (business.businessType === BusinessTypes.Individual) {
      list.push(
        ...[
          {
            label: t(`general:key-value.firstName`),
            value: business.details.firstName,
          },
          {
            label: t(`general:key-value.lastName`),
            value: business.details.lastName,
          },
          {
            label: t(`general:key-value.province`),
            value: business.details.province,
          },
          {
            label: t(`general:key-value.district`),
            value: business.details.district,
          },
          {
            label: t(`general:key-value.address`),
            value: business.details.address,
          },
          {
            label: t(`general:key-value.birthDate`),
            value: business.details.birthDate
              ? dayjs(business.details.birthDate).format('DD MMMM YYYY')
              : t(`general:key-value.notProvided`),
          },
        ],
      )
    } else if (business.businessType === BusinessTypes.Corporation) {
      list.push(
        ...[
          {
            label: t(`general:key-value.address`),
            value: business.details.address,
          },
          {
            label: t(`general:key-value.district`),
            value: business.details.district,
          },
          {
            label: t(`general:key-value.province`),
            value: business.details.province,
          },
          {
            label: t(`general:key-value.corporationType`),
            value: t(`general:key-value.corporationTypes.${business.details.type}`),
          },
        ],
      )
    }

    list.push(
      ...[
        {
          label: t(`general:key-value.isActivated`),
          value: business.isEnabled ? t(`general:key-value.yes`) : t(`general:key-value.no`),
        },
        {
          label: t(`general:key-value.updatedAt`),
          value: dayjs(business.updatedAt).format('DD MMMM YYYY HH:mm'),
        },
        {
          label: t(`general:key-value.verifiedAt`),
          value: business.verifiedAt
            ? dayjs(business.verifiedAt).format('DD MMMM YYYY')
            : t(`general:key-value.notVerified`),
        },
        {
          label: t(`general:key-value.createdAt`),
          value: dayjs(business.createdAt).format('DD MMMM YYYY'),
        },
      ],
    )

    return list
  }, [t, business])

  return (
    <section>
      <h2 className='mb-3 text-xl font-semibold'>{t('profile:sections.info')}</h2>
      <div className='grid grid-cols-12 gap-2'>
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

export default BusinessDetailInformationSection
