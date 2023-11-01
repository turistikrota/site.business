export type AccountErrorResponse = {
  accountNotFound: boolean
  accountSelectRequired: boolean
}

export function isAccountErrorResponse(data: any): data is AccountErrorResponse {
  return (
    typeof data === 'object' &&
    typeof data.accountNotFound === 'boolean' &&
    typeof data.accountSelectRequired === 'boolean'
  )
}
