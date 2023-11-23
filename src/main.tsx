import '@turistikrota/ui/assets/config.css'
import '@turistikrota/ui/assets/default.css'
import GlassEffect from '@turistikrota/ui/design/glass'
import '@turistikrota/ui/fonts/verdana.css'
import { setDefaultImageSrc } from '@turistikrota/ui/hooks/image'
import ContentLoader from '@turistikrota/ui/loader'
import { ToastListProvider, ToastProvider } from '@turistikrota/ui/toast'
import 'boxicons/css/boxicons.min.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'sspin/dist/index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import ServerError from './components/ServerError'
import { Config } from './config/config'
import './config/i18n'
import './index.css'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import { router } from './router/router'

setDefaultImageSrc(Config.cdn.notFound)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ServerError />}>
    <AuthenticationLayout>
      <ToastListProvider>
        <ToastProvider>
          <GlassEffect.Fixed />
          <RouterProvider router={router} fallbackElement={<ContentLoader />} />
        </ToastProvider>
      </ToastListProvider>
    </AuthenticationLayout>
  </ErrorBoundary>,
)
