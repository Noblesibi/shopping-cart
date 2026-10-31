import { input } from '../../styles'

type FormFieldProps = {
  id: string
  label: string
  value: string
  error?: string
  type?: string
  autoComplete?: string
  onChange: (value: string) => void
}

// Label + input + error message, wired together for screen readers.
export function FormField({ id, label, value, error, type = 'text', autoComplete, onChange }: FormFieldProps) {
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${input} ${error ? 'border-red-500' : ''}`}
      />
      <p id={errorId} aria-live="polite" className="mt-1 min-h-5 text-sm text-red-600">
        {error}
      </p>
    </div>
  )
}
