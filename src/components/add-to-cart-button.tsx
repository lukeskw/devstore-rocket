'use client'
import { Product } from '@/@types/product'
import { useCart } from '@/contexts/cart-context'

export interface AddToCartProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartProps) {
  const { addToCart, items } = useCart()
  console.log(items)
  function handleAddProductToCart() {
    addToCart(product)
  }
  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold"
      onClick={handleAddProductToCart}
    >
      Adicionar ao carrinho
    </button>
  )
}
