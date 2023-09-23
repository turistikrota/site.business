import { Pages } from '@/components/menu/OwnerDetailHeader'
import OwnerMenuLayout from '@/components/menu/OwnerMenuLayout'
import { Outlet, useMatches } from 'react-router-dom'

type PageHandle = {
  page: Pages
}

function isPageHandle(obj: any): obj is PageHandle {
  return obj && obj.page
}

function OwnerSubDetailLayout() {
  const matches = useMatches()
  const currentPage = matches[matches.length - 1]
  const page = isPageHandle(currentPage.handle) ? currentPage.handle.page : 'edit'
  return (
    <OwnerMenuLayout page={page}>
      <Outlet />
    </OwnerMenuLayout>
  )
}

export { OwnerSubDetailLayout as Component }
