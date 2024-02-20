import { useInfiniteScroll } from '@turistikrota/ui/hooks/dom'
import { ListResponse } from '@turistikrota/ui/types'
import { useEffect, useState } from 'react'

type ListResult<T> = {
  list: T[]
  setList: (list: T[]) => void
  total: number
  firstLoading: boolean
  loading: boolean
  isNextVisible: boolean
  isPrevVisible: boolean
  page: number
  refetch: () => void
  setPage: (page: number) => void
}

type Fetcher<T = any> = (page: number) => Promise<ListResponse<T>>

export function useListQuery<T = any>(getter: Fetcher<T>): ListResult<T> {
  const [firstLoading, setFirstLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [isNextVisible, setIsNextVisible] = useState<boolean>(false)
  const [isPrevVisible, setIsPrevVisible] = useState<boolean>(false)
  const [list, setList] = useState<T[]>([])

  const startLoading = () => {
    if (page === 1) return setFirstLoading(true)
    setLoading(true)
  }

  const stopLoading = () => {
    setLoading(false)
    setFirstLoading(false)
  }

  const refetch = () => {
    startLoading()
    getter(page)
      .then((res) => {
        if (res) {
          if (page === 1) {
            setList(res.list)
          } else {
            setList([...list, ...res.list])
          }
          setTotal(res.total)
          setIsNextVisible(res.isNext)
          setIsPrevVisible(res.isPrev)
        }
      })
      .finally(() => {
        stopLoading()
      })
  }

  const onScroll = () => {
    if (!isNextVisible) return
    setPage(page + 1)
    refetch()
  }

  useInfiniteScroll({
    handle: onScroll,
    loading,
    offset: 10,
  })

  useEffect(() => {
    refetch()
  }, [page])

  return {
    firstLoading,
    list,
    setList,
    loading,
    total,
    isNextVisible,
    isPrevVisible,
    page,
    refetch,
    setPage,
  }
}
