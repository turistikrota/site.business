import ListingDetailDangerZone from './ListingDetailDangerZone'
import ListingDetailImagePreview from './ListingDetailImagePreview'

type Props = {
  uuid: string
  title: string
  description: string
  isActive: boolean
  isDeleted: boolean
  images: string[]
  onOk: () => void
}

const ListingDetailContent: React.FC<Props> = ({ uuid, title, description, isActive, isDeleted, images, onOk }) => {
  return (
    <>
      <ListingDetailImagePreview images={images} title={title} />
      <div className='mb-4 flex flex-col'>
        <h2 className='text-2xl'>{title}</h2>
        <p className='text-gray-600 dark:text-gray-300'>{description}</p>
      </div>
      <ListingDetailDangerZone uuid={uuid} title={title} isActive={isActive} isDeleted={isDeleted} onOk={onOk} />
    </>
  )
}

export default ListingDetailContent
