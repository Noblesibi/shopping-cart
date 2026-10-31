import { ProductsResponseSchema, type Product } from '../schemas/product'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=30'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL)

  if (!response.ok) {
    throw new Error(`Failed to load products (status ${response.status})`)
  }

  const json: unknown = await response.json()

  // Throws if the data doesn't match our schema, so bad data never reaches the UI.
  const data = ProductsResponseSchema.parse(json)
  return data.products
}
