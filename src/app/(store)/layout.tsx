import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/cart-context'
import { ReactNode } from 'react'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <main className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-rows-mainApp gap-5 p-8">
        <Header />
        {children}
      </main>
    </CartProvider>
  )
}
