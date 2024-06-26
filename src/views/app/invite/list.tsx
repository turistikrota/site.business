import KeyValue from '@/components/KeyValue'
import MetaWrapper from '@/components/MetaWrapper'
import RoleGuard from '@/components/RoleGuard'
import { Services, apiUrl } from '@/config/services'
import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { httpClient } from '@/http/client'
import RoleGuardView from '@/layouts/RoleGuard'
import { getStaticRoute } from '@/static/page'
import { BusinessRoles } from '@/static/role'
import { InviteItem, isInviteItemListResponse } from '@/types/business'
import { useDayJS } from '@/utils/dayjs'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import Button from '@turistikrota/ui/button'
import ContentLoader from '@turistikrota/ui/loader'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

type State = 'used' | 'deleted' | 'pending' | 'timeout'

const StateColors: Record<State, string> = {
  used: 'text-green-500',
  deleted: 'text-red-500',
  pending: 'text-yellow-500',
  timeout: 'text-indigo-500',
}

function InviteListView() {
  const { t, i18n } = useTranslation(['invites', 'general'])
  const dayjs = useDayJS(i18n.language)
  const [invites, setInvites] = useState<InviteItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const [current] = useCurrentBusiness()
  const toast = useToast()
  const path = useLocation().pathname

  useEffect(() => {
    fetchInvites()
  }, [])

  const fetchInvites = () => {
    setLoading(true)
    httpClient
      .get(apiUrl(Services.Business, `/~${current.business.nickName}/invite`))
      .then((res) => {
        if (res.data && isInviteItemListResponse(res.data)) {
          setInvites(res.data)
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

  const deleteInvite = (id: string) => {
    setLoadingIds([...loadingIds, id])
    httpClient
      .delete(apiUrl(Services.Business, `/~${current.business.nickName}/invite/${id}`))
      .then((res) => {
        if (res.status === 200) {
          toast.success(t('delete_success'))
          fetchInvites()
        }
      })
      .catch((err: any) => {
        parseApiError({
          error: err?.response?.data,
          toast,
        })
      })
      .finally(() => {
        setLoadingIds(loadingIds.filter((item) => item !== id))
      })
  }

  const calcState = (invite: InviteItem): State => {
    if (invite.isUsed) return 'used'
    if (invite.isDeleted) return 'deleted'
    const createdAt = dayjs(invite.createdAt)
    const expired = createdAt.add(1, 'day')
    if (dayjs().isAfter(expired)) return 'timeout'
    return 'pending'
  }

  const calcRelativeUpdateTime = (date: string): string => {
    const indayDiff = dayjs().diff(dayjs(date), 'minute')
    if (indayDiff < 60) return t('fields.minutes_ago', { minutes: indayDiff })
    if (indayDiff < 1440) return t('fields.hours_ago', { hours: Math.floor(indayDiff / 60) })
    const diff = dayjs().diff(dayjs(date), 'day')
    if (diff === 0) return t('fields.today')
    if (diff === 1) return t('fields.yesterday')
    if (diff > 365) return t('fields.years_ago', { years: Math.floor(diff / 365) })
    if (diff > 30) return t('fields.months_ago', { months: Math.floor(diff / 30) })
    return t('fields.days_ago', { days: diff })
  }
  return (
    <RoleGuardView roles={[BusinessRoles.Super, BusinessRoles.InviteView]}>
      <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
        <section className='relative space-y-4'>
          <Breadcrumb
            actions={
              <RoleGuard roles={[BusinessRoles.Super, BusinessRoles.InviteCreate]}>
                <Breadcrumb.Action href={getStaticRoute(i18n.language).invite.create} Link={DomLink}>
                  {t('fields.create')}
                </Breadcrumb.Action>
              </RoleGuard>
            }
          >
            <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
              {t('general:utils.breadcrumb.home')}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t('breadcrumb.invites')}</Breadcrumb.Item>
          </Breadcrumb>
          <div className='grid w-full grid-cols-12 gap-4'>
            {invites.reverse().map((invite) => (
              <div key={invite.uuid} className='col-span-12 rounded-md bg-second p-2 md:col-span-6'>
                <KeyValue>
                  <KeyValue.Item label={t('fields.email')} value={invite.email} />
                  <KeyValue.Item
                    label={t('fields.state')}
                    value={t(`states.${calcState(invite)}`)}
                    valueClassName={StateColors[calcState(invite)]}
                  />
                  <KeyValue.Item
                    label={t('fields.creator')}
                    value={`@${invite.creatorUserName}`}
                    valueClassName='text-secondary'
                  />
                  {invite.updatedAt ? (
                    <KeyValue.Item label={t('fields.updated_at')} value={calcRelativeUpdateTime(invite.updatedAt)} />
                  ) : (
                    <KeyValue.Item label={t('fields.created_at')} value={calcRelativeUpdateTime(invite.createdAt)} />
                  )}
                </KeyValue>
                <RoleGuard roles={[BusinessRoles.Super, BusinessRoles.InviteDelete]}>
                  {calcState(invite) === 'pending' && (
                    <div className='mt-2 flex justify-center border-t pt-2'>
                      <Button
                        block={false}
                        size='sm'
                        variant='error'
                        disabled={loadingIds.includes(invite.uuid)}
                        onClick={() => deleteInvite(invite.uuid)}
                      >
                        {t(loadingIds.includes(invite.uuid) ? 'fields.deleting' : 'fields.delete')}
                      </Button>
                    </div>
                  )}
                </RoleGuard>
              </div>
            ))}
          </div>
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

InviteListView.displayName = 'InviteListView'

export { InviteListView as Component }
