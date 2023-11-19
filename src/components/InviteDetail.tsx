import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useAccount } from '@/layouts/AccountSelectionLayout'
import { getStaticRoute } from '@/static/page'
import { InviteItem, isInviteItem } from '@/types/business'
import { useDayJS } from '@/utils/dayjs'
import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import React, { useEffect, useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import Spin from 'sspin'

type Callback = () => void

const InviteDetail: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { current } = useAccount()
  const [invite, setInvite] = useState<InviteItem | undefined>(undefined)
  const toast = useToast()
  const params = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('invite-use')
  const dayjs = useDayJS(i18n.language)

  const isTimeout = useMemo<boolean>(() => {
    if (!invite) return false
    if (invite.isDeleted || invite.isUsed) return false
    if (dayjs(invite.createdAt).add(1, 'day').isBefore(dayjs())) return true
    return false
  }, [invite, dayjs])

  const available = useMemo<boolean>(() => {
    if (!invite) return false
    if (invite.isDeleted || invite.isUsed) return false
    if (isTimeout) return false
    return true
  }, [invite, isTimeout])

  useEffect(() => {
    fetchInvite()
  }, [])

  const refreshAuth = (cb: Callback | undefined = undefined) => {
    setLoading(true)
    httpClient
      .put(apiUrl(Services.Auth, `/refresh`))
      .then((res) => {
        if (res.status === 200) {
          if (typeof cb === 'function') cb()
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

  const join = () => {
    setLoading(true)
    httpClient
      .post(apiUrl(Services.Business, `/join/${params.uuid}`))
      .then((res) => {
        if (res.status === 200) {
          toast.success(t('success'))
          refreshAuth(() => {
            navigate(getStaticRoute(i18n.language).business.details.default)
          })
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

  const fetchInvite = () => {
    httpClient
      .get(apiUrl(Services.Business, `/join/${params.uuid}`))
      .then((res) => {
        if (res.data && isInviteItem(res.data)) {
          setInvite(res.data)
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Spin loading={loading}>
      <div className='space-y-4 p-6 ease-in sm:p-8 md:space-y-6'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          {t('title')}
        </h1>
        <div>
          {!loading && !invite && (
            <Alert type='error' showIcon>
              <Alert.Title>{t('notfound.title')}</Alert.Title>
              <Alert.Description>{t('notfound.description')}</Alert.Description>
            </Alert>
          )}
          {!loading && invite && invite.isUsed && (
            <Alert type='error' showIcon>
              <Alert.Title>{t('used.title')}</Alert.Title>
              <Alert.Description>{t('used.description')}</Alert.Description>
            </Alert>
          )}
          {!loading && invite && invite.isDeleted && (
            <Alert type='error' showIcon>
              <Alert.Title>{t('deleted.title')}</Alert.Title>
              <Alert.Description>{t('deleted.description')}</Alert.Description>
            </Alert>
          )}
          {!loading && invite && isTimeout && (
            <Alert type='error' showIcon>
              <Alert.Title>{t('timeout.title')}</Alert.Title>
              <Alert.Description>{t('timeout.description')}</Alert.Description>
            </Alert>
          )}
          {available && invite && (
            <>
              <div className='grid grid-cols-5'>
                <div className='col-span-2 flex flex-col items-center justify-center'>
                  <img
                    src={`https://avatar.turistikrota.com/@${current?.userName}.png`}
                    className='h-24 w-24 rounded-full'
                  />
                  <span className='mt-2 font-semibold text-primary'>@{current?.userName}</span>
                </div>
                <div className='col-span-1  flex items-center justify-center'>
                  <i className='bx bx-2xl bxs-chevrons-right'></i>
                </div>
                <div className='relative  col-span-2  flex flex-col items-center justify-center'>
                  <div className='relative'>
                    <img
                      src={`https://avatar.turistikrota.com/~${invite.businessNickName}.png`}
                      className='z-10 h-24 w-24 rounded-md'
                    />
                    <img
                      src={`https://avatar.turistikrota.com/@${invite.creatorUserName}.png`}
                      className='absolute -bottom-3 -left-5  h-12 w-12 rounded-full'
                    />
                  </div>
                  <span className='mt-2 font-semibold text-secondary'>~{invite.businessNickName}</span>
                </div>
                <p className='col-span-5 mt-4 text-center text-gray-500'>
                  <Trans
                    t={t}
                    i18nKey='description'
                    values={{
                      business: `~${invite.businessNickName}`,
                      creator: `@${invite.creatorUserName}`,
                    }}
                  >
                    <span className='font-semibold text-secondary'>~{invite.businessNickName}</span>
                    <span className='font-semibold text-secondary'>@{invite.creatorUserName}</span>
                  </Trans>
                </p>
                <Button
                  className='col-span-5 mt-4'
                  size='lg'
                  variant='primary'
                  onClick={join}
                  disabled={loading || !available}
                >
                  {t('join')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Spin>
  )
}

export default InviteDetail
