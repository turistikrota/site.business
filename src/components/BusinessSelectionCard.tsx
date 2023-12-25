import { Config } from '@/config/config'
import { PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'

type BusinessSelectionProps = {
  onSelect?: () => void
}

type BusinessSelectionCardType = React.FC<PropsWithChildren<BusinessSelectionProps>> & {
  CompletedRangeLine: typeof CompletedRangeLine
  VerifiedBadge: typeof VerifiedBadge
  Image: typeof AImage
  Content: typeof Content
  FullName: typeof FullName
  Avatar: typeof Avatar
  Text: typeof Text
}

const CompletedRangeLine = ({ completedRate }: { completedRate: number }) => {
  const { t } = useTranslation('select')
  return (
    <div
      className='absolute bottom-0 left-0 h-1 w-full rounded-b-md bg-green-50 bg-opacity-50 dark:bg-green-950'
      role='progressbar'
      aria-valuenow={completedRate}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t('tool.completedRate', { rate: completedRate })}
      title={t('tool.completedRate', { rate: completedRate })}
    >
      <div
        className={`h-full rounded-b-md bg-green-400 dark:bg-green-500`}
        style={{ width: `${completedRate}%` }}
      ></div>
    </div>
  )
}

const VerifiedBadge = () => {
  const { t } = useTranslation('general')
  return (
    <div
      className='absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full'
      role='alert'
      aria-label={t('verified')}
      title={t('verified_alt')}
    >
      <i className='bx bx-md bxs-badge-check text-primary-500'></i>
    </div>
  )
}

const AImage = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='bg-default col-span-1 flex items-center justify-center rounded-bl-md rounded-tl-md p-2'>
      {children}
    </div>
  )
}

type AvatarProps = {
  src: string
  alt: string
}

const Avatar = ({ src, alt }: AvatarProps) => {
  const [avatar, setAvatar] = useState<string>(src)
  return (
    <img
      src={avatar}
      alt={alt}
      onError={() => setAvatar(Config.cdn.notFound)}
      className='min-h-16 h-16 max-h-16 w-full rounded-md object-contain'
    />
  )
}

const Content = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='col-span-4 flex flex-col justify-center rounded-br-md rounded-tr-md bg-second p-2'>{children}</div>
  )
}

const Text = ({ children }: React.PropsWithChildren) => {
  return <span className='text-md font-semibold text-gray-900 dark:text-white'>{children}</span>
}

const FullName = ({ children }: React.PropsWithChildren) => {
  return <div className='line-clamp-1 text-sm text-gray-500 dark:text-gray-500'>{children}</div>
}

const Card: BusinessSelectionCardType = ({ children, onSelect }) => {
  return (
    <div className='relative grid cursor-pointer grid-cols-5 rounded-md border duration-200 ease-in' onClick={onSelect}>
      {children}
    </div>
  )
}

Card.CompletedRangeLine = CompletedRangeLine
Card.VerifiedBadge = VerifiedBadge
Card.Image = AImage
Card.Content = Content
Card.FullName = FullName
Card.Avatar = Avatar
Card.Text = Text

export default Card
