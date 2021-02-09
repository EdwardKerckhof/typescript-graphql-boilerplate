'use strict'
import nodemailer from 'nodemailer'

export async function sendEmail(
  to: string,
  html: string,
  subject: string
): Promise<boolean> {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount()

  // Log test account to get password and hardcode it in to not
  // spam the nodemailer servers
  console.log('testAccount', testAccount)

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'q4a7et4sr64livw7@ethereal.email', // generated ethereal user
      pass: '7D9msfaeTpwWM27hGb' // generated ethereal password
    }
  })

  // send mail with defined transport object
  const from = 'Essentials <noreply@essentials.com>'
  const info = await transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    html // html body
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

  return true
}
