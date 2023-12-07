import Calendar, { PriceRenderer } from '@/components/calendar/Calendar.tsx'
import { useListingCalendar } from '@/hooks/calendar.listing.tsx'
import { ListingFormValues, Price } from '@/types/listing.ts'
import Alert from '@turistikrota/ui/alert'
import FormSection from '@turistikrota/ui/form/section'
import { FormikErrors } from 'formik'
import { useTranslation } from 'react-i18next'
import ListingFormPricePreviewList from '../ListingFormPricePreviewList.tsx'
import ListingFormPriceRangeSection from './ListingFormPriceRangeSection.tsx'

type Props = {
  values: ListingFormValues
  errors: FormikErrors<ListingFormValues>
  setFieldValue: (field: string, value: any) => void
}

const ListingFormCalendarSection: React.FC<Props> = ({ errors, values, setFieldValue }) => {
  const { t } = useTranslation('listings')
  const priceCalendarData = useListingCalendar(values.prices)

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
          DetailRender={PriceRenderer}
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
