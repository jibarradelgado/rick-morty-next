import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4">Character not found</h2>
        <p className="text-gray-600 mb-6">
          The character you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          Back to characters
        </Link>
      </div>
    </main>
  )
}

