import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { ListResponse } from '@turistikrota/ui/types'
import { ListingDetails } from './listing.api'

export enum ListingLogActions {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
  Disable = 'disable',
  Enable = 'enable',
  ReOrder = 'reorder',
  Restore = 'restore',
  ValidateSuccess = 'validate_success',
  ValidateFail = 'validate_fail',
}

export enum ListingLogTypes {
  Direct = 'direct',
  Started = 'started',
  Stopped = 'stopped',
}

export type ListingError = {
  field: string
  message: string
  params: any
}

type ListingUser = {
  uuid: string
  name: string
}

export type ListingActionCreated = {
  user: ListingUser
  action: ListingLogActions.Create
  type: ListingLogTypes.Direct
  listings: []
  errors: []
}

export type ListingActionUpdated = {
  user: ListingUser
  type: ListingLogTypes.Started
  action: ListingLogActions.Update
  listings: [ListingDetails, ListingDetails]
  errors: []
}

export type ListingActionOthers = {
  user: ListingUser
  action: ListingLogActions
  type: ListingLogTypes.Direct
  listings: []
  errors: []
}

export type ListingActionVerificationFailed = {
  user: null
  action: ListingLogActions.ValidateFail
  type: ListingLogTypes.Stopped
  listings: [ListingDetails]
  errors: ListingError[]
}

export type ListingActionVerificationSucceed = {
  user: null
  action: ListingLogActions.ValidateSuccess
  type: ListingLogTypes.Stopped
  listings: [ListingDetails]
  errors: []
}

export type ListingLog = {
  id: string
  businessNickName: string
  listingUUID: string
  datetime: string
} & (
  | ListingActionCreated
  | ListingActionUpdated
  | ListingActionOthers
  | ListingActionVerificationFailed
  | ListingActionVerificationSucceed
)

export const fetchListingLogs = async (
  uuid: string,
  page: number,
  limit: number,
): Promise<ListResponse<ListingLog>> => {
  const res = await httpClient
    .get(apiUrl(Services.ListingLog, `/${uuid}?page=${page}&limit=${limit}`))
    .catch(() => ({ data: undefined }))
  if (res.data) {
    res.data.list = (res.data.list || []).map((r: any) => ({
      ...r,
      data: r.data ? jsonArrayToObject(r.data) : null,
    }))
  }
  return res.data
}
