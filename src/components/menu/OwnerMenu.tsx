import { useBodyguard } from '@/hooks/permission'
import { RouteType, getStaticRoute } from '@/static/page'
import { OwnerRoles, PostRoles } from '@/static/role'
import { Colors } from '@/types/colors'
import { isWindowLtLg } from '@/utils/responsive'
import Condition from '@turistikrota/ui/condition'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import Logo from '@turistikrota/ui/logo'
import { lazy, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Pages } from './OwnerDetailHeader'
import LogoutButton from './OwnerLogoutButton'
import OwnerMenuItem from './OwnerMenuItem'
import { OwnerDetailContext } from './OwnerMenuLayout'
import OwnerMenuProfileCard from './OwnerMenuProfileCard'

type Props = {
  isDetail: boolean
}

const ToggleButton = lazy(() => import('./OwnerMenuToggle'))

type MenuItem = {
  title: Pages
  icon: string
  href: (r: RouteType) => string
  roles?: string[]
  badge?: number
  badgeType?: Colors
  color?: string
}

const menuItems: MenuItem[] = [
  {
    title: 'deluxe',
    icon: 'bx bxl-sketch',
    href: (r: RouteType) => r.owner.details.deluxe,
    color: 'text-deluxe',
  },
  {
    title: 'edit',
    icon: 'bx bx-edit',
    href: (r: RouteType) => r.owner.details.edit,
  },
  {
    title: 'posts',
    icon: 'bx bx-grid',
    roles: [OwnerRoles.Super, PostRoles.Super, PostRoles.List],
    href: (r: RouteType) => r.owner.details.post.list,
  },
  {
    title: 'users',
    icon: 'bx bx-user',
    roles: [OwnerRoles.Super, OwnerRoles.UserList],
    href: (r: RouteType) => r.owner.details.users,
  },
  {
    title: 'invite',
    icon: 'bx bx-mail-send',
    roles: [OwnerRoles.Super, OwnerRoles.InviteView],
    href: (r: RouteType) => r.owner.details.invite,
  },
  {
    title: 'notification',
    icon: 'bx bx-bell',
    href: (r: RouteType) => r.owner.details.notification,
  },
  {
    title: 'settings',
    icon: 'bx bx-cog',
    href: (r: RouteType) => r.owner.details.settings,
  },
  {
    title: 'security',
    icon: 'bx bx-lock',
    href: (r: RouteType) => r.owner.details.security,
  },
  {
    title: 'privacy',
    icon: 'bx bx-lock-alt',
    href: (r: RouteType) => r.owner.details.privacy,
  },
]

export default function OwnerMenu({ isDetail }: Props) {
  const menuContext = useContext(OwnerDetailContext)
  const isDesktop = useIsDesktop()
  const bodyguard = useBodyguard()
  const { t, i18n } = useTranslation('menu')

  const onMenuClick = () => {
    if (isDetail && isWindowLtLg()) {
      menuContext?.setOpenMenu(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-start w-full h-full rounded-md px-4 py-4'>
      <Condition value={isDetail && !isDesktop}>
        <div className={`hidden lg:flex mb-2 w-full ${menuContext.openMenu ? 'justify-start' : 'justify-center'}`}>
          <ToggleButton />
        </div>
      </Condition>
      <Condition value={!isDetail || menuContext.openMenu || isDesktop}>
        <Link to={`https://turistikrota.com/${i18n.language}`} className='flex items-center mb-6'>
          <Logo />
        </Link>
      </Condition>
      <OwnerMenuProfileCard open={isDetail && !isDesktop ? menuContext?.openMenu : true} />
      <div className='grid gap-4 w-full mt-5'>
        {menuItems
          .filter((m) => (m.roles ? bodyguard.check(...m.roles) : true))
          .map((el, i) => (
            <OwnerMenuItem
              key={i}
              isLink={!!el.href}
              title={t(`links.${el.title}`)}
              aria-label={t(`links.${el.title}`)}
              href={el.href(getStaticRoute(i18n.language))}
              onClick={onMenuClick}
            >
              <OwnerMenuItem.IconWrapper open={isDetail && !isDesktop ? !menuContext?.openMenu : false}>
                <OwnerMenuItem.Icon icon={el.icon} className={el.color} />
                <OwnerMenuItem.Badge type={el.badgeType as Colors} visible={!!el.badge}>
                  {el.badge}
                </OwnerMenuItem.Badge>
              </OwnerMenuItem.IconWrapper>
              <OwnerMenuItem.Content
                isLink={!!el.href}
                hidden={isDetail && !isDesktop ? !menuContext?.openMenu : false}
              >
                {t(`links.${el.title}`)}
              </OwnerMenuItem.Content>
            </OwnerMenuItem>
          ))}
        <LogoutButton hideContent={isDetail && !isDesktop ? !menuContext?.openMenu : false} />
      </div>
    </div>
  )
}
