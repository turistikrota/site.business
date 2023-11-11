import { Config } from '@/config/config'
import Cookies from 'js-cookie'
import AccountSelectionLayout, { AccountProvider } from './AccountSelectionLayout'
import AuthenticationLayout from './AuthenticationLayout'

const DefaultLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const accessToken = Cookies.get(Config.cookies.accessToken)
  const account = Cookies.get(Config.cookies.accountName)
  return (
    <AuthenticationLayout>
      <AccountProvider accessTokenIsExists={!!accessToken} isAccountCookieExists={!!account}>
        <AccountSelectionLayout>{children}</AccountSelectionLayout>
      </AccountProvider>
    </AuthenticationLayout>
  )
}

export default DefaultLayout
