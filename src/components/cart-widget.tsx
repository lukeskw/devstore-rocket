'use client'
import { useCart } from '@/contexts/cart-context'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

export default function CartWidget() {
  const { items } = useCart()

  const total = items.reduce((accumulator, item) => {
    const productPrice = item.product.price
    const productQuantity = item.quantity
    return accumulator + productPrice * productQuantity
  }, 0)

  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex w-full gap-1 justify-center items-center rounded-md px-4 py-2 text-sm font-medium text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              <ShoppingBag className="h-4 w-4" />
              <span className="text-sm">Cart ({items.length})</span>
              <ChevronDownIcon
                className={`ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100 ${
                  open
                    ? 'rotate-180 transform transition-all duration-100'
                    : 'rotate-0 transform transition-all duration-100'
                }`}
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -right-16 mt-2 w-72  p-4 origin-top-right divide-y divide-zinc-500 rounded-md bg-zinc-700 shadow-lg ring-1 ring-black/5 focus:outline-none">
              {items.length === 0 ? (
                <div>Carrinho vazio</div>
              ) : (
                <>
                  {items.map((item) => (
                    <Menu.Item key={item.product.id} as="a">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="flex w-full space-x-1 gap-1 items-center"
                      >
                        <Image
                          src={item.product.image}
                          alt=""
                          width={48}
                          height={48}
                          className="w-16 h-16"
                        />
                        <div className="w-px h-8 bg-zinc-500" />
                        <div className="text-sm truncate w-28">
                          {item.product.title}
                        </div>
                        <div className="w-px h-8 bg-zinc-500" />
                        <div className="text-sm flex flex-col items-end">
                          {item.product.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2,
                          })}
                          <span>Qtd: {item.quantity}</span>
                        </div>
                      </Link>
                    </Menu.Item>
                  ))}
                  <Menu.Item as="div">
                    <div className="flex justify-end gap-2 p-1 mt-1">
                      <span className="text-sm">Total: </span>
                      <span className="text-sm">
                        {total.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
