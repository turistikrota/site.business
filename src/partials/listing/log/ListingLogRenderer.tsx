import { ListingLog, ListingLogActions } from '@/api/listing/listing.log.api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const ActionRendererOthers: FC<ListingLog> = (log) => {
  const { t } = useTranslation('listings')
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

const ActionRendererVerificationFailed: FC<ListingLog> = (log) => {
  const { t } = useTranslation('listings')
  if (log.action !== ListingLogActions.ValidateFail) return <ActionRendererOthers {...log} />
  return (
    <>
      <Trans t={t} i18nKey={`logs.actions.${log.action}.text`}></Trans>
      asdasdasd
    </>
  )
}

const ActionRendererVerificationSucceed: FC<ListingLog> = (log) => {
  const { t } = useTranslation('listings')
  if (log.action !== ListingLogActions.ValidateSuccess) return <ActionRendererOthers {...log} />
  return (
    <>
      <Trans t={t} i18nKey={`logs.actions.${log.action}.text`}></Trans>
    </>
  )
}

const Renderers: Record<ListingLogActions, FC<ListingLog>> = {
  [ListingLogActions.ValidateFail]: ActionRendererVerificationFailed,
  [ListingLogActions.ValidateSuccess]: ActionRendererVerificationSucceed,
  [ListingLogActions.Create]: ActionRendererOthers,
  [ListingLogActions.Update]: ActionRendererOthers,
  [ListingLogActions.Delete]: ActionRendererOthers,
  [ListingLogActions.Restore]: ActionRendererOthers,
  [ListingLogActions.Enable]: ActionRendererOthers,
  [ListingLogActions.Disable]: ActionRendererOthers,
  [ListingLogActions.ReOrder]: ActionRendererOthers,
}

const ListingLogRenderer: FC<ListingLog> = (log) => {
  const Renderer = Renderers[log.action]
  return <Renderer {...log} />
}

export default ListingLogRenderer
