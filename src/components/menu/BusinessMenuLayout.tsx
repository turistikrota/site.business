import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import React, { useState } from 'react'
import BusinessDetailHeader, { BusinessDetailTitle, type Pages } from './BusinessDetailHeader'
import BusinessMenu from './BusinessMenu'

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
  const [menuOpen, setMenuOpen] = useState(open)
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
            {children}
          </div>
        </div>
      </div>
    </BusinessDetailContext.Provider>
  )
}
