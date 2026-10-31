import type { CartItem } from '../store/cartStore'

// Assumption: tax is calculated on the original subtotal (before discount),
// per the assignment wording.

export const TAX_RATE = 0.05
export const DISCOUNT_RATE = 0.1
export const DISCOUNT_THRESHOLD = 100 // discount only when subtotal is strictly above this
export const MIN_CHECKOUT = 10

// Only the fields the math needs, so these functions don't depend on the whole store.
type PricedItem = Pick<CartItem, 'price' | 'quantity'>

export type CartTotals = {
  subtotal: number
  tax: number
  discount: number
  total: number
}

// Round to 2 decimals. EPSILON fixes cases like 1.005 rounding down to 1.00.
export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100
}

export function lineTotal(price: number, quantity: number): number {
  return roundMoney(price * quantity)
}

export function calculateSubtotal(items: PricedItem[]): number {
  return roundMoney(items.reduce((sum, item) => sum + lineTotal(item.price, item.quantity), 0))
}

export function calculateTax(subtotal: number): number {
  return roundMoney(subtotal * TAX_RATE)
}

export function calculateDiscount(subtotal: number): number {
  return subtotal > DISCOUNT_THRESHOLD ? roundMoney(subtotal * DISCOUNT_RATE) : 0
}

export function isCheckoutAllowed(subtotal: number): boolean {
  return subtotal >= MIN_CHECKOUT
}

// How much more the customer must add to reach the checkout minimum.
export function amountNeededForCheckout(subtotal: number): number {
  return roundMoney(Math.max(MIN_CHECKOUT - subtotal, 0))
}

// Single entry point for the UI: call once, get everything.
export function calculateCartTotals(items: PricedItem[]): CartTotals {
  const subtotal = calculateSubtotal(items)
  const tax = calculateTax(subtotal)
  const discount = calculateDiscount(subtotal)
  const total = roundMoney(subtotal + tax - discount)
  return { subtotal, tax, discount, total }
}

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount)
}
