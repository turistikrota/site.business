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

const ListingEnableForm: React.FC<Props> = ({ uuid, title, onOk }) => {
  const { t } = useTranslation('listings')
  const toast = useToast()
  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleEnable = () => {
    setIsLoading(true)
    httpClient
      .patch(apiUrl(Services.Listing, `/${uuid}/enable`), null)
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
    <>
      <ZoneWarningModal
        inputLabel={t('detail.enable.label')}
        onCancel={() => {
          setVisible(false)
        }}
        onConfirm={handleEnable}
        subtitle={t('detail.enable.subtitle')}
        warningText={t('detail.enable.text')}
        confirmText={t('detail.enable.confirm')}
        confirmationText={t('detail.enable.confirmation')}
        buttonText={t('detail.enable.button')}
        text={title}
        title={t('detail.enable.title')}
        visible={visible}
        loading={isLoading}
      />
      <LineForm className='rounded-t-md bg-second p-4 transition-colors duration-200 hover:bg-third'>
        <LineForm.Left>
          <LineForm.Left.Title>{t('detail.enable.title')}</LineForm.Left.Title>
          <LineForm.Left.Description>{t('detail.enable.text')}</LineForm.Left.Description>
        </LineForm.Left>
        <LineForm.Right>
          <Button
            variant='warning'
            onClick={() => {
              setVisible(true)
            }}
          >
            {t('detail.enable.button')}
          </Button>
        </LineForm.Right>
      </LineForm>
    </>
  )
}

export default ListingEnableForm
