import Button from '@turistikrota/ui/button'
import { FullVariant } from '@turistikrota/ui/types'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  icon: string
  title: string
  text: string
  to: string
  className?: string
  variant?: FullVariant
}

const variantClasses: Record<FullVariant, string> = {
  blue: 'text-blue-500',
  danger: 'text-red-500',
  default: 'text-primary',
  green: 'text-green-500',
  indigo: 'text-indigo-500',
  orange: 'text-orange-500',
  primary: 'text-primary',
  purple: 'text-purple-500',
  secondary: 'text-secondary',
  success: 'text-green-500',
  teal: 'text-teal-500',
  warning: 'text-yellow-500',
  yellow: 'text-yellow-500',
}

const ModuleCard: FC<Props> = ({ icon, to, text, title, className, variant = 'primary' }) => {
  const { t } = useTranslation('settings')
  return (
    <div className={`rounded-md border bg-second p-2 ${className ? className : ''}`}>
      <div className='flex h-12 w-12 items-center justify-center rounded-md bg-primary/10'>
        <i className={`bx text-3xl ${icon} ${variantClasses[variant]}`}></i>
      </div>
      <h4 className='mb-2 mt-5 text-lg font-medium'>{title}</h4>
      <p className='mb-2 text-slate-500 dark:text-slate-400'>{text}</p>
      <Link to={to}>
        <Button block>{t('modules.open')}</Button>
      </Link>
    </div>
  )
}

export default ModuleCard
