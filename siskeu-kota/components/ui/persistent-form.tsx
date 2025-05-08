"use client"

import type React from "react"

import { useEffect } from "react"
import { useForm, type UseFormReturn, type FieldValues, type DefaultValues } from "react-hook-form"

interface PersistentFormProps<TFieldValues extends FieldValues> {
  id: string
  defaultValues: DefaultValues<TFieldValues>
  children: (form: UseFormReturn<TFieldValues>) => React.ReactNode
  onSubmit: (data: TFieldValues) => Promise<void>
}

export function PersistentForm<TFieldValues extends FieldValues>({
  id,
  defaultValues,
  children,
  onSubmit,
}: PersistentFormProps<TFieldValues>) {
  const form = useForm<TFieldValues>({
    defaultValues,
  })

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`form_${id}`)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        Object.keys(parsedData).forEach((key) => {
          form.setValue(key as any, parsedData[key])
        })
      } catch (e) {
        console.error("Error parsing saved form data:", e)
      }
    }
  }, [form, id])

  // Save form data on change
  useEffect(() => {
    const subscription = form.watch((values) => {
      localStorage.setItem(`form_${id}`, JSON.stringify(values))
    })

    return () => subscription.unsubscribe()
  }, [form, id])

  // Clear saved data on successful submission
  const handleSubmit = async (data: TFieldValues) => {
    try {
      await onSubmit(data)
      localStorage.removeItem(`form_${id}`)
      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return <form onSubmit={form.handleSubmit(handleSubmit)}>{children(form)}</form>
}
