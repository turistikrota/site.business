import { getStaticRoute } from '@/static/page.ts'
import Button from '@turistikrota/ui/button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ListingDetailImagePreview from './ListingDetailImagePreview.tsx'

type Props = {
  uuid: string
  title: string
  images: string[]
  description: string
}

const ListingDetailBaseSection: React.FC<Props> = ({ uuid, title, images, description }) => {
  const { t, i18n } = useTranslation('listings')
  return (
    <section className='flex flex-col'>
      <ListingDetailImagePreview images={images} title={title} />
      <h2 className='text-2xl'>{title}</h2>
      <p className='text-gray-600 dark:text-gray-300'>{description}</p>
      <Link
        to={`${getStaticRoute(i18n.language).business.details.listing.detail}${uuid}/${
          getStaticRoute(i18n.language).business.details.listing.edit
        }`}
        target='_blank'
        className='mt-2'
      >
        <Button block={false} className='flex items-center justify-center gap-2'>
          <i className='bx bx-edit-alt bx-xs' />
          {t('detail.edit')}
        </Button>
      </Link>
    </section>
  )
}

export default ListingDetailBaseSection
