export async function submitLead(payload: {
  name: string
  company: string
  phone: string
}): Promise<void> {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to submit lead')
  }
}
