import { ContactFormData } from '@/lib/validations/contact-schema'

export function getNotificationEmailHtml(data: ContactFormData) {
  const serviceLabels: Record<string, string> = {
    'it-consulting': 'IT Consulting',
    'web-development': 'Web Development',
    'odoo-erp': 'Odoo ERP',
    'mobile-apps': 'Mobile Apps',
    'ui-ux-design': 'UI/UX Design',
    'cyber-security': 'Cyber Security',
    'server-setup': 'Server Setup',
    'api-development': 'API Development',
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">FlowCreativ Website</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 18px; font-weight: 600;">Contact Details</h2>

              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; display: block; margin-bottom: 4px;">Full Name</strong>
                    <span style="color: #1f2937; font-size: 16px;">${data.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; display: block; margin-bottom: 4px;">Email</strong>
                    <a href="mailto:${data.email}" style="color: #6366f1; font-size: 16px; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; display: block; margin-bottom: 4px;">Phone</strong>
                    <a href="tel:${data.phone}" style="color: #6366f1; font-size: 16px; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                ` : ''}
                ${data.company ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; display: block; margin-bottom: 4px;">Company</strong>
                    <span style="color: #1f2937; font-size: 16px;">${data.company}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; display: block; margin-bottom: 4px;">Service Interest</strong>
                    <span style="color: #1f2937; font-size: 16px; display: inline-block; background-color: #f3f4f6; padding: 4px 12px; border-radius: 4px;">${serviceLabels[data.service]}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #6b7280; font-size: 14px; display: block; margin-bottom: 8px;">Message</strong>
                    <p style="margin: 0; color: #1f2937; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 6px; border-left: 4px solid #6366f1;">
                <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                  <strong>Quick Actions:</strong><br>
                  Reply directly to this email or contact ${data.fullName} at ${data.email}${data.phone ? ` or ${data.phone}` : ''}.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                This email was sent from the FlowCreativ contact form<br>
                Received on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
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

export function getNotificationEmailText(data: ContactFormData) {
  const serviceLabels: Record<string, string> = {
    'it-consulting': 'IT Consulting',
    'web-development': 'Web Development',
    'odoo-erp': 'Odoo ERP',
    'mobile-apps': 'Mobile Apps',
    'ui-ux-design': 'UI/UX Design',
    'cyber-security': 'Cyber Security',
    'server-setup': 'Server Setup',
    'api-development': 'API Development',
  }

  return `
New Contact Form Submission - FlowCreativ Website

CONTACT DETAILS
---------------

Full Name: ${data.fullName}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.company ? `Company: ${data.company}` : ''}
Service Interest: ${serviceLabels[data.service]}

MESSAGE
-------
${data.message}

---
Received on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
  `.trim()
}
