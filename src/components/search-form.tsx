"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchForm({ defaultValue }: { defaultValue: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(defaultValue)
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Skip debounce on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (searchValue.trim()) {
        params.set("name", searchValue.trim())
        params.set("page", "1") // Reset to page 1 when searching
      } else {
        params.delete("name")
        // Keep current page if clearing search
        if (!params.get("page")) {
          params.set("page", "1")
        }
      }

      router.push(`/?${params.toString()}`)
    }, 1000) // 1 second debounce

    return () => clearTimeout(timer)
  }, [searchValue, router, searchParams])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (searchValue.trim()) {
      params.set("name", searchValue.trim())
      params.set("page", "1")
    } else {
      params.delete("name")
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
      <Input
        className="w-full"
        placeholder="Search by name…"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

