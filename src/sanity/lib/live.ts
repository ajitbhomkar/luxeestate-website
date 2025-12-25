import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN

// Simple fetch wrapper for Sanity queries
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, any>
  tags?: string[]
}): Promise<{ data: QueryResponse }> {
  const data = await client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: 60, // Revalidate every 60 seconds
      tags,
    },
  })
  
  return { data }
}

// Placeholder component for live updates (can be enhanced later)
export function SanityLive() {
  return null
}
