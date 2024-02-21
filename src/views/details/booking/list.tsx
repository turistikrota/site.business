import MetaWrapper from '@/components/MetaWrapper'
import RoleGuardView from '@/layouts/RoleGuard'
import { BookingRoles, BusinessRoles } from '@/static/role'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const BookingListView: FC = () => {
  const { t } = useTranslation('booking')
  return (
    <MetaWrapper
      title={t('list.meta.title')}
      description={t('list.meta.description')}
      keywords={t('list.meta.keywords')}
    >
      <section className='container relative mx-auto flex flex-col space-y-6 p-2'>oyy</section>
    </MetaWrapper>
  )
}

export function Component() {
  return (
    <RoleGuardView roles={[BusinessRoles.Super, BookingRoles.Super, BookingRoles.List]}>
      <BookingListView />
    </RoleGuardView>
  )
}
