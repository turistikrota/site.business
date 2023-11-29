import { useEffect, useState } from 'react'

type QueryResult<T> = {
  data: T | undefined
  setData: (data: T) => void
  loading: boolean
  notFound: boolean
  refetch: () => void
}

type Fetcher<T = any> = () => Promise<T | undefined>

export function useQuery<T = any>(getter: Fetcher<T>): QueryResult<T> {
  const [notFound, setNotFound] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<T | undefined>(undefined)

  useEffect(() => {
    fetcher()
  }, [])

  const fetcher = () => {
    setLoading(true)
    getter()
      .then((res) => {
        if (res) {
          setData(res)
        } else {
          setNotFound(true)
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 404) {
          setNotFound(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    data,
    setData,
    loading,
    notFound,
    refetch: fetcher,
  }
}
