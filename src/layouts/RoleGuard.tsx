import { useGuard } from '@/hooks/permission'
import ForbiddenView from '@/views/403'
import React from 'react'

type Props = {
  roles: string[]
}

const RoleGuardView: React.FC<React.PropsWithChildren<Props>> = ({ roles, children }) => {
  const isAuthorized = useGuard(...roles)
  if (!isAuthorized) return <ForbiddenView />
  return <>{children}</>
}

export default RoleGuardView
