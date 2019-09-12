// Dependencies
import I18N from 'telegraf-i18n'
import Telegraf, { ContextMessageUpdate } from 'telegraf'
const dirtyI18N = require('telegraf-i18n')

export const i18n = new dirtyI18N({
  directory: `${__dirname}/../../locales`,
  defaultLanguage: 'en',
  sessionName: 'session',
  useSession: false,
  allowMissing: false,
}) as I18N

export function attachI18N(ctx: ContextMessageUpdate, next: Function) {
  const anyI18N = ctx.i18n as any
  anyI18N.locale(ctx.dbuser.language || 'en')
  next()
}
