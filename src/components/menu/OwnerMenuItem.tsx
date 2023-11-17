import { Colors } from '@/types/colors'
import { Link } from 'react-router-dom'

type OwnerMenuItemType = React.FC<React.PropsWithChildren<Props>> & {
  Content: typeof Content
  Icon: typeof Icon
  IconWrapper: typeof IconWrapper
  Badge: typeof Badge
  LinkIcon: typeof LinkIcon
}

type BadgeProps = {
  type?: Colors
  visible?: boolean
}

type ContentProps = {
  isLink?: boolean
  hidden?: boolean
}

type IconWrapperProps = {
  open?: boolean
}

type LinkIconProps = {
  visible?: boolean
}

type DefaultProps = {
  onClick?: () => void
  className?: string
  title: string
}

type LinkProps = DefaultProps & {
  href: string
  alt?: string
}

type Props = {
  isLink?: boolean
} & (LinkProps | DefaultProps)

type IconProps = {
  icon: string
  className?: string
}

function isLinkProps(props: Props): props is LinkProps {
  return (props as LinkProps).href !== undefined
}

const BadgeStyles: Record<Colors, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  deluxe: 'bg-deluxe-400',
}

const IconWrapper = ({ children, open }: React.PropsWithChildren<IconWrapperProps>) => {
  return (
    <div className={`flex items-center justify-center ${open ? 'col-span-4' : ''}`}>
      <div className='relative flex items-center justify-center'>{children}</div>
    </div>
  )
}

const Icon = ({ icon, className }: IconProps) => {
  return <i className={`${icon} bx-sm ${className ? className : 'text-gray-700 dark:text-white'}`}></i>
}

const Badge = ({ type = 'primary', visible = true, children }: React.PropsWithChildren<BadgeProps>) => {
  if (!visible) return null
  return (
    <span
      className={`absolute -right-2 top-0 flex h-4 w-4 items-center justify-center rounded-full text-xs text-white ${BadgeStyles[type]}`}
    >
      {children}
    </span>
  )
}

const LinkIcon = ({ visible }: LinkIconProps) => {
  if (!visible) return null
  return (
    <i className='bx bx-sm bx-chevron-right absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-700 dark:text-white'></i>
  )
}

const Content = ({ children, hidden, isLink }: React.PropsWithChildren<ContentProps>) => {
  return (
    <div
      className={`relative flex-col items-start justify-center ${
        hidden ? 'fade-out hidden' : 'fade-in col-span-3 flex'
      }`}
    >
      <span className='text-md font-semibold text-gray-900  dark:text-white'>{children}</span>
      <LinkIcon visible={isLink} />
    </div>
  )
}

const DefaultProvider = ({ children, className, title, onClick }: React.PropsWithChildren<DefaultProps>) => {
  return (
    <div
      className={`cursor-pointer ${className ? className : ''}`}
      onClick={onClick}
      role='button'
      title={title}
      aria-label={title}
    >
      {children}
    </div>
  )
}

const LinkProvider = ({ children, onClick, title, className, alt, href }: React.PropsWithChildren<LinkProps>) => {
  return (
    <Link to={href} title={title} onClick={onClick} className={className} aria-label={alt ? alt : title}>
      {children}
    </Link>
  )
}

const OwnerMenuItem: OwnerMenuItemType = ({ children, ...props }) => {
  const classes = `w-full rounded-md grid grid-cols-4 py-3 hover:bg-third transition-colors duration-200 bg-second`
  if (isLinkProps(props)) {
    return (
      <LinkProvider {...props} className={classes}>
        {children}
      </LinkProvider>
    )
  }
  return (
    <DefaultProvider {...props} className={classes}>
      {children}
    </DefaultProvider>
  )
}

OwnerMenuItem.Content = Content
OwnerMenuItem.IconWrapper = IconWrapper
OwnerMenuItem.Badge = Badge
OwnerMenuItem.Icon = Icon
OwnerMenuItem.LinkIcon = LinkIcon

export default OwnerMenuItem
