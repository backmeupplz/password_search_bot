// Dependencies
import { ContextMessageUpdate } from 'telegraf'

export async function checkSubscription(
  ctx: ContextMessageUpdate,
  next: Function
) {
  const goldenBorodutchId = -1001137138222
  try {
    const member = await ctx.telegram.getChatMember(
      goldenBorodutchId,
      ctx.from.id
    )
    if (['member', 'creator', 'administrator'].includes(member.status)) {
      return next()
    } else {
      return ctx.reply(ctx.i18n.t('subscription'))
    }
  } catch (err) {
    return ctx.reply(ctx.i18n.t('subscription'))
  }
}
