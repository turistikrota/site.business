import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useAccount } from '@/layouts/AccountSelectionLayout'
import { getStaticRoute } from '@/static/page'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Spin from 'sspin'
import OwnerSelectionCard from './OwnerSelectionCard'

const OwnerSelection = () => {
  const { t, i18n } = useTranslation('select')
  const { current } = useAccount()
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (!current) return
    setLoading(true)
    httpClient.get(apiUrl(Services.Owner, `/@${current.userName}`)).finally(() => setLoading(false))
  }, [])

  return (
    <Spin loading={loading}>
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8 ease-in'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          {t('title')}
        </h1>
        <div>
          <div className='flex flex-col space-y-4'>
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
