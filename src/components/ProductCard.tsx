import type { Product } from '../schemas/product'
import { useCartStore } from '../store/cartStore'
import { buttonPrimary, card } from '../styles'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <article className={`${card} flex flex-col`}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mb-4 h-48 w-full object-contain"
        loading="lazy"
      />
      <p className="text-xs uppercase text-gray-500">{product.category}</p>
      <h2 className="mt-1 font-semibold text-gray-900">{product.title}</h2>
      <div className="mt-2 mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <span className="text-sm text-gray-600">★ {product.rating.toFixed(1)}</span>
      </div>
      <button
        type="button"
        onClick={() => addItem(product)}
        className={`${buttonPrimary} mt-auto w-full`}
      >
        Add to Cart
      </button>
    </article>
  )
}
