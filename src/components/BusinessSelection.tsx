import { Services, apiUrl } from '@/config/services'
import { checkUnauthorized } from '@/hooks/error'
import { httpClient } from '@/http/client'
import { useAccount } from '@/layouts/AccountSelectionLayout'
import { getStaticRoute } from '@/static/page'
import { BusinessListItem, isBusinessListResponse } from '@/types/business'
import { isAccountErrorResponse } from '@/types/response'
import Condition from '@turistikrota/ui/condition'
import { useToast } from '@turistikrota/ui/toast'
import UserName from '@turistikrota/ui/username'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import Spin from 'sspin'
import BusinessSelectionCard from './BusinessSelectionCard'

const BusinessSelection = () => {
  const { t, i18n } = useTranslation('select')
  const navigate = useNavigate()
  const { current } = useAccount()
  const [data, setData] = useState<BusinessListItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  useEffect(() => {
    if (!current) return
    setLoading(true)
    httpClient
      .get(apiUrl(Services.Business, ''))
      .then((res) => {
        if (isBusinessListResponse(res.data)) {
          setData(res.data.list)
        }
      })
      .catch((err: any) => {
        if (err && err.response && err.response.data && isAccountErrorResponse(err.response.data)) {
          //openAccountSelectionWithRedirect(i18n.language)
          return
        }
        parseApiError({
          error: err.response.data,
          toast,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  const onBusinessSelect = (item: BusinessListItem) => {
    setLoading(true)
    httpClient
      .put(apiUrl(Services.Business, `/~${item.nickName}/select`))
      .then((res) => {
        if (res.status === 200) {
          navigate(getStaticRoute(i18n.language).business.details.default)
        }
      })
      .catch((err: any) => {
        if (!checkUnauthorized(err, i18n.language)) {
          parseApiError({
            error: err?.response?.data,
            toast,
          })
        }
      })
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
          <div className='flex flex-col space-y-4'>
            <div className='max-h-96 space-y-4 overflow-auto'>
              {data.map((item, index) => (
                <BusinessSelectionCard key={index} {...item} onSelect={() => onBusinessSelect(item)}>
                  <BusinessSelectionCard.Image>
                    <Condition value={item.avatarURL !== ''}>
                      <BusinessSelectionCard.Avatar
                        src={item.avatarURL}
                        alt={item.realName}
                      ></BusinessSelectionCard.Avatar>
                    </Condition>
                    <Condition value={item.avatarURL === ''}>
                      <Condition value={item.businessType === 'individual'}>
                        <i className='bx bx-lg bx-user text-gray-400'></i>
                      </Condition>
                      <Condition value={item.businessType === 'corporation'}>
                        <i className='bx bx-lg bx-building text-gray-400'></i>
                      </Condition>
                    </Condition>
                  </BusinessSelectionCard.Image>
                  <BusinessSelectionCard.Content>
                    <UserName size='xl'>{item.nickName}</UserName>
                    <BusinessSelectionCard.FullName>{item.realName}</BusinessSelectionCard.FullName>
                  </BusinessSelectionCard.Content>
                  <Condition value={item.isVerified}>
                    <BusinessSelectionCard.VerifiedBadge />
                  </Condition>
                  <Condition value={!item.isVerified && !item.rejectReason}>
                    <div
                      className='absolute bottom-1 right-2 flex items-center justify-center gap-1 rounded-full text-secondary'
                      role='alert'
                      aria-label={t('verified')}
                      title={t('verified_alt')}
                    >
                      <i className='bx bx-s bx-timer'></i>
                      {t('waiting')}
                    </div>
                  </Condition>
                  <Condition value={!item.isVerified && !!item.rejectReason}>
                    <div
                      className='absolute bottom-1 right-2 flex items-center justify-center gap-1 rounded-full text-red-500'
                      role='alert'
                      aria-label={t('rejected')}
                      title={t('rejected_alt')}
                    >
                      <i className='bx bx-s bx-error'></i>
                      {t('rejected')}
                    </div>
                  </Condition>
                </BusinessSelectionCard>
              ))}
            </div>
            <Link to={getStaticRoute(i18n.language).business.create}>
              <BusinessSelectionCard>
                <BusinessSelectionCard.Image>
                  <i className='bx bx-md bx-plus text-gray-400'></i>
                </BusinessSelectionCard.Image>
                <BusinessSelectionCard.Content>
                  <BusinessSelectionCard.Text>{t('new')}</BusinessSelectionCard.Text>
                </BusinessSelectionCard.Content>
              </BusinessSelectionCard>
            </Link>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default BusinessSelection
