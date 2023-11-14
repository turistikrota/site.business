import Calendar from '@/components/calendar/Calendar'
import FormSection from '@turistikrota/ui/form/section'
import { useTranslation } from 'react-i18next'

type Props = {
  // use
}

const PostFormCalendarSection: React.FC<Props> = () => {
  const { t } = useTranslation('posts')
  return (
    <FormSection>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.calendar.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.calendar.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'>
        <Calendar<string>
          data={{
            '15.11.2023': ['aa', 'bb'],
            '14.11.2023': ['500₺'],
          }}
          DetailRender={({ data }) => (
            <div className='flex flex-col gap-1 items-center justify-center h-full w-full'>
              {data.map((d) => (
                <div key={d} className='text-lg text-gray-800 dark:text-gray-200'>
                  {d}
                </div>
              ))}
            </div>
          )}
          variantCalc={(data: string[]) => {
            if (data.length === 0) return 'danger'
            if (data.length === 1) return 'success'
            return 'secondary'
          }}
        />
      </FormSection.Body>
    </FormSection>
  )
}

export default PostFormCalendarSection
