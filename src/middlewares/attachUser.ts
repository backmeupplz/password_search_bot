// Dependencies
import { findUser } from '../models'
import { ContextMessageUpdate } from 'telegraf'

export async function attachUser(ctx: ContextMessageUpdate, next: Function) {
  const dbuser = await findUser(ctx.from.id)
  ctx.dbuser = dbuser
  return next()
}
