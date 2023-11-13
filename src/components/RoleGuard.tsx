import { useGuard } from '@/hooks/permission'
import React from 'react'

type Props = {
  roles: string[]
}

const RoleGuard: React.FC<React.PropsWithChildren<Props>> = ({ roles, children }) => {
  const isAuthorized = useGuard(...roles)
  if (!isAuthorized) return null
  return <>{children}</>
}

export default RoleGuard
