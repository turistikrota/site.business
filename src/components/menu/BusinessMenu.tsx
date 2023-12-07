import {useBodyguard} from '@/hooks/permission'
import {RouteType, getStaticRoute} from '@/static/page'
import {BusinessLogRoles, BusinessRoles, ListingRoles} from '@/static/role'
import {Colors} from '@/types/colors'
import {isWindowLtLg} from '@/utils/responsive'
import Condition from '@turistikrota/ui/condition'
import {useIsDesktop} from '@turistikrota/ui/hooks/dom'
import Logo from '@turistikrota/ui/logo'
import {lazy, useContext} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import {Pages} from './BusinessDetailHeader'
import LogoutButton from './BusinessLogoutButton'
import BusinessMenuItem from './BusinessMenuItem'
import {BusinessDetailContext} from './BusinessMenuLayout'
import BusinessMenuProfileCard from './BusinessMenuProfileCard'

type Props = {
    isDetail: boolean
}

const ToggleButton = lazy(() => import('./BusinessMenuToggle'))

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
        href: (r: RouteType) => r.business.details.deluxe,
        color: 'text-deluxe',
    },
    {
        title: 'edit',
        icon: 'bx bx-edit',
        href: (r: RouteType) => r.business.details.edit,
    },
    {
        title: 'listings',
        icon: 'bx bx-grid',
        roles: [BusinessRoles.Super, ListingRoles.Super, ListingRoles.List],
        href: (r: RouteType) => r.business.details.listing.list,
    },
    {
        title: 'users',
        icon: 'bx bx-user',
        roles: [BusinessRoles.Super, BusinessRoles.UserList],
        href: (r: RouteType) => r.business.details.users,
    },
    {
        title: 'invite',
        icon: 'bx bx-mail-send',
        roles: [BusinessRoles.Super, BusinessRoles.InviteView],
        href: (r: RouteType) => r.business.details.invite,
    },
    {
        title: 'notification',
        icon: 'bx bx-bell',
        href: (r: RouteType) => r.business.details.notification,
    },
    {
        title: 'settings',
        icon: 'bx bx-cog',
        href: (r: RouteType) => r.business.details.settings,
    },
    {
        title: "business-logs",
        icon: "bx bx-history",
        href: (r: RouteType) => r.business.details.businessLogs,
        roles: [BusinessRoles.Super, BusinessLogRoles.Super, BusinessLogRoles.List],
    },
    {
        title: 'security',
        icon: 'bx bx-lock',
        href: (r: RouteType) => r.business.details.security,
    },
    {
        title: 'privacy',
        icon: 'bx bx-lock-alt',
        href: (r: RouteType) => r.business.details.privacy,
    },
]

export default function BusinessMenu({isDetail}: Props) {
    const menuContext = useContext(BusinessDetailContext)
    const isDesktop = useIsDesktop()
    const bodyguard = useBodyguard()
    const {t, i18n} = useTranslation('menu')

    const onMenuClick = () => {
        if (isDetail && isWindowLtLg()) {
            menuContext?.setOpenMenu(false)
        }
    }

    return (
        <div className='flex h-full w-full flex-col items-center justify-start rounded-md px-4 py-4'>
            <Condition value={isDetail && !isDesktop}>
                <div
                    className={`mb-2 hidden w-full lg:flex ${menuContext.openMenu ? 'justify-start' : 'justify-center'}`}>
                    <ToggleButton/>
                </div>
            </Condition>
            <Condition value={!isDetail || menuContext.openMenu || isDesktop}>
                <Link to={`https://turistikrota.com/${i18n.language}`} className='mb-6 flex items-center'>
                    <Logo/>
                </Link>
            </Condition>
            <BusinessMenuProfileCard open={isDetail && !isDesktop ? menuContext?.openMenu : true}/>
            <div className='mt-5 grid w-full gap-4 pb-10'>
                {menuItems
                    .filter((m) => (m.roles ? bodyguard.check(...m.roles) : true))
                    .map((el, i) => (
                        <BusinessMenuItem
                            key={i}
                            isLink={!!el.href}
                            title={t(`links.${el.title}`)}
                            aria-label={t(`links.${el.title}`)}
                            href={el.href(getStaticRoute(i18n.language))}
                            onClick={onMenuClick}
                        >
                            <BusinessMenuItem.IconWrapper
                                open={isDetail && !isDesktop ? !menuContext?.openMenu : false}>
                                <BusinessMenuItem.Icon icon={el.icon} className={el.color}/>
                                <BusinessMenuItem.Badge type={el.badgeType as Colors} visible={!!el.badge}>
                                    {el.badge}
                                </BusinessMenuItem.Badge>
                            </BusinessMenuItem.IconWrapper>
                            <BusinessMenuItem.Content
                                isLink={!!el.href}
                                hidden={isDetail && !isDesktop ? !menuContext?.openMenu : false}
                            >
                                {t(`links.${el.title}`)}
                            </BusinessMenuItem.Content>
                        </BusinessMenuItem>
                    ))}
                <LogoutButton hideContent={isDetail && !isDesktop ? !menuContext?.openMenu : false}/>
            </div>
        </div>
    )
}
