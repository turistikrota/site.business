export enum ActorType {
  User = 'user',
  Business = 'business',
}

export enum ChannelType {
  Mail = 'mail',
  Sms = 'sms',
  Telegram = 'telegram',
}

export type Actor = {
  uuid: string
  name: string
  type: ActorType
}

export type TelegramConfig = {
  name: string
  chatId: string
}

export type MailConfig = {
  name: string
  email: string
}

export type SmsConfig = {
  name: string
  phone: string
  countryCode: string
}

export type ActorConfig = {
  uuid: string
  actor: Actor
  telegram: TelegramConfig[]
  mail: MailConfig[]
  sms: SmsConfig[]
  updatedAt: string
}

export type ActorConfigForm = {
  type: ChannelType
  name: string
  chatId?: string
  email?: string
  phone?: string
}
