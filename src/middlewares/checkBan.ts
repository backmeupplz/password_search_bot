// Dependencies
import { ContextMessageUpdate } from 'telegraf'

export async function checkBan(ctx: ContextMessageUpdate, next: Function) {
  if (!ctx.dbuser.banned) {
    return next()
  }
  return ctx.reply(ctx.i18n.t('banned'))
}
