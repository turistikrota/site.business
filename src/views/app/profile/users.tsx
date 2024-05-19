import MetaWrapper from '@/components/MetaWrapper'
import UserCollapseItem from '@/components/UserCollapseItem'
import { Services, apiUrl } from '@/config/services'
import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { httpClient } from '@/http/client'
import RoleGuardView from '@/layouts/RoleGuard'
import { getStaticRoute } from '@/static/page'
import { BusinessRoles } from '@/static/role'
import { BusinessUserListItem, isBusinessUserListResponse } from '@/types/business'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import ContentLoader from '@turistikrota/ui/loader'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const ProfleUsersView: React.FC = () => {
  const { t, i18n } = useTranslation(['profile', 'general'])
  const [users, setUsers] = useState<BusinessUserListItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [current] = useCurrentBusiness()
  const toast = useToast()
  const path = useLocation().pathname

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
      <MetaWrapper
        title={t('meta.users.title')}
        description={t('meta.users.description')}
        keywords={t('meta.users.keywords')}
      >
        <section className='relative space-y-4'>
          <Breadcrumb>
            <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
              {t('general:utils.breadcrumb.home')}
            </Breadcrumb.Item>
            <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).profile.edit} currentPath={path}>
              {t('breadcrumb.profile')}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t('breadcrumb.users')}</Breadcrumb.Item>
          </Breadcrumb>
          {users.map((user) => (
            <UserCollapseItem user={user} key={user.name} />
          ))}
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

ProfleUsersView.displayName = 'ProfleUsersView'

export { ProfleUsersView as Component }
