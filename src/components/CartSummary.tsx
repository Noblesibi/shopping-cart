import { useCartStore } from '../store/cartStore'
import { calculateCartTotals, isCheckoutAllowed } from '../utils/cartCalculations'
import { buttonPrimary } from '../styles'
import { OrderSummary } from './checkout/OrderSummary'

type CartSummaryProps = {
  onCheckout: () => void
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
  const items = useCartStore((state) => state.items)
  const { subtotal } = calculateCartTotals(items)

  return (
    <section className="space-y-3 border-t border-gray-200 p-4">
      <h3 className="font-semibold">Order Summary</h3>
      <OrderSummary items={items} />
      <button
        type="button"
        onClick={onCheckout}
        disabled={!isCheckoutAllowed(subtotal)}
        className={`${buttonPrimary} w-full`}
      >
        Proceed to Checkout
      </button>
    </section>
  )
}
