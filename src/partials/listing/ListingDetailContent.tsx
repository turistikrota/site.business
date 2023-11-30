import ListingDetailDangerZone from './ListingDetailDangerZone'
import ListingDetailImagePreview from './ListingDetailImagePreview'

type Props = {
  uuid: string
  title: string
  isActive: boolean
  isDeleted: boolean
  images: string[]
  onOk: () => void
}

const ListingDetailContent: React.FC<Props> = ({ uuid, title, isActive, isDeleted, images, onOk }) => {
  return (
    <>
      <ListingDetailImagePreview images={images} title={title} />
      <ListingDetailDangerZone uuid={uuid} title={title} isActive={isActive} isDeleted={isDeleted} onOk={onOk} />
    </>
  )
}

export default ListingDetailContent
