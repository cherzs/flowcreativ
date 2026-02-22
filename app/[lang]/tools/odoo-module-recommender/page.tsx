'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BUSINESS_CATEGORY_LABELS,
  BUSINESS_CATEGORY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  INDUSTRY_LABELS,
  INDUSTRY_OPTIONS_BY_CATEGORY,
  PAIN_POINT_LABELS,
  PAIN_POINT_OPTIONS,
  getOdooRecommendation,
  type RecommendationLocale,
  type OdooRecommendation,
} from '@/lib/odoo-recommendation'
import {
  createOdooRecommenderSchema,
  type OdooRecommenderFormValues,
} from '@/lib/validations/odoo-recommender-schema'

const copy = {
  id: {
    title: 'Odoo Module Recommender',
    subtitle:
      'Isi profil bisnis Anda untuk mendapatkan rekomendasi modul ERP yang relevan dan praktis.',
    labels: {
      businessCategory: 'Kategori Bisnis (Langkah 1)',
      industry: 'Sub-tipe Industri (Langkah 2)',
      companySize: 'Ukuran Perusahaan',
      painPoint: 'Pain Point Utama',
      helper:
        'Pilihan sub-tipe industri disaring berdasarkan kategori bisnis yang Anda pilih.',
      categoryPlaceholder: 'Pilih kategori',
      industryPlaceholder: 'Pilih sub-tipe industri',
      industryPlaceholderDisabled: 'Pilih kategori terlebih dahulu',
      sizePlaceholder: 'Pilih ukuran',
      submit: 'Lihat Rekomendasi',
      resultTitle: 'Hasil Rekomendasi',
      resultDescription:
        'Saran modul dan urutan implementasi berdasarkan input bisnis Anda.',
      modules: 'Modul Rekomendasi',
      explanation: 'Penjelasan',
      priority: 'Prioritas Implementasi',
      cta: 'Jadwalkan Konsultasi ERP Gratis',
    },
  },
  en: {
    title: 'Odoo Module Recommender',
    subtitle:
      'Fill in your business profile to get a practical and relevant ERP module recommendation.',
    labels: {
      businessCategory: 'Business Category (Step 1)',
      industry: 'Industry Sub-type (Step 2)',
      companySize: 'Company Size',
      painPoint: 'Main Pain Point',
      helper: 'Industry sub-type options are filtered by the selected business category.',
      categoryPlaceholder: 'Select category',
      industryPlaceholder: 'Select industry sub-type',
      industryPlaceholderDisabled: 'Select category first',
      sizePlaceholder: 'Select size',
      submit: 'Get Recommendation',
      resultTitle: 'Recommendation Result',
      resultDescription:
        'Suggested modules and implementation sequence based on your inputs.',
      modules: 'Recommended Modules',
      explanation: 'Explanation',
      priority: 'Suggested Implementation Priority',
      cta: 'Book Free ERP Consultation',
    },
  },
} as const

export default function OdooModuleRecommenderPage() {
  const params = useParams<{ lang: string }>()
  const lang: RecommendationLocale = params.lang === 'id' ? 'id' : 'en'
  const localizedCopy = copy[lang]

  const schema = useMemo(() => createOdooRecommenderSchema(lang), [lang])
  const [recommendation, setRecommendation] = useState<OdooRecommendation | null>(
    null,
  )

  const form = useForm<OdooRecommenderFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      businessCategory: undefined,
      industry: undefined,
      companySize: undefined,
      painPoint: undefined,
    },
  })

  const selectedCategory = form.watch('businessCategory')
  const industryOptions = selectedCategory
    ? INDUSTRY_OPTIONS_BY_CATEGORY[selectedCategory]
    : []

  function onSubmit(values: OdooRecommenderFormValues) {
    const result = getOdooRecommendation(
      values.industry,
      values.companySize,
      values.painPoint,
      lang,
    )
    setRecommendation(result)
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-14 text-foreground">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{localizedCopy.title}</CardTitle>
              <CardDescription>{localizedCopy.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid items-start gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="businessCategory"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>{localizedCopy.labels.businessCategory}</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              if (field.value !== value) {
                                form.resetField('industry')
                              }
                              field.onChange(value)
                            }}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={localizedCopy.labels.categoryPlaceholder}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {BUSINESS_CATEGORY_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {BUSINESS_CATEGORY_LABELS[lang][option]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>{localizedCopy.labels.industry}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!selectedCategory}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={
                                    selectedCategory
                                      ? localizedCopy.labels.industryPlaceholder
                                      : localizedCopy.labels.industryPlaceholderDisabled
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industryOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {INDUSTRY_LABELS[lang][option]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <p className="text-sm leading-relaxed text-muted-foreground md:col-span-2">
                      {localizedCopy.labels.helper}
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{localizedCopy.labels.companySize}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full md:max-w-sm">
                              <SelectValue
                                placeholder={localizedCopy.labels.sizePlaceholder}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COMPANY_SIZE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="painPoint"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{localizedCopy.labels.painPoint}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid gap-3 sm:grid-cols-2"
                          >
                            {PAIN_POINT_OPTIONS.map((painPoint) => {
                              const id = `pain-${painPoint
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')}`

                              return (
                                <label
                                  key={painPoint}
                                  htmlFor={id}
                                  className="flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-accent"
                                >
                                  <RadioGroupItem id={id} value={painPoint} />
                                  <span>{PAIN_POINT_LABELS[lang][painPoint]}</span>
                                </label>
                              )
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full sm:w-auto">
                    {localizedCopy.labels.submit}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {recommendation ? (
            <Card>
              <CardHeader>
                <CardTitle>{localizedCopy.labels.resultTitle}</CardTitle>
                <CardDescription>{localizedCopy.labels.resultDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <section className="space-y-3">
                  <h2 className="text-sm font-semibold tracking-wide uppercase">
                    {localizedCopy.labels.modules}
                  </h2>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {recommendation.modules.map((module) => (
                      <li
                        key={module}
                        className="rounded-md border bg-muted/40 px-3 py-2 text-sm"
                      >
                        {module}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-2">
                  <h2 className="text-sm font-semibold tracking-wide uppercase">
                    {localizedCopy.labels.explanation}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {recommendation.explanation}
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-sm font-semibold tracking-wide uppercase">
                    {localizedCopy.labels.priority}
                  </h2>
                  <ol className="space-y-2">
                    {recommendation.priority.map((item, index) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full sm:w-auto">
                  <Link href={`/${lang}/contact`}>{localizedCopy.labels.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : null}
        </div>
      </div>
    </main>
  )
}
