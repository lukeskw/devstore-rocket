import { Product } from './product'

export interface CartItem {
  product: Product
  quantity: number
}
export interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
}
