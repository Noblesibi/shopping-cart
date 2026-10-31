import { MAX_QUANTITY, MIN_QUANTITY, useCartStore, type CartItem } from '../store/cartStore'

type CartItemRowProps = {
  item: CartItem
}

const qtyButton = 'h-8 w-8 rounded border border-gray-300 disabled:cursor-not-allowed disabled:opacity-40'

export function CartItemRow({ item }: CartItemRowProps) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <li className="flex gap-3 border-b border-gray-200 py-4">
      <img src={item.thumbnail} alt={item.title} className="h-16 w-16 rounded object-contain" />
      <div className="flex-1">
        <p className="font-medium">{item.title}</p>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={item.quantity <= MIN_QUANTITY}
            className={qtyButton}
            aria-label={`Decrease quantity of ${item.title}`}
          >
            −
          </button>
          <span className="w-6 text-center">{item.quantity}</span>
          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={item.quantity >= MAX_QUANTITY}
            className={qtyButton}
            aria-label={`Increase quantity of ${item.title}`}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="ml-auto text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}
