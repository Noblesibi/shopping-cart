import { describe, expect, it } from 'vitest'
import {
  amountNeededForCheckout,
  calculateCartTotals,
  calculateTax,
  formatCurrency,
  isCheckoutAllowed,
  lineTotal,
} from './cartCalculations'

describe('cart calculations', () => {
  it('returns all zeros for an empty cart and blocks checkout', () => {
    expect(calculateCartTotals([])).toEqual({ subtotal: 0, tax: 0, discount: 0, total: 0 })
    expect(isCheckoutAllowed(0)).toBe(false)
  })

  it('blocks checkout when subtotal is below $10', () => {
    const { subtotal } = calculateCartTotals([{ price: 9.99, quantity: 1 }])
    expect(isCheckoutAllowed(subtotal)).toBe(false)
    expect(amountNeededForCheckout(subtotal)).toBe(0.01)
  })

  it('allows checkout at exactly $10', () => {
    const { subtotal } = calculateCartTotals([{ price: 5, quantity: 2 }])
    expect(subtotal).toBe(10)
    expect(isCheckoutAllowed(subtotal)).toBe(true)
    expect(amountNeededForCheckout(subtotal)).toBe(0)
  })

  it('gives no discount at exactly $100', () => {
    expect(calculateCartTotals([{ price: 100, quantity: 1 }])).toEqual({
      subtotal: 100,
      tax: 5,
      discount: 0,
      total: 105,
    })
  })

  it('applies 10% discount just over $100', () => {
    const totals = calculateCartTotals([{ price: 100.01, quantity: 1 }])
    expect(totals.discount).toBe(10)
    expect(totals.total).toBe(95.01) // 100.01 + 5.00 tax - 10.00 discount
  })

  it('calculates 5% tax rounded to 2 decimals', () => {
    expect(calculateTax(200)).toBe(10)
    expect(calculateTax(12.34)).toBe(0.62) // 0.617 rounds up
  })

  it('handles multiple items with different quantities', () => {
    const items = [
      { price: 19.99, quantity: 2 }, // 39.98
      { price: 5.5, quantity: 3 }, // 16.50
      { price: 0.1, quantity: 3 }, // 0.30 (not 0.30000000000000004)
    ]
    expect(lineTotal(0.1, 3)).toBe(0.3)
    expect(calculateCartTotals(items)).toEqual({
      subtotal: 56.78,
      tax: 2.84,
      discount: 0,
      total: 59.62,
    })
  })

  it('handles multiple items over $100 (tax and discount both on subtotal)', () => {
    const items = [
      { price: 49.99, quantity: 2 }, // 99.98
      { price: 5, quantity: 1 }, // 5.00
    ]
    expect(calculateCartTotals(items)).toEqual({
      subtotal: 104.98,
      tax: 5.25,
      discount: 10.5,
      total: 99.73,
    })
  })

  it('formats money as USD', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
    expect(formatCurrency(0)).toBe('$0.00')
  })
})
