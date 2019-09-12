// Dependencies
import { ContextMessageUpdate, Markup as m } from 'telegraf'
import { ExtraHTML } from '../helpers/ExtraHTML'
import * as RandomToken from 'random-token'
import { send } from '../helpers/sendEmail'
import { findPasswords } from '../models'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
const randomToken = RandomToken.create('0123456789')

export async function startEmailValidation(ctx: ContextMessageUpdate) {
  ctx.dbuser.email = ctx.message.text
  ctx.dbuser.numbers = randomToken(6)
  send(ctx.dbuser.numbers, ctx.dbuser.email)
  await ctx.dbuser.save()
  return ctx.reply(ctx.i18n.t('email', { email: ctx.message.text }), ExtraHTML)
}

export async function validateEmail(ctx: ContextMessageUpdate) {
  // Check if it doesn't exist
  if (!ctx.dbuser.numbers) {
    return ctx.reply(ctx.i18n.t('no_numbers'))
  }
  // Validate
  if (ctx.dbuser.numbers !== ctx.message.text) {
    ctx.dbuser.failedAttempts += 1
    await ctx.dbuser.save()
    if (ctx.dbuser.failedAttempts > 2) {
      ctx.dbuser.banned = true
      await ctx.dbuser.save()
      return ctx.reply(ctx.i18n.t('banned'))
    }
    return ctx.reply(
      ctx.i18n.t('email_failed', { failedAttempts: ctx.dbuser.failedAttempts }),
      ExtraHTML
    )
  }
  // Find passwords
  const password = await findPasswords(ctx.dbuser.email)
  const passwords = password ? password.passwords : []
  // Cancel the command
  ctx.dbuser.email = undefined
  ctx.dbuser.numbers = undefined
  await ctx.dbuser.save()
  // Respond
  if (!passwords.length) {
    return ctx.reply(ctx.i18n.t('clear'))
  }
  return ctx.reply(
    `${ctx.dbuser.email}
    
${ctx.i18n.t('email_validated')}
  
<code>${passwords.join('\n')}</code>`,
    {
      reply_markup: m.inlineKeyboard([
        [m.callbackButton(ctx.i18n.t('delete'), 'delete')],
      ]),
      parse_mode: 'HTML',
    } as ExtraReplyMessage
  )
}

export async function deleteEmail(ctx: ContextMessageUpdate) {
  const email = ctx.callbackQuery.message.text.split('\n')[0]
  const password = await findPasswords(email)
  await password.remove()
  await ctx.answerCbQuery()
  ctx.editMessageText(ctx.i18n.t('removed'))
}
