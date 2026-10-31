import { z } from 'zod'

const required = (label: string) => z.string().trim().min(1, `${label} is required`)

export const ShippingSchema = z.object({
  fullName: required('Full name'),
  email: required('Email').pipe(z.email('Enter a valid email address')),
  phone: required('Phone'),
  address: required('Address'),
  city: required('City'),
  postalCode: required('Postal code'),
})

export type ShippingInfo = z.infer<typeof ShippingSchema>

// One optional message per field, e.g. { email: 'Enter a valid email address' }.
export type ShippingErrors = Partial<Record<keyof ShippingInfo, string>>

export const EMPTY_SHIPPING: ShippingInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

// Turn Zod's error into the first message for each field.
export function getShippingErrors(error: z.ZodError<ShippingInfo>): ShippingErrors {
  const fieldErrors = z.flattenError(error).fieldErrors
  const errors: ShippingErrors = {}
  for (const field of Object.keys(fieldErrors) as (keyof ShippingInfo)[]) {
    errors[field] = fieldErrors[field]?.[0]
  }
  return errors
}
