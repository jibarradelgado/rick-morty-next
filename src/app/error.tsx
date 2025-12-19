"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error.message || "An unexpected error occurred"}</p>
        <Button onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  )
}

