import ProfileMenuItem from '@/components/ProfileMenuItem'
import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { openLogin } from '@/utils/auth'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin/dist/esm/Spin'

type Props = {
  hideContent?: boolean
}

export default function LogoutButton({ hideContent }: Props) {
  const { t, i18n } = useTranslation('general')
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    setIsLoading(true)
    httpClient
      .post(apiUrl(Services.Auth, '/logout'), null)
      .then((res) => {
        if (res.status === 200) {
          toast.success(t('sections.logout.success'))
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
        <ProfileMenuItem
          isLink={false}
          onClick={handleLogout}
          title={t('sections.logout.text')}
          aria-label={t('sections.logout.text')}
        >
          <ProfileMenuItem.IconWrapper open={hideContent}>
            <ProfileMenuItem.Icon icon='bx bx-log-out'></ProfileMenuItem.Icon>
          </ProfileMenuItem.IconWrapper>
          <ProfileMenuItem.Content hidden={hideContent}>{t('sections.logout.text')}</ProfileMenuItem.Content>
        </ProfileMenuItem>
      </Spin>
    </div>
  )
}
