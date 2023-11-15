import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  onAdd: (from: string, to: string, price: number) => void
}

const PostFormPriceRangeSection: React.FC<Props> = ({ onAdd }) => {
  const [startDate, setStartDate] = useState<string | undefined>(undefined)
  const [endDate, setEndDate] = useState<string | undefined>(undefined)
  const [price, setPrice] = useState<Float64Array>(new Float64Array([0]))
  const { t } = useTranslation('posts')

  const add = () => {
    if (startDate && endDate && price[0]) {
      onAdd(startDate, endDate, price[0])
      setStartDate(undefined)
      setEndDate(undefined)
      setPrice(new Float64Array([0]))
    }
  }

  return (
    <>
      <div className='flex w-full gap-x-4'>
        <div className='w-full'>
          <Input
            id='startDate'
            name='startDate'
            type='date'
            autoComplete='start-date'
            label={t('form.calendar.startDate')}
            ariaLabel={t('form.calendar.startDate')}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-center'>
          <i className='bx bx-arrow-to-right text-2xl text-gray-700 dark:text-gray-300' />
        </div>
        <div className='w-full'>
          <Input
            id='endDate'
            name='endDate'
            type='date'
            autoComplete='end-date'
            label={t('form.calendar.endDate')}
            ariaLabel={t('form.calendar.endDate')}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <Input
        id='price'
        name='price'
        type='number'
        autoComplete='price'
        label={t('form.calendar.price')}
        ariaLabel={t('form.calendar.price')}
        value={price[0]}
        onChange={(e) => setPrice(new Float64Array([e.target.valueAsNumber]))}
      />
      <Button onClick={add}>{t('form.calendar.add')}</Button>
    </>
  )
}

export default PostFormPriceRangeSection
