import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { ActorConfig, ChannelType } from '@/types/notify'
import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import KeyValue from '@turistikrota/ui/key-value'
import ContentLoader from '@turistikrota/ui/loader'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ActorConfigActionCard from './ActorConfigActionCard'
import ActorConfigCreateModal from './ActorConfigCreateModal'
import ActorConfigDeleteModal from './ActorConfigDeleteModal'
import ActorConfigEditModal from './ActorConfigEditModal'
import ActorConfigSummary from './ActorConfigSummary'

type DeleteModal = {
  visible: boolean
  name: string
  type: ChannelType
}

type EditModal = {
  visible: boolean
  name: string
  type: ChannelType
  chatId?: string
  email?: string
  phone?: string
}

const ActorConfigContainer: FC = () => {
  const { t } = useTranslation('notifications')
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const [config, setConfig] = useState<ActorConfig | null>(null)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [deleteModal, setDeleteModal] = useState<DeleteModal | null>(null)
  const [editModal, setEditModal] = useState<EditModal | null>({
    visible: false,
    name: '',
    type: ChannelType.Mail,
  })

  const fetchConfig = () => {
    httpClient
      .get(apiUrl(Services.Notify, `/business`))
      .then((res) => {
        if (res.status === 200) {
          setConfig(res.data)
        }
      })
      .catch((err) => {
        parseApiError({
          error: err?.response?.data,
          toast,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onNewConfig = () => {
    setCreateModalVisible(true)
  }

  const onDelete = (name: string, type: ChannelType) => {
    setDeleteModal({ visible: true, name, type })
  }

  const onEdit = (name: string, type: ChannelType, params: { chatId?: string; email?: string; phone?: string }) => {
    setEditModal({ visible: true, name, type, ...params })
  }

  useEffect(() => {
    fetchConfig()
  }, [])
  return (
    <section className='flex flex-col gap-4'>
      {createModalVisible && (
        <ActorConfigCreateModal
          open={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onOk={() => {
            setCreateModalVisible(false)
            fetchConfig()
          }}
        />
      )}
      <ActorConfigDeleteModal
        open={deleteModal?.visible ?? false}
        name={deleteModal?.name ?? ''}
        type={deleteModal?.type ?? ChannelType.Mail}
        onClose={() => setDeleteModal(null)}
        onOk={() => {
          setDeleteModal(null)
          fetchConfig()
        }}
      />
      <ActorConfigEditModal
        open={editModal?.visible || false}
        name={editModal?.name || ''}
        type={editModal?.type || ChannelType.Mail}
        chatId={editModal?.chatId || ''}
        email={editModal?.email || ''}
        phone={editModal?.phone || ''}
        onClose={() => setEditModal(null)}
        onOk={() => {
          setEditModal(null)
          fetchConfig()
        }}
      />

      <div className='flex items-center justify-end'>
        <Button onClick={onNewConfig} block={false}>
          {t('actorConfig.new')}
        </Button>
      </div>
      <div className='grid grid-cols-12 gap-2'>
        {isLoading || !config ? (
          <div className='col-span-12'>
            <ContentLoader noMargin />
          </div>
        ) : (
          <>
            <div className='col-span-12'>
              <ActorConfigSummary
                mailCount={config.mail.length}
                smsCount={config.sms.length}
                telegramCount={config.telegram.length}
                updatedAt={config.updatedAt}
              />
            </div>
            <div className='col-span-12'>
              <h3 className='text-lg font-semibold'>{t('actorConfig.mail.title')}</h3>
              <div className='mt-2 grid grid-cols-3 gap-2'>
                {config.mail.length === 0 && (
                  <Alert type='info' showIcon className='col-span-3'>
                    <Alert.Title>{t('actorConfig.mail.empty.title')}</Alert.Title>
                    <Alert.Description>{t('actorConfig.mail.empty.description')}</Alert.Description>
                  </Alert>
                )}
                {config.mail.map((mail, idx) => (
                  <ActorConfigActionCard
                    key={idx}
                    onEdit={() => onEdit(mail.name, ChannelType.Mail, { email: mail.email })}
                    text={mail.email}
                    onDelete={() => onDelete(mail.name, ChannelType.Mail)}
                  >
                    <KeyValue label={mail.name} value={mail.email} />
                  </ActorConfigActionCard>
                ))}
              </div>
            </div>
            <div className='col-span-12'>
              <h3 className='text-lg font-semibold'>{t('actorConfig.sms.title')}</h3>
              <div className='mt-2 grid grid-cols-3 gap-2'>
                {config.sms.length === 0 && (
                  <Alert type='info' showIcon className='col-span-3'>
                    <Alert.Title>{t('actorConfig.sms.empty.title')}</Alert.Title>
                    <Alert.Description>{t('actorConfig.sms.empty.description')}</Alert.Description>
                  </Alert>
                )}
                {config.sms.map((sms, idx) => (
                  <ActorConfigActionCard
                    key={idx}
                    onEdit={() => onEdit(sms.name, ChannelType.Sms, { phone: sms.countryCode + sms.phone })}
                    text={sms.countryCode + sms.phone}
                    onDelete={() => onDelete(sms.name, ChannelType.Sms)}
                  >
                    <KeyValue label={sms.name} value={sms.countryCode + sms.phone} />
                  </ActorConfigActionCard>
                ))}
              </div>
            </div>
            <div className='col-span-12'>
              <h3 className='text-lg font-semibold'>{t('actorConfig.telegram.title')}</h3>
              <div className='mt-2 grid grid-cols-3 gap-2'>
                {config.telegram.length === 0 && (
                  <Alert type='info' showIcon className='col-span-3'>
                    <Alert.Title>{t('actorConfig.telegram.empty.title')}</Alert.Title>
                    <Alert.Description>{t('actorConfig.telegram.empty.description')}</Alert.Description>
                  </Alert>
                )}
                {config.telegram.map((telegram, idx) => (
                  <ActorConfigActionCard
                    key={idx}
                    onEdit={() => onEdit(telegram.name, ChannelType.Telegram, { chatId: telegram.chatId })}
                    text={telegram.chatId}
                    onDelete={() => onDelete(telegram.name, ChannelType.Telegram)}
                  >
                    <KeyValue label={telegram.name} value={telegram.chatId} />
                  </ActorConfigActionCard>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ActorConfigContainer
