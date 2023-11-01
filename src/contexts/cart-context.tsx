'use client'
import { CartContextType, CartItem } from '@/@types/cart'
import { Product } from '@/@types/product'
import { ReactNode, createContext, useContext, useState } from 'react'

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(product: Product) {
    setCartItems((prevState) => {
      const productInCart = prevState.some(
        (item) => item.product.id === product.id,
      )
      if (productInCart) {
        return prevState.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      }

      return [...prevState, { product, quantity: 1 }]
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
