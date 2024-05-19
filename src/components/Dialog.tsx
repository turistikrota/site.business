import Button from '@turistikrota/ui/button'
import Modal from '@turistikrota/ui/modal'
import type { ButtonVariant } from '@turistikrota/ui/types'

type Props = {
  title: string
  message: string
  open: boolean
  variant?: ButtonVariant
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onClose: () => void
}

export default function Dialog({
  title,
  message,
  open,
  variant = 'primary',
  cancelText = 'Vazgeç',
  confirmText = 'Onayla',
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal open={open} onClose={onClose} heightClass='' widthClass='max-w-sm'>
      <Modal.Head>
        <h2 className={`text-left text-xl font-bold text-gray-900 dark:text-gray-200 lg:block`}>{title}</h2>
      </Modal.Head>
      <Modal.Body>
        <p className={`text-md text-left text-gray-600 dark:text-gray-400 lg:block`}>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='gray' onClick={onClose} block={false}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={onConfirm} block={false}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
