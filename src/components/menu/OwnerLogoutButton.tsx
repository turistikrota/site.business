import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { openLogin } from '@/utils/auth'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin/dist/esm/Spin'
import OwnerMenuItem from './OwnerMenuItem'

type Props = {
  hideContent?: boolean
}

export default function LogoutButton({ hideContent }: Props) {
  const { t, i18n } = useTranslation('menu')
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    setIsLoading(true)
    httpClient
      .post(apiUrl(Services.Auth, '/logout'), null)
      .then((res) => {
        if (res.status === 200) {
          toast.success(t('logout.success'))
          openLogin(i18n.language)
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) return parseApiError({ error: err.response.data, toast })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className='spin-sm'>
      <Spin loading={isLoading}>
        <OwnerMenuItem isLink={false} onClick={handleLogout} title={t('logout.text')} aria-label={t('logout.text')}>
          <OwnerMenuItem.IconWrapper open={hideContent}>
            <OwnerMenuItem.Icon icon='bx bx-log-out'></OwnerMenuItem.Icon>
          </OwnerMenuItem.IconWrapper>
          <OwnerMenuItem.Content hidden={hideContent}>{t('logout.text')}</OwnerMenuItem.Content>
        </OwnerMenuItem>
      </Spin>
    </div>
  )
}
