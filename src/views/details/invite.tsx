import KeyValue from '@/components/KeyValue'
import MetaWrapper from '@/components/MetaWrapper'
import RoleGuard from '@/components/RoleGuard'
import { Services, apiUrl } from '@/config/services'
import { useCurrentOwner } from '@/contexts/currentOwner'
import { httpClient } from '@/http/client'
import RoleGuardView from '@/layouts/RoleGuard'
import { getStaticRoute } from '@/static/page'
import { OwnerRoles } from '@/static/role'
import { InviteItem, isInviteItemListResponse } from '@/types/owner'
import { useDayJS } from '@/utils/dayjs'
import Button from '@turistikrota/ui/button'
import ContentLoader from '@turistikrota/ui/loader'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type State = 'used' | 'deleted' | 'pending' | 'timeout'

const StateColors: Record<State, string> = {
  used: 'text-green-500',
  deleted: 'text-red-500',
  pending: 'text-yellow-500',
  timeout: 'text-indigo-500',
}

function InviteMainView() {
  const { t, i18n } = useTranslation('invites')
  const dayjs = useDayJS(i18n.language)
  const [invites, setInvites] = useState<InviteItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const [current] = useCurrentOwner()
  const toast = useToast()

  useEffect(() => {
    fetchInvites()
  }, [])

  const fetchInvites = () => {
    setLoading(true)
    httpClient
      .get(apiUrl(Services.Owner, `/~${current.owner.nickName}/invite`))
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
      .delete(apiUrl(Services.Owner, `/~${current.owner.nickName}/invite/${id}`))
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
    <RoleGuardView roles={[OwnerRoles.Super, OwnerRoles.InviteView]}>
      <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
        <section className='p-4 lg:pl-0 space-y-5 max-w-4xl mx-auto relative'>
          <RoleGuard roles={[OwnerRoles.Super, OwnerRoles.InviteCreate]}>
            <div className='flex'>
              <Link to={getStaticRoute(i18n.language).owner.details.inviteCreate}>
                <Button size='sm' block={false} variant='primary'>
                  {t('fields.create')}
                </Button>
              </Link>
            </div>
          </RoleGuard>
          <div className='w-full grid grid-cols-12 gap-3'>
            {invites.reverse().map((invite) => (
              <div key={invite.uuid} className='col-span-12 md:col-span-6 bg-second rounded-md p-2'>
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
                <RoleGuard roles={[OwnerRoles.Super, OwnerRoles.InviteDelete]}>
                  {calcState(invite) === 'pending' && (
                    <div className='flex justify-center mt-2 border-t pt-2'>
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

InviteMainView.displayName = 'InviteMainView'

export { InviteMainView as Component }
