import MaintenanceAlert from '@/components/MaintenanceAlert'
import MetaWrapper from '@/components/MetaWrapper'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

function InvoiceListView() {
  const { t } = useTranslation(['invoice', 'general'])
  const path = useLocation().pathname
  return (
    <MetaWrapper
      title={t('list.meta.title')}
      description={t('list.meta.description')}
      keywords={t('list.meta.keywords')}
    >
      <section className='relative space-y-4'>
        <Breadcrumb>
          <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
            {t('general:utils.breadcrumb.home')}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{t('breadcrumb.invoices')}</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <MaintenanceAlert />
    </MetaWrapper>
  )
}

export { InvoiceListView as Component }
