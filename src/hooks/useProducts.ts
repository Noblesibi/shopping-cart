import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/products'

export function useProducts() {
  return useQuery({
    queryKey: ['products'], // cache key for this data
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // treat data as fresh for 5 minutes (no refetch)
  })
}
