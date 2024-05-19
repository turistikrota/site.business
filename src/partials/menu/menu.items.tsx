import { RouteType } from '@/static/page'

type Item = {
  title: string
  icon: string
  href: (r: RouteType) => string
  subPaths?: string[]
  contains?: boolean
}

export const MediumItems: Item[] = [
  {
    title: 'home',
    icon: 'bx-home',
    href: () => '/',
  },
  {
    title: 'listings',
    icon: 'bx-list-ul',
    href: (r) => r.listing.list,
  },
  {
    title: 'bookings',
    icon: 'bx-calendar',
    href: (r) => r.booking.list,
  },
  {
    title: 'payments',
    icon: 'bx-credit-card',
    href: (r) => r.payment.list,
  },
  {
    title: 'invoices',
    icon: 'bx-receipt',
    href: (r) => r.invoice.list,
  },
]

export const BottomItems: Item[] = [
  {
    title: 'invites',
    icon: 'bx-envelope',
    href: (r) => r.invite.list,
    contains: true,
  },
  {
    title: 'settings',
    icon: 'bx-cog',
    href: (r) => r.settings.base,
    contains: true,
  },
]

export const MobileItems: Item[] = [
  {
    title: 'profile.edit',
    icon: 'bx-edit',
    href: (r) => r.profile.edit,
  },
]

export const AllItems: Item[] = [...MediumItems, ...BottomItems, ...MobileItems]
