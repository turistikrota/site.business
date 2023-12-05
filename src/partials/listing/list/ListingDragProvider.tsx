import { ListingListItem, reorderListing } from '@/api/listing/listing.api.ts'
import { useGuard } from '@/hooks/permission.tsx'
import { BusinessRoles, ListingRoles } from '@/static/role.ts'
import Alert from '@turistikrota/ui/alert'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DraggableContainer, { move } from 's-dnm'
import { Props as ListingListCardProps } from './ListingListCard.tsx'

type Props = {
  list: ListingListItem[]
  setList: (list: ListingListItem[]) => void
  Renderer: React.FC<ListingListCardProps>
}

const ListingDragProvider: React.FC<Props> = ({ list, setList, Renderer }) => {
  const { t } = useTranslation('listings')
  const isAuthenticatedForDrag = useGuard(BusinessRoles.Super, ListingRoles.Super, ListingRoles.ReOrder)

  if (!isAuthenticatedForDrag)
    return (
      <>
        {list.map((item) => (
          <Renderer key={item.uuid} {...item} isDraggable={false} />
        ))}
      </>
    )

  const onOrderChange = (current: number, to: number) => {
    reorderListing(list[current].uuid, to)
    setList(move(list, current, to))
  }

  return (
    <>
      <div className='col-span-12'>
        <Alert type='info' showIcon>
          <Alert.Title>{t('list.reorder.info.title')}</Alert.Title>
          <Alert.Description>{t('list.reorder.info.description')}</Alert.Description>
        </Alert>
      </div>
      <DraggableContainer
        onOrderChange={onOrderChange}
        className='col-span-12 flex flex-col rounded-md h-full bg-second md:col-span-4 lg:col-span-3'

      >
        {list.map((item) => (
          <Renderer key={item.uuid} {...item} isDraggable={true} />
        ))}
      </DraggableContainer>
    </>
  )
}

export default ListingDragProvider
