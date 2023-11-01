import { Product, ProductParamsInterface } from '@/@types/product'
import AddToCartButton from '@/components/add-to-cart-button'
import { api } from '@/services/api'
import { Metadata } from 'next'
import Image from 'next/image'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 10, // 1h
    },
  })
  const product = await response.json()

  return product
}

export async function generateMetadata({
  params,
}: ProductParamsInterface): Promise<Metadata> {
  const product = await getProduct(params.slug)
  return {
    title: product.title,
  }
}

// this builds ssg pages when you run 'npm run build'
// export async function generateStaticParams() {
//   const response = await api('/products/featured')
//   const products: Product[] = await response.json()

//   return products.map((product) => {
//     return { slug: product.slug }
//   })
// }

export default async function ProductPage({ params }: ProductParamsInterface) {
  const product = await getProduct(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="overflow-hidden col-span-2 shadow-[0_200px_50px_-200px_rgba(50,50,50,0.4)]">
        <Image
          className=""
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="px-12 justify-center flex flex-col">
        <h1 className="text-3xl font-bold leading-tight z-0">
          {product.title}
        </h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:brightness-110"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:brightness-110"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:brightness-110"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:brightness-110"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  )
}
