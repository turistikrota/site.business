import ListingDetailImagePreview from './ListingDetailImagePreview.tsx'

type Props = {
  title: string
  images: string[]
  description: string
}

const ListingDetailBaseSection: React.FC<Props> = ({ title, images, description }) => {
  return (
    <section className='flex flex-col'>
      <ListingDetailImagePreview images={images} title={title} />
      <h2 className='text-2xl'>{title}</h2>
      <p className='text-gray-600 dark:text-gray-300'>{description}</p>
    </section>
  )
}

export default ListingDetailBaseSection
