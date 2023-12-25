import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import FormSection from '@turistikrota/ui/form/section'
import Modal from '@turistikrota/ui/modal'
import { useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

type Props = {
  title: string
  subtitle: string
  text: string
  inputLabel: string
  inputName?: string
  confirmationText: string
  warningText: string
  loadingText: string
  buttonText: string
  confirmText: string
  loading: boolean
  visible: boolean
  variant: 'error' | 'warning'
  onConfirm: () => void
  onCancel: () => void
}

const ZoneModal: React.FC<Props> = ({
  text,
  visible,
  title,
  subtitle,
  loading,
  inputLabel,
  inputName = 'confirm-text',
  buttonText,
  confirmText,
  loadingText,
  variant,
  warningText,
  confirmationText,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation('general')
  const [firstConfirm, setFirstConfirm] = useState(false)
  const [inputText, setInputText] = useState('')
  const matched = useMemo(() => inputText === text, [inputText, text])
  return (
    <Modal open={visible} onClose={onCancel} heightClass='' widthClass='max-w-sm'>
      <Modal.Head>
        <FormSection.Head.Title>{title}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{subtitle}</FormSection.Head.Subtitle>
      </Modal.Head>
      <Modal.Body>
        <div className='flex flex-col gap-2'>
          {firstConfirm ? (
            <>
              <p>
                <Trans
                  t={t}
                  i18nKey={confirmationText}
                  components={{
                    b: <b />,
                  }}
                  values={{
                    text: text,
                  }}
                />
              </p>
              <Input
                label={inputLabel}
                name={inputName}
                autoComplete='off'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </>
          ) : (
            <>
              <p className='text-gray-600 dark:text-gray-300'>{warningText}</p>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {firstConfirm ? (
          <>
            <Button
              variant={variant}
              disabled={!matched || loading}
              onClick={() => onConfirm()}
              className='disabled:opacity-50'
            >
              {loading ? loadingText : buttonText}
            </Button>
          </>
        ) : (
          <Button variant={variant} onClick={() => setFirstConfirm(true)}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ZoneModal
