export function LoadingState() {
  return (
    <div className="flex flex-col items-center py-20" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      <p className="mt-4 text-gray-600">Loading products...</p>
    </div>
  )
}
