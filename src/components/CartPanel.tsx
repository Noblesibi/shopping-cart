import { useCartStore } from '../store/cartStore'
import { buttonDanger } from '../styles'
import { CartItemRow } from './CartItemRow'
import { CartSummary } from './CartSummary'

type CartPanelProps = {
  onClose: () => void
  onCheckout: () => void
}

// Drawer from the right: full width on mobile, max-w-md on larger screens.
export function CartPanel({ onClose, onCheckout }: CartPanelProps) {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  return (
    <div className="fixed inset-0 z-10">
      {/* Dark backdrop; clicking it closes the cart */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button type="button" onClick={onClose} className="text-2xl" aria-label="Close cart">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="p-4 text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <ul className="px-4">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </ul>
              <CartSummary onCheckout={onCheckout} />
            </div>
            <div className="border-t border-gray-200 p-4">
              <button type="button" onClick={clearCart} className={`${buttonDanger} w-full`}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
