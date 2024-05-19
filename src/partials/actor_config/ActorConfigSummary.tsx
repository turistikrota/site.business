import { useDayJS } from '@/utils/dayjs'
import KeyValue from '@turistikrota/ui/key-value'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  smsCount: number
  mailCount: number
  telegramCount: number
  updatedAt: string
}

const ActorConfigSummary: FC<Props> = ({ mailCount, smsCount, telegramCount, updatedAt }) => {
  const { t, i18n } = useTranslation('notifications')
  const dayjs = useDayJS(i18n.language)
  return (
    <div className='grid grid-cols-4 gap-2'>
      <div className='col-span-4 md:col-span-1'>
        <KeyValue label={t('actorConfig.summary.mail')} value={mailCount.toString()} />
      </div>
      <div className='col-span-4 md:col-span-1'>
        <KeyValue label={t('actorConfig.summary.sms')} value={smsCount.toString()} />
      </div>
      <div className='col-span-4 md:col-span-1'>
        <KeyValue label={t('actorConfig.summary.telegram')} value={telegramCount.toString()} />
      </div>
      <div className='col-span-4 md:col-span-1'>
        <KeyValue label={t('actorConfig.summary.updatedAt')} value={dayjs(updatedAt).format('DD MMMM YYYY, HH:mm')} />
      </div>
    </div>
  )
}

export default ActorConfigSummary
