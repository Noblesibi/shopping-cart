import { useState } from 'react'
import type { Product } from '../schemas/product'

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('') // '' means all categories
  const [minPrice, setMinPrice] = useState('') // kept as strings so an empty box means "no limit"
  const [maxPrice, setMaxPrice] = useState('')

  // Unique, sorted category names taken from the fetched products.
  const categories = [...new Set(products.map((p) => p.category))].sort()

  const query = search.trim().toLowerCase()
  const min = minPrice === '' ? 0 : Number(minPrice)
  const max = maxPrice === '' ? Infinity : Number(maxPrice)

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(query) &&
      (category === '' || p.category === category) &&
      p.price >= min &&
      p.price <= max,
  )

  function clearFilters() {
    setSearch('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
  }

  return {
    filteredProducts,
    categories,
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    clearFilters,
  }
}
