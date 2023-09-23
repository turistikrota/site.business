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
export type OwnerListResponse = ListResponse<OwnerListItem>

type OwnerType = 'individual' | 'corporation'

export function isOwnerListResponse(data: any): data is OwnerListResponse {
  return (
    typeof data === 'object' &&
    Array.isArray(data.list) &&
    data.list.every(isOwnerListItem) &&
    typeof data.count === 'number'
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
