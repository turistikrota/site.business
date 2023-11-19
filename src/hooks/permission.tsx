import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { checkRoles } from '@/utils/role'
import { useCallback } from 'react'

type Bodyguard = {
  check: (...roles: string[]) => boolean
}

export const useBodyguard = (): Bodyguard => {
  const [current] = useCurrentBusiness()

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

export const useGuard = (...roles: string[]): boolean => {
  const { check } = useBodyguard()
  return check(...roles)
}
