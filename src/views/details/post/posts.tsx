import { PostListItem, fetchMyPosts } from '@/api/post/post.api'
import EmptyContent from '@/components/EmptyContent'
import MetaWrapper from '@/components/MetaWrapper'
import PostDragProvider from '@/components/post/PostDragProvider'
import PostListCard from '@/components/post/PostListCard'
import { useListQuery } from '@/hooks/list'
import RoleGuardView from '@/layouts/RoleGuard'
import { getStaticRoute } from '@/static/page'
import { OwnerRoles, PostRoles } from '@/static/role'
import Button from '@turistikrota/ui/button'
import ContentLoader from '@turistikrota/ui/loader'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const PostListView: React.FC = () => {
  const { t, i18n } = useTranslation('posts')
  const { firstLoading, list, setList } = useListQuery<PostListItem>(fetchMyPosts)

  if (firstLoading) return <ContentLoader noMargin />

  return (
    <RoleGuardView roles={[OwnerRoles.Super, PostRoles.Super, PostRoles.List]}>
      <MetaWrapper
        title={t('list.meta.title')}
        description={t('list.meta.description')}
        keywords={t('list.meta.keywords')}
      >
        <section className='container relative mx-auto p-4'>
          <div className='grid w-full grid-cols-12 gap-4'>
            <div className='col-span-12'>
              <Link to={getStaticRoute(i18n.language).owner.details.post.create}>
                <Button block={false} variant='primary' className='flex items-center justify-center gap-1'>
                  <i className='bx bx-sm bx-plus' />
                  {t('list.actions.create')}
                </Button>
              </Link>
            </div>
            {list.length === 0 && (
              <EmptyContent
                className='col-span-12'
                title={t('list.empty.title')}
                description={t('list.empty.description')}
              />
            )}
            {list.length > 0 && (
              <PostDragProvider
                list={list.sort((a, b) => (a.order && b.order ? a.order - b.order : 0))}
                setList={setList}
                Renderer={PostListCard}
              />
            )}
          </div>
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

PostListView.displayName = 'PostListView'

export { PostListView as Component }
