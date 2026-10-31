import type { CartItem } from '../../store/cartStore'
import {
  DISCOUNT_THRESHOLD,
  MIN_CHECKOUT,
  amountNeededForCheckout,
  calculateCartTotals,
  formatCurrency,
  isCheckoutAllowed,
  lineTotal,
} from '../../utils/cartCalculations'

type OrderSummaryProps = {
  items: CartItem[]
}

// Read-only list of items and totals. Used in the cart drawer and in checkout.
export function OrderSummary({ items }: OrderSummaryProps) {
  const { subtotal, tax, discount, total } = calculateCartTotals(items)

  return (
    <div className="space-y-3 text-sm">
      <ul className="space-y-1 text-gray-600">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between gap-2">
            <span className="truncate">
              {item.title} × {item.quantity}
            </span>
            <span>{formatCurrency(lineTotal(item.price, item.quantity))}</span>
          </li>
        ))}
      </ul>

      <dl className="space-y-1 border-t border-gray-200 pt-3">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{formatCurrency(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Tax (5%)</dt>
          <dd>{formatCurrency(tax)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Discount (10%)</dt>
          <dd className={discount > 0 ? 'text-green-700' : ''}>−{formatCurrency(discount)}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold">
          <dt>Total</dt>
          <dd>{formatCurrency(total)}</dd>
        </div>
      </dl>

      {discount > 0 ? (
        <p className="text-green-700">10% discount applied (order over ${DISCOUNT_THRESHOLD}).</p>
      ) : (
        <p className="text-gray-500">Spend over ${DISCOUNT_THRESHOLD} to get 10% off.</p>
      )}

      {!isCheckoutAllowed(subtotal) && (
        <p className="rounded-md bg-amber-50 p-2 text-amber-800" role="alert">
          Minimum order value is ${MIN_CHECKOUT}. Add {formatCurrency(amountNeededForCheckout(subtotal))}{' '}
          more to checkout.
        </p>
      )}

      <p className="text-xs text-gray-500">Tax is calculated on the subtotal before discount.</p>
    </div>
  )
}
