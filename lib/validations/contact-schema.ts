import { z } from 'zod'

// Phone regex: Indonesian format +62 or international
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s\-\'\.]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(100, 'Email must not exceed 100 characters')
    .toLowerCase(),

  phone: z
    .string()
    .regex(phoneRegex, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),

  company: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  service: z.enum([
    'it-consulting',
    'web-development',
    'odoo-erp',
    'mobile-apps',
    'ui-ux-design',
    'cyber-security',
    'server-setup',
    'api-development',
  ], {
    required_error: 'Please select a service',
    invalid_type_error: 'Invalid service selected',
  }),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
