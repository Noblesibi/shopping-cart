import { useProducts } from './hooks/useProducts'
import { useProductFilters } from './hooks/useProductFilters'
import { ProductGrid } from './components/ProductGrid'
import { LoadingState } from './components/LoadingState'
import { ErrorMessage } from './components/ErrorMessage'
import { EmptyState } from './components/EmptyState'
import { Filters } from './components/Filters'
import { NoResults } from './components/NoResults'

function App() {
  const { data: products = [], isPending, isError, error, refetch } = useProducts()
  const filters = useProductFilters(products)

  // Pick what to show based on the query's state.
  function renderContent() {
    if (isPending) return <LoadingState />
    if (isError) return <ErrorMessage message={error.message} onRetry={() => refetch()} />
    if (products.length === 0) return <EmptyState />
    return (
      <>
        <Filters filters={filters} />
        {filters.filteredProducts.length === 0 ? (
          <NoResults onClear={filters.clearFilters} />
        ) : (
          <ProductGrid products={filters.filteredProducts} />
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <h1 className="text-xl font-bold">ShopCart</h1>
          <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">Cart (0)</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-4">{renderContent()}</main>
    </div>
  )
}

export default App
