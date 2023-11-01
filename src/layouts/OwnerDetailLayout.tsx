import { Services, apiUrl } from '@/config/services'
import { CurrentOwnerProvider } from '@/contexts/currentOwner'
import { checkUnauthorized } from '@/hooks/error'
import { httpClient } from '@/http/client'
import { OwnerDetail, isMustSelectResponse, isOwnerDetail } from '@/types/owner'
import ServerErrorView from '@/views/500'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import { Spinner } from 'sspin'

function OwnerDetailLayout() {
  const { i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isServerError, setIsServerError] = useState<boolean>(false)
  const [detail, setDetail] = useState<OwnerDetail | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    httpClient
      .get(apiUrl(Services.Owner, `/selected`))
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false)
          setIsServerError(false)
          console.log('data::', res.data)
          if (isOwnerDetail(res.data)) {
            setDetail(res.data)
          }
        }
      })
      .catch((err) => {
        if (checkUnauthorized(err, i18n.language)) return
        if (err && err.response && err.response.data && isMustSelectResponse(err.response.data)) {
          navigate('/')
          return
        }
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
  if (!detail) return
  return (
    <CurrentOwnerProvider detail={detail!}>
      <Outlet />
    </CurrentOwnerProvider>
  )
}
OwnerDetailLayout.displayName = 'OwnerDetailLayout'

export { OwnerDetailLayout as Component }
