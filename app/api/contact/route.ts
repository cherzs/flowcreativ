import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/validations/contact-schema'
import {
  getNotificationEmailHtml,
  getNotificationEmailText
} from '@/lib/email/notification-template'
import {
  getAutoReplyEmailHtml,
  getAutoReplyEmailText
} from '@/lib/email/auto-reply-template'
import { z } from 'zod'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

// Rate limiting: Simple in-memory store (use Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const limit = 5 // 5 requests
  const window = 60 * 60 * 1000 // per hour

  const record = rateLimit.get(ip)

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + window })
    return { allowed: true, remaining: limit - 1 }
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: limit - record.count }
}

// Sanitize input to prevent XSS
function sanitizeInput(value: string): string {
  return value
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimit.get(ip)?.resetTime || Date.now()),
          }
        }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate with Zod
    const validationResult = contactFormSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Sanitize all string inputs
    const sanitizedData = {
      ...data,
      fullName: sanitizeInput(data.fullName),
      email: data.email.toLowerCase(),
      phone: data.phone ? sanitizeInput(data.phone) : undefined,
      company: data.company ? sanitizeInput(data.company) : undefined,
      message: sanitizeInput(data.message),
    }

    // Get language from request (optional query param)
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') === 'id' ? 'id' : 'en'

    const resend = getResendClient()
    if (!resend) {
      return NextResponse.json(
        {
          error: 'Email service is not configured. Please contact us directly.',
          code: 'EMAIL_NOT_CONFIGURED'
        },
        { status: 503 }
      )
    }

    // Email configuration
    const salesEmail = process.env.SALES_EMAIL || 'sales@flowcreativ.com'
    const ccEmails = (process.env.CC_EMAILS || '').split(',').filter(Boolean)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@flowcreativ.com'

    // Send emails in parallel
    const [notificationResult, autoReplyResult] = await Promise.allSettled([
      // 1. Send notification to sales team
      resend.emails.send({
        from: fromEmail,
        to: salesEmail,
        cc: ccEmails,
        subject: `New Contact Form: ${sanitizedData.fullName} - ${sanitizedData.service}`,
        html: getNotificationEmailHtml(sanitizedData),
        text: getNotificationEmailText(sanitizedData),
        replyTo: sanitizedData.email,
      }),

      // 2. Send auto-reply to customer
      resend.emails.send({
        from: fromEmail,
        to: sanitizedData.email,
        subject: lang === 'id'
          ? 'Terima kasih telah menghubungi FlowCreativ'
          : 'Thank you for contacting FlowCreativ',
        html: getAutoReplyEmailHtml(sanitizedData, lang),
        text: getAutoReplyEmailText(sanitizedData, lang),
      }),
    ])

    // Check if both emails sent successfully
    const notificationSuccess = notificationResult.status === 'fulfilled'
    const autoReplySuccess = autoReplyResult.status === 'fulfilled'

    if (!notificationSuccess && !autoReplySuccess) {
      console.error('Both emails failed:', {
        notification: notificationResult,
        autoReply: autoReplyResult,
      })

      return NextResponse.json(
        {
          error: 'Failed to send emails. Please try again or contact us directly.',
          code: 'EMAIL_SEND_FAILED'
        },
        { status: 500 }
      )
    }

    // Log warnings if only one email failed
    if (!notificationSuccess) {
      console.warn('Notification email failed:', notificationResult)
    }
    if (!autoReplySuccess) {
      console.warn('Auto-reply email failed:', autoReplyResult)
    }

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
        emailsSent: {
          notification: notificationSuccess,
          autoReply: autoReplySuccess,
        }
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        }
      }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    // Check if it's a Zod validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
