import { z } from 'zod'

import {
  BUSINESS_CATEGORY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  INDUSTRY_OPTIONS,
  PAIN_POINT_OPTIONS,
  type RecommendationLocale,
  isIndustryInCategory,
} from '@/lib/odoo-recommendation'

const validationMessages: Record<
  RecommendationLocale,
  {
    businessCategory: string
    industry: string
    companySize: string
    painPoint: string
    industryMismatch: string
  }
> = {
  en: {
    businessCategory: 'Please select a business category',
    industry: 'Please select an industry',
    companySize: 'Please select a company size',
    painPoint: 'Please select a main pain point',
    industryMismatch: 'Please select an industry that matches the selected category',
  },
  id: {
    businessCategory: 'Pilih kategori bisnis terlebih dahulu',
    industry: 'Pilih sub-tipe industri',
    companySize: 'Pilih ukuran perusahaan',
    painPoint: 'Pilih pain point utama',
    industryMismatch: 'Pilih sub-tipe industri yang sesuai dengan kategori bisnis',
  },
}

export function createOdooRecommenderSchema(
  locale: RecommendationLocale = 'en',
) {
  const messages = validationMessages[locale]

  return z
    .object({
      businessCategory: z.enum(BUSINESS_CATEGORY_OPTIONS, {
        required_error: messages.businessCategory,
      }),
      industry: z.enum(INDUSTRY_OPTIONS, {
        required_error: messages.industry,
      }),
      companySize: z.enum(COMPANY_SIZE_OPTIONS, {
        required_error: messages.companySize,
      }),
      painPoint: z.enum(PAIN_POINT_OPTIONS, {
        required_error: messages.painPoint,
      }),
    })
    .superRefine((value, ctx) => {
      if (!isIndustryInCategory(value.businessCategory, value.industry)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['industry'],
          message: messages.industryMismatch,
        })
      }
    })
}

export const odooRecommenderSchema = createOdooRecommenderSchema('en')

export type OdooRecommenderFormValues = z.infer<typeof odooRecommenderSchema>
