import { useCalendar } from '@/hooks/calendar'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type CalendarData<T> = Record<string, T[]>

type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

type Props<T = any> = {
  data: CalendarData<T>
  DetailRender: React.FC<{
    day: number
    data: T[]
  }>
  onDayClick?: () => void
  variantCalc?: (data: T[]) => Variant
}

type DayProps<T> = {
  day: number
  DetailRender: React.FC<{
    day: number
    data: T[]
  }>
  variant?: Variant
  data: T[]
  isPrevMonth: boolean
  isNextMonth: boolean
  isActive?: boolean
  onPrevMonth?: () => void
  onNextMonth?: () => void
  onClick?: () => void
}

type HeadProps = {
  year: number
  month: number
}

type DayLabelProps = {
  name: string
}

type DayDesign = {
  border: string
  badge: string
}

const DayVariants: Record<Variant, DayDesign> = {
  default: {
    border: '',
    badge: 'dark:bg-gray-400 bg-gray-200',
  },
  primary: {
    border: 'border-primary',
    badge: 'bg-primary',
  },
  secondary: {
    border: 'border-secondary',
    badge: 'bg-secondary',
  },
  success: {
    border: 'border-green-500',
    badge: 'bg-green-500',
  },
  danger: {
    border: 'border-red-500',
    badge: 'bg-red-500',
  },
  warning: {
    border: 'border-yellow-500',
    badge: 'bg-yellow-500',
  },
  info: {
    border: 'border-blue-500',
    badge: 'bg-blue-500',
  },
}

const DayLabel: React.FC<DayLabelProps> = ({ name }) => {
  return (
    <div className='col-span-1'>
      <div className='flex w-full justify-end text-xs font-normal text-gray-700 dark:text-gray-300'>{name}</div>
    </div>
  )
}

function Day<T = any>({
  day,
  data,
  variant = 'default',
  DetailRender,
  isActive,
  isNextMonth,
  isPrevMonth,
  onClick,
  onNextMonth,
  onPrevMonth,
}: DayProps<T>) {
  const onDetailClick = () => {
    if (isNextMonth) {
      onNextMonth && onNextMonth()
      return
    }
    if (isPrevMonth) {
      onPrevMonth && onPrevMonth()
      return
    }
    onClick && onClick()
  }
  return (
    <div
      className={`relative col-span-1 h-12 cursor-pointer rounded-b-md border-t-2 transition-colors duration-200 hover:bg-default md:h-36 ${
        isNextMonth || isPrevMonth ? 'opacity-20' : ''
      } ${isActive ? 'border-primary bg-default' : ''} ${DayVariants[variant].border}`}
      onClick={onDetailClick}
    >
      <div className='absolute right-1 top-0 text-gray-600 dark:text-gray-400'>{day}</div>
      {data && (
        <>
          <div className='flex h-full w-full items-end justify-center text-secondary opacity-100 md:hidden md:opacity-0'>
            <span className={`h-2 w-2 rounded-full ${DayVariants[variant].badge}`} />
          </div>
          <div className='h-full w-full px-1 pt-4 opacity-0 md:opacity-100'>
            <DetailRender day={day} data={data} />
          </div>
        </>
      )}
    </div>
  )
}

function Head({ year, month }: HeadProps) {
  const { t } = useTranslation('calendar')
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <div className='text-lg font-bold'>{t(`months.${month}`)}</div>
      </div>
      <div className='text-lg font-bold'>{year}</div>
    </div>
  )
}

function Calendar<T = any>({ data, DetailRender, onDayClick, variantCalc }: Props<T>) {
  const [month, setMonth] = useState<number>(new Date().getMonth())
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [day, setDay] = useState<number>(new Date().getDate())
  const currentDate = useMemo(() => new Date(year, month, day), [year, month, day])
  const calendar = useCalendar(currentDate)

  const onDayDetailClick = (day: number) => {
    setDay(day)
    onDayClick && onDayClick()
  }

  const onPrevMonth = (date: number) => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
    setDay(date)
  }

  const onNextMonth = (date: number) => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setDay(date)
  }

  return (
    <div className='flex w-full flex-col gap-y-2'>
      <Head year={year} month={month} />
      <div className='w-full'>
        <div className='grid grid-cols-7 gap-x-1'>
          {calendar.labels.map((label) => (
            <DayLabel key={label} name={label} />
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        {calendar.weeks.map((week, index) => (
          <div key={index} className='grid grid-cols-7 gap-x-1'>
            {week.days.map((day, index) => (
              <Day<T>
                key={index}
                day={day.value}
                DetailRender={DetailRender}
                data={data[calendar.makeDateStr(day.value, month, year)]}
                onClick={() => onDayDetailClick(day.value)}
                isActive={!day.isNextMonth && !day.isPrevMonth && day.value === currentDate.getDate()}
                isNextMonth={day.isNextMonth}
                isPrevMonth={day.isPrevMonth}
                onNextMonth={() => onNextMonth(day.value)}
                onPrevMonth={() => onPrevMonth(day.value)}
                variant={
                  variantCalc && data[calendar.makeDateStr(day.value, month, year)]
                    ? variantCalc(data[calendar.makeDateStr(day.value, month, year)]) ?? 'default'
                    : 'default'
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
