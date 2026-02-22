'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
  CHALLENGE_LABELS,
  CHALLENGE_OPTIONS,
  CURRENT_SYSTEM_LABELS,
  CURRENT_SYSTEM_OPTIONS,
  DEPARTMENT_OPTIONS,
  EMPLOYEE_OPTIONS,
  calculateReadinessScore,
  type ReadinessLocale,
  type ERPReadinessResult,
} from '@/lib/erp-readiness'
import {
  createERPReadinessSchema,
  type ERPReadinessFormValues,
} from '@/lib/validations/erp-readiness-schema'

const copy = {
  id: {
    eyebrow: 'ERP Assessment',
    title: 'ERP Readiness Checker',
    subtitle:
      'Evaluasi kesiapan organisasi Anda sebelum implementasi ERP penuh dengan scoring model terstruktur.',
    labels: {
      employees: 'Jumlah Karyawan',
      currentSystem: 'Sistem Saat Ini',
      challenges: 'Tantangan Utama',
      departments: 'Jumlah Departemen',
      runAssessment: 'Hitung Readiness Score',
      score: 'Readiness Score',
      cta: 'Jadwalkan Konsultasi ERP Gratis',
      level: {
        Low: 'Rendah',
        Moderate: 'Menengah',
        High: 'Tinggi',
      },
      scoreNote:
        'Skor dihitung dari ukuran organisasi, kematangan sistem, kompleksitas lintas fungsi, dan challenge operasional.',
      placeholder:
        'Isi form assessment untuk melihat skor readiness, level, dan ringkasan rekomendasi.',
      notAssessed: 'Belum Dinilai',
    },
  },
  en: {
    eyebrow: 'ERP Assessment',
    title: 'ERP Readiness Checker',
    subtitle:
      'Assess your organization readiness before full ERP implementation using a structured scoring model.',
    labels: {
      employees: 'Number of Employees',
      currentSystem: 'Current System',
      challenges: 'Main Challenges',
      departments: 'Number of Departments',
      runAssessment: 'Calculate Readiness Score',
      score: 'Readiness Score',
      cta: 'Book Free ERP Consultation',
      level: {
        Low: 'Low',
        Moderate: 'Moderate',
        High: 'High',
      },
      scoreNote:
        'Score is calculated from organization size, system maturity, cross-functional complexity, and operational challenge signals.',
      placeholder:
        'Complete the assessment form to view readiness score, level, and recommendation summary.',
      notAssessed: 'Not Assessed',
    },
  },
} as const

function getLevelBadgeStyle(level: ERPReadinessResult['level']) {
  if (level === 'High') {
    return 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
  }

  if (level === 'Moderate') {
    return 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
  }

  return 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
}

export default function ERPReadinessPage() {
  const params = useParams<{ lang: string }>()
  const lang: ReadinessLocale = params.lang === 'id' ? 'id' : 'en'
  const localizedCopy = copy[lang]
  const schema = useMemo(() => createERPReadinessSchema(lang), [lang])

  const [result, setResult] = useState<ERPReadinessResult | null>(null)

  const form = useForm<ERPReadinessFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      employees: undefined,
      currentSystem: undefined,
      challenges: [],
      departments: undefined,
    },
  })

  function onSubmit(values: ERPReadinessFormValues) {
    setResult(calculateReadinessScore(values, lang))
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-14 text-foreground">
      <div className="container mx-auto max-w-6xl px-4">
        <Card className="border-border/80 shadow-[0_24px_64px_rgba(17,17,17,0.08)]">
          <CardHeader className="border-b border-border/70">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {localizedCopy.eyebrow}
            </p>
            <CardTitle className="text-2xl md:text-3xl">{localizedCopy.title}</CardTitle>
            <CardDescription className="max-w-3xl text-sm md:text-base">
              {localizedCopy.subtitle}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="employees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{localizedCopy.labels.employees}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={localizedCopy.labels.employees} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EMPLOYEE_OPTIONS.map((option) => (
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
                    name="departments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{localizedCopy.labels.departments}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={localizedCopy.labels.departments} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DEPARTMENT_OPTIONS.map((option) => (
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
                </div>

                <FormField
                  control={form.control}
                  name="currentSystem"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{localizedCopy.labels.currentSystem}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid gap-3"
                        >
                          {CURRENT_SYSTEM_OPTIONS.map((option) => {
                            const id = `system-${option
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')}`

                            return (
                              <label
                                key={option}
                                htmlFor={id}
                                className="flex cursor-pointer items-center gap-3 rounded-md border border-border/80 px-3 py-2 text-sm transition-colors hover:bg-accent"
                              >
                                <RadioGroupItem id={id} value={option} />
                                <span>{CURRENT_SYSTEM_LABELS[lang][option]}</span>
                              </label>
                            )
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="challenges"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{localizedCopy.labels.challenges}</FormLabel>
                      <FormControl>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {CHALLENGE_OPTIONS.map((challenge) => {
                            const id = `challenge-${challenge
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')}`
                            const selected = field.value?.includes(challenge)

                            return (
                              <label
                                key={challenge}
                                htmlFor={id}
                                className="flex cursor-pointer items-center gap-3 rounded-md border border-border/80 px-3 py-2 text-sm transition-colors hover:bg-accent"
                              >
                                <Checkbox
                                  id={id}
                                  checked={selected}
                                  onCheckedChange={(checked) => {
                                    const isChecked = checked === true
                                    const currentValue = field.value ?? []

                                    if (isChecked) {
                                      field.onChange(
                                        currentValue.includes(challenge)
                                          ? currentValue
                                          : [...currentValue, challenge],
                                      )
                                      return
                                    }

                                    field.onChange(
                                      currentValue.filter(
                                        (item) => item !== challenge,
                                      ),
                                    )
                                  }}
                                />
                                <span>{CHALLENGE_LABELS[lang][challenge]}</span>
                              </label>
                            )
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full sm:w-auto">
                  {localizedCopy.labels.runAssessment}
                </Button>
              </form>
            </Form>

            <div className="rounded-2xl border border-border/80 bg-muted/30 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {localizedCopy.labels.score}
              </p>
              <div className="mt-3 flex items-end gap-3">
                <p className="text-5xl font-semibold tracking-tight">
                  {result ? result.score : '--'}
                </p>
                <p className="mb-1 text-sm text-muted-foreground">/100</p>
              </div>

              {result ? (
                <Badge
                  variant="outline"
                  className={`mt-4 px-3 py-1 text-xs uppercase tracking-[0.12em] ${getLevelBadgeStyle(
                    result.level,
                  )}`}
                >
                  {localizedCopy.labels.level[result.level]}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="mt-4 px-3 py-1 text-xs uppercase tracking-[0.12em]"
                >
                  {localizedCopy.labels.notAssessed}
                </Badge>
              )}

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {result ? result.summary : localizedCopy.labels.placeholder}
              </p>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {localizedCopy.labels.scoreNote}
              </p>

              <Button asChild className="mt-6 w-full">
                <Link href={`/${lang}/contact`}>{localizedCopy.labels.cta}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
