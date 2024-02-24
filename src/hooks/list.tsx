import { useInfiniteScroll } from '@turistikrota/ui/hooks/dom'
import { ListResponse } from '@turistikrota/ui/types'
import debounce from '@turistikrota/ui/utils/debounce'
import { useEffect, useState } from 'react'

type ListResult<T, P = any> = {
  list: T[]
  setList: (list: T[]) => void
  total: number
  firstLoading: boolean
  loading: boolean
  isNextVisible: boolean
  isPrevVisible: boolean
  page: number
  refetch: (page: number, params?: P) => void
  setPage: (page: number) => void
}

type Fetcher<T = any, P = any> = (page: number, params?: P) => Promise<ListResponse<T>>

export function useListQuery<T = any, P = any>(getter: Fetcher<T, P>, initials?: P): ListResult<T, P> {
  const [firstLoading, setFirstLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [params, setParams] = useState<P | undefined>(initials)
  const [isNextVisible, setIsNextVisible] = useState<boolean>(false)
  const [isPrevVisible, setIsPrevVisible] = useState<boolean>(false)
  const [list, setList] = useState<T[]>([])

  const startLoading = (page: number) => {
    if (page === 1) return setFirstLoading(true)
    setLoading(true)
  }

  const stopLoading = () => {
    setLoading(false)
    setFirstLoading(false)
  }

  const refetch = (page: number, params?: P) => {
    startLoading(page)
    const p = params ? 1 : page
    getter(p, params)
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
  }

  const debouncedRefetch = debounce(refetch, 500)

  useInfiniteScroll({
    handle: onScroll,
    loading,
    offset: 10,
  })

  useEffect(() => {
    debouncedRefetch(page, params)
  }, [page, params])

  useEffect(() => {
    if (initials) {
      setParams(initials)
    } else {
      setParams(undefined)
    }
  }, [initials])

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
