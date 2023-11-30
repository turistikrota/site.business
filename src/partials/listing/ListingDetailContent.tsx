import { Coordinates } from '@turistikrota/ui/types'
import ListingDetailBaseSection from './ListingDetailBaseSection'
import ListingDetailDangerZone from './ListingDetailDangerZone'
import ListingDetailMapSection from './ListingDetailMapSection'

type Props = {
  uuid: string
  title: string
  description: string
  isActive: boolean
  isDeleted: boolean
  images: string[]
  coordinates: Coordinates
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
  onOk,
}) => {
  return (
    <div className='flex flex-col space-y-8'>
      <ListingDetailBaseSection images={images} title={title} description={description} />
      <ListingDetailMapSection coordinates={coordinates} />
      <ListingDetailDangerZone uuid={uuid} title={title} isActive={isActive} isDeleted={isDeleted} onOk={onOk} />
    </div>
  )
}

export default ListingDetailContent
