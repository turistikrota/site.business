import ZoneErrorModal from '@/components/modal/ZoneErrorModal'
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
  onOk: () => void
}

const ListingDeleteForm: React.FC<Props> = ({ uuid, onOk }) => {
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
    <>
      <ZoneErrorModal
        inputLabel='saa'
        onCancel={() => {
          setVisible(false)
        }}
        onConfirm={handleDelete}
        subtitle='subtitle'
        text={t('detail.delete.text')}
        title={t('detail.delete.title')}
        visible={visible}
        loading={isLoading}
      />
      <LineForm className='rounded-b-md bg-second p-4 transition-colors duration-200 hover:bg-third'>
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
    </>
  )
}

export default ListingDeleteForm
