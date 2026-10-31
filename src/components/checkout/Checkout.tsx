import { useState } from 'react'
import { useCartStore } from '../../store/cartStore'
import { useCheckoutSteps } from '../../hooks/useCheckoutSteps'
import {
  EMPTY_SHIPPING,
  ShippingSchema,
  getShippingErrors,
  type ShippingErrors,
  type ShippingInfo,
} from '../../schemas/shipping'
import { calculateCartTotals, isCheckoutAllowed } from '../../utils/cartCalculations'
import { buttonPrimary, buttonSecondary, card } from '../../styles'
import { StepIndicator } from './StepIndicator'
import { OrderSummary } from './OrderSummary'
import { ShippingForm } from './ShippingForm'

type CheckoutProps = {
  onBackToShop: () => void
}

export function Checkout({ onBackToShop }: CheckoutProps) {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const { step, next, back } = useCheckoutSteps()

  // Lives here (not in ShippingForm) so it survives going Back and forward.
  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIPPING)
  const [errors, setErrors] = useState<ShippingErrors>({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (orderPlaced) {
    return (
      <div className={`${card} mx-auto max-w-lg text-center`} role="status">
        <h2 className="text-xl font-bold text-green-700">Order placed!</h2>
        <p className="mt-2 text-gray-600">Thank you, {shipping.fullName}. Your order is on its way.</p>
        <button type="button" onClick={onBackToShop} className={`${buttonPrimary} mt-4`}>
          Continue shopping
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={`${card} mx-auto max-w-lg text-center`}>
        <p className="text-gray-600">Your cart is empty.</p>
        <button type="button" onClick={onBackToShop} className={`${buttonPrimary} mt-4`}>
          Back to products
        </button>
      </div>
    )
  }

  const { subtotal } = calculateCartTotals(items)

  function handleFieldChange(field: keyof ShippingInfo, value: string) {
    setShipping((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined })) // clear this field's error as the user types
  }

  function handleShippingNext() {
    const result = ShippingSchema.safeParse(shipping)
    if (!result.success) {
      setErrors(getShippingErrors(result.error))
      return
    }
    setShipping(result.data) // trimmed values
    next()
  }

  function handlePlaceOrder() {
    setOrderPlaced(true)
    clearCart()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-4 text-2xl font-bold">Checkout</h2>
      <StepIndicator currentStep={step} />

      <div className={card}>
        {step === 1 && (
          <>
            <h3 className="mb-3 text-lg font-semibold">Review your cart</h3>
            <OrderSummary items={items} />
            <div className="mt-6 flex justify-between gap-3">
              <button type="button" onClick={onBackToShop} className={buttonSecondary}>
                Keep shopping
              </button>
              <button type="button" onClick={next} disabled={!isCheckoutAllowed(subtotal)} className={buttonPrimary}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="mb-3 text-lg font-semibold">Shipping details</h3>
            <ShippingForm values={shipping} errors={errors} onChange={handleFieldChange} />
            <div className="mt-6 flex justify-between gap-3">
              <button type="button" onClick={back} className={buttonSecondary}>
                Back
              </button>
              <button type="button" onClick={handleShippingNext} className={buttonPrimary}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="mb-3 text-lg font-semibold">Payment summary</h3>
            <dl className="mb-4 grid grid-cols-1 gap-1 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-4">
              <dt className="text-gray-500">Name</dt>
              <dd>{shipping.fullName}</dd>
              <dt className="text-gray-500">Email</dt>
              <dd>{shipping.email}</dd>
              <dt className="text-gray-500">Phone</dt>
              <dd>{shipping.phone}</dd>
              <dt className="text-gray-500">Address</dt>
              <dd>
                {shipping.address}, {shipping.city} {shipping.postalCode}
              </dd>
            </dl>
            <OrderSummary items={items} />
            <div className="mt-6 flex justify-between gap-3">
              <button type="button" onClick={back} className={buttonSecondary}>
                Back
              </button>
              <button type="button" onClick={handlePlaceOrder} className={buttonPrimary}>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
