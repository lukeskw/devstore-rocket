import { Skeleton } from '@/components/skeleton'

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <p className="text-sm">Resultados para:</p>
        <div className="animate-pulse h-3 w-16 bg-zinc-700 rounded-full"></div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[280px] lg:h-[380px]" />
        <Skeleton className="h-[280px] lg:h-[380px]" />
        <Skeleton className="h-[280px] lg:h-[380px]" />
        <Skeleton className="h-[280px] lg:h-[380px]" />
        <Skeleton className="h-[280px] lg:h-[380px]" />
        <Skeleton className="h-[280px] lg:h-[380px]" />
      </div>
    </div>
  )
}
