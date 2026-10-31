import type { ShippingErrors, ShippingInfo } from '../../schemas/shipping'
import { FormField } from './FormField'

type ShippingFormProps = {
  values: ShippingInfo
  errors: ShippingErrors
  onChange: (field: keyof ShippingInfo, value: string) => void
}

// Controlled form: values and errors live in the parent (Checkout).
export function ShippingForm({ values, errors, onChange }: ShippingFormProps) {
  return (
    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
      <FormField
        id="fullName"
        label="Full name"
        autoComplete="name"
        value={values.fullName}
        error={errors.fullName}
        onChange={(v) => onChange('fullName', v)}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={(v) => onChange('email', v)}
      />
      <FormField
        id="phone"
        label="Phone"
        type="tel"
        autoComplete="tel"
        value={values.phone}
        error={errors.phone}
        onChange={(v) => onChange('phone', v)}
      />
      <FormField
        id="address"
        label="Address"
        autoComplete="street-address"
        value={values.address}
        error={errors.address}
        onChange={(v) => onChange('address', v)}
      />
      <FormField
        id="city"
        label="City"
        autoComplete="address-level2"
        value={values.city}
        error={errors.city}
        onChange={(v) => onChange('city', v)}
      />
      <FormField
        id="postalCode"
        label="Postal code"
        autoComplete="postal-code"
        value={values.postalCode}
        error={errors.postalCode}
        onChange={(v) => onChange('postalCode', v)}
      />
    </div>
  )
}
