import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import React, { useState } from 'react'
import BusinessDetailHeader, { BusinessDetailTitle, type Pages } from './BusinessDetailHeader'
import BusinessMenu from './BusinessMenu'
import {useCurrentBusiness} from "@/contexts/currentBusiness.tsx";
import Alert from "@turistikrota/ui/alert";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import {getStaticRoute} from "@/static/page.ts";
import Button from "@turistikrota/ui/button";

type Props = {
  open?: boolean
  page: Pages
}

type Context = {
  openMenu: boolean
  setOpenMenu: (openMenu: boolean) => void
}

export const BusinessDetailContext = React.createContext<Context>({
  openMenu: false,
  setOpenMenu: () => {
    // do nothing
  },
})

export default function BusinessMenuLayout({ open = false, page, children }: React.PropsWithChildren<Props>) {
  const { t, i18n } = useTranslation('general')
  const [menuOpen, setMenuOpen] = useState(open)
  const currentPath = useLocation().pathname
  const [current] = useCurrentBusiness()
  const isDesktop = useIsDesktop()
  return (
    <BusinessDetailContext.Provider
      value={{
        openMenu: menuOpen,
        setOpenMenu: setMenuOpen,
      }}
    >
      <div className='flex h-full min-h-screen w-full flex-col 2xl:container 2xl:mx-auto'>
        <div className={`lg:hidden ${menuOpen ? 'hidden' : 'block'}`}>
          <BusinessDetailHeader page={page} />
        </div>

        <div className='flex flex-grow'>
          <aside
            className={`${
              menuOpen || isDesktop
                ? 'sticky top-0 block h-screen w-full overflow-y-auto lg:w-3/12 xl:max-w-sm'
                : 'hidden h-full w-0 lg:block lg:w-fit'
            } transition-all duration-200`}
          >
            <BusinessMenu isDetail={true} />
          </aside>
          <div
            className={`${menuOpen ? 'hidden w-0 lg:block lg:w-9/12' : 'w-full'} h-full transition-all duration-200`}
          >
            <div className={`pl-4 pt-4 lg:block ${menuOpen ? 'block' : 'hidden'}`}>
              <BusinessDetailTitle page={page} />
            </div>
            {!current.business.isEnabled && <section className={"container relative mx-auto p-4"}>
              <Alert type={"warning"} showIcon>
                <Alert.Title>{t('warns.disabled.title')}</Alert.Title>
                <Alert.Description>{t('warns.disabled.description')}</Alert.Description>
                {currentPath !== getStaticRoute(i18n.language).business.details.edit && <Link to={getStaticRoute(i18n.language).business.details.edit}>
                  <Button variant={"secondary"} block={false} className={"mt-2"}>
                    {t('warns.disabled.link')}
                  </Button>
                </Link>}
              </Alert>
            </section>}
            {children}
          </div>
        </div>
      </div>
    </BusinessDetailContext.Provider>
  )
}
