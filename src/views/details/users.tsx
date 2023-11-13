import MetaWrapper from '@/components/MetaWrapper'
import UserCollapseItem from '@/components/UserCollapseItem'
import { Services, apiUrl } from '@/config/services'
import { useCurrentOwner } from '@/contexts/currentOwner'
import { httpClient } from '@/http/client'
import { OwnerUserListItem, isOwnerUserListResponse } from '@/types/owner'
import ContentLoader from '@turistikrota/ui/loader'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const UsersView: React.FC = () => {
  const { t } = useTranslation('users')
  const [users, setUsers] = useState<OwnerUserListItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [current] = useCurrentOwner()
  const toast = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    setLoading(true)
    httpClient
      .get(apiUrl(Services.Owner, `/~${current.owner.nickName}/user`))
      .then((res) => {
        if (res.data && isOwnerUserListResponse(res.data)) {
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
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='p-4 lg:pl-0 space-y-5 max-w-4xl mx-auto relative'>
        {users.map((user) => (
          <UserCollapseItem user={user} key={user.name} />
        ))}
      </section>
    </MetaWrapper>
  )
}

UsersView.displayName = 'UsersView'

export { UsersView as Component }
