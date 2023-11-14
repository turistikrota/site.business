import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import React, { useState } from 'react'
import OwnerDetailHeader, { OwnerDetailTitle, type Pages } from './OwnerDetailHeader'
import OwnerMenu from './OwnerMenu'

type Props = {
  open?: boolean
  page: Pages
}

type Context = {
  openMenu: boolean
  setOpenMenu: (openMenu: boolean) => void
}

export const OwnerDetailContext = React.createContext<Context>({
  openMenu: false,
  setOpenMenu: () => {
    // do nothing
  },
})

export default function OwnerMenuLayout({ open = false, page, children }: React.PropsWithChildren<Props>) {
  const [menuOpen, setMenuOpen] = useState(open)
  const isDesktop = useIsDesktop()
  return (
    <OwnerDetailContext.Provider
      value={{
        openMenu: menuOpen,
        setOpenMenu: setMenuOpen,
      }}
    >
      <div className='flex flex-col min-h-screen h-full w-full 2xl:container 2xl:mx-auto'>
        <div className={`lg:hidden ${menuOpen ? 'hidden' : 'block'}`}>
          <OwnerDetailHeader page={page} />
        </div>

        <div className='flex flex-grow'>
          <aside
            className={`${
              menuOpen || isDesktop
                ? 'block w-full lg:w-3/12 xl:max-w-sm sticky top-0 h-screen overflow-y-auto'
                : 'w-0 hidden lg:block lg:w-fit h-full'
            } transition-all duration-200`}
          >
            <OwnerMenu isDetail={true} />
          </aside>
          <div
            className={`${menuOpen ? 'w-0 hidden lg:block lg:w-9/12' : 'w-full'} transition-all duration-200 h-full`}
          >
            <div className={`lg:block pt-4 ${menuOpen ? 'block' : 'hidden'}`}>
              <OwnerDetailTitle page={page} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </OwnerDetailContext.Provider>
  )
}
