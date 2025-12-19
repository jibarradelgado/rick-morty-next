import Link from "next/link"
import { getCharacters } from "@/app/lib/rickmorty"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string }>
}) {
  const { page: pageParam, name: nameParam } = await searchParams
  const page = Number(pageParam ?? "1")
  const name = nameParam ?? ""
  const data = await getCharacters({ page, name })

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-semibold">Rick & Morty Characters</h1>

      <form className="mt-4 flex gap-2">
        <Input
          className="w-full"
          name="name"
          placeholder="Search by name…"
          defaultValue={name}
        />
        <Button type="submit">Search</Button>
      </form>

      {data.results.length === 0 ? (
        <div className="mt-6 text-center py-12">
          <p className="text-gray-600">No characters found. Try a different search term.</p>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {data.results.map((c) => (
            <li key={c.id} className="rounded-lg border p-3">
              <img alt={c.name} className="h-auto w-full rounded-md" src={c.image} />
              <div className="mt-2 font-medium">
                <Link className="underline" href={`/character/${c.id}`}>
                  {c.name}
                </Link>
              </div>
              <div className="text-sm opacity-80">{c.species}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center justify-between">
        <Link
          className={`underline ${data.info.prev ? "" : "pointer-events-none opacity-40"}`}
          href={`/?page=${Math.max(1, page - 1)}&name=${encodeURIComponent(name)}`}
        >
          Prev
        </Link>
        <div className="text-sm opacity-80">
          Page {page} / {data.info.pages}
        </div>
        <Link
          className={`underline ${data.info.next ? "" : "pointer-events-none opacity-40"}`}
          href={`/?page=${page + 1}&name=${encodeURIComponent(name)}`}
        >
          Next
        </Link>
      </div>
    </main>
  )
}
