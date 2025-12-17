export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex gap-6 animate-pulse">
        <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </main>
  )
}

