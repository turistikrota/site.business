import Logo from '@/components/Logo'
import SidebarIconButton from '@/components/SidebarIconButton'
import { BottomItems, MediumItems } from '@/partials/menu/menu.items'
import ProfileMenu from '@/partials/profile/ProfileMenu'
import { getStaticRoute } from '@/static/page'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

function BusinessSidebar() {
  const { t, i18n } = useTranslation('general')
  const path = useLocation().pathname

  return (
    <aside className='mb-2 mt-2 flex w-20 animate-fade-in-from-left flex-col justify-between rounded-md border bg-second'>
      <section className='flex flex-col items-center justify-start py-2'>
        <Logo />
        <hr
          className='mx-auto mt-2 bg-default'
          style={{
            height: '2px',
            width: '70%',
          }}
        />
      </section>
      <section className='flex flex-col items-center justify-center gap-2'>
        {MediumItems.map((item) => (
          <SidebarIconButton
            key={item.title}
            title={t(`utils.breadcrumb.${item.title}`)}
            to={item.href(getStaticRoute(i18n.language))}
            icon={item.icon}
            path={path}
            contains={item.contains}
            allPaths={item.subPaths}
          />
        ))}
      </section>
      <section className='flex flex-col items-center justify-end gap-2 py-2'>
        <hr
          className='mx-auto mb-2 bg-default'
          style={{
            height: '2px',
            width: '70%',
          }}
        />
        {BottomItems.map((item) => (
          <SidebarIconButton
            key={item.title}
            title={t(`sections.menu.${item.title}`)}
            to={item.href(getStaticRoute(i18n.language))}
            icon={item.icon}
            path={path}
            contains={item.contains}
            allPaths={item.subPaths}
          />
        ))}
        <ProfileMenu />
      </section>
    </aside>
  )
}

export default BusinessSidebar
