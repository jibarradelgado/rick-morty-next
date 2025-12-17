export type Character = {
  id: number
  name: string
  status: "Alive" | "Dead" | "unknown"
  species: string
  gender: string
  image: string
  origin: { name: string }
  location: { name: string }
}

type Paginated<T> = {
  info: { count: number; pages: number; next: string | null; prev: string | null }
  results: T[]
}

const BASE_URL = "https://rickandmortyapi.com/api"

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText?: string
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function getCharacters(params?: { page?: number; name?: string }) {
  const url = new URL(`${BASE_URL}/character`)
  if (params?.page) url.searchParams.set("page", String(params.page))
  if (params?.name) url.searchParams.set("name", params.name)

  try {
    const res = await fetch(url.toString(), { cache: "no-store" })
    if (!res.ok) {
      if (res.status === 404) {
        return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] }
      }
      throw new ApiError(
        `Failed to fetch characters: ${res.statusText || res.status}`,
        res.status,
        res.statusText
      )
    }
    return (await res.json()) as Paginated<Character>
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError("Network error: Failed to fetch characters", 0)
  }
}

export async function getCharacter(id: number) {
  if (!id || isNaN(id) || id <= 0) {
    throw new ApiError("Invalid character ID", 400)
  }

  try {
    const res = await fetch(`${BASE_URL}/character/${id}`, { cache: "no-store" })
    if (!res.ok) {
      if (res.status === 404) {
        throw new ApiError(`Character with ID ${id} not found`, 404)
      }
      throw new ApiError(
        `Failed to fetch character ${id}: ${res.statusText || res.status}`,
        res.status,
        res.statusText
      )
    }
    return (await res.json()) as Character
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError("Network error: Failed to fetch character", 0)
  }
}