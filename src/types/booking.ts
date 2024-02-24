export type BookingFilter = {
  q?: string
  state?: BookingStatus
  page?: number
}

export enum BookingStatus {
  Canceled = 'canceled',
  NotValid = 'not_valid',
  Created = 'created',
  PayExpired = 'pay_expired',
  PayCancelled = 'pay_cancelled',
  PayPending = 'pay_pending',
  PayPaid = 'pay_paid',
  PayRefunded = 'pay_refunded',
}

export const PayableStatus: BookingStatus[] = [
  BookingStatus.PayExpired,
  BookingStatus.PayCancelled,
  BookingStatus.PayPending,
  BookingStatus.PayPaid,
  BookingStatus.PayRefunded,
] as const

export const CancellableStatus: BookingStatus[] = [
  BookingStatus.Created,
  BookingStatus.PayExpired,
  BookingStatus.PayPending,
] as const

export const AllStatus: BookingStatus[] = [
  BookingStatus.Canceled,
  BookingStatus.NotValid,
  BookingStatus.Created,
  BookingStatus.PayExpired,
  BookingStatus.PayCancelled,
  BookingStatus.PayPending,
  BookingStatus.PayPaid,
  BookingStatus.PayRefunded,
] as const

export function isBookingStatus(value: string): value is BookingStatus {
  return Object.values(BookingStatus).includes(value as BookingStatus)
}

export function toFilterQuery(query: BookingFilter): string {
  return decodeURIComponent(
    Object.entries(query)
      .filter(([_, val]) => !!val)
      .map(([key, value]) => `${key}=${value}`)
      .join('&'),
  )
}

export function getQueryFromSearchParams(searchParams: URLSearchParams): BookingFilter {
  const query: BookingFilter = {
    page: 1,
  }
  const q = searchParams.get('q')
  if (!!q && typeof q === 'string' && q.length > 0) {
    query.q = q
  }
  if (searchParams.has('state') && isBookingStatus(searchParams.get('state')!)) {
    query.state = searchParams.get('state') as BookingStatus
  }
  return query
}
