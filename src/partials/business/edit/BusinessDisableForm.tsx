import ZoneErrorModal from '@/components/modal/ZoneErrorModal.tsx'
import { Services, apiUrl } from '@/config/services.ts'
import { httpClient } from '@/http/client.tsx'
import Button from '@turistikrota/ui/button'
import LineForm from '@turistikrota/ui/form/line'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  nickName: string
  onOk: () => void
}

const BusinessDisableForm: FC<Props> = ({ nickName, onOk }) => {
  const { t } = useTranslation('profile')
  const toast = useToast()
  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDisable = () => {
    setIsLoading(true)
    httpClient
      .patch(apiUrl(Services.Business, `/~${nickName}/disable`), null)
      .then((res) => {
        if (res.status === 200) return onOk()
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          parseApiError({
            error: err.response.data,
            toast,
          })
          return
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <LineForm className='border-b p-2 transition-colors duration-200 first:rounded-t-md last:rounded-b-md last:border-b-0 hover:bg-second'>
      <ZoneErrorModal
        inputLabel={t('activation.disable.label')}
        onCancel={() => {
          setVisible(false)
        }}
        onConfirm={handleDisable}
        subtitle={t('activation.disable.subtitle')}
        warningText={t('activation.disable.text')}
        confirmText={t('activation.disable.confirm')}
        confirmationText={t('activation.disable.confirmation')}
        buttonText={t('activation.disable.button')}
        text={nickName}
        title={t('activation.disable.title')}
        visible={visible}
        loading={isLoading}
      />
      <LineForm.Left>
        <LineForm.Left.Title>{t('activation.disable.title')}</LineForm.Left.Title>
        <LineForm.Left.Description>{t('activation.disable.text')}</LineForm.Left.Description>
      </LineForm.Left>
      <LineForm.Right>
        <Button
          variant='error'
          onClick={() => {
            setVisible(true)
          }}
        >
          {t('activation.disable.button')}
        </Button>
      </LineForm.Right>
    </LineForm>
  )
}

export default BusinessDisableForm
