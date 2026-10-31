import { z } from 'zod'

// Only the fields our UI uses. Zod drops any extra fields from the API.
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  rating: z.number(),
  category: z.string(),
  thumbnail: z.url(),
})

export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
})

// TypeScript type generated from the schema, so we never write it twice.
export type Product = z.infer<typeof ProductSchema>
