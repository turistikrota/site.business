import { useCurrentOwner } from '@/contexts/currentOwner'
import { checkRoles } from '@/utils/role'
import { useCallback } from 'react'

type Bodyguard = {
  check: (...roles: string[]) => boolean
}

export const useBodyguard = (): Bodyguard => {
  const [current] = useCurrentOwner()

  const check = useCallback(
    (...roles: string[]) => {
      return checkRoles(roles, current.user.roles)
    },
    [current.user.roles],
  )
  return {
    check,
  }
}
