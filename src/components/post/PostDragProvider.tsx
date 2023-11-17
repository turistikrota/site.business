import { PostListItem } from '@/api/post/post.api'
import { useGuard } from '@/hooks/permission'
import { OwnerRoles, PostRoles } from '@/static/role'
import Alert from '@turistikrota/ui/alert'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DraggableContainer, { move } from 's-dnm'
import { Props as PostListCardProps } from './PostListCard'

type Props = {
  list: PostListItem[]
  Renderer: React.FC<PostListCardProps>
}

const PostDragProvider: React.FC<Props> = ({ list, Renderer }) => {
  const { t } = useTranslation('posts')
  const isAuthenticatedForDrag = useGuard(OwnerRoles.Super, PostRoles.Super, PostRoles.ReOrder)

  if (!isAuthenticatedForDrag)
    return (
      <>
        {list.map((item) => (
          <Renderer key={item.uuid} {...item} isDraggable={false} />
        ))}
      </>
    )

  const onOrderChange = (current: number, to: number) => {
    move(list, current, to)
    // call api to update order
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
        className='col-span-12 flex flex-col rounded-md bg-second md:col-span-4'
      >
        {list.map((item) => (
          <Renderer key={item.uuid} {...item} isDraggable={true} />
        ))}
      </DraggableContainer>
    </>
  )
}

export default PostDragProvider
