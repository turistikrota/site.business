export enum BusinessRoles {
  Super = 'business.super',
  Member = 'business.member',
  UserRemove = 'business.user_remove',
  UserPermAdd = 'business.user_perm_add',
  UserPermRemove = 'business.user_perm_remove',
  Enable = 'business.enable',
  Disable = 'business.disable',
  UserList = 'business.user_list',
  InviteCreate = 'business.invite_create',
  InviteDelete = 'business.invite_delete',
  InviteView = 'business.invite_view',
  View = 'business.admin_view',
}

export enum ListingRoles {
  Super = 'listing.super',
  Create = 'listing.create',
  Update = 'listing.update',
  Delete = 'listing.delete',
  Enable = 'listing.enable',
  Disable = 'listing.disable',
  ReOrder = 'listing.reorder',
  Restore = 'listing.restore',
  List = 'listing.list',
  View = 'listing.view',
}

export enum ListingLogRoles {
  Super = 'listing_log.super',
  List = 'listing_log.list',
  View = 'listing_log.view',
}

export enum BusinessLogRoles {
  Super = 'business_log.super',
  List = 'business_log.list',
  View = 'business_log.view',
}

export enum BusinessUploadRoles {
  Avatar = 'business.upload.avatar',
  Cover = 'business.upload.cover',
}
