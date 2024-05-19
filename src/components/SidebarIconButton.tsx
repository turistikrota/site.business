import { Link } from 'react-router-dom'

interface Props {
  to: string
  icon: string
  title?: string
  path?: string
  contains?: boolean
  allPaths?: string[]
}

export default function SidebarIconButton({ to, title, icon, path, contains, allPaths }: Props) {
  return (
    <Link
      to={to}
      className={`group relative flex h-10 w-full items-center justify-center transition-colors duration-200 ${
        path === to || (contains && path?.includes(to)) || (allPaths && path && allPaths.includes(path))
          ? 'border-r-2 border-primary-500 font-semibold text-primary-500'
          : 'text-gray-400 hover:text-primary-500 dark:text-gray-300'
      }`}
      title={title}
    >
      <i className={`bx ${icon} text-2xl`}></i>
      {title && (
        <span className='absolute left-20 z-9999 hidden h-10 w-max items-center justify-center rounded-r-md border bg-second px-2 text-gray-900 transition-all duration-200 group-hover:flex dark:text-gray-200'>
          {title}
        </span>
      )}
    </Link>
  )
}
