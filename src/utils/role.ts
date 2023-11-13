export const checkRole = (role: string, roles: string[]) => {
  return roles.includes(role)
}

export const checkRoles = (findRoles: string[], roles: string[]) => {
  return findRoles.some((role) => roles.includes(role))
}
