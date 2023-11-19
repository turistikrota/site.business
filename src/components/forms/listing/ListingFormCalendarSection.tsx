import Calendar, { CalendarData } from '@/components/calendar/Calendar'
import { ListingCreateFormValues, Price } from '@/types/listing'
import Alert from '@turistikrota/ui/alert'
import FormSection from '@turistikrota/ui/form/section'
import { FormikErrors } from 'formik'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ListingFormPricePreviewList from './ListingFormPricePreviewList'
import ListingFormPriceRangeSection from './ListingFormPriceRangeSection'

type Props = {
  values: ListingCreateFormValues
  errors: FormikErrors<ListingCreateFormValues>
  setFieldValue: (field: string, value: any) => void
}

const ListingFormCalendarSection: React.FC<Props> = ({ errors, values, setFieldValue }) => {
  const { t } = useTranslation('listings')
  const priceCalendarData = useMemo<CalendarData<number>>(() => {
    const data: CalendarData<number> = {}
    values.prices.forEach((price) => {
      const startDate = new Date(price.startDate)
      const endDate = new Date(price.endDate)
      while (startDate <= endDate) {
        const date = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        if (!data[date]) data[date] = []
        data[date].push(price.price)
        startDate.setDate(startDate.getDate() + 1)
      }
    })
    return data
  }, [values])

  const onAdd = (from: string, to: string, price: number) => {
    setFieldValue('prices', [...values.prices, { startDate: from, endDate: to, price }])
  }

  return (
    <FormSection>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.calendar.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.calendar.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'>
        <Alert showIcon type='info'>
          <Alert.Title>{t('form.calendar.info.title')}</Alert.Title>
          <Alert.Description>
            {t('form.calendar.info.description')} <br /> {t('form.calendar.info.example')}
          </Alert.Description>
        </Alert>
        <ListingFormPriceRangeSection onAdd={onAdd} prices={values.prices} />
        <ListingFormPricePreviewList
          prices={values.prices}
          errors={errors?.prices as FormikErrors<Price>[]}
          setFieldValue={setFieldValue}
        />
        <Calendar<number>
          data={priceCalendarData}
          DetailRender={({ data }) => (
            <div className='flex h-full w-full flex-col items-center justify-center gap-1'>
              {data.map((d, idx) => (
                <div key={idx} className='text-lg text-gray-800 dark:text-gray-200'>
                  {Intl.NumberFormat('tr-TR').format(d)} ₺
                </div>
              ))}
            </div>
          )}
          availableCalc={(date) => {
            const now = new Date()
            now.setHours(0, 0, 0, 0)
            if (date < now) return false
            return true
          }}
          variantCalc={() => {
            return 'primary'
          }}
        />
      </FormSection.Body>
    </FormSection>
  )
}

export default ListingFormCalendarSection
