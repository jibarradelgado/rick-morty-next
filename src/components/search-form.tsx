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
  const previousSearchValue = useRef(defaultValue)

  // Sync local state when defaultValue prop changes (from URL changes via server component)
  useEffect(() => {
    if (defaultValue !== searchValue) {
      setSearchValue(defaultValue)
      previousSearchValue.current = defaultValue
    }
  }, [defaultValue])

  useEffect(() => {
    // Skip debounce on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      previousSearchValue.current = searchValue
      return
    }

    // Don't trigger if value hasn't actually changed
    if (searchValue === previousSearchValue.current) {
      return
    }

    const timer = setTimeout(() => {
      // Check if the value still differs from what's in the URL
      const currentUrlName = searchParams.get("name") || ""
      const trimmedValue = searchValue.trim()
      
      // Only update if the value is different from what's in the URL
      if (trimmedValue !== currentUrlName) {
        const params = new URLSearchParams(searchParams.toString())

        if (trimmedValue) {
          params.set("name", trimmedValue)
          params.set("page", "1") // Reset to page 1 when searching
        } else {
          params.delete("name")
          // Keep current page if clearing search
          if (!params.get("page")) {
            params.set("page", "1")
          }
        }

        router.push(`/?${params.toString()}`)
        previousSearchValue.current = trimmedValue
      }
    }, 1000) // 1 second debounce

    return () => clearTimeout(timer)
  }, [searchValue, router])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedValue = searchValue.trim()
    const params = new URLSearchParams(searchParams.toString())

    if (trimmedValue) {
      params.set("name", trimmedValue)
      params.set("page", "1")
    } else {
      params.delete("name")
    }

    router.push(`/?${params.toString()}`)
    previousSearchValue.current = trimmedValue
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

