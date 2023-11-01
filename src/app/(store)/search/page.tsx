import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/api'
import { Product } from '@/@types/product'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 10, // 1h
    },
  })
  const products = await response.json()

  return products
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative rounded-lg bg-zinc-800 overflow-hidden flex justify-center items-end"
            >
              <Image
                className="group-hover:scale-105 transition-transform duration-500"
                src={product.image}
                width={480}
                height={480}
                quality={100}
                alt=""
              />
              <div className="absolute bottom-10 right-2 lg:right-10 h-12 flex items-center gap-2 text-xs flex-1 lg:text-base max-w-[150px] md:max-w-[200px] lg:max-w-[280px] rounded-full border-2 border-zinc-600 bg-black/60 p-1 pl-5">
                <span className="text-xs lg:text-sm truncate">
                  {product.title}
                </span>
                <span className="flex h-full items-center justify-center bg-violet-500 rounded-full px-4 font-semibold">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
