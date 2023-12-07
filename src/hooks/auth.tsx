import { useToast } from '@turistikrota/ui/toast'
import { useState } from 'react'
import { httpClient } from '@/http/client.tsx'
import { apiUrl, Services } from '@/config/services.ts'
import { parseApiError } from '@turistikrota/ui/utils/response'

type Callback = (err?: any) => void

type RefreshToken = (cb: Callback | undefined) => void

type AuthHook = {
  loading: boolean
  refresh: RefreshToken
}

export const useAuth = (): AuthHook => {
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()

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
        if (typeof cb === 'function') cb(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    refresh: refreshAuth,
  }
}
