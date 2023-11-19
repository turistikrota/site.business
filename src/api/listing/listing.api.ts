import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { Coordinates, I18nTranslation, ListResponse } from '@turistikrota/ui/types'

export type ListingImage = {
  url: string
  order: number
}

export type ListingTranslation = {
  title: string
  description: string
  slug: string
}

export type ListingLocation = {
  country: string
  city: string
  street: string
  address: string
  isStrict: boolean
  coordinates: Coordinates
}

export type ListingBoost = {
  // TODO: add boost type
}

export type ListingListItem = {
  uuid: string
  images: ListingImage[]
  meta: I18nTranslation<ListingTranslation>
  location: ListingLocation
  boosts: ListingBoost[] | null
  order: number | null
  isActive: boolean
  isDeleted: boolean
  isValid: boolean
  createdAt: string
}

export const fetchMyListings = async (page: number = 1, limit: number = 10): Promise<ListResponse<ListingListItem>> => {
  const res = await httpClient.get(apiUrl(Services.Listing, `/business?page=${page}&limit=${limit}`)).catch(() => ({
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

export const reorderListing = async (uuid: string, order: number): Promise<void> => {
  await httpClient.patch(apiUrl(Services.Listing, `/business/${uuid}/re-order`), { order }).catch(() => {})
}
