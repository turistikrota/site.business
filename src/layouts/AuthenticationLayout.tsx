import { Services, apiUrl } from '@/config/services'
import { checkUnauthorized } from '@/hooks/error'
import { httpClient } from '@/http/client'
import ServerErrorView from '@/views/500'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Spinner } from 'sspin'

export default function AuthenticationLayout({ children }: React.PropsWithChildren) {
  const { i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isServerError, setIsServerError] = useState<boolean>(false)
  useEffect(() => {
    httpClient
      .get(apiUrl(Services.Auth, '/'))
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (checkUnauthorized(err, i18n.language)) return
        setIsServerError(true)
      })
  }, [])
  if (isServerError) return <ServerErrorView />
  if (isLoading)
    return (
      <div className='ease-out w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  return <>{children}</>
}
