import ZoneErrorModal from '@/components/modal/ZoneErrorModal.tsx'
import { Services, apiUrl } from '@/config/services.ts'
import { httpClient } from '@/http/client.tsx'
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

const ListingRestoreForm: React.FC<Props> = ({ uuid, title, onOk }) => {
  const { t } = useTranslation('listings')
  const toast = useToast()
  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleRestore = () => {
    setIsLoading(true)
    httpClient
      .patch(apiUrl(Services.Listing, `/${uuid}/restore`))
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
      <ZoneErrorModal
        inputLabel={t('detail.restore.label')}
        onCancel={() => {
          setVisible(false)
        }}
        onConfirm={handleRestore}
        subtitle={t('detail.restore.subtitle')}
        warningText={t('detail.restore.text')}
        text={title}
        title={t('detail.restore.title')}
        visible={visible}
        loading={isLoading}
      />
      <LineForm.Left>
        <LineForm.Left.Title>{t('detail.restore.title')}</LineForm.Left.Title>
        <LineForm.Left.Description>{t('detail.restore.text')}</LineForm.Left.Description>
      </LineForm.Left>
      <LineForm.Right>
        <Button
          variant='error'
          onClick={() => {
            setVisible(true)
          }}
        >
          {t('detail.restore.button')}
        </Button>
      </LineForm.Right>
    </LineForm>
  )
}

export default ListingRestoreForm
