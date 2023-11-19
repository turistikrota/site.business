import { Config } from '@/config/config'
import Cookies from 'js-cookie'
import AccountSelectionLayout, { AccountProvider } from './AccountSelectionLayout'

const DefaultLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const accessToken = Cookies.get(Config.cookies.accessToken)
  const account = Cookies.get(Config.cookies.accountName)
  return (
    <AccountProvider accessTokenIsExists={!!accessToken} isAccountCookieExists={!!account}>
      <AccountSelectionLayout>{children}</AccountSelectionLayout>
    </AccountProvider>
  )
}

export default DefaultLayout
