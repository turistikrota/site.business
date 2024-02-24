import { BookingFilter, getQueryFromSearchParams } from '@/types/booking'
import { findDiff } from '@turistikrota/ui/utils'
import { FC, PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type BookingFilterContextType = {
  query: BookingFilter
  setQuery: (query: BookingFilter) => void
  clean: () => void
  isFiltered: boolean
}

const BookingFilterContext = createContext<BookingFilterContextType | undefined>(undefined)

export const useBookingFilter = (): BookingFilterContextType => {
  const context = useContext(BookingFilterContext)
  if (!context) {
    throw new Error('useBookingFilter must be used within a BookingFilterProvider')
  }
  return context
}

export const BookingFilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [query, setQuery] = useState<BookingFilter>(
    getQueryFromSearchParams(new URLSearchParams(window.location.search)),
  )
  const [searchParams] = useSearchParams()

  const isFiltered = useMemo(() => Object.keys(query).filter((k) => k !== 'page').length > 1, [query])

  const clean = () => setQuery({})

  const onQueryChange = (newQuery: BookingFilter) => {
    const diff = Object.keys(findDiff(query, newQuery))
    const withoutPage = diff.filter((k) => k !== 'page')
    if (withoutPage.length > 0) {
      newQuery.page = 1
    }
    setQuery(newQuery)
  }

  useEffect(() => {
    const q = getQueryFromSearchParams(searchParams)
    const diff = Object.keys(findDiff(query, q))
    if (diff.length > 0 && !(diff.length === 1 && diff.includes('page') && !!q.page && q.page !== 1)) {
      setQuery(q)
    }
  }, [])
  return (
    <BookingFilterContext.Provider value={{ query, setQuery: onQueryChange, clean, isFiltered }}>
      {children}
    </BookingFilterContext.Provider>
  )
}
