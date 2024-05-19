import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useActorConfigSchema } from '@/schemas/actor-config.schema'
import { ActorConfigForm, ChannelType } from '@/types/notify'
import { trimAllSpaces } from '@/utils/string'
import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import FormSection from '@turistikrota/ui/form/section'
import Select from '@turistikrota/ui/form/select'
import Modal from '@turistikrota/ui/modal'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin'
import { MailForm, SmsForm, TelegramForm } from './ActorConfigChannelForm'

type Props = {
  open: boolean
  name: string
  type: ChannelType
  chatId?: string
  email?: string
  phone?: string
  onClose: () => void
  onOk: () => void
}

const ActorConfigEditModal: FC<Props> = ({ open, name, type, chatId, email, phone, onClose, onOk }) => {
  const { t } = useTranslation('notifications')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const schema = useActorConfigSchema()
  const form = useFormik<ActorConfigForm>({
    initialValues: {
      type: type || ChannelType.Mail,
      name: name,
      chatId: chatId || undefined,
      email: email || undefined,
      phone: phone || '+90',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: (values) => {
      setIsLoading(true)
      httpClient
        .put(apiUrl(Services.Notify, `/business/config`), {
          ...values,
          credential_name: name,
          chatId: values.type === ChannelType.Telegram ? values.chatId : undefined,
          email: values.type === ChannelType.Mail ? values.email : undefined,
          phone: values.type === ChannelType.Sms ? trimAllSpaces(values.phone || '') : undefined,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(t('actorConfig.edit.success'))
            form.initialValues = form.values
            form.resetForm()
            onOk()
          }
        })
        .catch((err) => {
          if (err && err.response && err.response.data) return parseApiError({ error: err.response.data, form, toast })
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
  })

  useEffect(() => {
    form.setValues({
      type: type || ChannelType.Mail,
      name: name,
      chatId: chatId || undefined,
      email: email || undefined,
      phone: phone || '+90',
    })
  }, [open])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.handleSubmit()
  }
  return (
    <Modal open={open} onClose={onClose} widthClass='p-2 md:p-0'>
      <div>
        <Spin loading={isLoading}>
          <form onSubmit={onSubmit} className='h-full w-full'>
            <Modal.Head>
              <FormSection.Head.Title>{t('actorConfig.edit.title')}</FormSection.Head.Title>
              <FormSection.Head.Subtitle>{t('actorConfig.edit.subtitle')}</FormSection.Head.Subtitle>
            </Modal.Head>
            <Modal.Body>
              <section className='grid grid-cols-1 gap-4 pt-2'>
                <Select
                  label={t('actorConfig.form.type')}
                  ariaLabel='type'
                  autoComplete='type'
                  id='type'
                  name='type'
                  error={form.errors.type}
                  value={form.values.type}
                  onChange={form.handleChange}
                  required
                >
                  <Select.DefaultOption />
                  <option value={ChannelType.Mail}>{t('actorConfig.form.types.mail')}</option>
                  <option value={ChannelType.Sms}>{t('actorConfig.form.types.sms')}</option>
                  <option value={ChannelType.Telegram} disabled>
                    {t('actorConfig.form.types.telegram')}
                  </option>
                </Select>
                <Input
                  name='name'
                  id='name'
                  autoComplete='name'
                  ariaLabel={t('actorConfig.form.name')}
                  label={t('actorConfig.form.name')}
                  value={form.values.name}
                  error={form.errors.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
                {form.values.type === ChannelType.Mail && (
                  <MailForm email={form.values.email || ''} onChange={form.handleChange} error={form.errors.email} />
                )}
                {form.values.type === ChannelType.Sms && (
                  <>
                    <Alert type='info' showIcon className='mb-2'>
                      <Alert.Title>{t('actorConfig.form.alerts.sms.title')}</Alert.Title>
                      <Alert.Description>{t('actorConfig.form.alerts.sms.description')}</Alert.Description>
                    </Alert>
                    <SmsForm phone={form.values.phone || ''} onChange={form.handleChange} error={form.errors.phone} />
                  </>
                )}
                {form.values.type === ChannelType.Telegram && (
                  <TelegramForm
                    chatId={form.values.chatId || ''}
                    onChange={form.handleChange}
                    error={form.errors.chatId}
                  />
                )}
              </section>
            </Modal.Body>
            <Modal.Footer>
              <Button htmlType='submit'>{t('actorConfig.edit.submit')}</Button>
            </Modal.Footer>
          </form>
        </Spin>
      </div>
    </Modal>
  )
}

export default ActorConfigEditModal
