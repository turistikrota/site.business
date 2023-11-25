import { Coordinates, Locales } from '@turistikrota/ui/types'
import { findDiff } from '@turistikrota/ui/utils'

export type Price = {
  startDate: string
  endDate: string
  price: number
}

export type Prices = Price[]

type BoolRuleType = 'onlyFamily' | 'noPet' | 'noSmoke' | 'noAlcohol' | 'noParty' | 'noUnmarried' | 'noGuest'

export const BoolRules: BoolRuleType[] = [
  'onlyFamily',
  'noPet',
  'noSmoke',
  'noAlcohol',
  'noParty',
  'noUnmarried',
  'noGuest',
]

export type BoolRule = (typeof BoolRules)[number]

export type ListingFeature<T = any> = {
  categoryInputUUID: string
  value: T
  isPayed: boolean
  price: number
}

export type ListingCreateFormValues = {
  meta: {
    [key in Locales]: {
      title: string
      description: string
    }
  }
  categoryUUIDs: string[]
  location: {
    country: string
    city: string
    street: string
    address: string
    isStrict: boolean
    coordinates: Coordinates
  }
  images: string[]
  features: ListingFeature[]
  validation: {
    minAdult: number
    maxAdult?: number
    minKid?: number
    maxKid?: number
    minBaby?: number
    maxBaby?: number
    minDate?: number
    maxDate?: number
  } & {
    [key in BoolRule]: boolean
  }
  prices: Prices
}

export const EmptyListingCreateValues: ListingCreateFormValues = {
  categoryUUIDs: [],
  meta: {
    tr: {
      title: '',
      description: '',
    },
    en: {
      title: '',
      description: '',
    },
  },
  images: [],
  location: {
    address: '',
    city: '',
    coordinates: [0, 0],
    country: 'Türkiye',
    isStrict: false,
    street: '',
  },
  validation: {
    minAdult: 1,
    maxAdult: undefined,
    minKid: undefined,
    maxKid: undefined,
    minBaby: undefined,
    maxBaby: undefined,
    minDate: undefined,
    maxDate: undefined,
    onlyFamily: false,
    noPet: false,
    noSmoke: false,
    noAlcohol: false,
    noParty: false,
    noUnmarried: false,
    noGuest: false,
  },
  features: [],
  prices: [],
}

export function isListingCreateFormValues(value: any): value is ListingCreateFormValues {
  return (
    value &&
    value.meta &&
    value.meta.en &&
    value.meta.en.title &&
    value.meta.en.description &&
    value.meta.tr &&
    value.meta.tr.title &&
    value.meta.tr.description &&
    value.categoryUUIDs &&
    value.location &&
    value.location.country &&
    value.location.city &&
    value.location.street &&
    value.location.address &&
    value.location.isStrict &&
    value.location.coordinates &&
    value.images &&
    value.features &&
    value.validation &&
    typeof value.validation.minAdult !== 'undefined' &&
    typeof value.validation.onlyFamily !== 'undefined' &&
    typeof value.validation.noPet !== 'undefined' &&
    typeof value.validation.noSmoke !== 'undefined' &&
    typeof value.validation.noAlcohol !== 'undefined' &&
    typeof value.validation.noParty !== 'undefined' &&
    typeof value.validation.noUnmarried !== 'undefined' &&
    typeof value.validation.noGuest !== 'undefined' &&
    value.prices
  )
}

export function isEmptyListingCreateFormValues(values: ListingCreateFormValues): boolean {
  const { location, ...empty } = EmptyListingCreateValues
  const { location: _, ...valuesCopy } = values
  return Object.keys(findDiff(empty, valuesCopy)).length === 0
}

type ListingImage = {
  url: string
  order: number
}

export function isImages(value: any): value is ListingImage[] {
  return value && value.length && value[0].url && value[0].order
}
