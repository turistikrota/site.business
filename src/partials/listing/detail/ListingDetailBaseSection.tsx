import RoleGuard from '@/components/RoleGuard.tsx'
import { ListingEditViewRoles, ListingLogsViewRoles } from '@/roles/listing.ts'
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
      <RoleGuard roles={[...ListingEditViewRoles, ...ListingLogsViewRoles]}>
        <div className='mt-2 flex gap-2'>
          <RoleGuard roles={ListingEditViewRoles}>
            <Link
              to={`${getStaticRoute(i18n.language).listing.list}/${uuid}/${getStaticRoute(i18n.language).listing.edit}`}
              target='_blank'
            >
              <Button block={false} className='flex items-center justify-center gap-2'>
                <i className='bx bx-edit-alt bx-xs' />
                {t('detail.edit')}
              </Button>
            </Link>
          </RoleGuard>
          <RoleGuard roles={ListingLogsViewRoles}>
            <Link
              to={`${getStaticRoute(i18n.language).listing.list}/${uuid}/${getStaticRoute(i18n.language).listing.logs}`}
              target='_blank'
            >
              <Button block={false} className='flex items-center justify-center gap-2' variant='secondary'>
                <i className='bx bx-history bx-xs' />
                {t('detail.logs')}
              </Button>
            </Link>
          </RoleGuard>
        </div>
      </RoleGuard>
    </section>
  )
}

export default ListingDetailBaseSection
