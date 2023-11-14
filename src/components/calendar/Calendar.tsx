import { useCalendar } from '@/hooks/calendar'
import React, { useMemo, useState } from 'react'

type Data<T> = Record<string, T[]>

type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

type Props<T = any> = {
  data: Data<T>
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

type MonthProps = {}

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
      <div className='text-xs font-normal justify-end flex w-full text-gray-700 dark:text-gray-300'>{name}</div>
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
      className={`col-span-1 border-t-2 hover:bg-default transition-colors duration-200 cursor-pointer h-12 md:h-36 rounded-b-md relative ${
        isNextMonth || isPrevMonth ? 'opacity-20' : ''
      } ${isActive ? 'bg-default border-primary' : ''} ${DayVariants[variant].border}`}
      onClick={onDetailClick}
    >
      <div className='absolute top-0 right-1 text-gray-600 dark:text-gray-400'>{day}</div>
      {data && (
        <>
          <div className='w-full h-full flex items-end justify-center md:hidden opacity-100 md:opacity-0 text-secondary'>
            <span className={`w-2 h-2 rounded-full ${DayVariants[variant].badge}`} />
          </div>
          <div className='w-full h-full pt-4 px-1 md:opacity-100 opacity-0'>
            <DetailRender day={day} data={data} />
          </div>
        </>
      )}
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

  const onPrevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const onNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div className='w-full flex flex-col gap-y-2'>
      <div className='w-full'>
        <div className='grid grid-cols-7 gap-x-2'>
          {calendar.labels.map((label) => (
            <DayLabel key={label} name={label} />
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {calendar.weeks.map((week, index) => (
          <div key={index} className='grid grid-cols-7 gap-x-2'>
            {week.days.map((day, index) => (
              <Day<T>
                key={index}
                day={day.value}
                DetailRender={DetailRender}
                data={data[calendar.makeDateStr(day.value, month, year)]}
                onClick={() => onDayDetailClick(day.value)}
                isActive={day.value === currentDate.getDate()}
                isNextMonth={day.isNextMonth}
                isPrevMonth={day.isPrevMonth}
                onNextMonth={onNextMonth}
                onPrevMonth={onPrevMonth}
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
