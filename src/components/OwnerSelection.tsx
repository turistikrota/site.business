import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useAccount } from '@/layouts/AccountSelectionLayout'
import { getStaticRoute } from '@/static/page'
import { OwnerListItem, isOwnerListResponse } from '@/types/owner'
import Condition from '@turistikrota/ui/condition'
import { useToast } from '@turistikrota/ui/toast'
import UserName from '@turistikrota/ui/username'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Spin from 'sspin'
import OwnerSelectionCard from './OwnerSelectionCard'

const OwnerSelection = () => {
  const { t, i18n } = useTranslation('select')
  const { current } = useAccount()
  const [data, setData] = useState<OwnerListItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  useEffect(() => {
    if (!current) return
    setLoading(true)
    httpClient
      .get(apiUrl(Services.Owner, `/@${current.userName}`))
      .then((res) => {
        if (isOwnerListResponse(res.data)) {
          setData(res.data.list)
        }
      })
      .catch((err: any) => {
        parseApiError({
          error: err.response.data,
          toast,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  const onOwnerSelect = (item: OwnerListItem) => {
    console.log('sa::', item)
  }

  return (
    <Spin loading={loading}>
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8 ease-in'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          {t('title')}
        </h1>
        <div>
          <div className='flex flex-col space-y-4'>
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
                    className='absolute bottom-1 right-2 flex items-center justify-center rounded-full text-secondary gap-1'
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
