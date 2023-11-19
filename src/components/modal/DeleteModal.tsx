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
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const DeleteModal: React.FC<Props> = ({
  text,
  visible,
  title,
  subtitle,
  inputLabel,
  inputName = 'confirm-text',
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation('general')
  const [firstConfirm, setFirstConfirm] = useState(false)
  const [inputText, setInputText] = useState('')
  const matched = useMemo(() => inputText === text, [inputText, text])
  return (
    <Modal open={visible} onClose={onCancel} heightClass=''>
      <Modal.Head>
        <FormSection.Head.Title>{title}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{subtitle}</FormSection.Head.Subtitle>
      </Modal.Head>
      <Modal.Body>
        <div className='flex flex-col gap-4'>
          {firstConfirm ? (
            <>
              <p>
                <Trans
                  t={t}
                  i18nKey='deletion.confirmation'
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
              <p className='text-gray-600 dark:text-gray-300'>{t('deletion.warning')}</p>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {firstConfirm ? (
          <>
            <Button variant='error' disabled={!matched} onClick={() => onConfirm()} className='disabled:opacity-50'>
              {t('deletion.delete')}
            </Button>
          </>
        ) : (
          <Button variant='error' onClick={() => setFirstConfirm(true)}>
            {t('deletion.confirm')}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
