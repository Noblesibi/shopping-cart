import type { useProductFilters } from '../hooks/useProductFilters'

type FiltersProps = {
  filters: ReturnType<typeof useProductFilters>
}

const inputClass = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2'

export function Filters({ filters }: FiltersProps) {
  return (
    <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <input
        type="search"
        placeholder="Search products..."
        value={filters.search}
        onChange={(e) => filters.setSearch(e.target.value)}
        className={`${inputClass} lg:col-span-2`}
        aria-label="Search by title"
      />
      <select
        value={filters.category}
        onChange={(e) => filters.setCategory(e.target.value)}
        className={inputClass}
        aria-label="Filter by category"
      >
        <option value="">All categories</option>
        {filters.categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <input
          type="number"
          min="0"
          placeholder="Min $"
          value={filters.minPrice}
          onChange={(e) => filters.setMinPrice(e.target.value)}
          className={inputClass}
          aria-label="Minimum price"
        />
        <input
          type="number"
          min="0"
          placeholder="Max $"
          value={filters.maxPrice}
          onChange={(e) => filters.setMaxPrice(e.target.value)}
          className={inputClass}
          aria-label="Maximum price"
        />
      </div>
      <button
        type="button"
        onClick={filters.clearFilters}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 hover:bg-gray-100"
      >
        Clear all filters
      </button>
    </section>
  )
}
