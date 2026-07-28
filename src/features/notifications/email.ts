import { Resend } from 'resend'
import { env } from '@/lib/env/server'
import { log } from '@/lib/logging'

export interface EmailMessage {
  to: string
  subject: string
  html: string
  text: string
}

export async function sendEmail(message: EmailMessage) {
  if (env.EMAIL_MODE === 'console') {
    log('info', 'email.preview', { to: message.to, subject: message.subject })
    return { mode: 'console' as const }
  }
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    throw new Error('Resend mode requires RESEND_API_KEY and RESEND_FROM_EMAIL')
  }
  const resend = new Resend(env.RESEND_API_KEY)
  const result = await resend.emails.send({
    from: `${env.RESEND_FROM_NAME} <${env.RESEND_FROM_EMAIL}>`,
    ...message,
  })
  return { mode: 'resend' as const, id: result.data?.id }
}

export function brandedEmail(title: string, body: string) {
  const escaped = body
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
  return {
    html: `<div style="font-family:Inter,Arial,sans-serif;max-width:580px;margin:auto;color:#18181b"><div style="padding:24px 0;font-weight:700">AppLedger</div><h1 style="font-size:24px">${title}</h1><p style="line-height:1.6">${escaped}</p></div>`,
    text: `AppLedger\n\n${title}\n\n${body}`,
  }
}
