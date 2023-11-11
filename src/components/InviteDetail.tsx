import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useAccount } from '@/layouts/AccountSelectionLayout'
import { InviteItem, isInviteItem } from '@/types/owner'
import { useDayJS } from '@/utils/dayjs'
import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import { useToast } from '@turistikrota/ui/toast'
import React, { useEffect, useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Spin from 'sspin'

const InviteDetail: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { current } = useAccount()
  const [invite, setInvite] = useState<InviteItem | undefined>(undefined)
  const toast = useToast()
  const params = useParams()
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

  const join = () => {}

  const fetchInvite = () => {
    httpClient
      .get(apiUrl(Services.Owner, `/join/${params.uuid}`))
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
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8 ease-in'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
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
                <div className='col-span-2 flex flex-col justify-center items-center'>
                  <img
                    src={`https://avatar.turistikrota.com/@${current?.userName}.png`}
                    className='w-24 h-24 rounded-full'
                  />
                  <span className='mt-2 font-semibold text-primary'>@{current?.userName}</span>
                </div>
                <div className='col-span-1  flex justify-center items-center'>
                  <i className='bx bx-2xl bxs-chevrons-right'></i>
                </div>
                <div className='col-span-2  flex  flex-col justify-center items-center relative'>
                  <div className='relative'>
                    <img
                      src={`https://avatar.turistikrota.com/~${invite.ownerNickName}.png`}
                      className='w-24 h-24 rounded-md z-10'
                    />
                    <img
                      src={`https://avatar.turistikrota.com/@${invite.creatorUserName}.png`}
                      className='w-12 h-12 rounded-full  absolute -left-5 -bottom-3'
                    />
                  </div>
                  <span className='mt-2 font-semibold text-secondary'>~{invite.ownerNickName}</span>
                </div>
                <p className='col-span-5 mt-4 text-center text-gray-500'>
                  <Trans
                    t={t}
                    i18nKey='description'
                    values={{
                      owner: `~${invite.ownerNickName}`,
                      creator: `@${invite.creatorUserName}`,
                    }}
                  >
                    <span className='font-semibold text-secondary'>~{invite.ownerNickName}</span>
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
