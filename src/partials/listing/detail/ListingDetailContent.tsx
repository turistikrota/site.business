import { ListingPrice, ListingValidation } from '@/api/listing/listing.api.ts'
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
  isDeleted: boolean
  images: string[]
  coordinates: Coordinates
  prices: ListingPrice[]
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
  images,
  prices,
  validation,
  onOk,
}) => {
  return (
    <div className='flex flex-col space-y-8'>
      <ListingDetailBaseSection images={images} title={title} description={description} />
      <ListingDetailMapSection coordinates={coordinates} />
      <ListingDetailCalendarSection prices={prices} />
      <ListingDetailRuleSection validation={validation} />
      <ListingDetailDangerZone uuid={uuid} title={title} isActive={isActive} isDeleted={isDeleted} onOk={onOk} />
    </div>
  )
}

export default ListingDetailContent
