import Button from '@turistikrota/ui/button'
import { useToast } from '@turistikrota/ui/toast'
import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  text: string
  onEdit: () => void
  onDelete: () => void
}

const ActorConfigActionCard: FC<PropsWithChildren<Props>> = ({ children, text, onEdit, onDelete }) => {
  const { t } = useTranslation('notifications')
  const toast = useToast()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    toast.success(t('actorConfig.tools.copied'))
  }
  return (
    <div className='group relative col-span-3 md:col-span-1'>
      {children}
      <div className='absolute right-2 top-2 flex gap-1 bg-default transition-all duration-200 md:hidden md:group-hover:flex'>
        <Button
          onClick={copyToClipboard}
          variant='glass'
          block={false}
          className='flex items-center justify-center gap-1 rounded-md p-2'
          title={t('actorConfig.tools.copy')}
        >
          <i className='bx bx-copy text-xl' />
        </Button>
        <Button
          onClick={onEdit}
          variant='glass'
          block={false}
          className='flex items-center justify-center gap-1 rounded-md p-2'
          title={t('actorConfig.tools.edit')}
        >
          <i className='bx bx-edit text-xl' />
        </Button>
        <Button
          onClick={onDelete}
          variant='glass'
          block={false}
          className='flex items-center justify-center gap-1 rounded-md p-2'
          title={t('actorConfig.tools.delete')}
        >
          <i className='bx bx-trash text-xl' />
        </Button>
      </div>
    </div>
  )
}

export default ActorConfigActionCard
