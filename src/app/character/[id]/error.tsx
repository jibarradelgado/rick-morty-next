"use client"

import { useEffect } from "react"
import Link from "next/link"
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
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4">Failed to load character</h2>
        <p className="text-gray-600 mb-6">{error.message || "An unexpected error occurred"}</p>
        <div className="flex gap-4">
          <Button onClick={reset}>
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              Back to characters
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

