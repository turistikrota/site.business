import { BusinessLog, BusinessLogActions } from '@/api/business/business.log.api.ts'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const BasicRenderer: FC<BusinessLog> = (log) => {
  const { t } = useTranslation('business')
  return (
    <>
      <Trans
        t={t}
        i18nKey={`logs.actions.${log.action}.text`}
        values={{
          userName: log.user?.name,
        }}
      >
        <span className='font-semibold text-primary'>@{log.user?.name}</span>
      </Trans>
    </>
  )
}

const UserRemovedRenderer: FC<BusinessLog> = (log) => {
  const { t } = useTranslation('business')
  if (log.action !== BusinessLogActions.BusinessUserRemoved) return <BasicRenderer {...log} />
  return (
    <>
      <Trans
        t={t}
        i18nKey={`logs.actions.${log.action}.text`}
        values={{
          creator: log.user.name,
          userName: log.data.userName,
        }}
      >
        <span className='font-semibold text-primary'>@{log.user.name}</span>
        <span className='font-semibold text-secondary'>@{log.data.userName}</span>
      </Trans>
    </>
  )
}

const AdminRejectedRenderer: FC<BusinessLog> = (log) => {
  const { t } = useTranslation('business')
  if (log.action !== BusinessLogActions.BusinessRejected) return <BasicRenderer {...log} />
  return (
    <>
      <Trans
        t={t}
        i18nKey={`logs.actions.${log.action}.text`}
        values={{
          reason: log.data.reason,
        }}
      >
        <span className='font-semibold text-red-500 dark:text-red-400'>{log.data.reason}</span>
      </Trans>
    </>
  )
}

const PermissionRenderer: FC<BusinessLog> = (log) => {
  const { t } = useTranslation(['business', 'permissions'])
  if (log.action !== BusinessLogActions.BusinessPermAdded && log.action !== BusinessLogActions.BusinessPermRemoved)
    return <BasicRenderer {...log} />
  return (
    <>
      <Trans
        t={t}
        i18nKey={`business:logs.actions.${log.action}.text`}
        values={{
          creator: log.user.name,
          userName: log.data.userName,
          permission: t(`permissions:roles.${log.data.permission}.title`),
          permissionModule: t(`permissions:titles.${log.data.permission.split('.')[0]}`),
        }}
      >
        <span className='font-semibold text-primary'>@{log.user.name}</span>
        <span className='font-semibold text-secondary'>@{log.data.userName}</span>
        <span className='font-semibold text-primary'>@{log.data.permission.split('.')[0]}</span>
        <span className='font-semibold text-primary'>@{log.data.permission}</span>
      </Trans>
    </>
  )
}

const InviteCreatedRenderer: FC<BusinessLog> = (log) => {
  const { t } = useTranslation(['business', 'permissions'])
  if (log.action !== BusinessLogActions.InviteCreated) return <BasicRenderer {...log} />
  return (
    <>
      <Trans
        t={t}
        i18nKey={`business:logs.actions.${log.action}.text`}
        values={{
          creator: log.user.name,
          email: log.data.email,
        }}
      >
        <span className='font-semibold text-primary'>@{log.user.name}</span>
        <span className='font-semibold text-secondary'>{log.data.email}</span>
      </Trans>
    </>
  )
}

const InviteDeletedRenderer: FC<BusinessLog> = (log) => {
  const { t } = useTranslation(['business', 'permissions'])
  if (log.action !== BusinessLogActions.InviteDeleted) return <BasicRenderer {...log} />
  return (
    <>
      <Trans
        t={t}
        i18nKey={`business:logs.actions.${log.action}.text`}
        values={{
          deletedUser: log.user.name,
          userName: log.data.userName,
        }}
      >
        <span className='font-semibold text-primary'>@{log.user.name}</span>
        <span className='font-semibold text-secondary'>@{log.data.userName}</span>
      </Trans>
    </>
  )
}

const InviteUsedRenderer: FC<BusinessLog> = (log) => {
  const { t } = useTranslation(['business', 'permissions'])
  if (log.action !== BusinessLogActions.InviteUsed) return <BasicRenderer {...log} />
  return (
    <>
      <Trans
        t={t}
        i18nKey={`business:logs.actions.${log.action}.text`}
        values={{
          userName: log.data.userName,
          email: log.data.userEmail,
        }}
      >
        <span className='font-semibold text-primary'>@{log.data.userName}</span>
        <span className='font-semibold text-secondary'>{log.data.userEmail}</span>
      </Trans>
    </>
  )
}

const Renderers: Record<BusinessLogActions, FC<BusinessLog>> = {
  [BusinessLogActions.BusinessCreated]: BasicRenderer,
  [BusinessLogActions.InviteCreated]: InviteCreatedRenderer,
  [BusinessLogActions.InviteDeleted]: InviteDeletedRenderer,
  [BusinessLogActions.InviteUsed]: InviteUsedRenderer,
  [BusinessLogActions.BusinessDeleted]: BasicRenderer,
  [BusinessLogActions.BusinessRecovered]: BasicRenderer,
  [BusinessLogActions.BusinessDisabled]: BasicRenderer,
  [BusinessLogActions.BusinessEnabled]: BasicRenderer,
  [BusinessLogActions.BusinessRejected]: AdminRejectedRenderer,
  [BusinessLogActions.BusinessVerified]: BasicRenderer,
  [BusinessLogActions.BusinessUserRemoved]: UserRemovedRenderer,
  [BusinessLogActions.BusinessPermRemoved]: PermissionRenderer,
  [BusinessLogActions.BusinessPermAdded]: PermissionRenderer,
}

const RenderLogDetails: FC<BusinessLog> = (log) => {
  const Renderer = Renderers[log.action]
  return <Renderer {...log} />
}

export default RenderLogDetails
