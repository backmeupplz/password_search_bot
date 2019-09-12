// Dependencies
import { ContextMessageUpdate } from 'telegraf'
import { ExtraHTML } from '../helpers/ExtraHTML'

export async function cancel(ctx: ContextMessageUpdate) {
  ctx.dbuser.email = undefined
  ctx.dbuser.numbers = undefined
  await ctx.dbuser.save()
  return ctx.reply(ctx.i18n.t('canceled'), ExtraHTML)
}
