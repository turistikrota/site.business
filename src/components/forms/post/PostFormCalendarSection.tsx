import Calendar, { CalendarData } from '@/components/calendar/Calendar'
import FormSection from '@turistikrota/ui/form/section'
import { FormikErrors } from 'formik'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PostCreateFormValues, Price } from './PostCreateForm'
import PostFormPricePreviewList from './PostFormPricePreviewList'
import PostFormPriceRangeSection from './PostFormPriceRangeSection'

type Props = {
  values: PostCreateFormValues
  errors: FormikErrors<PostCreateFormValues>
  setFieldValue: (field: string, value: any) => void
}

const PostFormCalendarSection: React.FC<Props> = ({ errors, values, setFieldValue }) => {
  const { t } = useTranslation('posts')
  const priceCalendarData = useMemo<CalendarData<string>>(() => {
    const data: CalendarData<string> = {}
    values.prices.forEach((price) => {
      const startDate = new Date(price.startDate)
      const endDate = new Date(price.endDate)
      while (startDate <= endDate) {
        const date = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        if (!data[date]) data[date] = []
        data[date].push(price.price + ' ₺')
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
        <PostFormPriceRangeSection onAdd={onAdd} />
        <PostFormPricePreviewList prices={values.prices} errors={errors?.prices as FormikErrors<Price>[]} />
        <Calendar<string>
          data={priceCalendarData}
          DetailRender={({ data }) => (
            <div className='flex h-full w-full flex-col items-center justify-center gap-1'>
              {data.map((d) => (
                <div key={d} className='text-lg text-gray-800 dark:text-gray-200'>
                  {d}
                </div>
              ))}
            </div>
          )}
          variantCalc={() => {
            return 'primary'
          }}
        />
      </FormSection.Body>
    </FormSection>
  )
}

export default PostFormCalendarSection
