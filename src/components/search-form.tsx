'use client'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const submitedQuery = data.q

    console.log(submitedQuery)

    if (!submitedQuery) {
      return null
    }

    router.push(`/search?q=${submitedQuery}`)
  }
  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700"
    >
      <button type="submit">
        <Search className="h-5 w-5 text-zinc-500" />
      </button>
      <input
        defaultValue={query ?? ''}
        name="q"
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-small outline-none placeholder:text-zinc-500"
      />
    </form>
  )
}
