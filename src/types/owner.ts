import { ListResponse } from './base'

export type OwnerListItem = {
  nickName: string
  realName: string
  avatarURL: string
  coverURL: string
  ownerType: OwnerType
  isVerified: boolean
  isEnabled: boolean
  isDeleted: boolean
  updatedAt: string
}

export type OwnerUser = {
  uuid: string
  name: string
  roles: string[]
  joinAt: string
}

export type OwnerDetail = {
  owner: OwnerListItem
  user: OwnerUser
}

export type OwnerUserListItem = {
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
  ownerNickName: string
  email: string
  isDeleted: boolean
  isUsed: boolean
  uuid: string
  createdAt: string
  updatedAt: string
}

export type OwnerListResponse = ListResponse<OwnerListItem>

export type MustSelectResponse = {
  mustSelect: boolean
}

export type AccountErrorResponse = {
  accountNotFound: boolean
  accountSelectRequired: boolean
}

export type OwnerErrorResponse = {
  ownerNotFound: boolean
  ownerSelectRequired: boolean
}

type OwnerType = 'individual' | 'corporation'

export function isOwnerListResponse(data: any): data is OwnerListResponse {
  return (
    typeof data === 'object' &&
    Array.isArray(data.list) &&
    data.list.every(isOwnerListItem) &&
    typeof data.count === 'number'
  )
}

export function isOwnerDetail(data: any): data is OwnerDetail {
  return (
    typeof data === 'object' &&
    isOwnerListItem(data.owner) &&
    typeof data.user === 'object' &&
    typeof data.user.uuid === 'string' &&
    typeof data.user.name === 'string' &&
    Array.isArray(data.user.roles) &&
    data.user.roles.every((role: any) => typeof role === 'string') &&
    typeof data.user.joinAt === 'string'
  )
}

export function isOwnerListItem(data: any): data is OwnerListItem {
  return (
    typeof data === 'object' &&
    typeof data.nickName === 'string' &&
    typeof data.realName === 'string' &&
    typeof data.ownerType === 'string' &&
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

export function isOwnerUserListResponse(data: any): data is OwnerUserListItem[] {
  return Array.isArray(data) && data.every(isOwnerUserListItem)
}

export function isOwnerUserListItem(data: any) {
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
