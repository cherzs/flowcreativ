import { z } from 'zod'

import {
  CHALLENGE_OPTIONS,
  CURRENT_SYSTEM_OPTIONS,
  DEPARTMENT_OPTIONS,
  EMPLOYEE_OPTIONS,
  type ReadinessLocale,
} from '@/lib/erp-readiness'

const validationMessages: Record<
  ReadinessLocale,
  {
    employees: string
    currentSystem: string
    challenges: string
    departments: string
  }
> = {
  en: {
    employees: 'Please select number of employees',
    currentSystem: 'Please select current system',
    challenges: 'Select at least one main challenge',
    departments: 'Please select number of departments',
  },
  id: {
    employees: 'Pilih jumlah karyawan',
    currentSystem: 'Pilih sistem yang digunakan saat ini',
    challenges: 'Pilih minimal satu tantangan utama',
    departments: 'Pilih jumlah departemen',
  },
}

export function createERPReadinessSchema(locale: ReadinessLocale = 'en') {
  const messages = validationMessages[locale]

  return z.object({
    employees: z.enum(EMPLOYEE_OPTIONS, {
      required_error: messages.employees,
    }),
    currentSystem: z.enum(CURRENT_SYSTEM_OPTIONS, {
      required_error: messages.currentSystem,
    }),
    challenges: z
      .array(z.enum(CHALLENGE_OPTIONS))
      .min(1, messages.challenges),
    departments: z.enum(DEPARTMENT_OPTIONS, {
      required_error: messages.departments,
    }),
  })
}

export const erpReadinessSchema = createERPReadinessSchema('en')

export type ERPReadinessFormValues = z.infer<typeof erpReadinessSchema>
