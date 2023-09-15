import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useAccount } from '@/layouts/AccountSelectionLayout'
import { useEffect } from 'react'

const OwnerSelection = () => {
  const { current } = useAccount()
  useEffect(() => {
    console.log('saaa', current)
    if (!current) return
    httpClient.get(apiUrl(Services.Owner, `/owner/@${current.userName}`))
  }, [current])

  return <>owner selection</>
}

export default OwnerSelection
