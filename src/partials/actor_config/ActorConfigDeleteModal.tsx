import ZoneErrorModal from '@/components/modal/ZoneErrorModal'
import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { ChannelType } from '@/types/notify'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  name: string
  type: ChannelType
  open: boolean
  onClose: () => void
  onOk: () => void
}

const ActorConfigDeleteModal: FC<Props> = ({ name, type, open, onClose, onOk }) => {
  const { t } = useTranslation('notification')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleDelete = () => {
    setIsLoading(true)
    httpClient
      .patch(apiUrl(Services.Notify, `/business/config`), {
        credential_name: name,
        type: type,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(t('actorConfig.delete.success'))
          onOk()
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) return parseApiError({ error: err.response.data, toast })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <ZoneErrorModal
      inputLabel={t('actorConfig.delete.label')}
      onCancel={() => {
        onClose()
      }}
      onConfirm={handleDelete}
      subtitle={t('actorConfig.delete.subtitle')}
      warningText={t('actorConfig.delete.text')}
      confirmText={t('actorConfig.delete.confirm')}
      confirmationText={t('actorConfig.delete.confirmation')}
      buttonText={t('actorConfig.delete.button')}
      text={name}
      title={t('actorConfig.delete.title')}
      visible={open}
      loading={isLoading}
    />
  )
}

export default ActorConfigDeleteModal
