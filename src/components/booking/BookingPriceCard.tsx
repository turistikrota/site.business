import { Currency } from '@/types/listing'
import { Locales } from '@turistikrota/ui'
import { useLocalizedCurrencyFormatter } from '@turistikrota/ui/hooks/intl'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  price: number
  totalPrice?: number
  currency: Currency
}

const BookingPriceCard: FC<Props> = ({ price, totalPrice, currency }) => {
  const { i18n } = useTranslation('booking')
  const formatter = useLocalizedCurrencyFormatter(i18n.language as Locales, currency)

  if (totalPrice) return <span className='text-md font-bold text-green-600'>{formatter.format(totalPrice)}</span>

  return (
    <div className='flex flex-col'>
      <span className='text-md text-right font-bold text-green-600'>{formatter.format(price)}</span>
    </div>
  )
}

export default BookingPriceCard
