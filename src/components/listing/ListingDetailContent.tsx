import { ListingDetails, fetchMyListing } from '@/api/listing/listing.api'
import { useQuery } from '@/hooks/query'
import NotFoundView from '@/views/404'
import ContentLoader from '@turistikrota/ui/loader'
import ListingEnableForm from './form/ListingEnableForm'

type Props = {
  uuid: string
}

const ListingDetailContent: React.FC<Props> = ({ uuid }) => {
  const { data, notFound, loading, refetch } = useQuery<ListingDetails>(() => fetchMyListing(uuid))
  if (notFound) return <NotFoundView />
  if (loading) return <ContentLoader />

  const onOk = () => {
    refetch()
  }
  return <>{!data?.isActive && <ListingEnableForm onOk={onOk} uuid={uuid} />}</>
}

export default ListingDetailContent
