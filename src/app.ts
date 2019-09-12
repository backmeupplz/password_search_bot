// Config dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
// Dependencies
import Telegraf from 'telegraf'
import { attachUser } from './middlewares/attachUser'
import { checkLanguage } from './middlewares/checkLanguage'
import { i18n, attachI18N } from './middlewares/i18n'
import {
  sendLanguageKeyboard,
  selectLanguage,
  locales,
} from './commands/language'
import { sendHelp } from './commands/help'
import { emailRegex } from './helpers/emailRegex'
import {
  startEmailValidation,
  validateEmail,
  deleteEmail,
} from './commands/email'
import { cancel } from './commands/cancel'
import { checkSubscription } from './middlewares/checkSubscription'
import { checkBan } from './middlewares/checkBan'
import { addPasswords } from './models'

// Setup bot
const bot = new Telegraf(process.env.TOKEN)
bot.catch(console.log)
// Middlewares
bot.use(attachUser)
bot.use(i18n.middleware())
bot.use(attachI18N)
bot.use(checkLanguage)
bot.use(checkBan)
// Commands
bot.command('language', sendLanguageKeyboard)
bot.command(['start', 'help'], sendHelp)
bot.command('cancel', cancel)
bot.command('add', async ctx => {
  await addPasswords()
  ctx.reply('cool')
})
// Emails
bot.use(checkSubscription)
bot.hears(emailRegex, startEmailValidation)
bot.hears(/^\d\d\d\d\d\d$/i, validateEmail)
// Replies
bot.action(locales, selectLanguage)
bot.action('delete', deleteEmail)
// Launch
bot.launch().then(() => console.log('Bot is up'))
