import { LinkProps } from '@turistikrota/ui/breadcrumb'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const DomLink: FC<LinkProps> = ({ children, href, className }) => {
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}

export default DomLink
