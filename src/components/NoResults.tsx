type NoResultsProps = {
  onClear: () => void
}

// Shown when products loaded fine but none match the current filters.
export function NoResults({ onClear }: NoResultsProps) {
  return (
    <div className="py-20 text-center">
      <p className="text-gray-600">No products match your filters.</p>
      <button type="button" onClick={onClear} className="mt-3 text-blue-600 hover:underline">
        Clear filters
      </button>
    </div>
  )
}
