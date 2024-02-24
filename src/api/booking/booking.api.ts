import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { BookingFilter, toFilterQuery } from '@/types/booking'
import { ListResponse } from '@turistikrota/ui/types'

/*
        {
            "uuid": "659d63d3ec7e977930faee7f",
            "listingUUID": "656ce75a5ee32899f9f0b281",
            "people": {
                "adult": 2,
                "kid": 0,
                "baby": 0
            },
            "user": {
                "uuid": "656a704daa69e7fe126a20a4",
                "name": "test"
            },
            "listing": {
                "title": "Perfect tiny house overlooking the lake in Sapanca",
                "slug": "perfect-tiny-house-overlooking-the-lake-in-sapanca",
                "description": "asdsadasd",
                "businessName": "ssi-motel",
                "cityName": "İstanbul",
                "districtName": "Beyoğlu",
                "countryName": "Türkiye",
                "images": [
                    {
                        "url": "https://s3.turistikrota.com/img/sapanca-da-gol-goren-mukemmel-tiny-house-c9e56fe4.webp",
                        "order": 1
                    }
                ]
            },
            "guests": [],
            "state": "pay_expired",
            "isPublic": false,
            "price": 25000,
            "currency": "",
            "startDate": "2024-01-28T00:00:00Z",
            "endDate": "2024-01-29T00:00:00Z",
            "createdAt": "2024-01-09T15:18:43.731Z"
        },
*/

export type BookingPeople = {
  adult: number
  kid: number
  baby: number
}

export type BookingUser = {
  uuid: string
  name: string
}

export type BookingListing = {
  title: string
  slug: string
  description: string
  businessName: string
  cityName: string
  districtName: string
  countryName: string
  images: BookingImage[]
}

export type BookingImage = {
  url: string
  order: number
}

export type BookingGuest = {
  uuid: string
  name: string
  isPublic: boolean
}

export type BookingListItem = {
  uuid: string
  listingUUID: string
  people: BookingPeople
  user: BookingUser
  listing: BookingListing
  guests: BookingGuest[]
  state: string
  isPublic: boolean
  price: number
  currency: string
  startDate: string
  endDate: string
  createdAt: string
}

export const fetchMyBookings = async (
  page: number = 1,
  filters?: BookingFilter,
): Promise<ListResponse<BookingListItem>> => {
  let query: string = ''
  if (filters) {
    filters.page = page
    query = toFilterQuery(filters)
  } else {
    query = `page=${page}`
  }
  const res = await httpClient.get(apiUrl(Services.Booking, `/business?${query}`)).catch(() => ({
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
