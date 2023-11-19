import { Price, Prices } from '@/types/listing'
import { useDayJS } from '@/utils/dayjs'
import Button from '@turistikrota/ui/button'
import ErrorText from '@turistikrota/ui/text/error'
import { FormikErrors } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  prices: Prices
  errors?: FormikErrors<Price>[]
  setFieldValue: (field: string, value: any) => void
}

const ListingFormPricePreviewList: React.FC<Props> = ({ prices, errors, setFieldValue }) => {
  const { i18n } = useTranslation('listings')
  const dayjs = useDayJS(i18n.language)

  return (
    <div className='flex flex-col gap-x-4'>
      {typeof errors === 'string' && <ErrorText>{errors}</ErrorText>}
      {prices.map((price, idx) => (
        <div key={idx} className='flex flex-col gap-x-2 gap-y-1'>
          <div key={idx} className='flex w-full gap-x-4'>
            <div className='flex w-full items-center justify-center rounded-md bg-default p-2 text-secondary'>
              {dayjs(price.startDate).format('DD MMMM YYYY')}
            </div>
            <div className='flex items-center justify-center'>
              <i className='bx bx-arrow-to-right text-2xl text-gray-700 dark:text-gray-300' />
            </div>
            <div className='flex w-full items-center justify-center rounded-md bg-default p-2 text-secondary'>
              {dayjs(price.endDate).format('DD MMMM YYYY')}
            </div>
            <div className='flex  justify-center'>
              <span className='text-2xl text-gray-700 dark:text-gray-300'>=</span>
            </div>
            <div className='flex w-full items-center justify-center rounded-md bg-default p-2 text-primary'>
              {Intl.NumberFormat('tr-TR').format(price.price)} ₺
            </div>
            <div className='flex items-center justify-center'>
              <Button
                size='sm'
                variant='error'
                onClick={() => {
                  const newPrices = [...prices]
                  newPrices.splice(idx, 1)
                  setFieldValue('prices', newPrices)
                }}
              >
                <i className='bx bx-trash text-xl' />
              </Button>
            </div>
          </div>
          <ErrorText>{errors?.[idx]?.price}</ErrorText>
          <ErrorText>{errors?.[idx]?.startDate}</ErrorText>
          <ErrorText>{errors?.[idx]?.endDate}</ErrorText>
        </div>
      ))}
    </div>
  )
}

export default ListingFormPricePreviewList
