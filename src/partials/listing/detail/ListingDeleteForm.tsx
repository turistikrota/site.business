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

const ListingDeleteForm: React.FC<Props> = ({ uuid, title, onOk }) => {
  const { t } = useTranslation('listings')
  const toast = useToast()
  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = () => {
    setIsLoading(true)
    httpClient
      .delete(apiUrl(Services.Listing, `/${uuid}`))
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
        inputLabel={t('detail.delete.label')}
        onCancel={() => {
          setVisible(false)
        }}
        onConfirm={handleDelete}
        subtitle={t('detail.delete.subtitle')}
        warningText={t('detail.delete.text')}
        text={title}
        title={t('detail.delete.title')}
        visible={visible}
        loading={isLoading}
      />
      <LineForm.Left>
        <LineForm.Left.Title>{t('detail.delete.title')}</LineForm.Left.Title>
        <LineForm.Left.Description>{t('detail.delete.text')}</LineForm.Left.Description>
      </LineForm.Left>
      <LineForm.Right>
        <Button
          variant='error'
          onClick={() => {
            setVisible(true)
          }}
        >
          {t('detail.delete.button')}
        </Button>
      </LineForm.Right>
    </LineForm>
  )
}

export default ListingDeleteForm
