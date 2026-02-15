'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact-schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface ContactFormProps {
  dictionary: {
    fields: {
      fullName: { label: string; placeholder: string }
      email: { label: string; placeholder: string }
      phone: { label: string; placeholder: string }
      company: { label: string; placeholder: string }
      service: {
        label: string
        placeholder: string
        options: Record<string, string>
      }
      message: { label: string; placeholder: string }
    }
    submit: string
    submitting: string
    success: string
    error: string
  }
  lang: string
}

export function ContactForm({ dictionary, lang }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      service: undefined,
      message: '',
    },
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/contact?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.code === 'RATE_LIMIT_EXCEEDED') {
          toast.error(
            lang === 'id'
              ? 'Terlalu banyak permintaan. Silakan coba lagi nanti.'
              : 'Too many requests. Please try again later.'
          )
        } else if (result.code === 'VALIDATION_ERROR') {
          toast.error(
            lang === 'id'
              ? 'Data tidak valid. Periksa kembali formulir Anda.'
              : 'Invalid data. Please check your form.'
          )
        } else {
          toast.error(dictionary.error)
        }
        return
      }

      // Success
      toast.success(dictionary.success)
      form.reset()

    } catch (error) {
      console.error('Form submission error:', error)
      toast.error(dictionary.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.fields.fullName.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={dictionary.fields.fullName.placeholder}
                  className="bg-white border-neutral-300 focus:border-purple-500/50"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.fields.email.label}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={dictionary.fields.email.placeholder}
                  className="bg-white border-neutral-300 focus:border-purple-500/50"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.fields.phone.label}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={dictionary.fields.phone.placeholder}
                  className="bg-white border-neutral-300 focus:border-purple-500/50"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.fields.company.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={dictionary.fields.company.placeholder}
                  className="bg-white border-neutral-300 focus:border-purple-500/50"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service */}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.fields.service.label}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="bg-white border-neutral-300 text-neutral-700 placeholder:text-neutral-400 focus:border-purple-500/50 rounded-full h-12 px-4">
                    <SelectValue placeholder={dictionary.fields.service.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-neutral-200 text-neutral-800 rounded-xl shadow-lg">
                  {Object.entries(dictionary.fields.service.options).map(([value, label]) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="text-neutral-700 rounded-md px-3 py-2 data-[highlighted]:bg-purple-600 data-[highlighted]:text-white data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.fields.message.label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={dictionary.fields.message.placeholder}
                  className="min-h-[150px] bg-white border-neutral-300 focus:border-purple-500/50 resize-none"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="pill"
          className="w-full h-12 text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {dictionary.submitting}
            </>
          ) : (
            dictionary.submit
          )}
        </Button>
      </form>
    </Form>
  )
}
