import { Pages } from '@/components/menu/BusinessDetailHeader'
import BusinessMenuLayout from '@/components/menu/BusinessMenuLayout'
import { Outlet, useMatches } from 'react-router-dom'

type PageHandle = {
  page: Pages
}

function isPageHandle(obj: any): obj is PageHandle {
  return obj && obj.page
}

function BusinessSubDetailLayout() {
  const matches = useMatches()
  const currentPage = matches[matches.length - 1]
  const page = isPageHandle(currentPage.handle) ? currentPage.handle.page : 'edit'
  return (
    <BusinessMenuLayout page={page}>
      <Outlet />
    </BusinessMenuLayout>
  )
}

export { BusinessSubDetailLayout as Component }
