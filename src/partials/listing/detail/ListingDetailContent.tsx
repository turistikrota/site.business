import { ListingPrice, ListingValidation } from '@/api/listing/listing.api.ts'
import { Coordinates } from '@turistikrota/ui/types'
import ListingDetailBaseSection from './ListingDetailBaseSection.tsx'
import ListingDetailCalendarSection from './ListingDetailCalendarSection.tsx'
import ListingDetailDangerZone from './ListingDetailDangerZone.tsx'
import ListingDetailMapSection from './ListingDetailMapSection.tsx'
import ListingDetailRuleSection from './ListingDetailRuleSection.tsx'
import ListingDetailCategorySection from "@/partials/listing/detail/ListingDetailCategorySection.tsx";
import {ListingFeature} from "@/types/listing.ts";

type Props = {
  uuid: string
  title: string
  description: string
  isActive: boolean
  isDeleted: boolean
  images: string[]
  categoryUUIDs: string[]
  coordinates: Coordinates
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
  isDeleted,
    features,
  images,
  prices,
                                                 categoryUUIDs,
  validation,
  onOk,
}) => {
  return (
    <div className='flex flex-col space-y-8'>
      <ListingDetailBaseSection images={images} title={title} description={description} />
      <ListingDetailCategorySection categoryUUIDs={categoryUUIDs} features={features} />
      <ListingDetailMapSection coordinates={coordinates} />
      <ListingDetailCalendarSection prices={prices} />
      <ListingDetailRuleSection validation={validation} />
      <ListingDetailDangerZone uuid={uuid} title={title} isActive={isActive} isDeleted={isDeleted} onOk={onOk} />
    </div>
  )
}

export default ListingDetailContent
