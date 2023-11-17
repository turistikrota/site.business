import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { Coordinates, I18nTranslation, ListResponse } from '@turistikrota/ui/types'

export type PostImage = {
  url: string
  order: number
}

export type PostTranslation = {
  title: string
  description: string
  slug: string
}

export type PostLocation = {
  country: string
  city: string
  street: string
  address: string
  isStrict: boolean
  coordinates: Coordinates
}

export type PostBoost = {
  // TODO: add boost type
}

export type PostListItem = {
  uuid: string
  images: PostImage[]
  meta: I18nTranslation<PostTranslation>
  location: PostLocation
  boosts: PostBoost[] | null
  order: number | null
  isActive: boolean
  isDeleted: boolean
  isValid: boolean
  createdAt: string
}

export const fetchMyPosts = async (page: number = 1, limit: number = 10): Promise<ListResponse<PostListItem>> => {
  const res = await httpClient.get(apiUrl(Services.Post, `/owner?page=${page}&limit=${limit}`)).catch(() => ({
    data: {
      list: [],
      total: 0,
      filteredTotal: 0,
      page: 0,
      isNext: false,
      isPrev: false,
    },
  }))
  return res.data
}
