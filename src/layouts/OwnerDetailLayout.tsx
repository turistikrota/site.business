import { Services, apiUrl } from '@/config/services'
import { CurrentOwnerProvider } from '@/contexts/currentOwner'
import { checkUnauthorized } from '@/hooks/error'
import { httpClient } from '@/http/client'
import { getStaticRoute } from '@/static/page'
import { OwnerDetail, isAccountErrorResponse, isMustSelectResponse, isOwnerDetail } from '@/types/owner'
import { openAccountSelectionWithRedirect } from '@/utils/account'
import ServerErrorView from '@/views/500'
import Button from '@turistikrota/ui/button'
import ErrorPage from '@turistikrota/ui/pages/error'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import { Spinner } from 'sspin'

type ErrorView = {
  title: string
  subtitle: string
  button: string
  callback: () => void
  code: number
}

function OwnerDetailLayout() {
  const { t, i18n } = useTranslation('owner')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isServerError, setIsServerError] = useState<boolean>(false)
  const [errorView, setErrorView] = useState<ErrorView | undefined>(undefined)
  const [detail, setDetail] = useState<OwnerDetail | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getSelected()
  }, [])

  const getSelected = () => {
    httpClient
      .get(apiUrl(Services.Owner, `/selected`))
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false)
          setIsServerError(false)
          setErrorView(undefined)
          if (isOwnerDetail(res.data)) {
            setDetail(res.data)
          }
        }
      })
      .catch((err) => {
        if (checkUnauthorized(err, i18n.language)) return
        if (err && err.response && err.response.data) {
          if (isMustSelectResponse(err.response.data)) {
            navigate(getStaticRoute(i18n.language).owner.select)
            return
          }
          if (isAccountErrorResponse(err.response.data)) {
            if (err.response.data.accountNotFound) {
              setErrorView({
                title: t('errors.accountNotFound.title'),
                subtitle: t('errors.accountNotFound.subtitle'),
                code: err.response.status,
                button: t('errors.accountNotFound.button'),
                callback: () => {
                  refreshAuth()
                },
              })
              return
            }
            if (err.response.data.accountSelectRequired) {
              return openAccountSelectionWithRedirect(i18n.language)
            }
          }
          if (isMustSelectResponse(err.response.data)) {
            navigate('/')
            return
          }
        }
        setIsServerError(true)
      })
  }

  const refreshAuth = () => {
    setIsLoading(true)
    httpClient
      .put(apiUrl(Services.Auth, `/refresh`))
      .then((res) => {
        if (res.status === 200) {
          setIsServerError(false)
          getSelected()
        }
      })
      .catch((err) => {
        if (checkUnauthorized(err, i18n.language)) return
        setIsServerError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (errorView)
    return (
      <ErrorPage
        button={
          <Button
            className='my-4 inline-flex justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
            onClick={() => errorView.callback()}
            block={false}
          >
            {errorView.button}
          </Button>
        }
        subtitle={errorView.subtitle}
        title={errorView.title}
        code={errorView.code}
      />
    )
  if (isServerError) return <ServerErrorView />
  if (isLoading)
    return (
      <div className='flex h-full w-full items-center justify-center ease-out'>
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
