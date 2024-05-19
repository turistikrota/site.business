import { Services, apiUrl } from '@/config/services'
import { CurrentBusinessProvider } from '@/contexts/currentBusiness'
import { useAuth } from '@/hooks/auth.tsx'
import { checkUnauthorized } from '@/hooks/error'
import { httpClient } from '@/http/client'
import { getStaticRoute } from '@/static/page'
import { BusinessDetail, isAccountErrorResponse, isBusinessDetail, isMustSelectResponse } from '@/types/business'
import { openAccountSelectionWithRedirect } from '@/utils/account'
import NotFoundView from '@/views/404'
import ServerErrorView from '@/views/500'
import VerificationRejected from '@/views/state/verification-rejected'
import VerificationWaiting from '@/views/state/verification-waiting'
import Button from '@turistikrota/ui/button'
import ErrorPage from '@turistikrota/ui/pages/error'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import { Spinner } from 'sspin'
import BusinessLayout from './BusinessLayout'

type ErrorView = {
  title: string
  subtitle: string
  button: string
  callback: () => void
  code: number
}

function BusinessDetailLayout() {
  const { t, i18n } = useTranslation('business')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isServerError, setIsServerError] = useState<boolean>(false)
  const [errorView, setErrorView] = useState<ErrorView | undefined>(undefined)
  const [detail, setDetail] = useState<BusinessDetail | null>(null)
  const navigate = useNavigate()
  const auth = useAuth()
  const isAnyLoading = useMemo(() => isLoading || auth.loading, [isLoading, auth.loading])

  useEffect(() => {
    getSelected()
  }, [])

  const getSelected = () => {
    httpClient
      .get(apiUrl(Services.Business, `/selected`))
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false)
          setIsServerError(false)
          setErrorView(undefined)
          if (isBusinessDetail(res.data)) {
            setDetail(res.data)
          }
        }
      })
      .catch((err) => {
        if (checkUnauthorized(err, i18n.language)) return
        if (err && err.response && err.response.data) {
          if (isMustSelectResponse(err.response.data)) {
            navigate(getStaticRoute(i18n.language).profile.select)
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
                  auth.refresh((err) => {
                    if (err) {
                      if (checkUnauthorized(err, i18n.language)) return
                      setIsServerError(true)
                      return
                    }
                    getSelected()
                    setIsServerError(false)
                  })
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
  if (isAnyLoading)
    return (
      <div className='flex h-full w-full items-center justify-center ease-out'>
        <Spinner />
      </div>
    )
  if (!detail) return <NotFoundView />
  if (!detail.business.isVerified) {
    if (detail.business.rejectReason) return <VerificationRejected reason={detail.business.rejectReason} />
    return <VerificationWaiting />
  }

  return (
    <CurrentBusinessProvider detail={detail!}>
      <BusinessLayout>
        <Outlet />
      </BusinessLayout>
    </CurrentBusinessProvider>
  )
}
BusinessDetailLayout.displayName = 'BusinessDetailLayout'

export { BusinessDetailLayout as Component }
