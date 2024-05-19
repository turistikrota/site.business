import { useIsMobile } from '@turistikrota/ui/hooks/dom'
import { useTranslation } from 'react-i18next'
import BusinessMobileMenu from './BusinessMobileMenu'
import BusinessSidebar from './BusinessSidebar'
import DefaultLayout from './DefaultLayout'

function BusinessLayout({ children }: React.PropsWithChildren) {
  const isMobile = useIsMobile()
  const { t } = useTranslation('general')
  return (
    <DefaultLayout>
      <div className='flex h-screen flex-col pl-0 md:flex-row md:pl-4'>
        {!isMobile && <BusinessSidebar />}
        {isMobile && <BusinessMobileMenu />}
        <main className='flex h-full w-full animate-fade-in flex-col overflow-auto pb-20 pl-2 pr-2 pt-2 duration-200 md:pb-0 md:pl-4 md:pr-4 md:pt-2'>
          <section className='flex grow flex-col gap-4'>{children}</section>
          <footer className='w-full py-4 text-sm text-gray-800 dark:text-gray-200'>
            {t('footer', {
              year: new Date().getFullYear(),
            })}
          </footer>
        </main>
      </div>
    </DefaultLayout>
  )
}

export default BusinessLayout
