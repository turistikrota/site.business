import { OwnerListItem } from '@/types/owner'
import { createContext, useContext, useState } from 'react'

type ProviderProps = {
  owner: OwnerListItem
}

type CurrentOwnerContext = [
  OwnerListItem,
  React.Dispatch<React.SetStateAction<OwnerListItem>>,
  (key: string, value: unknown) => void,
]

const currentOwnerContext = createContext<CurrentOwnerContext>([
  {} as OwnerListItem,
  () => {
    //
  },
  () => {
    //
  },
])

export const CurrentOwnerProvider = ({ children, owner }: React.PropsWithChildren<ProviderProps>) => {
  const [currentOwner, setCurrentOwner] = useState<OwnerListItem>(owner)

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
