import { getCharacter } from "@/app/lib/rickmorty"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const character = await getCharacter(Number(id))
    return {
      title: `${character.name} | Rick & Morty`,
      description: `${character.name} - ${character.species} from ${character.origin.name}`,
    }
  } catch {
    return {
      title: "Character Not Found | Rick & Morty",
    }
  }
}

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const characterId = Number(id)

  if (isNaN(characterId) || characterId <= 0) {
    notFound()
  }

  try {
    const character = await getCharacter(characterId)

    return (
      <main className="mx-auto max-w-3xl p-6">
        <div className="flex gap-6">
          <img className="w-40 rounded-lg" alt={character.name} src={character.image} />
          <div>
            <h1 className="text-3xl font-semibold">{character.name}</h1>
            <p className="mt-2 opacity-80">
              {character.status} • {character.species} • {character.gender}
            </p>
            <p className="mt-4">
              <span className="font-medium">Origin:</span> {character.origin.name}
            </p>
            <p>
              <span className="font-medium">Location:</span> {character.location.name}
            </p>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    if (error instanceof Error && "status" in error && (error as { status: number }).status === 404) {
      notFound()
    }
    throw error
  }
}
