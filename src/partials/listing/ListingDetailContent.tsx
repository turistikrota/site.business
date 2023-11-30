import ListingDetailDangerZone from './ListingDetailDangerZone'

type Props = {
  uuid: string
  title: string
  isActive: boolean
  isDeleted: boolean
  onOk: () => void
}

const ListingDetailContent: React.FC<Props> = ({ uuid, title, isActive, isDeleted, onOk }) => {
  return (
    <>
      <ListingDetailDangerZone uuid={uuid} title={title} isActive={isActive} isDeleted={isDeleted} onOk={onOk} />
    </>
  )
}

export default ListingDetailContent
