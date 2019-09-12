// Dependencies
import { ContextMessageUpdate } from 'telegraf'
import { ExtraHTML } from '../helpers/ExtraHTML'

export function sendHelp(ctx: ContextMessageUpdate) {
  return ctx.reply(ctx.i18n.t('help'), ExtraHTML)
}
