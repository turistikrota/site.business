import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { openAccountSelectionWithRedirect } from '@/utils/account'
import { openLoginWithRedirect } from '@/utils/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Spinner } from 'sspin'

enum AccountStorage {
  CurrentAccount = 'currentAccount',
}

export type AccountListItem = {
  avatarUrl: string
  completedRate: number
  createdAt: string
  description: string
  fullName: string
  isActive: boolean
  isVerified: boolean
  userName: string
}

export function isAccountListItem(response: any): response is AccountListItem {
  return (
    response &&
    response.avatarUrl !== undefined &&
    response.completedRate !== undefined &&
    response.createdAt !== undefined &&
    response.description !== undefined &&
    response.fullName !== undefined &&
    response.isActive !== undefined &&
    response.isVerified !== undefined &&
    response.userName !== undefined
  )
}

type AccountContext = {
  loading: boolean
  current?: AccountListItem
  setLoading: (loading: boolean) => void
  setCurrent: (current?: AccountListItem) => void
}

type ProviderProps = {
  accessTokenIsExists: boolean
  isAccountCookieExists: boolean
}

const AccountContext = createContext<AccountContext>({
  loading: false,
  current: undefined,
  setLoading: () => {},
  setCurrent: () => {},
})

export const useAccount = () => useContext(AccountContext)

const AccountFetcher: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  accessTokenIsExists,
  isAccountCookieExists,
}) => {
  const { i18n } = useTranslation()
  const { setLoading, setCurrent } = useAccount()

  useEffect(() => {
    if (typeof window === 'undefined') return
    setLoading(true)
    const item = localStorage.getItem(AccountStorage.CurrentAccount)
    if (accessTokenIsExists && (!isAccountCookieExists || !!item)) {
      if (item) {
        const account = JSON.parse(item)
        if (isAccountListItem(account)) {
          setLoading(false)
          setCurrent(account)
        }
      }
      return
    }
    httpClient
      .get(apiUrl(Services.Account, '/selected'))
      .then((res) => {
        if (isAccountListItem(res.data)) {
          setCurrent(res.data)
          localStorage.setItem(AccountStorage.CurrentAccount, JSON.stringify(res.data))
        }
      })
      .catch((err: any) => {
        if (err && err.response && err.response.status === 401) {
          return openLoginWithRedirect(i18n.language)
        }

        localStorage.removeItem(AccountStorage.CurrentAccount)
        setCurrent(undefined)

        if (err.response.data.mustSelect) {
          return openAccountSelectionWithRedirect(i18n.language)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return <>{children}</>
}

export const AccountProvider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  accessTokenIsExists,
  isAccountCookieExists,
}) => {
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState<AccountListItem | undefined>(undefined)

  return (
    <AccountContext.Provider
      value={{
        loading,
        current,
        setLoading,
        setCurrent,
      }}
    >
      <AccountFetcher accessTokenIsExists={accessTokenIsExists} isAccountCookieExists={isAccountCookieExists}>
        {children}
      </AccountFetcher>
    </AccountContext.Provider>
  )
}

const AccountSelectionLayout = ({ children }: React.PropsWithChildren) => {
  const { loading, current } = useAccount()
  if (loading || !current)
    return (
      <div className='ease-out w-full h-full py-20 flex justify-center items-center'>
        <Spinner />
      </div>
    )
  return <>{children}</>
}

export default AccountSelectionLayout
