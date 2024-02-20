type Props = {
  icon: string
  title: string
  description?: string
  onClick: () => void
  selected?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

type Size = {
  icon: string
  card: string
  label: string
}

const Sizes: Record<string, Size> = {
  sm: {
    icon: 'text-3xl',
    card: 'h-24 w-24',
    label: 'p-1',
  },
  md: {
    icon: 'text-4xl',
    card: 'h-32 w-32',
    label: 'p-1.5',
  },
  lg: {
    icon: 'text-5xl',
    card: 'h-40 w-40',
    label: 'p-2',
  },
}

const BusinessTypeCard: React.FC<Props> = ({
  description,
  icon,
  onClick,
  title,
  selected,
  disabled = false,
  size = 'lg',
}) => {
  const handleClick = () => {
    if (disabled) return
    onClick()
  }
  return (
    <div
      className={`relative flex cursor-pointer flex-col items-center justify-center rounded-md border p-2 transition-colors duration-200 hover:border-primary hover:bg-primary hover:bg-opacity-10 ${
        selected ? 'border-primary bg-primary bg-opacity-10' : 'border-transparent'
      } ${Sizes[size].card} ${disabled ? 'cursor-not-allowed opacity-50 hover:border-transparent' : ''}`}
      onClick={handleClick}
    >
      {selected && (
        <span className={`absolute left-2 top-2 rounded-full bg-primary text-white ${Sizes[size].label}`}></span>
      )}
      <i className={`bx ${Sizes[size].icon} ${icon}`}></i>
      <div className='mt-1 font-medium text-gray-900 dark:text-white'>{title}</div>
      {description && <p className='text-center text-sm text-gray-500 dark:text-gray-400'>{description}</p>}
    </div>
  )
}

export default BusinessTypeCard
