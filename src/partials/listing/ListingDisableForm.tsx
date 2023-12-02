import ZoneWarningModal from '@/components/modal/ZoneWarningModal'
import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import Button from '@turistikrota/ui/button'
import LineForm from '@turistikrota/ui/form/line'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  uuid: string
  title: string
  onOk: () => void
}

const ListingDisableForm: React.FC<Props> = ({ uuid, title, onOk }) => {
  const { t } = useTranslation('listings')
  const toast = useToast()
  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDisable = () => {
    setIsLoading(true)
    httpClient
      .patch(apiUrl(Services.Listing, `/${uuid}/disable`), null)
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
    <LineForm className='bg-second p-4 transition-colors duration-200 first:rounded-t-md last:rounded-b-md hover:bg-third'>
      <ZoneWarningModal
        inputLabel={t('detail.enable.label')}
        onCancel={() => {
          setVisible(false)
        }}
        onConfirm={handleDisable}
        subtitle={t('detail.disable.subtitle')}
        warningText={t('detail.disable.text')}
        confirmText={t('detail.disable.confirm')}
        confirmationText={t('detail.disable.confirmation')}
        text={title}
        title={t('detail.disable.title')}
        buttonText={t('detail.disable.button')}
        visible={visible}
        loading={isLoading}
      />
      <LineForm.Left>
        <LineForm.Left.Title>{t('detail.disable.title')}</LineForm.Left.Title>
        <LineForm.Left.Description>{t('detail.disable.text')}</LineForm.Left.Description>
      </LineForm.Left>
      <LineForm.Right>
        <Button
          variant='warning'
          onClick={() => {
            setVisible(true)
          }}
        >
          {t('detail.disable.button')}
        </Button>
      </LineForm.Right>
    </LineForm>
  )
}

export default ListingDisableForm
