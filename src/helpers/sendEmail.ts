// Dependencies
import * as nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function send(numbers: number, email: string) {
  await transport.sendMail({
    from: '"No Reply" <noreply@passwordsear.ch>',
    to: email,
    subject: 'Somebody requested your leaked passwords',
    text: `Somebody requested your leaked passwords at https://t.me/password_search_bot. Please, ignore this message if you have not requested the passwords. Do not tell the below numbers to anyone except https://t.me/password_search_bot. Use the numbers below to verify your email. Do not reply to this email, we do not monitor incoming mail. Cheers!\n\n${numbers}`,
    html: `Somebody requested your leaked passwords at <a href="https://t.me/password_search_bot>@password_search_bot</a>. Please, ignore this message if you have not requested the passwords. Do not tell the below numbers to anyone except <a href="https://t.me/password_search_bot>@password_search_bot</a>. Use the numbers below to verify your email. Do not reply to this email, we do not monitor incoming mail. Cheers!<br><br><b>${numbers}</b>`,
  })
}
