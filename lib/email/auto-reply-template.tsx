import { ContactFormData } from '@/lib/validations/contact-schema'

export function getAutoReplyEmailHtml(data: ContactFormData, lang: 'en' | 'id' = 'en') {
  const content = {
    en: {
      greeting: `Hi ${data.fullName.split(' ')[0]},`,
      thanks: 'Thank you for contacting FlowCreativ!',
      received: 'We have received your message and our team will review it shortly.',
      response: 'You can expect a response from our team within 24 hours during business days.',
      summary: 'Here\'s a summary of what you sent us:',
      service: 'Service Interest',
      message: 'Your Message',
      questions: 'If you have any urgent questions, feel free to reach out to us directly at',
      regards: 'Best regards,',
      team: 'The FlowCreativ Team',
    },
    id: {
      greeting: `Halo ${data.fullName.split(' ')[0]},`,
      thanks: 'Terima kasih telah menghubungi FlowCreativ!',
      received: 'Kami telah menerima pesan Anda dan tim kami akan segera meninjaunya.',
      response: 'Anda dapat mengharapkan respons dari tim kami dalam 24 jam pada hari kerja.',
      summary: 'Berikut ringkasan pesan yang Anda kirimkan:',
      service: 'Layanan yang Diminati',
      message: 'Pesan Anda',
      questions: 'Jika Anda memiliki pertanyaan mendesak, jangan ragu untuk menghubungi kami langsung di',
      regards: 'Salam hormat,',
      team: 'Tim FlowCreativ',
    },
  }

  const t = content[lang]
  const serviceLabels: Record<string, { en: string; id: string }> = {
    'it-consulting': { en: 'IT Consulting', id: 'Konsultasi IT' },
    'web-development': { en: 'Web Development', id: 'Pengembangan Web' },
    'odoo-erp': { en: 'Odoo ERP', id: 'Odoo ERP' },
    'mobile-apps': { en: 'Mobile Apps', id: 'Aplikasi Mobile' },
    'ui-ux-design': { en: 'UI/UX Design', id: 'Desain UI/UX' },
    'ai-automation': { en: 'AI Solutions & Automation', id: 'Solusi AI & Otomasi' },
    'server-setup': { en: 'Server Setup', id: 'Setup Server' },
    'api-development': { en: 'API Development', id: 'Pengembangan API' },
  }

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.thanks}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">FlowCreativ</h1>
              <p style="margin: 12px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">${t.thanks}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 16px; color: #1f2937; font-size: 16px; line-height: 1.6;">${t.greeting}</p>

              <p style="margin: 0 0 16px; color: #1f2937; font-size: 16px; line-height: 1.6;">${t.received}</p>

              <p style="margin: 0 0 24px; color: #1f2937; font-size: 16px; line-height: 1.6;">${t.response}</p>

              <div style="padding: 20px; background-color: #f9fafb; border-radius: 6px; border-left: 4px solid #6366f1; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 16px; font-weight: 600;">${t.summary}</h3>
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">
                  <strong>${t.service}:</strong> ${serviceLabels[data.service][lang]}
                </p>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  <strong>${t.message}:</strong><br>
                  <span style="color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${data.message}</span>
                </p>
              </div>

              <p style="margin: 0 0 24px; color: #1f2937; font-size: 16px; line-height: 1.6;">
                ${t.questions} <a href="mailto:sales@flowcreativ.com" style="color: #6366f1; text-decoration: none;">sales@flowcreativ.com</a>.
              </p>

              <p style="margin: 0 0 8px; color: #1f2937; font-size: 16px;">${t.regards}</p>
              <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">${t.team}</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">
                <strong>FlowCreativ</strong><br>
                Sleman, Yogyakarta
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                <a href="mailto:sales@flowcreativ.com" style="color: #6366f1; text-decoration: none;">sales@flowcreativ.com</a> •
                <a href="tel:+6285161917939" style="color: #6366f1; text-decoration: none;">+62 851-6191-7939</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function getAutoReplyEmailText(data: ContactFormData, lang: 'en' | 'id' = 'en') {
  const content = {
    en: {
      greeting: `Hi ${data.fullName.split(' ')[0]},`,
      thanks: 'Thank you for contacting FlowCreativ!',
      received: 'We have received your message and our team will review it shortly.',
      response: 'You can expect a response from our team within 24 hours during business days.',
      summary: 'Here\'s a summary of what you sent us:',
      service: 'Service Interest',
      message: 'Your Message',
      questions: 'If you have any urgent questions, feel free to reach out to us directly at sales@flowcreativ.com.',
      regards: 'Best regards,\nThe FlowCreativ Team',
    },
    id: {
      greeting: `Halo ${data.fullName.split(' ')[0]},`,
      thanks: 'Terima kasih telah menghubungi FlowCreativ!',
      received: 'Kami telah menerima pesan Anda dan tim kami akan segera meninjaunya.',
      response: 'Anda dapat mengharapkan respons dari tim kami dalam 24 jam pada hari kerja.',
      summary: 'Berikut ringkasan pesan yang Anda kirimkan:',
      service: 'Layanan yang Diminati',
      message: 'Pesan Anda',
      questions: 'Jika Anda memiliki pertanyaan mendesak, jangan ragu untuk menghubungi kami langsung di sales@flowcreativ.com.',
      regards: 'Salam hormat,\nTim FlowCreativ',
    },
  }

  const t = content[lang]
  const serviceLabels: Record<string, { en: string; id: string }> = {
    'it-consulting': { en: 'IT Consulting', id: 'Konsultasi IT' },
    'web-development': { en: 'Web Development', id: 'Pengembangan Web' },
    'odoo-erp': { en: 'Odoo ERP', id: 'Odoo ERP' },
    'mobile-apps': { en: 'Mobile Apps', id: 'Aplikasi Mobile' },
    'ui-ux-design': { en: 'UI/UX Design', id: 'Desain UI/UX' },
    'ai-automation': { en: 'AI Solutions & Automation', id: 'Solusi AI & Otomasi' },
    'server-setup': { en: 'Server Setup', id: 'Setup Server' },
    'api-development': { en: 'API Development', id: 'Pengembangan API' },
  }

  return `
${t.greeting}

${t.thanks}

${t.received}

${t.response}

${t.summary}

${t.service}: ${serviceLabels[data.service][lang]}
${t.message}:
${data.message}

${t.questions}

${t.regards}

---
FlowCreativ
Sleman, Yogyakarta
sales@flowcreativ.com • +62 851-6191-7939
  `.trim()
}
