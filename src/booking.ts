export function isDikidiBooking(url: string): boolean {
  try {
    const parsed = new URL(url)
    return /dikidi/i.test(parsed.hostname) && /[?#]widget=\d+/.test(`${parsed.search}${parsed.hash}`)
  } catch {
    return false
  }
}

export function openDikidiBooking(url: string): void {
  const link = document.createElement('a')
  link.href = url
  document.body.appendChild(link)
  link.click()
  link.remove()
}
