import { Services, apiUrl } from '@/config/services'
import { checkUnauthorized } from '@/hooks/error'
import { httpClient } from '@/http/client'
import { useAccount } from '@/layouts/AccountSelectionLayout'
import { getStaticRoute } from '@/static/page'
import { OwnerListItem, isOwnerListResponse } from '@/types/owner'
import { isAccountErrorResponse } from '@/types/response'
import Condition from '@turistikrota/ui/condition'
import { useToast } from '@turistikrota/ui/toast'
import UserName from '@turistikrota/ui/username'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import Spin from 'sspin'
import OwnerSelectionCard from './OwnerSelectionCard'

const OwnerSelection = () => {
  const { t, i18n } = useTranslation('select')
  const navigate = useNavigate()
  const { current } = useAccount()
  const [data, setData] = useState<OwnerListItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  useEffect(() => {
    if (!current) return
    setLoading(true)
    httpClient
      .get(apiUrl(Services.Owner, ''))
      .then((res) => {
        if (isOwnerListResponse(res.data)) {
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

  const onOwnerSelect = (item: OwnerListItem) => {
    setLoading(true)
    httpClient
      .put(apiUrl(Services.Owner, `/~${item.nickName}/select`))
      .then((res) => {
        if (res.status === 200) {
          navigate(getStaticRoute(i18n.language).account.details.default)
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
                <OwnerSelectionCard key={index} {...item} onSelect={() => onOwnerSelect(item)}>
                  <OwnerSelectionCard.Image>
                    <Condition value={item.avatarURL !== ''}>
                      <OwnerSelectionCard.Avatar src={item.avatarURL} alt={item.realName}></OwnerSelectionCard.Avatar>
                    </Condition>
                    <Condition value={item.avatarURL === ''}>
                      <Condition value={item.ownerType === 'individual'}>
                        <i className='bx bx-lg bx-user text-gray-400'></i>
                      </Condition>
                      <Condition value={item.ownerType === 'corporation'}>
                        <i className='bx bx-lg bx-building text-gray-400'></i>
                      </Condition>
                    </Condition>
                  </OwnerSelectionCard.Image>
                  <OwnerSelectionCard.Content>
                    <UserName size='xl'>{item.nickName}</UserName>
                    <OwnerSelectionCard.FullName>{item.realName}</OwnerSelectionCard.FullName>
                  </OwnerSelectionCard.Content>
                  <Condition value={item.isVerified}>
                    <OwnerSelectionCard.VerifiedBadge />
                  </Condition>
                  <Condition value={!item.isEnabled}>
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
                </OwnerSelectionCard>
              ))}
            </div>
            <Link to={getStaticRoute(i18n.language).owner.create}>
              <OwnerSelectionCard>
                <OwnerSelectionCard.Image>
                  <i className='bx bx-md bx-plus text-gray-400'></i>
                </OwnerSelectionCard.Image>
                <OwnerSelectionCard.Content>
                  <OwnerSelectionCard.Text>{t('new')}</OwnerSelectionCard.Text>
                </OwnerSelectionCard.Content>
              </OwnerSelectionCard>
            </Link>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default OwnerSelection
