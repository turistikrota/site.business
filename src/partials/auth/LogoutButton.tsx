import { parseApiError } from '@turistikrota/ui/utils/response'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Dialog from '@/components/Dialog'
import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { openLogin } from '@/utils/auth'
import Button from '@turistikrota/ui/button'
import { useToast } from '@turistikrota/ui/toast'

export default function LogoutButton() {
  const { t, i18n } = useTranslation('general')
  const toast = useToast()
  const [dialogVisible, setDialogVisible] = useState(false)
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
    <>
      <Dialog
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
        message={t('sections.logout.dialog.message')}
        title={t('sections.logout.dialog.title')}
        onConfirm={() => handleLogout()}
        variant='error'
      />
      <Button
        variant='error'
        onClick={() => {
          setDialogVisible(true)
        }}
        disabled={isLoading}
      >
        {t('sections.logout.text')}
      </Button>
    </>
  )
}
