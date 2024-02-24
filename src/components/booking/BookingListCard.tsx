import { BookingListItem } from '@/api/booking/booking.api'
import { FC } from 'react'

type Props = BookingListItem

const BookingListCard: FC<Props> = ({ user }) => {
  return <div className='col-span-3'>{user.name}</div>
}

export default BookingListCard
