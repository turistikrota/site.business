import MetaWrapper from '@/components/MetaWrapper'
import PostCreateForm from '@/components/forms/post/PostCreateForm'
import RoleGuardView from '@/layouts/RoleGuard'
import { OwnerRoles, PostRoles } from '@/static/role'
import { useTranslation } from 'react-i18next'

const PostCreateView: React.FC = () => {
  const { t } = useTranslation('posts')
  return (
    <RoleGuardView roles={[OwnerRoles.Super, PostRoles.Super, PostRoles.List]}>
      <MetaWrapper
        title={t('create.meta.title')}
        description={t('create.meta.description')}
        keywords={t('create.meta.keywords')}
      >
        <section className='p-4 lg:pl-0 max-w-4xl mx-auto relative'>
          <PostCreateForm />
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

PostCreateView.displayName = 'PostCreateView'

export { PostCreateView as Component }