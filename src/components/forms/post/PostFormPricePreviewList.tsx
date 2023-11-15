import { useDayJS } from '@/utils/dayjs'
import ErrorText from '@turistikrota/ui/text/error'
import { FormikErrors } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Price, Prices } from './PostCreateForm'

type Props = {
  prices: Prices
  errors?: FormikErrors<Price>[]
}

const PostFormPricePreviewList: React.FC<Props> = ({ prices, errors }) => {
  const { i18n } = useTranslation('posts')
  const dayjs = useDayJS(i18n.language)
  return (
    <div className='flex flex-col gap-4'>
      {prices.map((price, idx) => (
        <div key={idx} className='flex flex-col gap-2'>
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
            <div className='flex items-center justify-center'>
              <i className='bx bx-arrow-to-right text-2xl text-gray-700 dark:text-gray-300' />
            </div>
            <div className='flex w-full items-center justify-center rounded-md bg-default p-2 text-primary'>
              {price.price} ₺
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

export default PostFormPricePreviewList
