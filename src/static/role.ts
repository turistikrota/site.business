export enum OwnerRoles {
  Super = 'owner.super',
  Member = 'owner.member',
  UserRemove = 'owner.user_remove',
  UserPermAdd = 'owner.user_perm_add',
  UserPermRemove = 'owner.user_perm_remove',
  Enable = 'owner.enable',
  Disable = 'owner.disable',
  UserList = 'owner.user_list',
  InviteCreate = 'owner.invite_create',
  InviteDelete = 'owner.invite_delete',
  InviteView = 'owner.invite_view',
}

export enum PostRoles {
  Super = 'post.super',
  Create = 'post.create',
  Update = 'post.update',
  Delete = 'post.delete',
  Enable = 'post.enable',
  Disable = 'post.disable',
  ReOrder = 'post.reorder',
  Restore = 'post.restore',
  List = 'post.list',
  View = 'post.view',
}

export enum PostLogRoles {
  Super = 'post_log.super',
  List = 'post_log.list',
  View = 'post_log.view',
}

export enum OwnerLogRoles {
  Super = 'owner_log.super',
  List = 'owner_log.list',
  View = 'owner_log.view',
}
