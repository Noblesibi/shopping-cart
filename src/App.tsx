import { useProducts } from './hooks/useProducts'
import { ProductGrid } from './components/ProductGrid'
import { LoadingState } from './components/LoadingState'
import { ErrorMessage } from './components/ErrorMessage'
import { EmptyState } from './components/EmptyState'

function App() {
  const { data: products, isPending, isError, error, refetch } = useProducts()

  // Pick what to show based on the query's state.
  function renderContent() {
    if (isPending) return <LoadingState />
    if (isError) return <ErrorMessage message={error.message} onRetry={() => refetch()} />
    if (products.length === 0) return <EmptyState />
    return <ProductGrid products={products} />
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
