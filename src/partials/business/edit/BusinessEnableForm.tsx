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

const BusinessEnableForm: FC<Props> = ({ nickName, onOk }) => {
  const { t } = useTranslation('profile')
  const toast = useToast()
  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleEnable = () => {
    setIsLoading(true)
    httpClient
      .patch(apiUrl(Services.Business, `/~${nickName}/enable`), null)
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
        inputLabel={t('activation.enable.label')}
        onCancel={() => {
          setVisible(false)
        }}
        onConfirm={handleEnable}
        subtitle={t('activation.enable.subtitle')}
        warningText={t('activation.enable.text')}
        confirmText={t('activation.enable.confirm')}
        confirmationText={t('activation.enable.confirmation')}
        buttonText={t('activation.enable.button')}
        text={nickName}
        title={t('activation.enable.title')}
        visible={visible}
        loading={isLoading}
      />
      <LineForm.Left>
        <LineForm.Left.Title>{t('activation.enable.title')}</LineForm.Left.Title>
        <LineForm.Left.Description>{t('activation.enable.text')}</LineForm.Left.Description>
      </LineForm.Left>
      <LineForm.Right>
        <Button
          variant='error'
          onClick={() => {
            setVisible(true)
          }}
        >
          {t('activation.enable.button')}
        </Button>
      </LineForm.Right>
    </LineForm>
  )
}

export default BusinessEnableForm
