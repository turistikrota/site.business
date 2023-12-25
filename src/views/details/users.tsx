import MetaWrapper from '@/components/MetaWrapper'
import UserCollapseItem from '@/components/UserCollapseItem'
import { Services, apiUrl } from '@/config/services'
import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { httpClient } from '@/http/client'
import RoleGuardView from '@/layouts/RoleGuard'
import { BusinessRoles } from '@/static/role'
import { BusinessUserListItem, isBusinessUserListResponse } from '@/types/business'
import ContentLoader from '@turistikrota/ui/loader'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const UsersView: React.FC = () => {
  const { t } = useTranslation('users')
  const [users, setUsers] = useState<BusinessUserListItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [current] = useCurrentBusiness()
  const toast = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    setLoading(true)
    httpClient
      .get(apiUrl(Services.Business, `/~${current.business.nickName}/user`))
      .then((res) => {
        if (res.data && isBusinessUserListResponse(res.data)) {
          setUsers(res.data)
        }
      })
      .catch((err: any) => {
        parseApiError({
          error: err?.response?.data,
          toast,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  if (loading) return <ContentLoader noMargin />

  return (
    <RoleGuardView roles={[BusinessRoles.Super, BusinessRoles.UserList]}>
      <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
        <section className='container relative mx-auto space-y-5 p-2'>
          {users.map((user) => (
            <UserCollapseItem user={user} key={user.name} />
          ))}
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

UsersView.displayName = 'UsersView'

export { UsersView as Component }
