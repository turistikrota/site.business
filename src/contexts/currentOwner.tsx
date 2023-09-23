import { OwnerDetail } from '@/types/owner'
import { createContext, useContext, useState } from 'react'

type ProviderProps = {
  detail: OwnerDetail
}

type CurrentOwnerContext = [
  OwnerDetail,
  React.Dispatch<React.SetStateAction<OwnerDetail>>,
  (key: string, value: unknown) => void,
]

const currentOwnerContext = createContext<CurrentOwnerContext>([
  {} as OwnerDetail,
  () => {
    //
  },
  () => {
    //
  },
])

export const CurrentOwnerProvider = ({ children, detail }: React.PropsWithChildren<ProviderProps>) => {
  const [currentOwner, setCurrentOwner] = useState<OwnerDetail>(detail)

  const updateOwner = (key: string, value: unknown) => {
    setCurrentOwner((prev) => ({ ...prev, [key]: value }))
  }
  return (
    <currentOwnerContext.Provider value={[currentOwner, setCurrentOwner, updateOwner]}>
      {children}
    </currentOwnerContext.Provider>
  )
}

export const useCurrentOwner = (): CurrentOwnerContext => {
  return useContext(currentOwnerContext)
}
