import { ListingDetails, fetchMyListing } from '@/api/listing/listing.api'
import { useQuery } from '@/hooks/query'
import NotFoundView from '@/views/404'
import ContentLoader from '@turistikrota/ui/loader'
import ListingDisableForm from './form/ListingDisableForm'
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
  return (
    <>
      <section>
        <h2>Danger Zone</h2>
        <div className='rounded-md border dark:border-red-900'>
          {!data?.isActive && <ListingEnableForm onOk={onOk} uuid={uuid} />}
          {data?.isActive && <ListingDisableForm onOk={onOk} uuid={uuid} />}
        </div>
      </section>
    </>
  )
}

export default ListingDetailContent
