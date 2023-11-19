import { ListResponse } from './base'

export type BusinessListItem = {
  nickName: string
  realName: string
  avatarURL: string
  coverURL: string
  rejectReason?: string
  businessType: BusinessType
  isVerified: boolean
  isEnabled: boolean
  isDeleted: boolean
  updatedAt: string
}

export type BusinessUser = {
  uuid: string
  name: string
  roles: string[]
  joinAt: string
}

export type BusinessDetail = {
  business: BusinessListItem
  user: BusinessUser
}

export type BusinessUserListItem = {
  name: string
  fullName: string
  avatarUrl: string
  roles: string[]
  isVerified: boolean
  isCurrent: false
  joinAt: string
  birthDate: string
  createdAt: string
}

export type InviteItem = {
  creatorUserName: string
  businessNickName: string
  email: string
  isDeleted: boolean
  isUsed: boolean
  uuid: string
  createdAt: string
  updatedAt: string
}

export type BusinessListResponse = ListResponse<BusinessListItem>

export type MustSelectResponse = {
  mustSelect: boolean
}

export type AccountErrorResponse = {
  accountNotFound: boolean
  accountSelectRequired: boolean
}

export type BusinessErrorResponse = {
  businessNotFound: boolean
  businessSelectRequired: boolean
}

type BusinessType = 'individual' | 'corporation'

export function isBusinessListResponse(data: any): data is BusinessListResponse {
  return (
    typeof data === 'object' &&
    Array.isArray(data.list) &&
    data.list.every(isBusinessListItem) &&
    typeof data.count === 'number'
  )
}

export function isBusinessDetail(data: any): data is BusinessDetail {
  return (
    typeof data === 'object' &&
    isBusinessListItem(data.business) &&
    typeof data.user === 'object' &&
    typeof data.user.uuid === 'string' &&
    typeof data.user.name === 'string' &&
    Array.isArray(data.user.roles) &&
    data.user.roles.every((role: any) => typeof role === 'string') &&
    typeof data.user.joinAt === 'string'
  )
}

export function isBusinessListItem(data: any): data is BusinessListItem {
  return (
    typeof data === 'object' &&
    typeof data.nickName === 'string' &&
    typeof data.realName === 'string' &&
    typeof data.businessType === 'string' &&
    typeof data.isVerified === 'boolean' &&
    typeof data.isEnabled === 'boolean' &&
    typeof data.isDeleted === 'boolean' &&
    typeof data.updatedAt === 'string'
  )
}

export function isMustSelectResponse(response: unknown): response is MustSelectResponse {
  return typeof response === 'object' && response !== null && 'mustSelect' in response
}

export function isAccountErrorResponse(response: unknown): response is AccountErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'accountNotFound' in response &&
    'accountSelectRequired' in response
  )
}

export function isInviteItemListResponse(data: any): data is InviteItem[] {
  return Array.isArray(data) && data.every(isInviteItem)
}

export function isInviteItem(data: any): data is InviteItem {
  return (
    typeof data === 'object' &&
    typeof data.creatorUserName === 'string' &&
    typeof data.email === 'string' &&
    typeof data.isDeleted === 'boolean' &&
    typeof data.isUsed === 'boolean' &&
    typeof data.uuid === 'string' &&
    typeof data.createdAt === 'string'
  )
}

export function isBusinessUserListResponse(data: any): data is BusinessUserListItem[] {
  return Array.isArray(data) && data.every(isBusinessUserListItem)
}

export function isBusinessUserListItem(data: any) {
  return (
    typeof data === 'object' &&
    typeof data.name === 'string' &&
    typeof data.fullName === 'string' &&
    typeof data.avatarUrl === 'string' &&
    Array.isArray(data.roles) &&
    data.roles.every((role: any) => typeof role === 'string') &&
    typeof data.isVerified === 'boolean' &&
    typeof data.isCurrent === 'boolean' &&
    typeof data.joinAt === 'string' &&
    typeof data.birthDate === 'string' &&
    typeof data.createdAt === 'string'
  )
}
