import { useTranslation } from 'react-i18next'
import ListingDeleteForm from './ListingDeleteForm'
import ListingDisableForm from './ListingDisableForm'
import ListingEnableForm from './ListingEnableForm'
import ListingRestoreForm from './ListingRecoverForm'

type Props = {
  uuid: string
  title: string
  isActive: boolean
  isDeleted: boolean
  onOk: () => void
}

const ListingDetailContent: React.FC<Props> = ({ uuid, title, isActive, isDeleted, onOk }) => {
  const { t } = useTranslation('listings')
  return (
    <>
      <section>
        <h2 className='mb-2 text-xl font-semibold'>{t('detail.sections.danger')}</h2>
        <div className='rounded-md border dark:border-red-900'>
          {!isActive && <ListingEnableForm onOk={onOk} uuid={uuid} title={title} />}
          {isActive && <ListingDisableForm onOk={onOk} uuid={uuid} title={title} />}
          {!isDeleted && <ListingDeleteForm onOk={onOk} uuid={uuid} title={title} />}
          {isDeleted && <ListingRestoreForm onOk={onOk} uuid={uuid} title={title} />}
        </div>
      </section>
    </>
  )
}

export default ListingDetailContent
