// Dependencies
import { ContextMessageUpdate, Markup as m } from 'telegraf'
import { readdirSync, readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { ExtraHTML } from '../helpers/ExtraHTML'
import { sendHelp } from './help'

export function sendLanguageKeyboard(ctx: ContextMessageUpdate) {
  return ctx.reply(ctx.i18n.t('language'), {
    reply_markup: languageKeyboard(),
  })
}

export async function selectLanguage(ctx: ContextMessageUpdate) {
  // Save user
  ctx.dbuser.language = ctx.callbackQuery.data
  ctx.dbuser = await ctx.dbuser.save()
  // Update i18n
  ctx.i18n.locale(ctx.callbackQuery.data)
  // Respond
  await ctx.answerCbQuery()
  await ctx.editMessageText(ctx.i18n.t('language_selected'), ExtraHTML)
  return sendHelp(ctx)
}

function languageKeyboard() {
  const locales = localesFiles()
  const result = []
  locales.forEach((locale, index) => {
    const localeCode = locale.split('.')[0]
    const localeName = safeLoad(
      readFileSync(`${__dirname}/../../locales/${locale}`, 'utf8')
    ).name
    if (index % 2 == 0) {
      if (index === 0) {
        result.push([m.callbackButton(localeName, localeCode)])
      } else {
        result[result.length - 1].push(m.callbackButton(localeName, localeCode))
      }
    } else {
      result[result.length - 1].push(m.callbackButton(localeName, localeCode))
      if (index < locales.length - 1) {
        result.push([])
      }
    }
  })
  return m.inlineKeyboard(result)
}

function localesFiles() {
  return readdirSync(`${__dirname}/../../locales`)
}

export const locales = localesFiles().map(file => file.split('.')[0])
