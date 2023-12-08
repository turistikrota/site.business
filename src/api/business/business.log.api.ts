import { apiUrl, Services } from '@/config/services.ts'
import { httpClient } from '@/http/client.tsx'
import { ListResponse } from '@turistikrota/ui/types'

export enum BusinessLogActions {
  InviteCreated = 'invite_created',
  InviteDeleted = 'invite_deleted',
  InviteUsed = 'invite_used',
  BusinessCreated = 'business_created',
  BusinessDeleted = 'business_deleted',
  BusinessDisabled = 'business_disabled',
  BusinessEnabled = 'business_enabled',
  BusinessPermAdded = 'business_perm_added',
  BusinessPermRemoved = 'business_perm_removed',
  BusinessRecovered = 'business_recovered',
  BusinessRejected = 'business_rejected',
  BusinessVerified = 'business_verified',
  BusinessUserRemoved = 'business_user_removed',
}

export type PermissionData = {
  permission: string
  userName: string
}

export type UserData = {
  uuid: string
  name: string
}

export type BusinessActionCreated = {
  action: BusinessLogActions.BusinessCreated
  user: UserData
  data: null
  isAdminAction: false
}

export type BusinessActionDeleted = {
  action: BusinessLogActions.BusinessDeleted
  user: null
  data: null
  isAdminAction: true
}

export type BusinessActionRecovered = {
  action: BusinessLogActions.BusinessRecovered
  user: null
  data: null
  isAdminAction: true
}

export type BusinessActionDisabled = {
  action: BusinessLogActions.BusinessDisabled
  user: UserData
  data: null
  isAdminAction: false
}

export type BusinessActionEnabled = {
  action: BusinessLogActions.BusinessEnabled
  user: UserData
  data: null
  isAdminAction: false
}

export type BusinessActionPermAdded = {
  action: BusinessLogActions.BusinessPermAdded
  user: UserData
  data: PermissionData
  isAdminAction: false
}

export type BusinessActionPermRemoved = {
  action: BusinessLogActions.BusinessPermRemoved
  user: UserData
  data: PermissionData
  isAdminAction: false
}

export type BusinessActionRejected = {
  action: BusinessLogActions.BusinessRejected
  user: null
  data: {
    reason: string
  }
  isAdminAction: true
}

export type BusinessActionVerified = {
  action: BusinessLogActions.BusinessVerified
  user: null
  data: null
  isAdminAction: true
}

export type BusinessActionUserRemoved = {
  action: BusinessLogActions.BusinessUserRemoved
  user: UserData
  data: {
    userName: string
  }
  isAdminAction: false
}

export type BusinessActionInviteCreated = {
  action: BusinessLogActions.InviteCreated
  user: UserData
  data: {
    email: string
    inviteUUID: string
    businessName: string
  }
  isAdminAction: false
}

export type BusinessActionInviteDeleted = {
  action: BusinessLogActions.InviteDeleted
  user: UserData
  data: {
    inviteUUID: string
    userName: string
  }
  isAdminAction: false
}

export type BusinessActionInviteUsed = {
  action: BusinessLogActions.InviteUsed
  user: UserData
  data: {
    inviteUUID: string
    userName: string
    userEmail: string
  }
  isAdminAction: false
}

export type BusinessLog = {
  id: string
  businessNickName: string
  note: string
  datetime: string
} & (
  | BusinessActionCreated
  | BusinessActionDeleted
  | BusinessActionRecovered
  | BusinessActionDisabled
  | BusinessActionEnabled
  | BusinessActionPermAdded
  | BusinessActionPermRemoved
  | BusinessActionRejected
  | BusinessActionVerified
  | BusinessActionUserRemoved
  | BusinessActionInviteCreated
  | BusinessActionInviteDeleted
  | BusinessActionInviteUsed
)

export const fetchMyBusinessLogs = async (page: number, limit: number): Promise<ListResponse<BusinessLog>> => {
  const res = await httpClient
    .get(apiUrl(Services.BusinessLog, `/?page=${page}&limit=${limit}`))
    .catch(() => ({ data: undefined }))
  if (res.data) {
    res.data.list = (res.data.list || []).map((r: any) => ({
      ...r,
      data: r.data ? jsonArrayToObject(r.data) : null,
    }))
  }
  return res.data
}
