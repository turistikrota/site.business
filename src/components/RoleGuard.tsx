import { useGuard } from '@/hooks/permission'
import React from 'react'

type Props = {
  roles: string[]
  fallback?: React.ReactNode
}

const RoleGuard: React.FC<React.PropsWithChildren<Props>> = ({ roles, fallback, children }) => {
  const isAuthorized = useGuard(...roles)
  if (!isAuthorized) return <>{fallback}</>
  return <>{children}</>
}

export default RoleGuard
