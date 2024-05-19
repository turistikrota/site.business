import { BookingListItem, BookingPeople } from '@/api/booking/booking.api'
import { getStaticRoute } from '@/static/page'
import { makeUserAvatar } from '@/utils/cdn'
import { useDayJS } from '@/utils/dayjs'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import BookingPriceCard from './BookingPriceCard'
import BookingStateCard from './BookingStateCard'

type Props = BookingListItem

const usePeople = (people: BookingPeople) => {
  const { t } = useTranslation('booking')
  const items: string[] = []
  if (people.adult > 0) items.push(t('people.text.adult', { count: people.adult }))
  if (people.kid > 0) items.push(t('people.text.kid', { count: people.kid }))
  if (people.baby > 0) items.push(t('people.text.baby', { count: people.baby }))
  return items.join('\n ')
}

const BookingListCard: FC<Props> = ({
  user,
  uuid,
  people,
  listing,
  startDate,
  endDate,
  state,
  price,
  currency,
  totalPrice,
}) => {
  const { t, i18n } = useTranslation('booking')
  const dayjs = useDayJS(i18n.language)
  const peopleData = usePeople(people)
  return (
    <Link
      to={`${getStaticRoute(i18n.language).business.details.bookings.list}/${uuid}`}
      className='col-span-12 flex justify-between rounded-md border bg-second p-2 transition-all duration-200'
    >
      <div className='grid w-full grid-cols-12 gap-2'>
        <div className='col-span-12 flex items-start gap-2 md:col-span-6 lg:col-span-2'>
          <img
            src={makeUserAvatar(user.name)}
            alt={user.name}
            className='min-w-12 min-h-12 h-12 w-12 rounded-md object-cover'
          />
          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>@{user.name}</span>
            <span className='text-xs text-gray-700 dark:text-gray-300'>{peopleData}</span>
          </div>
        </div>
        <div className='col-span-12 flex items-start gap-2 md:col-span-6'>
          {listing && listing.images && listing.images.length > 0 ? (
            <img src={listing.images[0].url} className='min-w-12 min-h-12 h-12 w-12 rounded-md object-cover' />
          ) : (
            <span className='min-w-12 min-h-12 flex h-12 w-12 items-center justify-center rounded-md bg-default'>
              <i className='bx bx-home text-3xl'></i>
            </span>
          )}
          <div className='flex flex-col'>
            <div
              className={`text-md line-clamp-1 overflow-hidden text-ellipsis font-semibold ${
                !listing.title ? 'italic' : ''
              }`}
            >
              {listing.title || t('empty')}
            </div>
            <div className='flex items-center gap-2 text-sm md:text-sm'>
              <span className='flex items-center justify-center text-gray-700 dark:text-gray-300'>
                {dayjs(startDate).format('DD MMM YYYY')}
              </span>
              <span className='flex items-center justify-center'>
                <i className='bx bx-arrow-to-right text-2xl text-gray-700 dark:text-gray-300'></i>
              </span>
              <span className='flex items-center justify-center text-gray-700 dark:text-gray-300'>
                {dayjs(endDate).format('DD MMM YYYY')}
              </span>
            </div>
          </div>
        </div>
        <div className='col-span-6 flex items-center md:col-span-6 lg:col-span-2'>
          <BookingStateCard state={state} />
        </div>
        <div className='col-span-6 flex flex-col items-end justify-center pr-2 md:col-span-6 lg:col-span-2'>
          <BookingPriceCard price={price} totalPrice={totalPrice} currency={currency || 'TRY'} />
        </div>
      </div>
      <div className='flex min-w-max items-center justify-end'>
        <span className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-second'>
          <i className='bx bx-chevron-right text-2xl transition-all duration-200'></i>
        </span>
      </div>
    </Link>
  )
}

export default BookingListCard
