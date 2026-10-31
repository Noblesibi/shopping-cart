import { useState } from 'react'
import { useProducts } from './hooks/useProducts'
import { useProductFilters } from './hooks/useProductFilters'
import { ProductGrid } from './components/ProductGrid'
import { LoadingState } from './components/LoadingState'
import { ErrorMessage } from './components/ErrorMessage'
import { EmptyState } from './components/EmptyState'
import { Filters } from './components/Filters'
import { NoResults } from './components/NoResults'
import { CartPanel } from './components/CartPanel'
import { Checkout } from './components/checkout/Checkout'
import { useCartCount } from './store/cartStore'

function App() {
  const { data: products = [], isPending, isError, error, refetch } = useProducts()
  const filters = useProductFilters(products)
  const cartCount = useCartCount()
  const [isCartOpen, setIsCartOpen] = useState(false) // UI-only state, so it stays out of Zustand
  const [view, setView] = useState<'shop' | 'checkout'>('shop')

  function goToCheckout() {
    setIsCartOpen(false)
    setView('checkout')
  }

  // Pick what to show based on the current view and the query's state.
  function renderContent() {
    if (view === 'checkout') return <Checkout onBackToShop={() => setView('shop')} />
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
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open cart, ${cartCount} items`}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Cart ({cartCount})
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-4">{renderContent()}</main>
      {isCartOpen && <CartPanel onClose={() => setIsCartOpen(false)} onCheckout={goToCheckout} />}
    </div>
  )
}

export default App
