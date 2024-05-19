import ModuleCard from '@/components/ModuleCard'
import { getStaticRoute } from '@/static/page'
import { useTranslation } from 'react-i18next'

export default function SettingsModuleList() {
  const { t, i18n } = useTranslation('settings')
  return (
    <section className='grid grid-cols-12 gap-4'>
      <ModuleCard
        icon='bx-bell'
        to={getStaticRoute(i18n.language).settings.notifications}
        text={t('modules.notifications.text')}
        title={t('modules.notifications.title')}
        className='col-span-12 md:col-span-6 lg:col-span-4'
      />
      <ModuleCard
        icon='bx-lock-alt'
        to={getStaticRoute(i18n.language).settings.privacy}
        text={t('modules.privacy.text')}
        title={t('modules.privacy.title')}
        className='col-span-12 md:col-span-6 lg:col-span-4'
      />
      <ModuleCard
        icon='bx-lock'
        to={getStaticRoute(i18n.language).settings.security}
        text={t('modules.security.text')}
        title={t('modules.security.title')}
        className='col-span-12 md:col-span-6 lg:col-span-4'
      />
    </section>
  )
}
