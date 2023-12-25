type Props = {
  title: string
  description: string
  icon?: string
  className?: string
  children?: React.ReactNode
}

const EmptyContent: React.FC<Props> = ({
  icon = 'bx-search-alt',
  title,
  description,
  className = '',
  children = null,
}) => {
  return (
    <div className={`flex flex-col gap-2 rounded-md bg-second p-2 ${className ? className : ''}`}>
      {icon && (
        <div className='flex justify-center'>
          <i className={`bx ${icon} text-6xl`} />
        </div>
      )}

      <div className='flex justify-center'>
        <h1 className='text-center text-2xl font-bold'>{title}</h1>
      </div>

      <div className='flex justify-center'>
        <p className='text-center'>{description}</p>
      </div>

      {children}
    </div>
  )
}

export default EmptyContent
