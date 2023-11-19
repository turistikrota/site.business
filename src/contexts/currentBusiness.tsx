import { BusinessDetail } from '@/types/business'
import { createContext, useContext, useState } from 'react'

type ProviderProps = {
  detail: BusinessDetail
}

type CurrentBusinessContext = [
  BusinessDetail,
  React.Dispatch<React.SetStateAction<BusinessDetail>>,
  (key: string, value: unknown) => void,
]

const currentBusinessContext = createContext<CurrentBusinessContext>([
  {} as BusinessDetail,
  () => {
    //
  },
  () => {
    //
  },
])

export const CurrentBusinessProvider = ({ children, detail }: React.PropsWithChildren<ProviderProps>) => {
  const [currentBusiness, setCurrentBusiness] = useState<BusinessDetail>(detail)

  const updateBusiness = (key: string, value: unknown) => {
    setCurrentBusiness((prev) => ({ ...prev, [key]: value }))
  }
  return (
    <currentBusinessContext.Provider value={[currentBusiness, setCurrentBusiness, updateBusiness]}>
      {children}
    </currentBusinessContext.Provider>
  )
}

export const useCurrentBusiness = (): CurrentBusinessContext => {
  return useContext(currentBusinessContext)
}
