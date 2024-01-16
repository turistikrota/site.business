import { ListingPrice, ListingValidation } from '@/api/listing/listing.api.ts'
import ListingDetailCategorySection from '@/partials/listing/detail/ListingDetailCategorySection.tsx'
import { Currency, ListingFeature } from '@/types/listing.ts'
import { Coordinates } from '@turistikrota/ui/types'
import ListingDetailBaseSection from './ListingDetailBaseSection.tsx'
import ListingDetailCalendarSection from './ListingDetailCalendarSection.tsx'
import ListingDetailDangerZone from './ListingDetailDangerZone.tsx'
import ListingDetailMapSection from './ListingDetailMapSection.tsx'
import ListingDetailRuleSection from './ListingDetailRuleSection.tsx'

type Props = {
  uuid: string
  title: string
  description: string
  isActive: boolean
  images: string[]
  categoryUUIDs: string[]
  coordinates: Coordinates
  currency: Currency
  prices: ListingPrice[]
  features: ListingFeature[]
  validation: ListingValidation
  onOk: () => void
}

const ListingDetailContent: React.FC<Props> = ({
  uuid,
  title,
  description,
  isActive,
  coordinates,
  features,
  currency,
  images,
  prices,
  categoryUUIDs,
  validation,
  onOk,
}) => {
  return (
    <div className='flex flex-col space-y-8'>
      <ListingDetailBaseSection uuid={uuid} images={images} title={title} description={description} />
      <ListingDetailCategorySection categoryUUIDs={categoryUUIDs} features={features} />
      <ListingDetailMapSection coordinates={coordinates} />
      <ListingDetailCalendarSection prices={prices} currency={currency} />
      <ListingDetailRuleSection validation={validation} />
      <ListingDetailDangerZone uuid={uuid} title={title} isActive={isActive} onOk={onOk} />
    </div>
  )
}

export default ListingDetailContent
