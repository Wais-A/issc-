export async function fetchNavigation() {
  const res = await fetch('/api/navigation')
  if (!res.ok) {
    throw new Error('Failed to fetch navigation data')
  }
  return res.json()
}
