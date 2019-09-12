// Dependencies
import { ContextMessageUpdate } from 'telegraf'
import { sendLanguageKeyboard } from '../commands/language'

export async function checkLanguage(ctx: ContextMessageUpdate, next: Function) {
  if (ctx.dbuser.language || ctx.updateType === 'callback_query') {
    return next()
  }
  return sendLanguageKeyboard(ctx)
}
