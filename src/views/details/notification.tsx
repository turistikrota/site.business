import MetaWrapper from '@/components/MetaWrapper'
import ActorConfigContainer from '@/partials/actor_config/ActorConfigContainer'
import { useTranslation } from 'react-i18next'

function BusinessshipNotificationView() {
  const { t } = useTranslation('notification')
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='container mx-auto p-2 '>
        <ActorConfigContainer />
      </section>
    </MetaWrapper>
  )
}

BusinessshipNotificationView.displayName = 'BusinessshipNotificationView'

export { BusinessshipNotificationView as Component }
