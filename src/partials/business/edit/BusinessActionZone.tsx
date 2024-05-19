import { useBodyguard } from '@/hooks/permission'
import { getStaticRoute } from '@/static/page'
import { BusinessLogRoles, BusinessRoles } from '@/static/role'
import Button from '@turistikrota/ui/button'
import LineForm from '@turistikrota/ui/form/line'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  nickName: string
}

const BusinessActionZone: FC<Props> = () => {
  const { t, i18n } = useTranslation('profile')
  const bodyguard = useBodyguard()

  const isReadLogs = useMemo(() => {
    return bodyguard.check(BusinessRoles.Super, BusinessLogRoles.Super, BusinessLogRoles.List)
  }, [bodyguard])

  if (!isReadLogs) return <></>

  return (
    <section>
      <h2 className='mb-3 text-xl font-semibold'>{t('sections.action')}</h2>
      <div className='rounded-md border border-orange-200 dark:border-orange-900'>
        {isReadLogs && (
          <LineForm className='border-b p-2 transition-colors duration-200 first:rounded-t-md last:rounded-b-md last:border-b-0 hover:bg-second'>
            <LineForm.Left>
              <LineForm.Left.Title>{t('action.logs.title')}</LineForm.Left.Title>
              <LineForm.Left.Description>{t('action.logs.text')}</LineForm.Left.Description>
            </LineForm.Left>
            <LineForm.Right>
              <Link to={getStaticRoute(i18n.language).profile.logs}>
                <Button variant='warning'>{t('action.logs.button')}</Button>
              </Link>
            </LineForm.Right>
          </LineForm>
        )}
      </div>
    </section>
  )
}

export default BusinessActionZone
