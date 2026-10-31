type ErrorMessageProps = {
  message: string
  onRetry: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center" role="alert">
      <h2 className="font-semibold text-red-700">Something went wrong</h2>
      <p className="mt-2 text-sm text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  )
}
