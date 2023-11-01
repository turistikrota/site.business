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

export type OwnerListResponse = ListResponse<OwnerListItem>

export type MustSelectResponse = {
  mustSelect: boolean
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
    typeof data.avatarURL === 'string' &&
    typeof data.coverURL === 'string' &&
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
