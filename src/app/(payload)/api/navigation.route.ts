import { NextApiRequest, NextApiResponse } from 'next'
import payload from 'payload'
import type { CollectionSlug } from 'payload' // Type-safety for collection names

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const navigation = await payload.find({
      collection: 'navigation' as CollectionSlug, // Ensures the collection name is type-safe
      depth: 3, // Adjust depth based on the nested level of your navigation
    })

    res.status(200).json(navigation.docs) // Return only the `docs` array
  } catch (error) {
    console.error('Error fetching navigation:', error)
    res.status(500).json({ error: 'Failed to fetch navigation data' })
  }
}
