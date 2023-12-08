import { BusinessRoles, ListingLogRoles, ListingRoles } from '@/static/role'

export const ListingLogsViewRoles: string[] = [BusinessRoles.Super, ListingLogRoles.Super, ListingLogRoles.List]

export const ListingEditViewRoles: string[] = [BusinessRoles.Super, ListingRoles.Super, ListingRoles.Update]
